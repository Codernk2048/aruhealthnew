"use client";

import { useI18n } from "@/i18n/provider";
import { SectionHeading, useFeatureItems, FEATURE_EMOJI } from "@/components/Sections";
import AppCTA from "@/components/AppCTA";

export default function FeaturesPage() {
  const { t } = useI18n();
  const items = useFeatureItems();

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6">
        <SectionHeading eyebrow="✨" title={t("features.title")} subtitle={t("features.subtitle")} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <div key={i} className="neu p-6 transition hover:-translate-y-1 hover:shadow-lift">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-2xl">
                {FEATURE_EMOJI[i]}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-primary-dark">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <AppCTA />
    </>
  );
}