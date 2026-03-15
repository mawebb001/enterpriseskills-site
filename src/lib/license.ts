import { randomUUID } from "crypto";
import { createServiceClient } from "./supabase";

export type LicenseTier = "pro" | "team" | "enterprise";

export interface LicenseKey {
  key: string;
  tier: LicenseTier;
  email: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  activated_at: string;
  expires_at: string;
  active: boolean;
}

export function generateLicenseKey(tier: LicenseTier): string {
  const prefix = `es-${tier}`;
  const uuid = randomUUID();
  return `${prefix}-${uuid}`;
}

export async function createLicense(params: {
  tier: LicenseTier;
  email: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
}): Promise<LicenseKey> {
  const supabase = createServiceClient();
  const key = generateLicenseKey(params.tier);
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);

  const record = {
    key,
    tier: params.tier,
    email: params.email,
    stripe_customer_id: params.stripeCustomerId,
    stripe_subscription_id: params.stripeSubscriptionId,
    activated_at: now.toISOString(),
    expires_at: expiresAt.toISOString(),
    active: true,
  };

  const { error } = await supabase.from("license_keys").insert(record);
  if (error) throw new Error(`Failed to create license: ${error.message}`);

  return record;
}

export async function validateLicense(key: string): Promise<{
  valid: boolean;
  tier?: LicenseTier;
  email?: string;
  expires_at?: string;
  error?: string;
}> {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("license_keys")
    .select("*")
    .eq("key", key)
    .eq("active", true)
    .single();

  if (error || !data) {
    return { valid: false, error: "Invalid or inactive license key" };
  }

  if (new Date(data.expires_at) < new Date()) {
    return { valid: false, error: "License key has expired" };
  }

  return {
    valid: true,
    tier: data.tier,
    email: data.email,
    expires_at: data.expires_at,
  };
}
