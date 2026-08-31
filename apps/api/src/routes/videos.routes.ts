import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { asyncHandler } from "../middleware/error";
import { authenticate, requireAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";

const router = Router();

const videoSchema = z.object({
  titleEn: z.string().min(1),
  titleNe: z.string().min(1),
  url: z.string().url("Must be an embed URL like player.youtube.com or player.vimeo.com"),
  provider: z.enum(["YOUTUBE", "VIMEO"]).default("YOUTUBE"),
  category: z.string().default("meditation"),
  thumbnail: z.string().default(""),
});

router.get("/", asyncHandler(async (req, res) => {
  const category = String(req.query.category ?? "");
  const videos = await prisma.video.findMany({
    where: category ? { category } : undefined,
    orderBy: { createdAt: "desc" },
  });
  res.json({ videos });
}));

router.post("/", authenticate, requireAdmin, validate(videoSchema), asyncHandler(async (req, res) => {
  const video = await prisma.video.create({ data: req.body });
  res.status(201).json({ video });
}));

router.patch("/:id", authenticate, requireAdmin, validate(videoSchema.partial()), asyncHandler(async (req, res) => {
  const video = await prisma.video.update({ where: { id: Number(req.params.id) }, data: req.body });
  res.json({ video });
}));

router.delete("/:id", authenticate, requireAdmin, asyncHandler(async (req, res) => {
  await prisma.video.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
}));

export default router;