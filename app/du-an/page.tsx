"use client";

import { useI18n } from "@/i18n/i18n-provider";
import { logoSrc } from "@/data/images";
import { PageHead } from "@/components/page-head";
import { ProjectGallery } from "@/components/project-gallery";

const PARTNERS = [
  ["clientlogo3", "Em Tấm"],
  ["clientlogo2-web", "Vietpacking Plus"],
  ["clientlogo1", "Street Soul Sneakers"],
];

/* eslint-disable @next/next/no-img-element -- pre-compressed WebP, static export */
export default function ProjectsPage() {
  const { m } = useI18n();
  const p = m.projectsPage;
  return (
    <>
      <PageHead title={p.title} heading={p.heading} lead={p.lead}>
        <p className="note-flag">
          <b>{p.sampleBold}</b> {p.sampleNote}
        </p>
      </PageHead>

      <section className="block">
        <div className="wrap">
          <ProjectGallery />
        </div>
      </section>

      <section className="block soft">
        <div className="wrap">
          <div className="sec-head">
            <h2>{p.partnersHeading}</h2>
          </div>
          <div className="partners">
            {PARTNERS.map(([file, name]) => (
              <figure className="partner" key={file}>
                <div className="logo-tile">
                  <img src={logoSrc(file)} alt={name} loading="lazy" />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
