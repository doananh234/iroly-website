"use client";

import { CartPageClient } from "@/components/cart/cart-page-client";

/** Cart page — delegates to CartPageClient for full prototype fidelity. */
export default function CartPage() {
  return <CartPageClient />;
}
