"use client";

import { useEffect, useState } from "react";
import { useI18n, pickLang } from "@/i18n/provider";
import { http } from "@/lib/api";
import type { Testimonial } from "@aruhealth/shared";

export default function Testimonials() {
  const { t, lang } = useI18n();
  const [items, setItems] = useState<Testimonial[]>([]);

  useEffect(() => {
    http
      .get<{ testimonials: Testimonial[] }>("/testimonials")
      .then((r) => setItems(r.testimonials))
      .catch(() => setItems([]));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="mb-10 text-center">
        <span className="eyebrow">💬</span>
        <h2 className="text-3xl font-bold tracking-tight text-primary-dark sm:text-4xl">
          {t("testimonials.title")}
        </h2>
        <p className="mt-3 text-lg text-muted">{t("testimonials.subtitle")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <figure key={item.id} className="neu flex flex-col gap-4 p-6">
            <div className="text-sm leading-relaxed text-ink">
              " {pickLang(lang, item.quoteEn, item.quoteNe)} "
            </div>
            <div className="mt-auto flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft font-bold text-primary">
                {item.author.charAt(0)}
              </span>
              <div>
                <figcaption className="text-sm font-semibold text-primary-dark">{item.author}</figcaption>
                <p className="text-xs text-muted">
                  {item.role} · {"★".repeat(item.rating)}
                  <span className="text-muted/40">{"☆".repeat(5 - item.rating)}</span>
                </p>
              </div>
            </div>
          </figure>
        ))}
      </div>
      {items.length === 0 && (
        <p className="text-center text-muted">{t("common.loading")}</p>
      )}
    </section>
  );
}