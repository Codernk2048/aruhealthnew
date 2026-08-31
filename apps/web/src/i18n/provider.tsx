"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { en } from "./en";
import { ne } from "./ne";

export type Lang = "en" | "ne";
const COOKIE = "aru_lang";

function readLang(): Lang {
  if (typeof window === "undefined") return "en";
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  return match && match[1] === "ne" ? "ne" : "en";
}

function resolve(dict: Record<string, unknown>, path: string): string {
  let node: unknown = dict;
  for (const part of path.split(".")) {
    if (node && typeof node === "object" && part in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[part];
    } else {
      return path;
    }
  }
  return typeof node === "string" ? node : path;
}

interface I18nCtx {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (path: string) => string;
}

const Ctx = createContext<I18nCtx>({
  lang: "en",
  setLang: () => undefined,
  t: (p) => p,
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [hydrated, setHydrated] = useState(false);

  useMemo(() => {
    if (!hydrated) {
      setLangState(readLang());
      setHydrated(true);
    }
  }, [hydrated]);

  const setLang = useCallback((l: Lang) => {
    document.cookie = `${COOKIE}=${l}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setLangState(l);
  }, []);

  const t = useCallback(
    (path: string) => resolve((lang === "ne" ? ne : en) as unknown as Record<string, unknown>, path),
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  return useContext(Ctx);
}

export function pickLang<T>(lang: Lang, enVal: T, neVal: T): T {
  return lang === "ne" ? neVal : enVal;
}