"use client";

import { useI18n } from "@/i18n/provider";
import ExerciseTracker from "@/components/ExerciseTracker";
import { SectionHeading } from "@/components/Sections";

export default function FitnessPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 pb-16 pt-14 sm:px-6">
      <SectionHeading eyebrow="🏃" title={t("fitness.title")} subtitle={t("fitness.subtitle")} />

      <section>
        <h3 className="mb-4 text-xl font-semibold text-primary-dark">{t("fitness.planTitle")}</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="neu-sm p-5">
              <p className="text-sm font-bold text-primary">{t(`fitness.plan.${i}.day`)}</p>
              <p className="mt-2 text-sm text-muted">{t(`fitness.plan.${i}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <ExerciseTracker />
    </div>
  );
}