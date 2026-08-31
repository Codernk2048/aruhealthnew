"use client";

import { useI18n } from "@/i18n/provider";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 ${center ? "mx-auto max-w-2xl text-center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-dark sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-lg leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}

export function useFeatureItems() {
  const { t } = useI18n();
  return [0, 1, 2, 3, 4, 5].map((i) => ({
    title: t(`features.items.${i}.title`),
    desc: t(`features.items.${i}.desc`),
  }));
}

export const FEATURE_EMOJI = ["🍚", "🏃", "🌙", "🧘", "🌐", "🤖"];