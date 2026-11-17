"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/i18n-provider";

/** How long the status message stays visible. */
const NOTE_MS = 3000;

/** Copy for browsers without the async Clipboard API (or when it is blocked). */
function fallbackCopy(text: string): boolean {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {}
  document.body.removeChild(ta);
  return ok;
}

/** Email row with "copy" and "send" buttons plus a live status message. */
export function CopyEmail({ email }: { email: string }) {
  const { m } = useI18n();
  // Which message to show (looked up at render, so it follows the language), plus a counter so
  // repeated clicks restart the hide timer.
  const [note, setNote] = useState<{ ok: boolean; n: number } | null>(null);

  useEffect(() => {
    if (!note) return;
    const id = setTimeout(() => setNote(null), NOTE_MS);
    return () => clearTimeout(id);
  }, [note]);

  const copy = async () => {
    let ok = true;
    try {
      // Throws when the Clipboard API is missing or blocked.
      await navigator.clipboard.writeText(email);
    } catch {
      ok = fallbackCopy(email);
    }
    setNote((prev) => ({ ok, n: (prev?.n ?? 0) + 1 }));
  };

  return (
    <>
      <div style={{ marginTop: 20 }}>
        <div className="person multi">
          <div>
            <b>Email</b>
            <span>{email}</span>
          </div>
          <div className="btn-row">
            <button className="btn line" type="button" onClick={copy}>
              {m.contact.copy}
            </button>
            <a className="btn" href={`mailto:${email}`}>
              {m.contact.send}
            </a>
          </div>
        </div>
      </div>
      <p className="copy-note" role="status" aria-live="polite">
        {note ? (note.ok ? m.contact.copied : m.contact.copyFailed) : ""}
      </p>
    </>
  );
}
