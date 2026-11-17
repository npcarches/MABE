import type { Messages } from "@/i18n/vi";

export type ProjectType = "look" | "cat" | "life";

/** Key of a project's text in the messages (src/i18n/vi.ts → projects). */
export type ProjectId = keyof Messages["projects"];

/** A project's text in the messages. `approach`/`result` are kept for a future detail view. */
export interface ProjectText {
  title: string;
  industry: string;
  challenge: string;
  approach?: string;
  result?: string;
  /** Special request, shown only when present. */
  request?: string;
}

export interface Project {
  id: ProjectId;
  type: ProjectType;
  /** Brand name (not translated). */
  brand: string;
  /** Overrides the client shown in the detail dialog. */
  client?: string;
  /** Image keys (see src/data/images.ts). The first one is the card cover. */
  imgs: string[];
}

/** Client shown for catalog projects without an explicit client. */
export const DEFAULT_CATALOG_CLIENT = "Vietpacking Plus";

export const PROJECTS: Project[] = [
  { id: "vay-cham-bi-nau-va-vay-den-dai", type: "look", brand: "Em Tấm", imgs: ["lb-1-1", "lb-1-2", "lb-1-3", "lb-1-4", "lb-1-5", "lb-1-6"] },
  { id: "vay-hoa-kem-dang-dai", type: "look", brand: "Em Tấm", imgs: ["lb-2-1", "lb-2-2", "lb-2-3", "lb-2-4", "lb-2-5"] },
  { id: "dam-den-tre-vai-ben-cau-thang", type: "look", brand: "Em Tấm", imgs: ["lb-3-1", "lb-3-2", "lb-3-3", "lb-3-4", "lb-3-5", "lb-3-6"] },
  { id: "dam-be-tre-vai-ben-cau-thang", type: "look", brand: "Em Tấm", imgs: ["lb-4-1", "lb-4-2", "lb-4-3", "lb-4-4"] },
  { id: "whoau", type: "cat", brand: "WHOAU", imgs: ["cp-whoau-1", "cp-whoau-2", "cp-whoau-3", "cp-whoau-4", "cp-whoau-5", "cp-whoau-6"] },
  { id: "steel", type: "cat", brand: "Steel", imgs: ["cp-steel-1", "cp-steel-2", "cp-steel-3", "cp-steel-4", "cp-steel-5", "cp-steel-6"] },
  { id: "gemgarden", type: "cat", brand: "Gemgarden", imgs: ["cp-gemgarden-1", "cp-gemgarden-2", "cp-gemgarden-3", "cp-gemgarden-4", "cp-gemgarden-5", "cp-gemgarden-6"] },
  { id: "hoan-my-bo-xanh-ngoc", type: "cat", brand: "Hoàn Mỹ", imgs: ["cp-hoanmy-1", "cp-hoanmy-2", "cp-hoanmy-3", "cp-hoanmy-4", "cp-hoanmy-5", "cp-hoanmy-6"] },
  { id: "ldy", type: "cat", brand: "LDY", imgs: ["cp-ldy-1", "cp-ldy-2", "cp-ldy-3", "cp-ldy-4", "cp-ldy-5", "cp-ldy-6"] },
  { id: "bo-tinh-dau-nuoc-hoa", type: "cat", brand: "Thương hiệu mẫu", imgs: ["cp-tinhdau-1", "cp-tinhdau-2", "cp-tinhdau-3", "cp-tinhdau-4", "cp-tinhdau-5", "cp-tinhdau-6"] },
  { id: "judydoll", type: "cat", brand: "JUDYDOLL", imgs: ["cp-judydoll-1", "cp-judydoll-2", "cp-judydoll-3", "cp-judydoll-4", "cp-judydoll-5", "cp-judydoll-6", "cp-judydoll-7", "cp-judydoll-8"] },
  { id: "phuong-my-chi-lo-co", type: "cat", brand: "Phương Mỹ Chi", imgs: ["cp-phuongmychi-1", "cp-phuongmychi-2", "cp-phuongmychi-3", "cp-phuongmychi-4", "cp-phuongmychi-5", "cp-phuongmychi-6", "cp-phuongmychi-7", "cp-phuongmychi-8"] },
  { id: "new-balance-2002r", type: "life", brand: "Street Soul Sneakers", imgs: ["lp-1-1", "lp-1-2", "lp-1-3", "lp-1-4", "lp-1-5", "lp-1-6", "lp-1-7", "lp-1-8"] },
  { id: "new-balance-996", type: "life", brand: "Street Soul Sneakers", imgs: ["lp-2-1", "lp-2-2", "lp-2-3", "lp-2-4", "lp-2-5", "lp-2-6"] },
  { id: "new-balance-1906r", type: "life", brand: "Street Soul Sneakers", imgs: ["lp-3-1", "lp-3-2", "lp-3-3", "lp-3-4", "lp-3-5", "lp-3-6", "lp-3-7", "lp-3-8"] },
  { id: "new-balance-9060", type: "life", brand: "Street Soul Sneakers", imgs: ["lp-4-1", "lp-4-2", "lp-4-3", "lp-4-4", "lp-4-5", "lp-4-6", "lp-4-7"] },
  { id: "new-balance-1906a", type: "life", brand: "Street Soul Sneakers", imgs: ["lp-5-1", "lp-5-2", "lp-5-3", "lp-5-4", "lp-5-5", "lp-5-6"] },
  { id: "nike-shox-phoi-do", type: "life", brand: "Street Soul Sneakers", imgs: ["lp-6-1", "lp-6-2", "lp-6-3", "lp-6-4", "lp-6-5"] },
  { id: "nike-shox-phoi-bac", type: "life", brand: "Street Soul Sneakers", imgs: ["lp-7-1", "lp-7-2", "lp-7-3", "lp-7-4", "lp-7-5"] },
  { id: "giay-da-nau-va-adidas", type: "life", brand: "Street Soul Sneakers", imgs: ["lp-8-1", "lp-8-2", "lp-8-3", "lp-8-4", "lp-8-5", "lp-8-6"] },
  { id: "mizuno-racer-s", type: "life", brand: "Street Soul Sneakers", imgs: ["lp-9-1", "lp-9-2", "lp-9-3", "lp-9-4"] },
  { id: "nike-p6000", type: "life", brand: "Street Soul Sneakers", imgs: ["lp-10-1", "lp-10-2", "lp-10-3", "lp-10-4", "lp-10-5", "lp-10-6", "lp-10-7"] },
  { id: "timberland-moc-toe-va-heritage-mid", type: "life", brand: "Street Soul Sneakers", imgs: ["lp-11-1", "lp-11-2", "lp-11-3", "lp-11-4", "lp-11-5", "lp-11-6"] },
  { id: "eider-safety-boot-boa", type: "cat", brand: "Street Soul Sneakers", client: "Street Soul Sneakers", imgs: ["tr-1-1", "tr-1-2", "tr-1-3", "tr-1-4", "tr-1-5"] },
  { id: "oboz-bridger-mid-waterproof", type: "cat", brand: "Street Soul Sneakers", client: "Street Soul Sneakers", imgs: ["tr-2-1", "tr-2-2", "tr-2-3", "tr-2-4"] },
  { id: "adidas-stadt-va-gazelle", type: "cat", brand: "Street Soul Sneakers", client: "Street Soul Sneakers", imgs: ["tr-3-1", "tr-3-2", "tr-3-3", "tr-3-4", "tr-3-5", "tr-3-6"] },
  { id: "new-balance-1906-phoi-xanh-mint", type: "cat", brand: "Street Soul Sneakers", client: "Street Soul Sneakers", imgs: ["tr-4-1", "tr-4-2", "tr-4-3", "tr-4-4"] },
  { id: "new-balance-2002r-phoi-navy", type: "cat", brand: "Street Soul Sneakers", client: "Street Soul Sneakers", imgs: ["tr-5-1", "tr-5-2", "tr-5-3", "tr-5-4"] },
];
