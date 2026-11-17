"use client";

import { useRef, useState } from "react";
import { useI18n } from "@/i18n/i18n-provider";
import { PROJECTS, DEFAULT_CATALOG_CLIENT, type Project, type ProjectText, type ProjectType } from "@/data/projects";
import { imageSmall } from "@/data/images";
import { Img } from "./img";
import { Segmented } from "./segmented";

/* eslint-disable @next/next/no-img-element -- pre-compressed WebP, static export */

/** Filterable project grid with a detail dialog (thumbnails switch the main photo). */
export function ProjectGallery() {
  const { m } = useI18n();
  const [filter, setFilter] = useState<ProjectType>("look");
  const [current, setCurrent] = useState<Project | null>(null);
  const [mainKey, setMainKey] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const typeName: Record<ProjectType, string> = {
    look: m.common.lookbook,
    cat: m.common.catalog,
    life: m.common.productLifestyle,
  };
  const filters = (Object.keys(typeName) as ProjectType[]).map((id) => ({ id, label: typeName[id] }));

  const open = (p: Project) => {
    setCurrent(p);
    setMainKey(p.imgs[0]);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  const text: ProjectText | null = current ? m.projects[current.id] : null;
  const client = current ? current.client || (current.type === "cat" ? DEFAULT_CATALOG_CLIENT : current.brand) : "";
  const request = text?.request;

  return (
    <>
      <div className="proj-top">
        <h2 style={{ margin: 0 }}>{m.projectsPage.featured}</h2>
        <Segmented label={m.projectsPage.filterLabel} options={filters} value={filter} onChange={setFilter} />
      </div>
      <div className="proj-grid">
        {PROJECTS.filter((p) => p.type === filter).map((p) => {
          const t = m.projects[p.id];
          return (
            <button
              key={p.id}
              type="button"
              className="proj"
              aria-label={`${m.projectsPage.viewProject} ${t.title}`}
              onClick={() => open(p)}
            >
              <div className="ph">
                <img alt="" src={imageSmall(p.imgs[0])} loading="lazy" decoding="async" />
              </div>
              <div className="proj-body">
                <span className="chip">{typeName[p.type]}</span> <span className="chip gray">{t.industry}</span>
                <h3>{t.title}</h3>
              </div>
            </button>
          );
        })}
      </div>

      <dialog
        className={current?.type === "life" ? "pd portrait" : "pd"}
        ref={dialogRef}
        aria-labelledby="pd-title"
        onClose={() => setCurrent(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {current && text && (
          <div className="pd-grid">
            <div className="pd-media">
              <div className="main">
                <Img k={mainKey} alt={text.title} sizes="(max-width: 960px) 100vw, 700px" />
              </div>
              <div className="pd-thumbs">
                {current.imgs.map((k) => (
                  <button
                    key={k}
                    type="button"
                    aria-label={`${m.projectsPage.viewPhoto} ${k}`}
                    aria-current={k === mainKey ? "true" : "false"}
                    onClick={() => setMainKey(k)}
                  >
                    <img alt="" src={imageSmall(k)} />
                  </button>
                ))}
              </div>
            </div>
            <div className="pd-info">
              <button className="pd-close" type="button" aria-label={m.common.close} onClick={close}>
                ×
              </button>
              <span className="chip">{typeName[current.type]}</span>
              <h3 id="pd-title">{text.title}</h3>
              <dl>
                <div>
                  <dt>{m.projectsPage.client}</dt>
                  <dd>{client}</dd>
                </div>
                <div>
                  <dt>{m.projectsPage.industry}</dt>
                  <dd>{text.industry}</dd>
                </div>
              </dl>
              <h4>{m.projectsPage.challenge}</h4>
              <p>{text.challenge}</p>
              {request && (
                <>
                  <h4>{m.projectsPage.request}</h4>
                  <p>{request}</p>
                </>
              )}
              <p className="pd-note">{m.projectsPage.copyright}</p>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
