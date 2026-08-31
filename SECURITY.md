# ARUHEALTH — Security Document

Controls and threat model for the platform. Health data is **sensitive personal data** — treat with GDPR/PDPL-grade care.

## 1. Assets & risks
- **Assets**: user accounts (email + password), health logs (calorie/exercise/sleep/meditation), admin content.
- **Top risks**: account takeover, data exposure via broken auth, XSS via rich content, spam/brute force, and (legal) liability if content is mistaken for medical advice.

## 2. Authentication & sessions
- Passwords hashed with **bcrypt (12 rounds)**; never stored in plaintext.
- **JWT** access token signed with `JWT_SECRET`; expiry via `JWT_EXPIRES_IN` (default 7d for MVP).
- Dev note: MVP stores token in `localStorage`; before production move to **httpOnly, Secure, SameSite=Strict cookies** + refresh tokens (see §6).

## 3. Authorization
- `USER` vs `ADMIN` roles (string field, constants in `packages/shared`).
- Middleware reads the JWT, attaches `req.user`; admin routes enforce role.
- Every data route scopes queries to the authenticated user (`where: { userId }`).

## 4. Input & injection
- All request bodies validated with **zod** schemas before touching the DB.
- Prisma uses **parameterized queries** (no SQL injection surface).
- Rich-text post content sanitized on render; React escapes output by default.
- Rate limiting with `express-rate-limit` on auth + chat routes (spam/brute-force).

## 5. Transport & headers
- `helmet` sets security headers (CSP, X-Content-Type-Options, etc.).
- CORS restricted to `CORS_ORIGIN` (local `http://localhost:3000`).
- Production must run behind HTTPS (reverse proxy) — enforce HSTS there.

## 6. Production hardening checklist
- [ ] Login/refresh using httpOnly cookies; revoke refresh tokens server-side.
- [ ] Rotate `JWT_SECRET`; never commit secrets (`.env*` gitignored).
- [ ] PostgreSQL via docker-compose; `DATABASE_URL` from secrets manager.
- [ ] CSP as restrictive as content allows (Google Fonts + self + `api.aruhealth`).
- [ ] Audit role transitions; admin endpoints behind CSRF-safe (SameSite) cookies.
- [ ] Automated tests for auth + data isolation + rate limiting.

## 7. Privacy & compliance
- Store minimum PII; no IP logging of health data, no third-party trackers on dashboard pages.
- Provide privacy notice + data deletion request path.
- Include the standard disclaimer on all health content:
  > *"ARUHEALTH is for informational purposes only and does not provide medical advice, diagnosis, or treatment."*
- Chatbot: never emits diagnoses; **emergency intent** surfaces crisis/help resources and advises calling local emergency/health services.

## 8. Incident response (draft)
1. Revoke secrets, rotate keys.
2. Audit affected rows; notify impacted users.
3. Document timeline in `/docs/incidents`.

## 9. Dependencies
- `npm audit` on CI; keep Express/Next/Prisma patched.