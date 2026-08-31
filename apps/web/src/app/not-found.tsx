"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/provider";

export default function NotFoundPage() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center">
      <p className="text-6xl">😴</p>
      <h1 className="mt-6 text-3xl font-bold text-primary-dark">{t("notFound.title")}</h1>
      <p className="mt-3 text-muted">{t("notFound.message")}</p>
      <Link href="/" className="btn-primary mt-8">
        {t("notFound.home")}
      </Link>
    </div>
  );
}