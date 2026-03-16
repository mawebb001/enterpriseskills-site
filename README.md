# Enterprise Skills - Landing Page & License Server

Official website for Enterprise Skills at `enterpriseskills.ai`.

Next.js landing page with Stripe checkout and Supabase license key management for the Enterprise Skills platform.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** for styling
- **Stripe** for payments (subscriptions)
- **Supabase** for license key storage and validation

## Setup

1. Copy `.env.local.example` to `.env.local` and fill in your keys
2. Run the Supabase migration: `supabase/migrations/001_license_keys.sql`
3. Create Stripe products and prices, add price IDs to env
4. `npm install && npm run dev`

## Stripe Setup

Create these products/prices in Stripe Dashboard:

| Product | Price ID env var | Amount |
|---------|-----------------|--------|
| Pro Monthly | `STRIPE_PRICE_PRO_MONTHLY` | $29/mo per seat |
| Pro Annual | `STRIPE_PRICE_PRO_ANNUAL` | $290/year per seat |
| Team Monthly | `STRIPE_PRICE_TEAM_MONTHLY` | $49/mo per seat |
| Team Annual | `STRIPE_PRICE_TEAM_ANNUAL` | $490/year per seat |

Set up the webhook endpoint at `/api/webhook` for events:
- `checkout.session.completed` (creates license key)
- `customer.subscription.deleted` (deactivates license)

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/checkout?price=pro_monthly` | GET | Redirect to Stripe Checkout |
| `/api/webhook` | POST | Stripe webhook handler |
| `/api/validate-key` | POST/GET | Validate a license key |

## Deploy

Deploy to Vercel:

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard.
