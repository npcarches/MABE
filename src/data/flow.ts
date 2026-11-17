import type { PricedService } from "./pricing";

/** A service with a process walkthrough (same set as the priced services). */
export type Service = PricedService;

/** Image key (see src/data/images.ts) for each process step; step text lives in the messages (flow.<service>.steps). */
export const FLOW_IMAGES: Record<Service, string[]> = {"cat":["cat-tui-farmhouse","cat-tui-vang","cat-xanh-nhat","cat-brillant","cat-tui-pema"],"look":["look-lrc-0","look-em-4","look-lrc-16","look-em-13","look-lrc-6"]};
