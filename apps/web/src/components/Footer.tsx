"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";

export default function Footer() {
  const { t, lang } = useI18n();

  const product = [
    { key: "features", href: "/features" },
    { key: "meditation", href: "/meditation" },
    { key: "fitness", href: "/fitness" },
    { key: "sleep", href: "/sleep" },
    { key: "calorie", href: "/calorie" },
  ];
  const resources = [
    { key: "videos", href: "/videos" },
    { key: "blog", href: "/blog" },
    { key: "about", href: "/about" },
    { key: "contact", href: "/contact" },
  ];

  return (
    <footer className="mt-16 border-t border-primary-soft bg-white/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-soft text-lg">
                💙
              </span>
              <span className="font-bold text-primary">
                ARU<span className="text-primary-dark">HEALTH</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {t("footer.tagline")}
            </p>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted/80">
              {t("common.disclaimer")}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-primary-dark">{t("footer.product")}</h4>
            <ul className="space-y-2 text-sm">
              {product.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className="text-muted transition hover:text-primary">
                    {t(`nav.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-primary-dark">{t("footer.resources")}</h4>
            <ul className="space-y-2 text-sm">
              {resources.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className="text-muted transition hover:text-primary">
                    {t(`nav.${l.key}`)}
                  </Link>
                </li>
              ))}
              <li>
                <span className="text-muted">{t("footer.legal")}</span>
              </li>
            </ul>
            <p className="mt-4 text-sm font-medium text-primary-dark">
              {lang === "en" ? "🇬🇧 English · नेपाली" : "नेपाली · 🇬🇧 English"}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-primary-soft pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} ARUHEALTH. {t("footer.rights")}
          </p>
          <p>{t("footer.madeIn")}</p>
        </div>
      </div>
    </footer>
  );
}