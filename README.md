# ARUHEALTH 💙

Calm health & wellbeing platform. Soft neumorphic UI in NHS-inspired white + blue, fully bilingual **English ↔ Nepali**, health trackers, blog, video gallery, and a rule-based chatbot.

Docs: [`PLANNING.md`](PLANNING.md) · [`SECURITY.md`](SECURITY.md)

## Stack
- **apps/web** — Next.js 15 (App Router) + TypeScript + Tailwind
- **apps/api** — Express + TypeScript + Prisma (SQLite dev / PostgreSQL prod)
- **packages/shared** — shared types + constants

## Quick start
```bash
npm install
npm run db:setup && npm run seed   # creates DB + seeds demo content
npm run dev                        # api :4000 · web :3000
```
Open http://localhost:3000

## Accounts
Seed creates:
- `admin@aruhealth.com` / `admin123` (role ADMIN)
- `demo@aruhealth.com` / `demo123` (role USER)

## Deploy

### Vercel (web) — https://vercel.com
1. Import `https://github.com/Codernk2048/aruhealthnew` in Vercel.
2. Framework: **Next.js**, Root directory: repo root (uses `vercel.json` → `apps/web/.next`).
3. Env vars in Vercel Dashboard → Settings → Environment Variables:
   - `NEXT_PUBLIC_API_URL=https://<your-api>.onrender.com/api/v1` (or Render URL)
4. Deploy — `npm install` + `npm run build -w @aruhealth/web` runs automatically.

### Render (api) — https://render.com
`render.yaml` is committed. On Render: New → Blueprint → connect repo.
Required env vars (Render dashboard → Environment, or `render.yaml` sync:false):
- `DATABASE_URL` → Supabase/Neon postgres URL, e.g. `postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres`
- `JWT_SECRET` → auto-generated (`generateValue: true`)
- `CORS_ORIGIN` → `http://localhost:3000,https://aruhealth-web.vercel.app,https://*.vercel.app` (comma-separated, `*` wildcard supported)
Build: `npm install && npx prisma generate --schema=apps/api/prisma/schema.prisma && npx prisma db push ...`
Start: `npm run start -w @aruhealth/api`
After first deploy, seed once via Render Shell: `npm run seed -w @aruhealth/api`

### Switching to PostgreSQL locally
1. `docker-compose up -d`
2. `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/aruhealth"` in `apps/api/.env`
3. Schema is already `postgresql` (see `apps/api/prisma/schema.prisma`)
4. `npm run db:setup && npm run seed`
For zero-setup SQLite: set provider to `sqlite` + `DATABASE_URL="file:./dev.db"`

## Scripts
| Command | Action |
|---|---|
| `npm run dev` | run api + web together |
| `npm run build` | typecheck + build both apps |
| `npm run lint` | lint web |
| `npm run seed` | seed demo data |