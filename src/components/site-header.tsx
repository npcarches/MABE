"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useI18n } from "@/i18n/i18n-provider";
import { ROUTES, href } from "@/data/routes";
import { LangToggle } from "./lang-toggle";

/** Above this width the nav is always visible, so the mobile menu closes. */
const DESKTOP_MIN = 960;

const samePath = (a: string, b: string) => a.replace(/\/$/, "") === b.replace(/\/$/, "");

/** `logo` is rendered by the (server) layout so its SVG stays out of the client bundle. */
export function SiteHeader({ logo }: { logo: ReactNode }) {
  const { m } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // While open: close on outside click, Escape, or resize to desktop.
  useEffect(() => {
    if (!open) return;
    // React listens on the document too, so the toggle button's own click reaches here; skip it.
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (btnRef.current?.contains(target)) return;
      if (navRef.current && !navRef.current.contains(target)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > DESKTOP_MIN) setOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="site-head">
      <div className="wrap bar">
        <Link className="logo" href="/" aria-label={m.common.homeLabel}>
          {logo}
        </Link>
        <ul
          className={open ? "nav open" : "nav"}
          id="nav"
          ref={navRef}
          onClick={(e) => {
            if ((e.target as Element).closest("a")) setOpen(false);
          }}
        >
          {ROUTES.map((r) => (
            <li key={r.id}>
              <Link href={r.href} aria-current={samePath(pathname, r.href) ? "page" : undefined}>
                {m.nav[r.label]}
              </Link>
            </li>
          ))}
          <li className="nav-cta">
            <Link className="btn small" href={href("lien-he")}>
              {m.common.bookShoot}
            </Link>
          </li>
        </ul>
        <div className="head-actions">
          <LangToggle />
          <Link className="btn small head-cta" href={href("lien-he")}>
            {m.common.bookShoot}
          </Link>
          <button
            className="menu-btn"
            type="button"
            aria-label={m.common.menu}
            aria-expanded={open}
            aria-controls="nav"
            ref={btnRef}
            onClick={() => setOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
