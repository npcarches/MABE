"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from "react";
import { vi, type Messages } from "./vi";
import { en } from "./en";

export type Lang = "vi" | "en";

/** localStorage key; same as the previous static site so returning visitors keep their choice. */
export const LANG_STORAGE_KEY = "mabe-lang";

const MESSAGES: Record<Lang, Messages> = { vi, en };

interface I18n {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** All text of the site in the current language (see src/i18n/vi.ts). */
  m: Messages;
  /** Format a VND amount for the current language: "600.000đ" / "600,000 VND". */
  vnd: (n: number) => string;
}

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  // Static export renders Vietnamese; the stored choice is applied after hydration.
  const [lang, setLangState] = useState<Lang>("vi");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(LANG_STORAGE_KEY);
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only state, unknown during static render
    if (stored === "en") setLangState("en");
    else document.documentElement.classList.remove("i18n-pending");
  }, []);

  // Layout effect: runs before paint, so the page is revealed only once English text is in the DOM.
  useLayoutEffect(() => {
    document.documentElement.lang = lang;
    if (lang === "en") document.documentElement.classList.remove("i18n-pending");
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {}
  }, []);

  const value = useMemo<I18n>(() => {
    const format = new Intl.NumberFormat(lang === "en" ? "en-US" : "vi-VN");
    const vnd = (n: number) => format.format(Math.round(n)) + (lang === "en" ? " VND" : "đ");
    return { lang, setLang, m: MESSAGES[lang], vnd };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
