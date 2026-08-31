"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/provider";
import { http } from "@/lib/api";
import type { ChatMessage, ChatResponse } from "@aruhealth/shared";

export default function ChatWidget() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "bot",
          text: t("chat.home"),
          quickReplies:
            lang === "ne"
              ? ["ध्यान कसरी गर्ने?", "क्यालोरी सुझाव", "राम्रो निद्रा", "व्यायाम विचार"]
              : ["How do I meditate?", "Calorie tips", "Sleep better", "Exercise ideas"],
        },
      ]);
    }
  }, [open, lang, messages.length, t]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    const clean = text.trim();
    if (!clean || busy) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: clean }]);
    setBusy(true);
    try {
      const res = await http.post<ChatResponse>("/chat", { message: clean, lang });
      setMessages((m) => [
        ...m,
        { role: "bot", text: res.reply, quickReplies: res.quickReplies ?? [] },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "⚠️ " + (lang === "ne" ? "सर्भरमा जडान भएन।" : "Server unreachable.") },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("chat.open")}
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white transition-all hover:-translate-y-0.5 ${
          open ? "rotate-90" : ""
        }`}
        style={{ background: "linear-gradient(135deg, #005EB8, #41B6E6)", boxShadow: "0 14px 28px -10px rgba(0,94,184,0.6)" }}
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[520px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-primary-soft bg-white shadow-lift">
          <div className="flex items-center gap-3 bg-gradient-to-br from-primary to-primary-bright px-4 py-3 text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg">🌿</span>
            <div className="flex-1">
              <p className="font-semibold leading-tight">{t("chat.title")}</p>
              <p className="text-xs text-white/80">{t("chat.subtitle")}</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full bg-white/20 px-2 py-1 text-xs"
              aria-label={t("chat.close")}
            >
              {t("chat.close")}
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
            <p className="rounded-xl bg-mist px-3 py-2 text-[11px] text-muted">
              {t("chat.disclaimer")}
            </p>
            {messages.map((m, i) => (
              <div key={i}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-primary-soft text-ink"
                      : "neu-sm"
                  }`}
                >
                  {m.text}
                </div>
                {m.role === "bot" && m.quickReplies && m.quickReplies.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {m.quickReplies.map((q) => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        className="rounded-full border border-primary/30 bg-primary-soft/60 px-2.5 py-1 text-xs font-medium text-primary transition hover:bg-primary-soft disabled:opacity-50"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {busy && <p className="neu-sm w-fit animate-pulse px-3 py-2 text-xs text-muted">…</p>}
          </div>

          <div className="border-t border-primary-soft p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chat.placeholder")}
                className="input-neu !rounded-full"
              />
              <button
                type="submit"
                disabled={busy}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #005EB8, #41B6E6)" }}
                aria-label="Send"
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}