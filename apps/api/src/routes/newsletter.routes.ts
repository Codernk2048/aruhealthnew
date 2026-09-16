import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { asyncHandler } from "../middleware/error";
import { validate } from "../middleware/validate";

const router = Router();
const schema = z.object({ email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()) });

router.post("/subscribe", validate(schema), asyncHandler(async (req, res) => {
  const subscriber = await prisma.newsletterSubscriber.upsert({
    where: { email: req.body.email },
    update: {},
    create: { email: req.body.email },
  });
  res.status(201).json({ ok: true, subscriberId: subscriber.id });
}));

export default router;
