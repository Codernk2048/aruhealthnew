import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { SLEEP_QUALITIES } from "@aruhealth/shared";
import { asyncHandler } from "../middleware/error";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";

const router = Router();

const sleepSchema = z.object({
  hours: z.number().min(0).max(24),
  quality: z.enum(SLEEP_QUALITIES),
  notes: z.string().max(500).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
});

router.get("/", authenticate, asyncHandler(async (req, res) => {
  const logs = await prisma.sleepLog.findMany({
    where: { userId: req.user!.id },
    orderBy: { date: "desc" },
    take: 30,
  });
  res.json({ logs });
}));

router.post("/", authenticate, validate(sleepSchema), asyncHandler(async (req, res) => {
  const { hours, quality, notes, date } = req.body;
  // one entry per night per user: upsert on (userId, date)
  const log = await prisma.sleepLog.upsert({
    where: { userId_date: { userId: req.user!.id, date } },
    update: { hours, quality, notes },
    create: { userId: req.user!.id, hours, quality, notes, date },
  });
  res.status(201).json({ log });
}));

export default router;