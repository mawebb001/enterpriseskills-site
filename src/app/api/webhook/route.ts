import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createLicense, type LicenseTier } from "@/lib/license";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const tier = (session.metadata?.tier ?? "pro") as LicenseTier;
      const email = session.customer_details?.email ?? session.customer_email ?? "";
      const customerId =
        typeof session.customer === "string"
          ? session.customer
          : session.customer?.id ?? "";
      const subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id ?? "";

      const license = await createLicense({
        tier,
        email,
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
      });

      console.log(`License created: ${license.key} (${tier}) for ${email}`);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const { createServiceClient } = await import("@/lib/supabase");
      const supabase = createServiceClient();

      await supabase
        .from("license_keys")
        .update({ active: false })
        .eq("stripe_subscription_id", subscription.id);

      console.log(`Subscription cancelled, license deactivated: ${subscription.id}`);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
