import { Router } from "express";
import { prisma } from "../lib/prisma";
import { asyncHandler } from "../middleware/error";
import { authenticate } from "../middleware/auth";

const router = Router();

function dateStr(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const DAILY_KCAL_GOAL = 2000;

router.get("/dashboard", authenticate, asyncHandler(async (req, res) => {
  const userId = req.user!.id;
  const today = dateStr(0);
  const weekAgo = dateStr(6);

  const [foodLogs, exerciseLogs, sleepLogs, meditationLogs] = await Promise.all([
    prisma.foodLog.findMany({ where: { userId, date: { gte: weekAgo } } }),
    prisma.exerciseLog.findMany({ where: { userId, date: { gte: weekAgo } } }),
    prisma.sleepLog.findMany({ where: { userId, date: { gte: weekAgo } } }),
    prisma.meditationLog.findMany({ where: { userId, date: { gte: weekAgo } } }),
  ]);

  const byDay = new Map<string, { kcal: number; exerciseMin: number; sleepHours: number | null }>();
  for (let i = 0; i < 7; i++) {
    byDay.set(dateStr(i), { kcal: 0, exerciseMin: 0, sleepHours: null });
  }

  let todayKcal = 0;
  let weeklyKcal = 0;
  let weeklyExerciseMin = 0;
  let weeklyExerciseKcal = 0;
  let totalSleep = 0;
  let sleepDays = 0;
  const meditationThisWeek: number = meditationLogs.reduce((s: number, m: { minutes: number }) => s + m.minutes, 0);

  for (const log of foodLogs) {
    const day = byDay.get(log.date);
    if (day) day.kcal += log.kcal;
    weeklyKcal += log.kcal;
    if (log.date === today) todayKcal += log.kcal;
  }
  for (const log of exerciseLogs) {
    const day = byDay.get(log.date);
    if (day) day.exerciseMin += log.durationMin;
    weeklyExerciseMin += log.durationMin;
    weeklyExerciseKcal += log.kcal;
  }
  for (const log of sleepLogs) {
    const day = byDay.get(log.date);
    if (day) day.sleepHours = log.hours;
    totalSleep += log.hours;
    sleepDays += 1;
  }

  const last7Days = Array.from(byDay.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, v]) => ({ date, ...v }));

  res.json({
    todayKcal,
    weeklyKcal,
    dailyKcalGoal: DAILY_KCAL_GOAL,
    weeklyExerciseMin,
    weeklyExerciseKcal,
    avgSleepHours: sleepDays ? Math.round((totalSleep / sleepDays) * 10) / 10 : 0,
    meditationThisWeek: Math.round(meditationThisWeek),
    last7Days,
  });
}));

export default router;