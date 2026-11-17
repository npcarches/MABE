import type { Messages } from "@/i18n/vi";

// Site pages. The `id` matches the hash used by the old single-page site (index.html#du-an …);
// `label` is the key of the nav text in the messages (nav.*).
export const ROUTES = [
  { id: "home", href: "/", label: "home" },
  { id: "du-an", href: "/du-an/", label: "projects" },
  { id: "bang-gia", href: "/bang-gia/", label: "pricing" },
  { id: "quy-trinh", href: "/quy-trinh/", label: "process" },
  { id: "lien-he", href: "/lien-he/", label: "contact" },
] as const satisfies readonly { id: string; href: string; label: keyof Messages["nav"] }[];

export type RouteId = (typeof ROUTES)[number]["id"];

export const href = (id: RouteId) => ROUTES.find((r) => r.id === id)!.href;
