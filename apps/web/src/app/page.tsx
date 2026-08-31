"use client";

import { useI18n } from "@/i18n/provider";
import Hero from "@/components/Hero";
import AppCTA from "@/components/AppCTA";
import Testimonials from "@/components/Testimonials";
import { SectionHeading, useFeatureItems, FEATURE_EMOJI } from "@/components/Sections";

function FeatureGrid() {
  const items = useFeatureItems();
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((f, i) => (
        <div key={i} className="neu group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-2xl transition group-hover:scale-110">
            {FEATURE_EMOJI[i]}
          </span>
          <h3 className="mt-4 text-lg font-semibold text-primary-dark">{f.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}

function HowItWorks() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <SectionHeading
        eyebrow="🌱"
        title={t("landing.howTitle")}
        subtitle={t("landing.howSubtitle")}
      />
      <div className="grid gap-6 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="neu-sm relative p-6">
            <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-bright text-sm font-bold text-white">
              {i + 1}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-primary-dark">
              {t(`landing.steps.${i}.title`)}
            </h3>
            <p className="mt-2 text-sm text-muted">{t(`landing.steps.${i}.desc`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatsBand() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="neu rounded-[2rem] p-8 text-center">
        <h3 className="text-xl font-bold text-primary-dark">{t("stats.title")}</h3>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">{t("stats.subtitle")}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="neu-sm p-5">
              <p className="text-3xl font-extrabold text-primary">{t(`stats.items.${i}.value`)}</p>
              <p className="mt-1 text-sm text-muted">{t(`stats.items.${i}.label`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { t } = useI18n();
  return (
    <>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="✨"
          title={t("features.title")}
          subtitle={t("features.subtitle")}
        />
        <FeatureGrid />
      </section>
      <StatsBand />
      <HowItWorks />
      <Testimonials />
      <AppCTA />
      <p className="mx-auto max-w-2xl px-4 pb-10 text-center text-xs text-muted/80">
        {t("common.disclaimer")}
      </p>
    </>
  );
}