"use client";

import { ShoppingBag } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/queries/use-cart";
import { Button } from "@/components/ui/button";

export function CartButton() {
  const { count } = useCart();

  return (
    <Button variant="ghost" size="icon" className="relative rounded-full" asChild>
      <Link href="/cart">
        <ShoppingBag size={18} />
        {count > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-[#BFFF00] px-1 text-[11px] font-extrabold text-[#0D1801]">
            {count}
          </span>
        )}
      </Link>
    </Button>
  );
}
