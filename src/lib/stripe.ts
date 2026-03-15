import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

export const PRICES = {
  pro_monthly: process.env.STRIPE_PRICE_PRO_MONTHLY!,
  pro_annual: process.env.STRIPE_PRICE_PRO_ANNUAL!,
  team_monthly: process.env.STRIPE_PRICE_TEAM_MONTHLY!,
  team_annual: process.env.STRIPE_PRICE_TEAM_ANNUAL!,
} as const;

export type PriceKey = keyof typeof PRICES;
