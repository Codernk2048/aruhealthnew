import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { asyncHandler } from "../middleware/error";
import { authenticate, requireAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";

const router = Router();

const testimonialSchema = z.object({
  quoteEn: z.string().min(1),
  quoteNe: z.string().min(1),
  author: z.string().min(1),
  role: z.string().default(""),
  rating: z.number().int().min(1).max(5).default(5),
  published: z.boolean().default(true),
});

router.get("/", asyncHandler(async (_req, res) => {
  const testimonials = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { id: "desc" },
  });
  res.json({ testimonials });
}));

router.post("/", authenticate, requireAdmin, validate(testimonialSchema), asyncHandler(async (req, res) => {
  const t = await prisma.testimonial.create({ data: req.body });
  res.status(201).json({ testimonial: t });
}));

router.patch("/:id", authenticate, requireAdmin, validate(testimonialSchema.partial()), asyncHandler(async (req, res) => {
  const t = await prisma.testimonial.update({ where: { id: Number(req.params.id) }, data: req.body });
  res.json({ testimonial: t });
}));

router.delete("/:id", authenticate, requireAdmin, asyncHandler(async (req, res) => {
  await prisma.testimonial.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
}));

export default router;