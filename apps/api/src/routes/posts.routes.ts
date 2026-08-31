import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { asyncHandler } from "../middleware/error";
import { authenticate, requireAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";

const router = Router();

function toSummary(p: {
  id: number;
  slug: string;
  titleEn: string;
  titleNe: string;
  excerptEn: string;
  excerptNe: string;
  coverImage: string;
  tags: string;
  publishedAt: Date | null;
  views: number;
}) {
  return {
    id: p.id,
    slug: p.slug,
    titleEn: p.titleEn,
    titleNe: p.titleNe,
    excerptEn: p.excerptEn,
    excerptNe: p.excerptNe,
    coverImage: p.coverImage,
    tags: p.tags,
    publishedAt: p.publishedAt,
    views: p.views,
  };
}

const postSchema = z.object({
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "slug must be lowercase letters, numbers, hyphens"),
  titleEn: z.string().min(1),
  titleNe: z.string().min(1),
  excerptEn: z.string().min(1),
  excerptNe: z.string().min(1),
  contentEn: z.string().min(1),
  contentNe: z.string().min(1),
  coverImage: z.string().url().or(z.literal("")).default(""),
  tags: z.string().default(""),
  published: z.boolean().default(false),
});

router.get("/", asyncHandler(async (_req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true, slug: true, titleEn: true, titleNe: true, excerptEn: true,
      excerptNe: true, coverImage: true, tags: true, publishedAt: true, views: true,
    },
  });
  res.json({ posts: posts.map(toSummary) });
}));

router.get("/all", authenticate, requireAdmin, asyncHandler(async (_req, res) => {
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });
  res.json({ posts });
}));

router.get("/:slug", asyncHandler(async (req, res) => {
  const post = await prisma.post.update({
    where: { slug: req.params.slug },
    data: { views: { increment: 1 } },
  });
  if (!post.published && !req.user) {
    res.status(404).json({ message: "Post not found" });
    return;
  }
  res.json({ post });
}));

router.post("/", authenticate, requireAdmin, validate(postSchema), asyncHandler(async (req, res) => {
  const { published, ...data } = req.body;
  const post = await prisma.post.create({
    data: {
      ...data,
      authorId: req.user!.id,
      published,
      publishedAt: published ? new Date() : null,
    },
  });
  res.status(201).json({ post });
}));

router.patch("/:id", authenticate, requireAdmin, validate(postSchema.partial()), asyncHandler(async (req, res) => {
  const { published, ...data } = req.body;
  const existing = await prisma.post.findUnique({ where: { id: Number(req.params.id) } });
  if (!existing) {
    res.status(404).json({ message: "Post not found" });
    return;
  }
  const post = await prisma.post.update({
    where: { id: existing.id },
    data: {
      ...data,
      ...(published !== undefined ? { published, publishedAt: published ? existing.publishedAt ?? new Date() : null } : {}),
    },
  });
  res.json({ post });
}));

router.delete("/:id", authenticate, requireAdmin, asyncHandler(async (req, res) => {
  await prisma.post.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
}));

export default router;