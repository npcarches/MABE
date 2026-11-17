"use client";

import { useI18n } from "@/i18n/i18n-provider";
import { EMAIL, INSTAGRAM, PEOPLE } from "@/data/contact";
import { PageHead } from "@/components/page-head";
import { CopyEmail } from "@/components/copy-email";

export default function ContactPage() {
  const { m } = useI18n();
  const c = m.contact;
  return (
    <>
      <PageHead title={c.title} heading={c.heading} lead={c.lead} />
      <section className="block">
        <div className="wrap contact-grid">
          <div className="contact-left">
            <div>
              <h2>{c.phones}</h2>
              <p className="muted">{c.phonesSub}</p>
              <div style={{ marginTop: 20 }}>
                {PEOPLE.map((p) => (
                  <div className="person multi" key={p.phone}>
                    <div>
                      <b>{p.name}</b>
                      <span>{p.phone}</span>
                    </div>
                    <div className="btn-row">
                      {p.channels.map((ch) => (
                        <a key={ch.url} className={`btn ${ch.cls}`} href={ch.url} target="_blank" rel="noopener">
                          {ch.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="contact-ig">
              <h2>Instagram</h2>
              <div style={{ marginTop: 20 }}>
                <div className="person">
                  <div>
                    <b>Instagram</b>
                    <span>{INSTAGRAM.handle}</span>
                  </div>
                  <a className="btn line" href={INSTAGRAM.url} target="_blank" rel="noopener">
                    {c.viewInstagram}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-right">
            <h2>Email</h2>
            <p className="muted">{c.emailSub}</p>
            <CopyEmail email={EMAIL} />
          </div>
        </div>
      </section>
    </>
  );
}
