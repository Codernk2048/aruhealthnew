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

## Switching to PostgreSQL (production)
1. `docker-compose up -d` (or your own instance)
2. In `apps/api/prisma/schema.prisma` set `provider = "postgresql"`
3. Set `DATABASE_URL` to the PostgreSQL URL
4. `npm run db:setup`

## Scripts
| Command | Action |
|---|---|
| `npm run dev` | run api + web together |
| `npm run build` | typecheck + build both apps |
| `npm run lint` | lint web |
| `npm run seed` | seed demo data |