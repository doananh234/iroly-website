"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { CartDisplayItem } from "./cart-item-row";

interface CartOrderSummaryProps {
  items: CartDisplayItem[];
  labels: {
    orderSummary: string;
    bundleDiscount: string;
    tax: string;
    taxIncluded: string;
    total: string;
    creditsEquivalent: string;
    promoPlaceholder: string;
    checkoutCta: string;
    securityText: string;
    apply: string;
    promoApplied: string;
    promoAppliedLabel: string;
    invalidPromo: string;
  };
}

const DEMO_PROMO_CODE = "IROLY10";
const PROMO_DISCOUNT_RATE = 0.1;

/** Dark order summary card on the right column of the cart. */
export function CartOrderSummary({ items, labels }: CartOrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const rawSubtotal = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return sum + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  const discount = promoApplied ? rawSubtotal * PROMO_DISCOUNT_RATE : 0;
  const subtotal = rawSubtotal - discount;
  const credits = Math.round(subtotal * 6);

  function handleApplyPromo() {
    const code = promoCode.trim().toUpperCase();
    if (code === DEMO_PROMO_CODE) {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoApplied(false);
      setPromoError(labels.invalidPromo);
    }
  }

  return (
    <div
      className="sticky top-[100px] rounded-[24px] p-7"
      style={{ background: "#0D1801", color: "#fff" }}
    >
      <h3
        className="m-0 font-black text-white"
        style={{ fontSize: 22, fontFamily: "var(--font-display)" }}
      >
        {labels.orderSummary}
      </h3>

      {/* Line items */}
      <div className="my-5 flex flex-col gap-2.5 text-[14px]">
        {items.map((item) => {
          const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
          return (
            <div key={item.bookId} className="flex justify-between" style={{ color: "#E4E9DA" }}>
              <span>
                {item.title} × {item.quantity}
              </span>
              <span className="font-bold">¥{(price * item.quantity).toFixed(1)}</span>
            </div>
          );
        })}

        {/* Bundle / promo discount */}
        <div className="flex justify-between font-bold" style={{ color: "#BFFF00" }}>
          <span>{promoApplied ? labels.promoAppliedLabel : labels.bundleDiscount}</span>
          <span>−¥{discount.toFixed(1)}</span>
        </div>

        {/* Tax */}
        <div className="flex justify-between" style={{ color: "#E4E9DA" }}>
          <span>{labels.tax}</span>
          <span>{labels.taxIncluded}</span>
        </div>

        {/* Total */}
        <div
          className="mt-1 flex items-baseline justify-between border-t pt-3.5"
          style={{ borderColor: "rgba(255,255,255,.15)" }}
        >
          <span className="text-[15px] font-bold">{labels.total}</span>
          <span
            className="font-black text-white"
            style={{ fontSize: 36, fontFamily: "var(--font-display)" }}
          >
            ¥{subtotal.toFixed(1)}
          </span>
        </div>
        <div className="text-right text-[12px]" style={{ color: "#A8B099" }}>
          {labels.creditsEquivalent.replace("{credits}", String(credits))}
        </div>
      </div>

      {/* Promo code */}
      <div className="mb-4 flex flex-col gap-1.5">
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
              if (promoError) setPromoError("");
              if (promoApplied) setPromoApplied(false);
            }}
            placeholder={labels.promoPlaceholder}
            className="flex-1 rounded-full px-4 py-3 text-[13px] text-white placeholder-white/40 outline-none"
            style={{
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.1)",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={handleApplyPromo}
            className="rounded-full px-4 py-2.5 text-[13px] font-extrabold text-[#0D1801]"
            style={{ background: "#BFFF00", border: "none", cursor: "pointer", flexShrink: 0 }}
          >
            {labels.apply}
          </button>
        </div>
        {promoApplied && (
          <p className="pl-3 text-[11px] font-semibold" style={{ color: "#BFFF00" }}>
            {labels.promoApplied}
          </p>
        )}
        {promoError && (
          <p className="pl-3 text-[11px]" style={{ color: "#ff7070" }}>
            {promoError}
          </p>
        )}
      </div>

      {/* CTA */}
      <Link href="/checkout" className="block">
        <button
          className="flex w-full items-center justify-center rounded-full py-[18px] text-[16px] font-extrabold text-[#0D1801] transition-opacity hover:opacity-90"
          style={{ background: "#BFFF00", border: "none", cursor: "pointer" }}
        >
          {labels.checkoutCta.replace("{total}", subtotal.toFixed(1))}
        </button>
      </Link>

      {/* Security line */}
      <div className="mt-3.5 flex items-center justify-center gap-2.5 text-[11px]" style={{ color: "#A8B099" }}>
        <Check size={12} color="#BFFF00" />
        {labels.securityText}
      </div>
    </div>
  );
}
