"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/provider";
import { SectionHeading } from "@/components/Sections";

export default function ContactPage() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:hello@aruhealth.com?subject=${encodeURIComponent(
      `[ARUHEALTH] message from ${name}`,
    )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-14 sm:px-6">
      <SectionHeading
        eyebrow="💌"
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
      />

      <form onSubmit={submit} className="neu space-y-4 p-8">
        <label className="block text-sm font-medium text-muted">
          {t("contact.name")}
          <input required className="input-neu mt-1" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-muted">
          {t("contact.email")}
          <input required type="email" className="input-neu mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block text-sm font-medium text-muted">
          {t("contact.message")}
          <textarea required rows={5} className="input-neu mt-1" value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <button type="submit" className="btn-primary w-full">
          {t("contact.send")} ✉
        </button>
        {sent && <p className="text-center text-sm text-sage">{t("contact.sent")}</p>}
        <p className="text-center text-xs text-muted/70">{t("contact.note")}</p>
      </form>
    </div>
  );
}