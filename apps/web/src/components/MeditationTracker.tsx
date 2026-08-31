"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18n, pickLang } from "@/i18n/provider";
import { http } from "@/lib/api";
import { MEDITATION_TECHNIQUES } from "@aruhealth/shared";
import { AuthGate } from "./AuthGate";

export default function MeditationTracker() {
  const { t, lang } = useI18n();
  const [minutes, setMinutes] = useState(5);
  const [technique, setTechnique] = useState(0);
  const [logs, setLogs] = useState<{ id: number; minutes: number; technique: string; date: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const load = useCallback(() => {
    http
      .get<{ logs: typeof logs }>("/meditation")
      .then((r) => setLogs(r.logs.slice(0, 8)))
      .catch(() => setLogs([]));
  }, []);

  useEffect(load, [load]);

  const add = async () => {
    setBusy(true);
    try {
      await http.post("/meditation", {
        minutes,
        technique: pickLang(lang, MEDITATION_TECHNIQUES[technique].en, MEDITATION_TECHNIQUES[technique].ne),
        date: today,
      });
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
          <h3 className="mb-4 text-lg font-semibold text-primary-dark">{t("meditation.trackerTitle")}</h3>
          <label className="block text-sm text-muted">
            {t("meditation.sessionLabel")} · {minutes} {t("common.minutes")}
            <input
              type="range"
              min={1}
              max={60}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </label>

          <label className="mt-4 block text-sm text-muted">
            {t("meditation.techniqueLabel")}
            <select value={technique} onChange={(e) => setTechnique(Number(e.target.value))} className="input-neu mt-1">
              {MEDITATION_TECHNIQUES.map((mt, i) => (
                <option key={i} value={i}>
                  {pickLang(lang, mt.en, mt.ne)}
                </option>
              ))}
            </select>
          </label>

          <button onClick={() => void add()} disabled={busy} className="btn-primary mt-5 w-full">
            {t("meditation.logBtn")}
          </button>
        </div>

        <div className="neu p-6">
          <h4 className="mb-3 font-semibold text-primary-dark">{t("dashboard.tabMeditation")}</h4>
          {logs.length === 0 ? (
            <p className="text-sm text-muted">{t("dashboard.noData")}</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {logs.map((l) => (
                <li key={l.id} className="flex items-center justify-between rounded-xl bg-mist px-3 py-2">
                  <span>
                    {l.technique} · {l.date}
                  </span>
                  <span className="font-semibold text-primary">
                    {l.minutes} {t("common.minutes")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AuthGate>
  );
}