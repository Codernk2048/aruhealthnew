import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { asyncHandler } from "../middleware/error";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";

const router = Router();

// kcal estimate assumes ~60 kg adult: kcal = MET * minutes
const logSchema = z.object({
  exerciseId: z.number().int().optional(),
  exerciseName: z.string().min(1).optional(),
  durationMin: z.number().int().min(1).max(1440),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
});

router.get("/", authenticate, asyncHandler(async (req, res) => {
  const date = String(req.query.date ?? "");
  const logs = await prisma.exerciseLog.findMany({
    where: { userId: req.user!.id, ...(date ? { date } : {}) },
    orderBy: { date: "desc" },
  });
  res.json({ logs });
}));

router.post("/", authenticate, validate(logSchema), asyncHandler(async (req, res) => {
  const { exerciseId, exerciseName, durationMin, date } = req.body;
  let name = exerciseName ?? "";
  let met = 3;

  if (exerciseId) {
    const ex = await prisma.exercise.findUnique({ where: { id: exerciseId } });
    if (!ex) {
      res.status(404).json({ message: "Exercise not found" });
      return;
    }
    name = ex.name;
    met = ex.met;
  }
  if (!name) {
    res.status(400).json({ message: "exerciseId or exerciseName is required" });
    return;
  }

  const kcal = Math.round(met * durationMin);
  const log = await prisma.exerciseLog.create({
    data: { userId: req.user!.id, exerciseName: name, met, durationMin, kcal, date },
  });
  res.status(201).json({ log });
}));

export default router;