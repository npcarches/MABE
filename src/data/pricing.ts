// Package prices and photo counts, used by the pricing tables, home teasers and the estimator.
// Prices are in VND, excluding VAT. Package names and labels live in the messages (pricing.tiers).

export type PricedService = "look" | "cat";
export type Tier = "standard" | "advanced";

export interface Package {
  /** Price per look (lookbook) or per SKU (catalog). */
  price: number;
  /** Photos delivered per look / SKU. */
  photos: number;
}

export const PACKAGES: Record<PricedService, Record<Tier, Package>> = {
  look: {
    standard: { price: 600_000, photos: 4 },
    advanced: { price: 750_000, photos: 6 },
  },
  cat: {
    standard: { price: 400_000, photos: 4 },
    advanced: { price: 500_000, photos: 6 },
  },
};

/** Share of the total paid upfront to hold the shoot date. */
export const DEPOSIT_RATE = 0.5;
