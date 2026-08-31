import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { signToken } from "../lib/jwt";
import { asyncHandler } from "../middleware/error";
import { authenticate } from "../middleware/auth";

const router = Router();

const registerSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name required").max(80),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function publicUser(user: {
  id: number;
  email: string;
  name: string;
  role: string;
  language: string;
  createdAt: Date;
}) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    language: user.language,
    createdAt: user.createdAt.toISOString(),
  };
}

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const body = registerSchema.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ message: body.error.issues[0].message });
      return;
    }
    const { email, password, name } = body.data;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ message: "An account with this email already exists" });
      return;
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, passwordHash, name },
    });
    const token = signToken({ sub: user.id, email: user.email, role: user.role as "USER" });
    res.status(201).json({ token, user: publicUser(user) });
  }),
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const body = loginSchema.safeParse(req.body);
    if (!body.success) {
      res.status(400).json({ message: "Email and password required" });
      return;
    }
    const { email, password } = body.data;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const token = signToken({ sub: user.id, email: user.email, role: user.role as "USER" });
    res.json({ token, user: publicUser(user) });
  }),
);

router.get(
  "/me",
  authenticate,
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ user: publicUser(user) });
  }),
);

export default router;