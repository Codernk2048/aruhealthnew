"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";
import { tokenStore } from "@/lib/api";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { t } = useI18n();
  const authed = typeof window !== "undefined" && Boolean(tokenStore.get());

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