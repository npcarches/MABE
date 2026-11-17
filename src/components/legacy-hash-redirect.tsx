"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/data/routes";

/** Sends old single-page links such as /#bang-gia to their new page. */
export function LegacyHashRedirect() {
  const router = useRouter();
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    const route = ROUTES.find((r) => r.id === id && r.id !== "home");
    if (route) router.replace(route.href);
  }, [router]);
  return null;
}
