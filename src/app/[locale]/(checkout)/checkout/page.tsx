"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useCart } from "@/lib/queries/use-cart";

export default function CheckoutPage() {
  const locale = useLocale();
  const { items } = useCart();

  useEffect(() => {
    if (items.length === 0) return;

    fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, locale }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          window.location.href = data.url;
        }
      })
      .catch(console.error);
  }, [items, locale]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-lg font-bold">Redirecting to checkout...</div>
        <div className="text-sm text-muted-foreground">Please wait</div>
      </div>
    </div>
  );
}
