import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

// Disable body parser — we need raw body for signature verification
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || "",
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookIds = session.metadata?.bookIds?.split(",") || [];

    // TODO: Record purchases in Firestore when auth is wired up
    // For now, log the purchase
    console.log("Purchase completed:", {
      sessionId: session.id,
      bookIds,
      amount: session.amount_total,
      currency: session.currency,
    });
  }

  return NextResponse.json({ received: true });
}
