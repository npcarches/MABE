"use client";

import { useI18n, type Lang } from "@/i18n/i18n-provider";
import { Segmented } from "./segmented";

const LANGS = [
  { id: "vi", label: "VI" },
  { id: "en", label: "EN" },
] as const satisfies readonly { id: Lang; label: string }[];

export function LangToggle() {
  const { lang, setLang, m } = useI18n();
  return <Segmented className="lang" label={m.common.language} options={LANGS} value={lang} onChange={setLang} />;
}
