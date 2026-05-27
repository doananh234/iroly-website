import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getBookById } from "@/data/books";
import type { CartItem } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { items, locale = "en" } = (await req.json()) as {
      items: CartItem[];
      locale?: string;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Fetch real book data from Firestore for prices and titles
    const lineItems = await Promise.all(
      items.map(async (item) => {
        const book = await getBookById(item.bookId);
        const price = book?.price ? Math.round(parseFloat(book.price) * 100) : 990;
        const name = book?.title || `Book: ${item.bookId}`;

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name,
              ...(book?.coverUrl ? { images: [book.coverUrl] } : {}),
            },
            unit_amount: price,
          },
          quantity: item.quantity,
        };
      }),
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/cart`,
      metadata: {
        locale,
        bookIds: items.map((i) => i.bookId).join(","),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
