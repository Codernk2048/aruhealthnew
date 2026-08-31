"use client";

import { useI18n } from "@/i18n/provider";
import Testimonials from "@/components/Testimonials";
import { SectionHeading } from "@/components/Sections";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-5xl space-y-14 px-4 pb-16 pt-14 sm:px-6">
      <SectionHeading eyebrow="💙" title={t("about.title")} subtitle={t("about.subtitle")} />

      <div className="neu space-y-4 p-8 text-lg leading-relaxed text-ink">
        {[0, 1, 2].map((i) => (
          <p key={i}>{t(`about.paragraphs.${i}`)}</p>
        ))}
      </div>

      <section>
        <h3 className="mb-6 text-2xl font-bold text-primary-dark">{t("about.valuesTitle")}</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="neu-sm flex gap-4 p-5">
              <span className="text-2xl">{["🌿", "🔒", "🌐", "🤝"][i]}</span>
              <div>
                <h4 className="font-semibold text-primary-dark">{t(`about.values.${i}.title`)}</h4>
                <p className="mt-1 text-sm text-muted">{t(`about.values.${i}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />
    </div>
  );
}