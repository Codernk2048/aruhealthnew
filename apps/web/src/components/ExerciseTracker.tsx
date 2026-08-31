"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18n, pickLang } from "@/i18n/provider";
import { http } from "@/lib/api";
import { AuthGate } from "./AuthGate";

interface Ex {
  id: number;
  name: string;
  nameNe: string;
  met: number;
}

export default function ExerciseTracker() {
  const { t, lang } = useI18n();
  const [exercises, setExercises] = useState<Ex[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [minutes, setMinutes] = useState(20);
  const [logs, setLogs] = useState<{ id: number; exerciseName: string; durationMin: number; kcal: number; date: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const load = useCallback(() => {
    http
      .get<{ logs: typeof logs }>("/exercise-logs")
      .then((r) => setLogs(r.logs.slice(0, 8)))
      .catch(() => setLogs([]));
  }, []);

  useEffect(() => {
    http.get<{ exercises: Ex[] }>("/exercises").then((r) => setExercises(r.exercises)).catch(() => setExercises([]));
  }, []);

  useEffect(load, [load]);

  const selected = exercises.find((e) => e.id === selectedId) ?? null;
  const estKcal = selected ? Math.round(selected.met * minutes) : 0;

  const add = async () => {
    if (!selected || minutes < 1) return;
    setBusy(true);
    try {
      await http.post("/exercise-logs", { exerciseId: selected.id, durationMin: minutes, date: today });
      load();
    } catch {
      /* noop */
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthGate>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="neu p-6">
          <h3 className="mb-2 text-lg font-semibold text-primary-dark">{t("fitness.trackerTitle")}</h3>
          <p className="mb-4 text-xs text-muted">{t("fitness.kcaltip")}</p>
          <label className="text-sm text-muted">{t("fitness.activityLabel")}</label>
          <select
            value={selectedId ?? ""}
            onChange={(e) => setSelectedId(e.target.value ? Number(e.target.value) : null)}
            className="input-neu mt-1"
          >
            <option value="">—</option>
            {exercises.map((e) => (
              <option key={e.id} value={e.id}>
                {pickLang(lang, e.name, e.nameNe || e.name)} (MET {e.met})
              </option>
            ))}
          </select>

          <label className="mt-4 block text-sm text-muted">
            {t("fitness.durationLabel")}
            <input
              type="number"
              min={1}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="input-neu mt-1"
            />
          </label>

          {selected && (
            <p className="mt-3 text-sm font-semibold text-teal">
              🔥 ≈ {estKcal} {t("calorie.calories")}
            </p>
          )}

          <button onClick={() => void add()} disabled={busy || !selected} className="btn-primary mt-5 w-full">
            {t("fitness.logBtn")}
          </button>
        </div>

        <div className="neu p-6">
          <h4 className="mb-3 font-semibold text-primary-dark">{t("fitness.historyTitle")}</h4>
          {logs.length === 0 ? (
            <p className="text-sm text-muted">{t("fitness.empty")}</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {logs.map((l) => (
                <li key={l.id} className="flex items-center justify-between rounded-xl bg-mist px-3 py-2">
                  <span>
                    {l.exerciseName} · {l.durationMin} {t("common.minutes")}
                  </span>
                  <span className="font-semibold text-primary">{l.kcal} kcal</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AuthGate>
  );
}