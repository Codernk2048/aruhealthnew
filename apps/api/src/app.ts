import express, { type Express } from "express";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { config } from "./config";
import { errorHandler, notFound } from "./middleware/error";

import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";
import foodRoutes from "./routes/foods.routes";
import foodLogRoutes from "./routes/foodlogs.routes";
import exerciseRoutes from "./routes/exercises.routes";
import exerciseLogRoutes from "./routes/exerciselogs.routes";
import sleepRoutes from "./routes/sleep.routes";
import meditationRoutes from "./routes/meditation.routes";
import postRoutes from "./routes/posts.routes";
import videoRoutes from "./routes/videos.routes";
import testimonialRoutes from "./routes/testimonials.routes";
import chatRoutes from "./routes/chat.routes";
import statsRoutes from "./routes/stats.routes";

export function createApp(): Express {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet({ contentSecurityPolicy: false }));
  const allowedOrigins = config.corsOrigin.split(",").map((s) => s.trim()).filter(Boolean);
  app.use(cors({
    origin(origin, cb) {
      // allow non-browser / server-to-server requests with no Origin header
      if (!origin) return cb(null, true);
      const allowed = allowedOrigins.some((pattern) => {
        if (pattern.includes("*")) {
          const re = new RegExp("^" + pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\\\*/g, ".*") + "$");
          return re.test(origin);
        }
        return pattern === origin;
      });
      // don't throw — just disable CORS for this origin (browser will block, but server won't 500)
      return cb(null, allowed);
    },
    credentials: true,
  }));
  app.use(express.json({ limit: "200kb" }));

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 600,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  });
  app.use("/api/v1", apiLimiter);

  app.use("/api/v1/health", healthRoutes);
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/foods", foodRoutes);
  app.use("/api/v1/food-logs", foodLogRoutes);
  app.use("/api/v1/exercises", exerciseRoutes);
  app.use("/api/v1/exercise-logs", exerciseLogRoutes);
  app.use("/api/v1/sleep", sleepRoutes);
  app.use("/api/v1/meditation", meditationRoutes);
  app.use("/api/v1/posts", postRoutes);
  app.use("/api/v1/videos", videoRoutes);
  app.use("/api/v1/testimonials", testimonialRoutes);
  app.use("/api/v1/chat", chatRoutes);
  app.use("/api/v1/stats", statsRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}