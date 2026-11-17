"use client";

import Link from "next/link";
import { useState } from "react";
import { useI18n } from "@/i18n/i18n-provider";
import { PACKAGES, DEPOSIT_RATE, type PricedService, type Tier } from "@/data/pricing";
import { href } from "@/data/routes";
import { Segmented, serviceOptions } from "./segmented";

const TIERS: Tier[] = ["standard", "advanced"];

const FIELDS: Record<PricedService, { qtyId: string; qtyDefault: string; tierId: string; unit: string }> = {
  look: { qtyId: "l-look", qtyDefault: "10", tierId: "l-tier", unit: "look" },
  cat: { qtyId: "c-sku", qtyDefault: "30", tierId: "c-pack", unit: "SKU" },
};

/** Live cost estimate: quantity × package price, photo count, and the 50% deposit. */
export function PriceEstimator() {
  const { m, vnd } = useI18n();
  const [mode, setMode] = useState<PricedService>("look");
  // Kept per service so switching back restores what the visitor typed.
  const [qty, setQty] = useState({ look: FIELDS.look.qtyDefault, cat: FIELDS.cat.qtyDefault });
  const [tier, setTier] = useState<Record<PricedService, Tier>>({ look: "standard", cat: "standard" });

  const f = FIELDS[mode];
  const text = m.pricing.estimator[mode];
  const perUnit = mode === "look" ? m.common.perLook : m.common.perSku;
  const pkg = PACKAGES[mode][tier[mode]];
  // Same rule as before: non-numbers count as 0, then at least 1.
  const parsed = parseInt(qty[mode], 10);
  const count = Math.max(1, Number.isNaN(parsed) ? 0 : parsed);
  const total = count * pkg.price;

  return (
    <div className="est">
      <div>
        <Segmented label={m.common.chooseService} options={serviceOptions(m)} value={mode} onChange={setMode} />
        <div className="field">
          <label htmlFor={f.qtyId}>{text.qty}</label>
          <input
            id={f.qtyId}
            type="number"
            min={1}
            inputMode="numeric"
            value={qty[mode]}
            onChange={(e) => setQty((q) => ({ ...q, [mode]: e.target.value }))}
          />
        </div>
        <div className="field">
          <label htmlFor={f.tierId}>{text.tier}</label>
          <select id={f.tierId} value={tier[mode]} onChange={(e) => setTier((v) => ({ ...v, [mode]: e.target.value as Tier }))}>
            {TIERS.map((tr) => {
              const p = PACKAGES[mode][tr];
              return (
                <option key={tr} value={tr}>
                  {`${m.pricing.tiers[tr]}, ${p.photos} ${m.common.shots}, ${vnd(p.price)} ${perUnit}`}
                </option>
              );
            })}
          </select>
        </div>
        <p className="note-box">{text.note}</p>
      </div>

      <div className="result-box" aria-live="polite">
        <span className="muted">{m.pricing.estimator.total}</span>
        <div className="total">{vnd(total)}</div>
        <dl>
          <div>
            <dt>{`${count} ${f.unit} × ${vnd(pkg.price)}`}</dt>
            <dd>{vnd(total)}</dd>
          </div>
          <div>
            <dt>{m.pricing.estimator.photos}</dt>
            <dd>{`${count * pkg.photos} ${m.common.shots}`}</dd>
          </div>
        </dl>
        <Link className="btn" href={href("lien-he")} style={{ width: "100%" }}>
          {m.pricing.estimator.cta}
        </Link>
        <p className="hint">
          {m.pricing.estimator.deposit} <b>{vnd(total * DEPOSIT_RATE)}</b>
        </p>
      </div>
    </div>
  );
}
