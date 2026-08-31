import { Router } from "express";
import { asyncHandler } from "../middleware/error";

const router = Router();

router.get("/", asyncHandler(async (_req, res) => {
  res.json({ status: "ok", service: "aruhealth-api", time: new Date().toISOString() });
}));

export default router;