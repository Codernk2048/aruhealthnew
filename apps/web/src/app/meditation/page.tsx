"use client";

import { useI18n } from "@/i18n/provider";
import BreathingSphere from "@/components/BreathingSphere";
import MeditationTracker from "@/components/MeditationTracker";
import { SectionHeading } from "@/components/Sections";
import { TIPS } from "@aruhealth/shared";

export default function MeditationPage() {
  const { t, lang } = useI18n();
  const tips = lang === "ne" ? TIPS.sleep.ne : TIPS.sleep.en;

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 pb-16 pt-14 sm:px-6">
      <SectionHeading eyebrow="🧘" title={t("meditation.title")} subtitle={t("meditation.subtitle")} />

      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="neu p-8">
          <BreathingSphere />
        </div>
        <div>
          <h3 className="mb-4 text-xl font-semibold text-primary-dark">{t("meditation.techniquesTitle")}</h3>
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="neu-sm p-5">
                <h4 className="font-semibold text-primary">{t(`meditation.techniques.${i}.title`)}</h4>
                <p className="mt-1 text-sm text-muted">{t(`meditation.techniques.${i}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="grid gap-8 lg:grid-cols-2">
        <MeditationTracker />
        <div>
          <h3 className="mb-4 text-xl font-semibold text-primary-dark">{t("meditation.tipsTitle")}</h3>
          <ul className="neu space-y-3 p-6">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink">
                <span className="text-sage">🌿</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}