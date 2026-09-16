"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useI18n } from "@/i18n/provider";
import { http } from "@/lib/api";

export default function Footer() {
  const { t, lang } = useI18n();
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const subscribe = async (event: FormEvent) => {
    event.preventDefault();
    setNewsletterMessage(lang === "en" ? "Subscribing…" : "सदस्यता लिँदै…");
    try {
      await http.post("/newsletter/subscribe", { email });
      setEmail("");
      setNewsletterMessage(lang === "en" ? "You’re subscribed." : "तपाईंको सदस्यता सफल भयो।");
    } catch {
      setNewsletterMessage(lang === "en" ? "Please try again shortly." : "कृपया केही बेरपछि पुनः प्रयास गर्नुहोस्।");
    }
  };

  const product = [
    { key: "features", href: "/features" },
    { key: "meditation", href: "/meditation" },
    { key: "fitness", href: "/fitness" },
    { key: "sleep", href: "/sleep" },
    { key: "calorie", href: "/calorie" },
    { key: "shop", href: "/shop" },
  ];
  const resources = [
    { key: "videos", href: "/videos" },
    { key: "blog", href: "/blog" },
    { key: "about", href: "/about" },
    { key: "contact", href: "/contact" },
  ];

  return (
    <footer className="mt-16 border-t border-primary-soft bg-white/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-soft text-lg">
                💙
              </span>
              <span className="font-bold text-primary">
                ARU<span className="text-primary-dark">HEALTH</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {t("footer.tagline")}
            </p>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted/80">
              {t("common.disclaimer")}
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-primary-dark">{t("footer.product")}</h4>
            <ul className="space-y-2 text-sm">
              {product.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className="text-muted transition hover:text-primary">
                    {t(`nav.${l.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-primary-dark">{t("footer.resources")}</h4>
            <ul className="space-y-2 text-sm">
              {resources.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className="text-muted transition hover:text-primary">
                    {t(`nav.${l.key}`)}
                  </Link>
                </li>
              ))}
              <li>
                <span className="text-muted">{t("footer.legal")}</span>
              </li>
            </ul>
            <p className="mt-4 text-sm font-medium text-primary-dark">
              {lang === "en" ? "🇬🇧 English · नेपाली" : "नेपाली · 🇬🇧 English"}
            </p>
            <form onSubmit={subscribe} className="mt-5" aria-label="Newsletter subscription">
              <label htmlFor="newsletter-email" className="text-sm font-semibold text-primary-dark">
                {lang === "en" ? "Weekly health briefing" : "साप्ताहिक स्वास्थ्य जानकारी"}
              </label>
              <div className="mt-2 flex gap-2">
                <input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="min-w-0 flex-1 rounded-xl border border-primary-soft bg-white px-3 py-2 text-sm outline-none focus:border-primary" />
                <button type="submit" className="btn-primary !px-3 !py-2 text-sm">
                  {lang === "en" ? "Join" : "जोडिनुहोस्"}
                </button>
              </div>
              <p className="mt-2 min-h-5 text-xs text-muted" aria-live="polite">{newsletterMessage}</p>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-primary-soft pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} ARUHEALTH. {t("footer.rights")}
          </p>
          <p>{t("footer.madeIn")}</p>
        </div>
      </div>
    </footer>
  );
}
