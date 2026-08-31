import { Router } from "express";
import { z } from "zod";
import { rateLimit } from "express-rate-limit";
import { runChatbot } from "../services/chatbot";
import { asyncHandler } from "../middleware/error";
import { validate } from "../middleware/validate";

const router = Router();

const chatSchema = z.object({
  message: z.string().min(1).max(500),
  lang: z.enum(["en", "ne"]).default("en"),
});

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many messages - please slow down a little ☕" },
});

router.post("/", chatLimiter, validate(chatSchema), asyncHandler(async (req, res) => {
  const { message, lang } = req.body;
  const result = runChatbot(message, lang);
  res.json({ intent: result.intent, reply: result.text, quickReplies: result.quickReplies });
}));

export default router;