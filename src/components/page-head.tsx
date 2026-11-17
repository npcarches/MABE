import type { ReactNode } from "react";

interface PageHeadProps {
  /** Browser tab title. */
  title: string;
  heading: string;
  lead: string;
  /** Extra content under the lead paragraph. */
  children?: ReactNode;
}

/**
 * Inner-page heading block plus the browser tab title. React hoists <title> into <head>, so pages
 * must not also set a `title` in their Next metadata.
 */
export function PageHead({ title, heading, lead, children }: PageHeadProps) {
  return (
    <>
      <title>{title}</title>
      <section className="page-head">
        <div className="wrap">
          <h1>{heading}</h1>
          <p className="lead">{lead}</p>
          {children}
        </div>
      </section>
    </>
  );
}
