"use client";

import { useQuery } from "@tanstack/react-query";
import { Link } from "@/i18n/navigation";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { SkewUnderline } from "@/components/skew-underline";
import { CartItemRow } from "./cart-item-row";
import { CartOrderSummary } from "./cart-order-summary";
import { useCart } from "@/lib/queries/use-cart";
import { FALLBACK_BOOKS } from "@/data/fallback";
import type { CartDisplayItem } from "./cart-item-row";
import type { Book } from "@/types";

// Fetch book details for a list of bookIds
async function fetchCartBooks(bookIds: string[]): Promise<Book[]> {
  if (bookIds.length === 0) return [];
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookIds }),
  });
  const data = await res.json();
  return data.books ?? [];
}

/** Build CartDisplayItem from a CartItem + Book detail. Falls back to FALLBACK_BOOKS data. */
function buildDisplayItem(
  bookId: string,
  quantity: number,
  book: Book | undefined,
): CartDisplayItem {
  // Try to fill missing fields from fallback data
  const fallback = FALLBACK_BOOKS.find((b) => b.id === bookId);

  return {
    bookId,
    quantity,
    title: book?.title ?? fallback?.title ?? bookId,
    series: (book as Book & { series?: string })?.series ?? fallback?.series ?? "",
    price: book?.price ?? fallback?.price ?? "¥0",
    oldPrice: fallback?.oldPrice ?? undefined,
    badge: fallback?.badge ?? undefined,
    pages: (book as Book & { specifications?: { pages?: number } })?.specifications?.pages ?? fallback?.pages,
    difficulty: fallback?.difficulty,
    coverUrl: book?.coverUrl ?? fallback?.coverUrl ?? "",
    backgroundColor: fallback?.backgroundColor,
  };
}

/** Cart page client component — reads real cart cookie data via useCart(). */
export function CartPageClient() {
  const t = useTranslations("cart");
  const { items: cartItems } = useCart();

  const bookIds = cartItems.map((i) => i.bookId);

  const { data: books = [] } = useQuery<Book[]>({
    queryKey: ["cart-books", bookIds],
    queryFn: () => fetchCartBooks(bookIds),
    enabled: bookIds.length > 0,
    staleTime: 60 * 1000,
  });

  const bookMap = new Map(books.map((b) => [b.id, b]));

  // Build display items from real cart data
  const displayItems: CartDisplayItem[] = cartItems.map((cartItem) =>
    buildDisplayItem(cartItem.bookId, cartItem.quantity, bookMap.get(cartItem.bookId)),
  );

  const orderLabels = {
    orderSummary: t("orderSummary"),
    bundleDiscount: t("bundleDiscount"),
    tax: t("tax"),
    taxIncluded: t("taxIncluded"),
    total: t("total"),
    creditsEquivalent: t("creditsEquivalent"),
    promoPlaceholder: t("promoPlaceholder"),
    checkoutCta: t("checkoutCta"),
    securityText: t("securityText"),
    apply: t("apply"),
    promoApplied: t("promoApplied"),
    promoAppliedLabel: t("promoAppliedLabel"),
    invalidPromo: t("invalidPromo"),
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-8">
        <p className="text-center text-[#555]">{t("empty")}</p>
        <Link
          href="/shop"
          className="rounded-full bg-[#0D1801] px-7 py-3.5 text-[15px] font-extrabold text-white"
        >
          {t("continueShopping")}
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-[#FFFDF8] font-sans text-[#0D1801]">
      {/* Heading */}
      <section className="mx-auto max-w-[1320px] px-4 pb-6 pt-10 sm:px-6 sm:pt-12 md:px-8">
        <h1
          className="m-0 text-[44px] font-black leading-[.95] tracking-[-0.03em] text-[#0D1801] sm:text-[56px] md:text-[72px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Your{" "}
          <SkewUnderline color="rgba(191,255,0,.55)" height="55%">
            cart.
          </SkewUnderline>
        </h1>
        <div className="mt-2 text-[15px] text-[#666]">
          {t("booksReady").replace("{count}", String(cartItems.length))}
        </div>
      </section>

      {/* Main 2-column layout */}
      <section
        className="mx-auto grid max-w-[1320px] grid-cols-1 gap-6 px-4 pb-20 sm:px-6 md:px-8 lg:grid-cols-[1.4fr_1fr] lg:gap-9"
      >
        {/* Left: stepper + items + upsell */}
        <div className="flex flex-col gap-3">
          {/* Checkout stepper */}
          <div
            className="mb-1.5 flex items-center gap-3 overflow-x-auto rounded-[14px] px-[18px] py-2.5 sm:gap-[18px]"
            style={{ background: "#F5F2EA", scrollbarWidth: "none" }}
          >
            {(["cart", "payment", "library"] as const).map((step, i) => (
              <div
                key={step}
                className="flex items-center gap-2 text-[13px] font-bold"
                style={{ color: i === 0 ? "#0D1801" : "#999" }}
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-extrabold"
                  style={{
                    background: i === 0 ? "#0D1801" : "transparent",
                    color: i === 0 ? "#BFFF00" : "#999",
                    border: i === 0 ? "none" : "1.5px solid #ccc",
                  }}
                >
                  {i + 1}
                </span>
                {t(`steps.${step}`)}
                {i < 2 && (
                  <div className="ml-2 h-px w-[60px]" style={{ background: "#ccc" }} />
                )}
              </div>
            ))}
          </div>

          {/* Item cards */}
          {displayItems.map((item) => (
            <CartItemRow
              key={item.bookId}
              item={item}
              removeLabel={t("remove")}
            />
          ))}

          {/* Bundle upsell */}
          <div
            className="flex items-center justify-between gap-3.5 rounded-[16px] px-[22px] py-[18px]"
            style={{ background: "#BFFF00" }}
          >
            <div className="flex items-center gap-3">
              <Sparkles size={20} color="#0D1801" />
              <div>
                <div
                  className="text-[15px] font-extrabold text-[#0D1801]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t("upsellTitle")}
                </div>
                <div className="text-[12px] text-[#1d2a14]">{t("upsellSubtitle")}</div>
              </div>
            </div>
            <Link
              href="/shop"
              className="rounded-full bg-[#0D1801] px-4 py-2.5 text-[13px] font-extrabold text-white"
            >
              {t("browseCta")}
            </Link>
          </div>
        </div>

        {/* Right: order summary */}
        <aside>
          <CartOrderSummary items={displayItems} labels={orderLabels} />
        </aside>
      </section>
    </main>
  );
}
