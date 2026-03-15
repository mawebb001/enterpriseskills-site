import { NextRequest, NextResponse } from "next/server";
import { stripe, PRICES, type PriceKey } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const priceParam = searchParams.get("price") as PriceKey | null;

  if (!priceParam || !PRICES[priceParam]) {
    return NextResponse.redirect(new URL("/#pricing", request.url));
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: PRICES[priceParam],
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/#pricing`,
      metadata: {
        tier: priceParam.startsWith("pro") ? "pro" : "team",
        billing: priceParam.endsWith("annual") ? "annual" : "monthly",
      },
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.redirect(new URL("/#pricing", request.url));
  }
}
