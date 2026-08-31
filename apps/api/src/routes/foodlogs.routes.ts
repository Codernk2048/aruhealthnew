import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { MEAL_TYPES } from "@aruhealth/shared";
import { asyncHandler } from "../middleware/error";
import { authenticate } from "../middleware/auth";
import { validate } from "../middleware/validate";

const router = Router();

const logSchema = z.object({
  foodId: z.number().int().optional(),
  foodName: z.string().min(1).optional(),
  qty: z.number().positive().default(1),
  mealType: z.enum(MEAL_TYPES).default("snack"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
});

router.get("/", authenticate, asyncHandler(async (req, res) => {
  const date = String(req.query.date ?? "");
  const logs = await prisma.foodLog.findMany({
    where: {
      userId: req.user!.id,
      ...(date ? { date } : {}),
    },
    orderBy: { date: "desc" },
  });
  res.json({ logs });
}));

router.post("/", authenticate, validate(logSchema), asyncHandler(async (req, res) => {
  const { foodId, foodName, qty, mealType, date } = req.body;
  let name = foodName;
  let nameNe = "";
  let kcal = 0;

  if (foodId) {
    const food = await prisma.food.findUnique({ where: { id: foodId } });
    if (!food) {
      res.status(404).json({ message: "Food not found" });
      return;
    }
    name = food.name;
    nameNe = food.nameNe;
    kcal = Math.round(food.kcal * qty);
  } else if (foodName) {
    const matched = await prisma.food.findFirst({ where: { name: { contains: foodName } } });
    if (matched) {
      name = matched.name;
      nameNe = matched.nameNe;
      kcal = Math.round(matched.kcal * qty);
    } else {
      res.status(400).json({ message: "Unknown food. Close the name in /foods or pick from the list." });
      return;
    }
  } else {
    res.status(400).json({ message: "foodId or foodName is required" });
    return;
  }

  const log = await prisma.foodLog.create({
    data: { userId: req.user!.id, foodName: name, foodNameNe: nameNe, qty, kcal, mealType, date },
  });
  res.status(201).json({ log });
}));

export default router;