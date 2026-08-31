"use client";

import { useI18n } from "@/i18n/provider";
import SleepTracker from "@/components/SleepTracker";
import { SectionHeading } from "@/components/Sections";
import { TIPS } from "@aruhealth/shared";

export default function SleepPage() {
  const { t, lang } = useI18n();
  const tips = lang === "ne" ? TIPS.sleep.ne : TIPS.sleep.en;

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 pb-16 pt-14 sm:px-6">
      <SectionHeading eyebrow="🌙" title={t("sleep.title")} subtitle={t("sleep.subtitle")} />

      <section className="grid gap-8 lg:grid-cols-2">
        <SleepTracker />
        <div>
          <h3 className="mb-4 text-xl font-semibold text-primary-dark">{t("sleep.tipsTitle")}</h3>
          <ul className="neu space-y-3 p-6">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink">
                <span className="text-primary-bright">🌙</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}