import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { asyncHandler } from "../middleware/error";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";

const router = Router();

const meditationSchema = z.object({
  minutes: z.number().int().min(1).max(1440),
  technique: z.string().min(1).max(120),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
});

router.get("/", authenticate, asyncHandler(async (req, res) => {
  const logs = await prisma.meditationLog.findMany({
    where: { userId: req.user!.id },
    orderBy: { date: "desc" },
    take: 60,
  });
  res.json({ logs });
}));

router.post("/", authenticate, validate(meditationSchema), asyncHandler(async (req, res) => {
  const log = await prisma.meditationLog.create({
    data: { userId: req.user!.id, ...req.body },
  });
  res.status(201).json({ log });
}));

export default router;