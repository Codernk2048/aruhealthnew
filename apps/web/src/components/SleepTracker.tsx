"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/i18n/provider";
import { http } from "@/lib/api";
import { AuthGate } from "./AuthGate";

export default function SleepTracker() {
  const { t, lang } = useI18n();
  const [hours, setHours] = useState(7);
  const [quality, setQuality] = useState<"poor" | "fair" | "good">("good");
  const [notes, setNotes] = useState("");
  const [logs, setLogs] = useState<{ id: number; hours: number; quality: string; notes: string | null; date: string }[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const load = useCallback(() => {
    http
      .get<{ logs: typeof logs }>("/sleep")
      .then((r) => setLogs(r.logs.slice(0, 8)))
      .catch(() => setLogs([]));
  }, []);

  useEffect(load, [load]);

  const save = async () => {
    setBusy(true);
    try {
      await http.post("/sleep", { hours, quality, notes: notes || undefined, date: today });
      setMessage("✓");
      load();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "error");
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthGate>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="neu p-6">
          <h3 className="mb-4 text-lg font-semibold text-primary-dark">{t("sleep.trackerTitle")}</h3>
          <label className="block text-sm text-muted">
            {t("sleep.hoursLabel")} · {hours} h
            <input
              type="range"
              min={3}
              max={12}
              step={0.5}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </label>

          <p className="mt-4 text-sm text-muted">{t("sleep.qualityLabel")}</p>
          <div className="mt-2 flex gap-2">
            {(["good", "fair", "poor"] as const).map((q) => (
              <button
                key={q}
                onClick={() => setQuality(q)}
                className={`chip ${quality === q ? "bg-primary-soft text-primary" : "neu-sm text-muted"}`}
              >
                {q === "good" ? "😌" : q === "fair" ? "😐" : "😫"} {t(`sleep.quality${q.charAt(0).toUpperCase()}${q.slice(1)}`)}
              </button>
            ))}
          </div>

          <label className="mt-4 block text-sm text-muted">
            {t("sleep.notesLabel")}
            <input value={notes} onChange={(e) => setNotes(e.target.value)} className="input-neu mt-1" />
          </label>

          <button onClick={() => void save()} disabled={busy} className="btn-primary mt-5 w-full">
            {t("sleep.logBtn")}
          </button>
          {message && <p className="mt-2 text-sm text-sage">{message}</p>}
        </div>

        <div className="neu p-6">
          <h4 className="mb-3 font-semibold text-primary-dark">{t("sleep.historyTitle")}</h4>
          {logs.length === 0 ? (
            <p className="text-sm text-muted">{t("dashboard.noData")}</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {logs.map((l) => (
                <li key={l.id} className="flex items-center justify-between rounded-xl bg-mist px-3 py-2">
                  <span>
                    {l.date} · {t(`sleep.quality${l.quality.charAt(0).toUpperCase()}${l.quality.slice(1)}`)}
                  </span>
                  <span className="font-semibold text-primary">{l.hours} h</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AuthGate>
  );
}