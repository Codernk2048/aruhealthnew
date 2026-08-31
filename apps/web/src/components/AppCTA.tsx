"use client";

import { useI18n } from "@/i18n/provider";

export default function AppCTA() {
  const { t, lang } = useI18n();

  return (
    <section id="download" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="neu relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-bright/10 blur-3xl" />
        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight text-primary-dark sm:text-4xl">
              {t("appCta.title")}
            </h2>
            <p className="mt-3 text-lg text-muted">{t("appCta.subtitle")}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-white transition hover:-translate-y-0.5"
            >
              <span className="text-2xl">▷</span>
              <span>
                <span className="block text-[11px] leading-tight text-white/70">Get it on</span>
                <span className="text-base font-semibold">{t("appCta.android")}</span>
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-white transition hover:-translate-y-0.5"
            >
              <span className="text-2xl"></span>
              <span>
                <span className="block text-[11px] leading-tight text-white/70">Download on the</span>
                <span className="text-base font-semibold">{t("appCta.ios")}</span>
              </span>
            </a>
          </div>
        </div>
        <p className="relative mt-6 text-sm text-muted">
          {lang === "en" ? "💡 " : "💡 "}
          {t("appCta.pwa")}
        </p>
      </div>
    </section>
  );
}