import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

function required(name: string, fallback: string): string {
  const value = process.env[name] ?? fallback;
  return value;
}

export const config = {
  port: Number(process.env.PORT ?? 4000),
  databaseUrl: required("DATABASE_URL", "file:./dev.db"),
  jwtSecret: required(
    "JWT_SECRET",
    "dev-only-insecure-secret-please-change-in-production",
  ),
  jwtExpiresIn: required("JWT_EXPIRES_IN", "7d"),
  corsOrigin: required("CORS_ORIGIN", "http://localhost:3000"),
};

if (config.jwtSecret.includes("dev-only")) {
  console.warn("[security] JWT_SECRET is the dev default - set a real secret in .env");
}