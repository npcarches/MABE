"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/i18n-provider";
import { href } from "@/data/routes";
import { PACKAGES, type PricedService } from "@/data/pricing";
import { PageHead } from "@/components/page-head";
import { PriceEstimator } from "@/components/price-estimator";

/** Tier cards per service, in display order; "custom" has no fixed price. */
const TIERS = ["standard", "advanced", "custom"] as const;

export default function PricingPage() {
  const { m, vnd } = useI18n();
  const p = m.pricing;
  const perUnit = { look: m.common.perLook, cat: m.common.perSku };
  const cta = { standard: p.tiers.chooseStandard, advanced: p.tiers.chooseAdvanced, custom: p.tiers.getQuote };

  return (
    <>
      <PageHead title={p.title} heading={p.heading} lead={p.lead} />

      <section className="block">
        <div className="wrap">
          <div className="pk-sec">
            <div className="pk-title">
              <h2>{p.estimator.heading}</h2>
              <span className="muted">{p.estimator.sub}</span>
            </div>
            <PriceEstimator />
          </div>

          {(["look", "cat"] as PricedService[]).map((s) => {
            const sec = p[s];
            return (
              <div className="pk-sec" key={s}>
                <div className="pk-title">
                  <h2>{sec.title}</h2>
                  <span className="muted">{sec.sub}</span>
                </div>
                <div className="tiers">
                  {TIERS.map((tier) => {
                    const popular = tier === "advanced";
                    return (
                      <div className={popular ? "tier pop" : "tier"} key={tier}>
                        {popular && <span className="pop-tag">{p.tiers.popular}</span>}
                        <h3>{p.tiers[tier]}</h3>
                        <div className="for">{sec.for[tier]}</div>
                        <div className="price">
                          {tier === "custom" ? (
                            p.tiers.customPrice
                          ) : (
                            <>
                              {vnd(PACKAGES[s][tier].price)} <small>{perUnit[s]}</small>
                            </>
                          )}
                        </div>
                        <ul>
                          {sec.bullets[tier].map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                        <Link className={popular ? "btn" : "btn line"} href={href("lien-he")}>
                          {cta[tier]}
                        </Link>
                      </div>
                    );
                  })}
                </div>
                <div className="incl">
                  <b>{sec.inclTitle}</b>
                  <ul>
                    {sec.incl.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
