"use client";

import type { ReactNode } from "react";
import { useI18n } from "@/i18n/i18n-provider";
import { EMAIL, INSTAGRAM, MAIN_ZALO, PEOPLE } from "@/data/contact";

/** `logo` is rendered by the (server) layout so its SVG stays out of the client bundle. */
export function SiteFooter({ logo }: { logo: ReactNode }) {
  const { m } = useI18n();
  return (
    <>
      <footer>
        <div className="wrap foot">
          <div className="f-logo-row">{logo}</div>
          <div className="f-row">
            <div className="f-col">
              <span>{m.footer.tagline}</span>
            </div>
            <div className="f-col">
              {PEOPLE.map((p) => (
                <span key={p.phone}>{`Zalo: ${p.phone} (${p.name})`}</span>
              ))}
            </div>
            <div className="f-col">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <a href={INSTAGRAM.url} target="_blank" rel="noopener">
                IG: {INSTAGRAM.handle}
              </a>
            </div>
          </div>
        </div>
      </footer>
      <a className="sticky-zalo" href={MAIN_ZALO}>
        Zalo
      </a>
    </>
  );
}
