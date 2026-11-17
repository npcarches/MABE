"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/i18n-provider";
import { href } from "@/data/routes";
import { PACKAGES } from "@/data/pricing";
import { Img } from "@/components/img";
import { LegacyHashRedirect } from "@/components/legacy-hash-redirect";

/** Hero mosaic: two columns of [image key, tall?]. Alt text comes from the messages (alt.*). */
const MOSAIC = [
  [["lb-1-1", true], ["lb-2-2", false]],
  [["lb-3-3", false], ["lb-4-1", true]],
] as const;

const GALLERY = ["lb-1-1", "lb-1-2", "lb-2-1", "lb-2-2", "lb-3-1", "lb-3-2", "lb-4-1", "lb-4-2", "lb-1-3", "lb-2-3", "lb-3-4", "lb-4-3"] as const;

const SERVICE_STRIPS = {
  look: ["look-lrc-12", "look-em-15", "look-lrc-17"],
  cat: ["cat-xanh-nhat", "cat-hop-hong", "cat-tui-pema"],
} as const;

const TEASERS = [
  { key: "lookStandard", pkg: PACKAGES.look.standard, service: "look" },
  { key: "lookAdvanced", pkg: PACKAGES.look.advanced, service: "look" },
  { key: "catStandard", pkg: PACKAGES.cat.standard, service: "cat" },
  { key: "catAdvanced", pkg: PACKAGES.cat.advanced, service: "cat" },
] as const;

export default function HomePage() {
  const { m, vnd } = useI18n();
  const h = m.home;
  const perUnit = { look: m.common.perLook, cat: m.common.perSku };

  return (
    <>
      <title>{h.title}</title>
      <LegacyHashRedirect />
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>{h.hero.heading}</h1>
            <p className="lead">{h.hero.lead}</p>
            <div className="cta-row">
              <Link className="btn" href={href("bang-gia")}>
                {m.common.viewPricing}
              </Link>
              <Link className="btn line" href={href("lien-he")}>
                {m.common.bookShoot}
              </Link>
            </div>
            <ul className="perks">
              {h.hero.perks.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mosaic">
              {MOSAIC.map((col, i) => (
                <div className="col" key={i}>
                  {col.map(([k, tall]) => (
                    <div className={tall ? "ph tall" : "ph"} key={k}>
                      <Img k={k} alt={m.alt[k]} sizes="(max-width: 960px) 50vw, 300px" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="tagline">{h.lookbookCaption}</p>
          </div>
        </div>
      </section>

      <section className="block soft">
        <div className="wrap">
          <div className="sec-head">
            <h2>{h.services.heading}</h2>
            <p className="muted">{h.services.sub}</p>
          </div>
          <div className="svc-grid">
            {(["look", "cat"] as const).map((s) => {
              const svc = h.services[s];
              return (
                <article className="svc" key={s}>
                  <div className="strip">
                    {SERVICE_STRIPS[s].map((k) => (
                      <div className="ph" key={k}>
                        <Img k={k} alt={m.alt[k]} sizes="(max-width: 960px) 33vw, 200px" lazy />
                      </div>
                    ))}
                  </div>
                  <h3>{svc.title}</h3>
                  <p className="muted">{svc.body}</p>
                  <ul>
                    {svc.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div className="row">
                    <span className="from">
                      {m.common.from} <b>{vnd(PACKAGES[s].standard.price)}</b> {perUnit[s]}
                    </span>
                    <Link className="btn line small" href={href("bang-gia")}>
                      {svc.cta}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head">
            <h2>{h.values.heading}</h2>
          </div>
          <div className="val-grid">
            {h.values.items.map((v) => (
              <div className="val" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block soft">
        <div className="wrap">
          <div className="sec-head">
            <h2>{h.gallery.heading}</h2>
            <p className="muted">{h.gallery.sub}</p>
          </div>
          <div className="gal">
            {GALLERY.map((k) => (
              <div className="ph" key={k}>
                <Img k={k} alt={m.alt[k]} sizes="(max-width: 960px) 50vw, 300px" lazy />
              </div>
            ))}
          </div>
          <p className="tagline">{h.lookbookCaption}</p>
          <p style={{ marginTop: 24 }}>
            <Link className="btn" href={href("du-an")}>
              {h.gallery.cta}
            </Link>
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="sec-head">
            <h2>{h.prices.heading}</h2>
            <p className="muted">{h.prices.sub}</p>
          </div>
          <div className="teaser">
            {TEASERS.map((z) => (
              <div className="tz" key={z.key}>
                <small>{h.prices[z.key].label}</small>
                <div className="p">
                  {vnd(z.pkg.price)} <span>{perUnit[z.service]}</span>
                </div>
                <p>{h.prices[z.key].text}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 24 }}>
            <Link className="btn" href={href("bang-gia")}>
              {h.prices.cta}
            </Link>
          </p>
        </div>
      </section>

      <section className="block soft">
        <div className="wrap">
          <div className="sec-head">
            <h2>{h.phases.heading}</h2>
          </div>
          <div className="phases">
            {h.phases.items.map((p) => (
              <div key={p.title}>
                {p.title}
                <small>{p.sub}</small>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 28 }}>
            <Link className="btn line" href={href("quy-trinh")}>
              {h.phases.cta}
            </Link>
          </p>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>{h.cta.heading}</h2>
              <p>{h.cta.body}</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn" href={href("lien-he")}>
                {m.common.bookShoot}
              </Link>
              <Link className="btn line" href={href("bang-gia")}>
                {m.common.viewPricing}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
