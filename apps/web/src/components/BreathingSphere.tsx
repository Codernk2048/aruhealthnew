"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/provider";

const PHASES = [
  { key: "inhale", seconds: 4 },
  { key: "hold", seconds: 4 },
  { key: "exhale", seconds: 4 },
] as const;

export default function BreathingSphere() {
  const { t } = useI18n();
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [remaining, setRemaining] = useState<number>(PHASES[0].seconds);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!running) return;
    const phase = PHASES[phaseIdx];
    setRemaining(phase.seconds);

    const tick = () => {
      setRemaining((r) => {
        if (r <= 1) {
          setPhaseIdx((i) => (i + 1) % PHASES.length);
          return 0;
        }
        return r - 1;
      });
    };

    // trigger next phase update logic via interval
    timer.current = setInterval(tick, 1000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [running, phaseIdx]);

  const phase = PHASES[phaseIdx];
  const scale = phase.key === "inhale" ? 1 : phase.key === "hold" ? 1.08 : 0.8;

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex h-64 w-64 items-center justify-center"
        role="img"
        aria-label={`${t(`meditation.${phase.key}`)} ${remaining}`}
      >
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-soft to-white shadow-neu"
          style={{ transform: `scale(${scale})`, transition: "transform 1s ease-in-out" }}
        />
        <div
          className="absolute inset-6 rounded-full bg-gradient-to-br from-primary to-primary-bright opacity-20"
          style={{ transition: "transform 1s ease-in-out" }}
        />
        <div className="relative z-10 text-center text-white">
          <p className="text-5xl font-extrabold drop-shadow">{remaining}</p>
        </div>
      </div>

      <p className="mt-4 text-xl font-semibold text-primary-dark">
        {t(`meditation.${phase.key}`)}
      </p>
      <p className="text-sm text-muted">
        {running
          ? `${t("meditation.cycle")} · ${PHASES.join("/")}`
          : `${PHASES.map((p) => t(`meditation.${p.key}`)).join(" · ")}`}
      </p>

      <button
        onClick={() => {
          if (running) {
            setRunning(false);
            if (timer.current) clearInterval(timer.current);
            setPhaseIdx(0);
            setRemaining(PHASES[0].seconds);
          } else {
            setRunning(true);
          }
        }}
        className={`${running ? "btn-ghost" : "btn-primary"} mt-6`}
      >
        {running ? `⏸ ${t("meditation.stopBtn")}` : `▶ ${t("meditation.startBtn")}`}
      </button>
    </div>
  );
}