import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { asyncHandler } from "../middleware/error";
import { authenticate, requireAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";

const router = Router();

const foodSchema = z.object({
  name: z.string().min(1),
  nameNe: z.string().default(""),
  kcal: z.number().int().min(0).max(2000),
  protein: z.number().min(0).default(0),
  carbs: z.number().min(0).default(0),
  fat: z.number().min(0).default(0),
  unit: z.string().default("serving"),
});

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const q = String(req.query.q ?? "").trim().toLowerCase();
    const foods = await prisma.food.findMany({
      where: q
        ? {
            OR: [
              { name: { contains: q } },
              { nameNe: { contains: q } },
            ],
          }
        : undefined,
      orderBy: { name: "asc" },
      take: 50,
    });
    res.json({ foods });
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const food = await prisma.food.findUnique({ where: { id: Number(req.params.id) } });
    if (!food) {
      res.status(404).json({ message: "Food not found" });
      return;
    }
    res.json({ food });
  }),
);

router.post("/", authenticate, requireAdmin, validate(foodSchema), asyncHandler(async (req, res) => {
  const food = await prisma.food.create({ data: req.body });
  res.status(201).json({ food });
}));

router.patch("/:id", authenticate, requireAdmin, validate(foodSchema.partial()), asyncHandler(async (req, res) => {
  const food = await prisma.food.update({ where: { id: Number(req.params.id) }, data: req.body });
  res.json({ food });
}));

router.delete("/:id", authenticate, requireAdmin, asyncHandler(async (req, res) => {
  await prisma.food.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
}));

export default router;