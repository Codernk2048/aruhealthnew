"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/provider";
import { http, tokenStore, ApiClientError } from "@/lib/api";
import type { AuthPayload } from "@aruhealth/shared";

export default function LoginPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await http.post<AuthPayload>("/auth/login", { email, password });
      tokenStore.set(res.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : t("auth.errorMsg"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <div className="neu p-8">
        <span className="eyebrow">💙</span>
        <h1 className="text-2xl font-bold text-primary-dark">{t("auth.loginTitle")}</h1>
        <p className="mt-1 text-sm text-muted">{t("auth.loginSub")}</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-muted">
            {t("auth.email")}
            <input type="email" required className="input-neu mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block text-sm font-medium text-muted">
            {t("auth.password")}
            <input type="password" required className="input-neu mt-1" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <p className="rounded-xl bg-rose/20 px-3 py-2 text-sm text-primary-dark">{error}</p>}
          <button type="submit" disabled={busy} className="btn-primary w-full">
            {busy ? "…" : t("auth.loginBtn")}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted">
          <Link href="/register" className="font-semibold text-primary hover:underline">
            {t("auth.noAccount")}
          </Link>
        </p>
      </div>
    </div>
  );
}