# ARUHEALTH — Planning Document

Health & wellbeing platform. Calm, soft, neumorphic UI in an NHS-inspired **white + blue** palette. Fully bilingual **English ↔ Nepali (Devanagari)**, multipage content site, authenticated tracking dashboard, and a rule-based health assistant bot.

Inspired by Healthline Media's credible health-publishing experience and the classic calming health-app landing structure (hero → features → testimonials → app CTAs).

## 1. Goals (MVP - free tier)
- Multipage public site: Home, Features, Meditation, Fitness, Sleep, Calorie Meter, Video Gallery, Blog, About, Contact.
- Authenticated dashboard: calorie, exercise, and sleep tracking with weekly summaries.
- Rule-based bilingual chatbot (no external AI cost).
- English + Nepali switching everywhere.
- Content authoring via admin panel (blog posts, videos, testimonials, food & exercise DB).

## 2. Design System
| Token | Value |
|---|---|
| Primary (NHS blue) | `#005EB8` |
| Primary dark | `#003E8C` |
| Accent (NHS bright blue) | `#41B6E6` |
| Surface | `#FFFFFF` |
| Background | `#EEF4FB` / `#F2F7FC` |
| Ink | `#1C2B3A` (slate) |
| Muted | `#5B6B7B` |
| Calm accent | `#7A9E7E` sage, `#3C9D9B` teal |

- **Neumorphism**: soft dual shadows — luminance highlight + ambient shadow; inset variant for inputs/pressed states. Radius 16–24px.
- **Type**: Inter (latin) + Noto Sans Devanagari (Nepali) via `next/font`.
- **Motion**: subtle fades, breathing animation for meditation widget, `prefers-reduced-motion` respected. No heavy animation library.
- **Accessibility**: WCAG AA contrast, focus rings, semantic landmarks, keyboard-usable chatbot.

## 3. Architecture
```
Monorepo (npm workspaces)
├─ apps/web        Next.js 15 App Router + TypeScript + Tailwind
├─ apps/api        Express + TypeScript + Prisma
└─ packages/shared shared TS types/constants consumed by both
```
- **DB**: SQLite for zero-setup local dev (Prisma). PostgreSQL for production via `docker-compose.yml` + provider toggle (one-line change in `schema.prisma`).
- **Client ↔ server**: REST at `/api/v1` with JWT Bearer tokens.

## 4. Database (Prisma models)
`User` • `Food` (EN/NE names) • `FoodLog` • `Exercise` (EN/NE + MET) • `ExerciseLog` • `SleepLog` • `MeditationLog` • `Post` (EN+NE fields, rich text) • `Video` (YouTube/Vimeo embed) • `Testimonial`.
> SQLite has no native enums — roles/qualities are string constants validated on the API layer.

## 5. API surface (`/api/v1`)
| Group | Routes |
|---|---|
| health | `GET /health` |
| auth | `POST /auth/register`, `POST /auth/login`, `GET /auth/me` |
| foods | `GET /foods?q=`, `POST/PATCH/DELETE /foods/:id` (admin) |
| food-logs | `GET /food-logs`, `POST /food-logs` |
| exercises | `GET /exercises?q=`, `POST/PATCH/DELETE` (admin) |
| exercise-logs | `GET`, `POST` |
| sleep | `GET /sleep`, `POST /sleep` |
| meditation | `GET`, `POST` |
| posts | `GET /posts`, `GET /posts/:slug`, admin `POST/PATCH/DELETE` |
| videos | `GET /videos`, admin CRUD |
| testimonials | `GET /testimonials`, admin CRUD |
| chat | `POST /chat` (rule engine) |
| stats | `GET /stats/dashboard` |

## 6. Chatbot design
Stateless rule-based engine with **intents**:
`greeting, meditation, breathing, calories, diet, exercise, sleep, water, stress, emergency, about, language, fallback`.
- Bilingual response tables (`en`, `ne`).
- Keyword/scoring matching + quick-reply chips in the widget.
- **Emergency intent** redirects to crisis resources with clear "not medical advice" copy.

## 7. Workflows
- **Auth flow**: register → login → JWT stored (localStorage, dev) → protected dashboard calls sent with `Authorization: Bearer`.
- **Blog flow**: admin writes post (EN + NE) → sets published → public /blog lists it; `/blog/[slug]` renders localized fields per active locale.
- **Tracking flow**: dashboard tabs for Calories / Exercise / Sleep / Meditation; each persists per user; dashboard shows weekly summary.

## 8. Milestones
1. Monorepo scaffold + Prisma schema + auth ($ done)
2. Shared types, dictionary files, API routes ($ done)
3. Design system + landing page + static pages
4. Blog + videos + chatbot
5. Dashboard trackers + admin
6. Install deps, seed, build + verify, polish (security pass)

## 9. Open follow-ups (not in MVP)
- Deployment targets (Vercel + Render/Fly + managed Postgres)
- Email verification / password reset (needs SMTP)
- Mobile apps (PWA build of the web app)
- Payments/subscriptions
- LLM-backed chatbot upgrades