"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/i18n-provider";
import { href } from "@/data/routes";
import { PageHead } from "@/components/page-head";
import { ProcessStepper } from "@/components/process-stepper";

export default function ProcessPage() {
  const { m } = useI18n();
  const p = m.process;
  return (
    <>
      <PageHead title={p.title} heading={p.heading} lead={p.lead} />

      <section className="block">
        <div className="wrap">
          <ProcessStepper />
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>{p.ctaHeading}</h2>
              <p>{p.ctaBody}</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn" href={href("bang-gia")}>
                {m.common.viewPricing}
              </Link>
              <Link className="btn line" href={href("lien-he")}>
                {m.common.bookShoot}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
