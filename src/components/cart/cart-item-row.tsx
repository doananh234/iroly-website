"use client";

import { Minus, Plus, X } from "lucide-react";
import { BookCover } from "@/components/book-cover";
import { useCart } from "@/lib/queries/use-cart";

export interface CartDisplayItem {
  bookId: string;
  quantity: number;
  title: string;
  series: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  pages?: number;
  difficulty?: string;
  coverUrl: string;
  backgroundColor?: string;
}

interface CartItemRowProps {
  item: CartDisplayItem;
  removeLabel: string;
}

/** Single cart item card matching the prototype PageCart design. */
export function CartItemRow({ item, removeLabel }: CartItemRowProps) {
  const { updateQuantity, remove } = useCart();
  const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));

  return (
    <div
      className="flex gap-[18px] items-center"
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: 20,
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}
    >
      {/* Book cover on colored bg */}
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 12,
          background: item.backgroundColor ?? "#F5F2EA",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <BookCover
          src={item.coverUrl}
          alt={item.title}
          size={100}
          radius={12}
          backgroundColor={item.backgroundColor}
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        {/* Series */}
        <div className="text-[11px] font-semibold uppercase tracking-[.06em] text-[#777]">
          {item.series}
        </div>
        {/* Title */}
        <h3
          className="m-0 font-black text-[#0D1801]"
          style={{ fontSize: 22, fontFamily: "var(--font-display)" }}
        >
          {item.title}
        </h3>
        {/* Pills */}
        <div className="flex flex-wrap gap-1.5">
          {item.badge && (
            <span
              className="rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[.04em]"
              style={{ background: "#0D1801", color: "#BFFF00" }}
            >
              {item.badge}
            </span>
          )}
          {item.pages && (
            <span
              className="rounded-full px-2.5 py-1 text-[12px] font-semibold text-[#1d2a14]"
              style={{ background: "rgba(0,0,0,.05)" }}
            >
              {item.pages} pages
            </span>
          )}
          {item.difficulty && (
            <span
              className="rounded-full px-2.5 py-1 text-[12px] font-semibold text-[#1d2a14]"
              style={{ background: "rgba(0,0,0,.05)" }}
            >
              {item.difficulty}
            </span>
          )}
        </div>

        {/* Price row + qty */}
        <div className="mt-1 flex items-center justify-between">
          {/* Qty stepper */}
          <div
            className="flex items-center gap-1 rounded-full p-0.5"
            style={{ background: "rgba(0,0,0,.04)" }}
          >
            <button
              onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full"
              style={{ background: "#fff", border: "none", cursor: "pointer" }}
              aria-label="Decrease quantity"
            >
              <Minus size={13} />
            </button>
            <span className="w-5 text-center text-[14px] font-extrabold text-[#0D1801]">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
              className="flex h-7 w-7 items-center justify-center rounded-full"
              style={{ background: "#fff", border: "none", cursor: "pointer" }}
              aria-label="Increase quantity"
            >
              <Plus size={13} />
            </button>
          </div>

          <div className="flex items-center gap-3.5">
            <button
              onClick={() => remove(item.bookId)}
              className="text-[12px] text-[#999]"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {removeLabel}
            </button>
            <div
              className="font-black text-[#0D1801]"
              style={{ fontSize: 20, fontFamily: "var(--font-display)" }}
            >
              ¥{(price * item.quantity).toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
