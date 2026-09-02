"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/provider";
import { tokenStore } from "@/lib/api";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  // check synchronously on mount + listen for storage changes so login immediately reflects
  const [authed, setAuthed] = useState(() => typeof window !== "undefined" && Boolean(tokenStore.get()));
  useEffect(() => {
    const check = () => setAuthed(Boolean(tokenStore.get()));
    check();
    window.addEventListener("storage", check);
    window.addEventListener("focus", check);
    return () => {
      window.removeEventListener("storage", check);
      window.removeEventListener("focus", check);
    };
  }, []);

  if (!authed) {
    return (
      <div className="neu mx-auto max-w-md p-8 text-center">
        <p className="text-3xl">🔒</p>
        <h3 className="mt-3 text-xl font-bold text-primary-dark">{t("dashboard.loginFirst")}</h3>
        <Link href="/login" className="btn-primary mt-5">
          {t("dashboard.goLogin")}
        </Link>
      </div>
    );
  }
  return <>{children}</>;
}