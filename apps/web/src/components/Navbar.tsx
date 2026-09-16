"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useI18n, type Lang } from "@/i18n/provider";
import { tokenStore } from "@/lib/api";

const NAV_KEYS = [
  "features",
  "meditation",
  "fitness",
  "sleep",
  "calorie",
  "blog",
  "videos",
] as const;

const MOBILE_KEYS = [...NAV_KEYS, "about", "contact"] as const;

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const check = () => setAuthed(Boolean(tokenStore.get()));
    check();
    window.addEventListener("storage", check);
    return () => window.removeEventListener("storage", check);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const links = useMemo(
    () =>
      NAV_KEYS.map((key) => ({
        key,
        href: key === "features" ? "/features" : `/${key}`,
        label: t(`nav.${key}`),
      })),
    [t],
  );

  const hrefFor = (key: string) =>
    key === "features" ? "/features" : `/${key}`;

  const logout = () => {
    tokenStore.clear();
    setAuthed(false);
    router.push("/");
  };

  const toggleLang = () => setLang(lang === "en" ? "ne" : "en");

  return (
    <header className="sticky top-0 z-40 border-b border-primary-soft bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="ARUHEALTH home">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-soft">
            <span className="text-xl">💙</span>
          </span>
          <span className="text-lg font-bold tracking-tight text-primary">
            ARU<span className="text-primary-dark">HEALTH</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                pathname.startsWith(hrefFor(l.key))
                  ? "bg-primary-soft text-primary"
                  : "text-ink/70 hover:text-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="neu-sm chip text-primary"
            aria-label="Switch language"
            title="EN · नेपाली"
          >
            <span>{lang === "en" ? "EN" : "नेपा"}</span>
            <span className="text-muted/50">|</span>
            <span>{lang === "en" ? "नेपा" : "EN"}</span>
          </button>

          <div className="hidden items-center gap-2 sm:flex">
            {authed ? (
              <>
                <Link href="/dashboard" className="btn-primary !px-4 !py-2 text-sm">
                  {t("nav.dashboard")}
                </Link>
                <button
                  onClick={logout}
                  className="neu-sm chip text-muted hover:text-primary"
                >
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="neu-sm chip text-muted hover:text-primary"
                >
                  {t("nav.login")}
                </Link>
                <Link href="/register" className="btn-primary !px-4 !py-2 text-sm">
                  {t("nav.register")}
                </Link>
              </>
            )}
          </div>

          <button
            className="neu-sm flex h-10 w-10 items-center justify-center text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-primary-soft bg-white px-4 pb-4 lg:hidden">
          <div className="grid gap-1 pt-3">
            {MOBILE_KEYS.map((key) => (
              <Link
                key={key}
                href={hrefFor(key)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-ink/80 hover:bg-primary-soft hover:text-primary"
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
            {authed ? (
              <>
                <Link href="/dashboard" className="rounded-xl px-3 py-2 text-sm font-semibold text-primary">
                  {t("nav.dashboard")}
                </Link>
                <button onClick={logout} className="rounded-xl px-3 py-2 text-left text-sm text-muted">
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <Link href="/login" className="rounded-xl px-3 py-2 text-sm font-semibold text-primary">
                {t("nav.login")} / {t("nav.register")}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
