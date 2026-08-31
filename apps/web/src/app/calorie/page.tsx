"use client";

import { useI18n } from "@/i18n/provider";
import CalorieTracker from "@/components/CalorieTracker";
import { SectionHeading } from "@/components/Sections";

export default function CaloriePage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 pb-16 pt-14 sm:px-6">
      <SectionHeading eyebrow="🍚" title={t("calorie.title")} subtitle={t("calorie.subtitle")} />
      <CalorieTracker />
    </div>
  );
}