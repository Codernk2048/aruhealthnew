"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/provider";
import { http, tokenStore, ApiClientError } from "@/lib/api";
import CalorieTracker from "@/components/CalorieTracker";
import ExerciseTracker from "@/components/ExerciseTracker";
import SleepTracker from "@/components/SleepTracker";
import MeditationTracker from "@/components/MeditationTracker";
import { SectionHeading } from "@/components/Sections";
import type { DashboardStats } from "@aruhealth/shared";

type Tab = "calories" | "exercise" | "sleep" | "meditation";

export default function DashboardPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [tab, setTab] = useState<Tab>("calories");

  useEffect(() => {
    if (!tokenStore.get()) {
      router.replace("/login");
      return;
    }
    http
      .get<DashboardStats>("/stats/dashboard")
      .then(setStats)
      .catch((e) => {
        if (e instanceof ApiClientError && e.status === 401) router.replace("/login");
      });
  }, [router]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "calories", label: t("dashboard.tabCalories") },
    { key: "exercise", label: t("dashboard.tabExercise") },
    { key: "sleep", label: t("dashboard.tabSleep") },
    { key: "meditation", label: t("dashboard.tabMeditation") },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 pb-16 pt-12 sm:px-6">
      <SectionHeading eyebrow="📊" title={t("dashboard.title")} subtitle={t("dashboard.subtitle")} />

      {!stats ? (
        <p className="text-center text-muted">{t("common.loading")}</p>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="neu p-5">
              <p className="text-sm text-muted">{t("dashboard.kcalToday")}</p>
              <p className="mt-1 text-3xl font-extrabold text-primary">{stats.todayKcal}</p>
              <p className="text-xs text-muted">{t("dashboard.kcalGoal")}: {stats.dailyKcalGoal}</p>
            </div>
            <div className="neu p-5">
              <p className="text-sm text-muted">{t("dashboard.exerciseWeek")}</p>
              <p className="mt-1 text-3xl font-extrabold text-teal">
                {stats.weeklyExerciseMin} <span className="text-base">{t("common.minutes")}</span>
              </p>
              <p className="text-xs text-muted">≈ {stats.weeklyExerciseKcal} kcal</p>
            </div>
            <div className="neu p-5">
              <p className="text-sm text-muted">{t("dashboard.sleepAvg")}</p>
              <p className="mt-1 text-3xl font-extrabold text-primary-dark">{stats.avgSleepHours} h</p>
              <p className="text-xs text-muted">{t("dashboard.thisWeek")}</p>
            </div>
            <div className="neu p-5">
              <p className="text-sm text-muted">{t("dashboard.meditationWeek")}</p>
              <p className="mt-1 text-3xl font-extrabold text-sage">
                {stats.meditationThisWeek} <span className="text-base">{t("common.minutes")}</span>
              </p>
              <p className="text-xs text-muted">🧘</p>
            </div>
          </div>

          <div className="neu p-6">
            <h3 className="mb-4 font-semibold text-primary-dark">{t("dashboard.weekLabel")}</h3>
            <div className="flex h-40 items-end gap-3">
              {stats.last7Days.map((d) => (
                <div
                  key={d.date}
                  className="group flex flex-1 flex-col items-center gap-1"
                  title={`${d.date} · ${d.kcal} kcal · ${d.exerciseMin} min · ${d.sleepHours ?? "-"} h`}
                >
                  <div className="flex w-full flex-1 items-end rounded-lg bg-mist">
                    <div
                      className="w-full rounded-lg bg-gradient-to-t from-primary to-primary-bright opacity-80 transition group-hover:opacity-100"
                      style={{ height: `${Math.min(100, (d.kcal / 2500) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted">
                    {new Date(d.date + "T00:00:00").toLocaleDateString(undefined, { weekday: "short" })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tabs.map((tb) => (
              <button
                key={tb.key}
                onClick={() => setTab(tb.key)}
                className={`chip ${tab === tb.key ? "bg-primary-soft text-primary" : "neu-sm text-muted"}`}
              >
                {tb.label}
              </button>
            ))}
          </div>

          <div className="animate-fade-up" key={tab}>
            {tab === "calories" && <CalorieTracker />}
            {tab === "exercise" && <ExerciseTracker />}
            {tab === "sleep" && <SleepTracker />}
            {tab === "meditation" && <MeditationTracker />}
          </div>
        </>
      )}
    </div>
  );
}