"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/lib/queries/use-cart";
import { Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  bookId: string;
  /** "icon" = small circle, "pill" = full pill with text, "inline" = overlay button */
  variant?: "icon" | "pill" | "inline";
  price?: string;
  className?: string;
}

export function AddToCartButton({
  bookId,
  variant = "icon",
  price,
  className,
}: AddToCartButtonProps) {
  const t = useTranslations("common");
  const { add, items } = useCart();
  const [added, setAdded] = useState(false);
  const isInCart = items.some((item) => item.bookId === bookId);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart && !added) return; // already in cart
    add(bookId);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (variant === "pill") {
    return (
      <button
        onClick={handleAdd}
        className={cn(
          "flex h-[46px] items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition-all",
          added
            ? "bg-[#30A46C] text-white"
            : isInCart
              ? "bg-[#0D1801]/80 text-white"
              : "bg-[#0D1801] text-white hover:bg-[#0D1801]/90",
          className,
        )}
      >
        {added ? (
          <>
            <Check size={18} /> {t("actions.addToBag")}
          </>
        ) : isInCart ? (
          <>
            <Check size={18} /> {t("actions.inBag")}
          </>
        ) : (
          <>
            <Plus size={18} color="#BFFF00" /> {t("actions.addToBag")}
            {price && <> — {price}</>}
          </>
        )}
      </button>
    );
  }

  if (variant === "inline") {
    return (
      <button
        onClick={handleAdd}
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-extrabold shadow transition-all",
          added
            ? "bg-[#30A46C] text-white"
            : "bg-[#BFFF00] text-[#0D1801] hover:opacity-90",
          className,
        )}
      >
        {added ? t("actions.added") : "+ Add"}
      </button>
    );
  }

  // icon variant
  return (
    <button
      onClick={handleAdd}
      className={cn(
        "flex h-[34px] w-[34px] items-center justify-center rounded-full transition-all",
        added
          ? "bg-[#30A46C] text-white"
          : "bg-[#0D1801] text-[#BFFF00] hover:bg-[#0D1801]/90",
        className,
      )}
    >
      {added ? <Check size={16} /> : <Plus size={18} />}
    </button>
  );
}
