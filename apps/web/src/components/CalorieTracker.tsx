"use client";

import { useCallback, useEffect, useState } from "react";
import { useI18n, pickLang } from "@/i18n/provider";
import { http } from "@/lib/api";
import { AuthGate } from "./AuthGate";

export default function CalorieTracker() {
  const { t, lang } = useI18n();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: number; name: string; nameNe: string; kcal: number; unit: string }[]>([]);
  const [selected, setSelected] = useState<{ id: number; name: string; nameNe: string; kcal: number; unit: string } | null>(null);
  const [qty, setQty] = useState(1);
  const [meal, setMeal] = useState("breakfast");
  const [logs, setLogs] = useState<{ id: number; foodName: string; qty: number; kcal: number; mealType: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [searchError, setSearchError] = useState("");
  const [searched, setSearched] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const load = useCallback(() => {
    http
      .get<{ logs: typeof logs }>(`/food-logs?date=${today}`)
      .then((r) => setLogs(r.logs))
      .catch((e) => {
        setLogs([]);
        if (e instanceof Error && e.message.includes("401")) setMessage("Please log in again - session expired.");
      });
  }, [today]);

  useEffect(load, [load]);

  const search = async () => {
    if (!query.trim()) return;
    setSearchError("");
    setSearched(false);
    try {
      const r = await http.get<{ foods: typeof results }>(`/foods?q=${encodeURIComponent(query)}`);
      setResults(r.foods);
      setSelected(null);
      setSearched(true);
    } catch (e) {
      setSearchError(e instanceof Error ? e.message : "Search failed");
      setResults([]);
    }
  };

  const add = async () => {
    if (!selected) return;
    setBusy(true);
    setMessage("");
    try {
      await http.post("/food-logs", { foodId: selected.id, qty, mealType: meal, date: today });
      load();
      setMessage("✓");
      setSelected(null);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "error");
    } finally {
      setBusy(false);
    }
  };

  const total = logs.reduce((s, l) => s + l.kcal, 0);

  return (
    <AuthGate>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="neu p-6">
          <h3 className="mb-4 text-lg font-semibold text-primary-dark">{t("calorie.logTitle")}</h3>
          <div className="flex gap-2">
            <input
              className="input-neu"
              placeholder={t("calorie.searchPlaceholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && void search()}
            />
            <button className="btn-primary !px-4" onClick={() => void search()}>
              {t("calorie.searchBtn")}
            </button>
          </div>

          {results.length > 0 && (
            <ul className="mt-3 max-h-44 space-y-1 overflow-y-auto">
              {results.map((f) => (
                <li key={f.id}>
                  <button
                    onClick={() => setSelected(f)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                      selected?.id === f.id ? "bg-primary-soft text-primary" : "hover:bg-mist"
                    }`}
                  >
                    <span>{pickLang(lang, f.name, f.nameNe || f.name)}</span>
                    <span className="text-muted">
                      {f.kcal} {t("calorie.calories")} / {f.unit}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {searchError && <p className="mt-3 text-sm text-red-600">{searchError}</p>}
          {searched && results.length === 0 && !searchError && (
            <p className="mt-3 text-sm text-muted">{t("calorie.searchEmpty")}</p>
          )}

          {selected && (
            <div className="mt-4 space-y-3 rounded-2xl border border-primary-soft bg-mist/60 p-4">
              <p className="font-semibold text-primary-dark">
                {pickLang(lang, selected.name, selected.nameNe || selected.name)}
              </p>
              <div className="flex flex-wrap gap-3">
                {(["breakfast", "lunch", "dinner", "snack"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMeal(m)}
                    className={`chip ${meal === m ? "bg-primary-soft text-primary" : "neu-sm text-muted"}`}
                  >
                    {t(`calorie.meal${m.charAt(0).toUpperCase()}${m.slice(1)}`)}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-muted">
                  {t("calorie.qtyLabel")}:
                  <input
                    type="number"
                    min={0.5}
                    step={0.5}
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="input-neu ml-2 !w-24"
                  />
                </label>
                <button onClick={() => void add()} disabled={busy} className="btn-primary !py-2.5">
                  {t("calorie.addBtn")}
                </button>
              </div>
              {message && <p className="text-sm text-sage">{message}</p>}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="neu p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted">{t("calorie.todayTotal")}</p>
                <p className="text-4xl font-extrabold text-primary">{total}</p>
                <p className="text-xs text-muted">{t("calorie.calories")}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted">{t("calorie.goal")}: {t("calorie.currentGoal")}</p>
                <div className="mt-2 h-3 w-40 overflow-hidden rounded-full bg-mist">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sage to-teal"
                    style={{ width: `${Math.min(100, (total / 2000) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="neu p-6">
            <h4 className="mb-3 font-semibold text-primary-dark">{t("calorie.historyTitle")}</h4>
            {logs.length === 0 ? (
              <p className="text-sm text-muted">{t("calorie.empty")}</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {logs.map((l) => (
                  <li key={l.id} className="flex items-center justify-between rounded-xl bg-mist px-3 py-2">
                    <span>
                      {l.foodName} × {l.qty}
                      <span className="ml-2 text-xs text-muted">{t(`calorie.meal${l.mealType.charAt(0).toUpperCase()}${l.mealType.slice(1)}`)}</span>
                    </span>
                    <span className="font-semibold text-primary">{l.kcal} kcal</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </AuthGate>
  );
}