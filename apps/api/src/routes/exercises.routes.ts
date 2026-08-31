import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { asyncHandler } from "../middleware/error";
import { authenticate, requireAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";

const router = Router();

const exerciseSchema = z.object({
  name: z.string().min(1),
  nameNe: z.string().default(""),
  met: z.number().min(1).max(20),
});

router.get("/", asyncHandler(async (_req, res) => {
  const exercises = await prisma.exercise.findMany({ orderBy: { name: "asc" } });
  res.json({ exercises });
}));

router.post("/", authenticate, requireAdmin, validate(exerciseSchema), asyncHandler(async (req, res) => {
  const exercise = await prisma.exercise.create({ data: req.body });
  res.status(201).json({ exercise });
}));

router.patch("/:id", authenticate, requireAdmin, validate(exerciseSchema.partial()), asyncHandler(async (req, res) => {
  const exercise = await prisma.exercise.update({ where: { id: Number(req.params.id) }, data: req.body });
  res.json({ exercise });
}));

router.delete("/:id", authenticate, requireAdmin, asyncHandler(async (req, res) => {
  await prisma.exercise.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
}));

export default router;