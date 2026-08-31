"use client";

import { useI18n } from "@/i18n/provider";

export default function Hero() {
  const { t, lang } = useI18n();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary-bright/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-6 pt-14 sm:px-6 lg:grid-cols-2 lg:pt-20">
        <div className="animate-fade-up">
          <span className="eyebrow">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-sage" />
            {t("hero.badge")}
          </span>
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-6xl">
            {t("hero.title1")}{" "}
            <span className="bg-gradient-to-r from-primary to-primary-bright bg-clip-text text-transparent">
              {t("hero.title2")}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#download" className="btn-primary">
              📲 {t("hero.ctaShop")}
            </a>
            <a href="/features" className="btn-ghost">
              {t("hero.ctaLearn")} →
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-8">
            {(["stat1", "stat2", "stat3"] as const).map((s) => (
              <div key={s}>
                <p className="text-2xl font-bold text-primary">{t(`hero.${s}`)}</p>
                <p className="text-sm text-muted">
                  {s === "stat1" && "🧘🍚🌙🏃"}
                  {s === "stat2" && "🇬🇧 · नेपाली"}
                  {s === "stat3" && "🌿"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm animate-floaty">
          <div className="neu rounded-[2rem] p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-primary-dark">{t("meditation.breath")}</p>
              <span className="chip bg-primary-soft text-primary">{lang === "en" ? "4-7-8" : "४-७-८"}</span>
            </div>
            <div className="relative mx-auto mt-6 flex h-52 w-52 items-center justify-center">
              <div className="absolute inset-0 animate-breathe rounded-full bg-primary-soft" />
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-bright text-white shadow-lift">
                <span className="text-sm font-semibold">
                  {lang === "en" ? "Inhale" : "सास लिनुहोस्"}
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {["🍚", "🌙", "🏃"].map((ic, i) => (
                <div key={i} className="neu-sm flex items-center gap-3 px-3 py-2 text-xs text-muted">
                  <span className="text-lg">{ic}</span>
                  <span>
                    {i === 0 && (lang === "en" ? `${t("calorie.todayTotal")}: 1,240 kcal` : `आजको कुल: १,२४० किलोकल`)}
                    {i === 1 && (lang === "en" ? `${t("dashboard.sleepAvg")}: 7.5 h` : `औसत निद्रा: ७.५ घन्टा`)}
                    {i === 2 && (lang === "en" ? `${t("dashboard.exerciseWeek")}: 120 ${t("common.minutes")}` : `यो हप्ताको गतिविधि: १२० मिनेट`)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="neu-sm absolute -left-6 -top-4 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary">
            🌿 {lang === "en" ? "Calm by design" : "शान्त डिजाइन"}
          </div>
          <div className="neu-sm absolute -bottom-4 -right-4 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-teal">
            🇳🇵 {lang === "en" ? "Bilingual" : "द्विभाषी"}
          </div>
        </div>
      </div>
    </section>
  );
}