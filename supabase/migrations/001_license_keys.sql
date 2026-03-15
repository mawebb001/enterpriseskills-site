-- License Keys table for Enterprise Skills platform
-- Stores license keys generated on Stripe payment completion

create table if not exists public.license_keys (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  tier text not null check (tier in ('pro', 'team', 'enterprise')),
  email text not null,
  stripe_customer_id text not null,
  stripe_subscription_id text not null,
  activated_at timestamptz not null default now(),
  expires_at timestamptz not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_license_keys_key on public.license_keys (key);
create index idx_license_keys_email on public.license_keys (email);
create index idx_license_keys_stripe_sub on public.license_keys (stripe_subscription_id);

-- RLS policies
alter table public.license_keys enable row level security;

-- Service role can do everything (used by API routes)
create policy "Service role full access"
  on public.license_keys
  for all
  using (true)
  with check (true);

-- Auto-update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_license_key_updated
  before update on public.license_keys
  for each row
  execute function public.handle_updated_at();
