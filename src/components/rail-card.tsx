"use client";

import { useState } from "react";
import { BookCover } from "@/components/book-cover";
import { Badge } from "@/components/ui/badge";
import { PriceChip } from "@/components/price-chip";
import { Eye, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface RailCardProps {
  book: {
    id: string;
    title: string;
    series?: string;
    coverUrl: string;
    price?: string;
    badge?: string;
    backgroundColor?: string;
    difficulty?: string;
    specifications?: { pages: number };
  };
  onAdd?: () => void;
  onQuickView?: () => void;
  className?: string;
}

/**
 * RailCard — horizontal scrolling rail variant.
 * Width 220px, flex-shrink 0. Background from book.bg color.
 * Rounded-[14px], padding 10px. Series + title at top, cover below, stats row at bottom.
 */
export function RailCard({ book, onAdd, onQuickView, className }: RailCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(
        "flex w-[220px] flex-shrink-0 cursor-pointer flex-col gap-2.5 rounded-[14px] p-[10px] transition-all duration-[180ms]",
        hovered ? "-translate-y-0.5 shadow-[0_8px_18px_rgba(0,0,0,0.12)]" : "shadow-sm",
        className,
      )}
      style={{ background: book.backgroundColor ?? "#F5F2EA" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Series + Title at top (inside card, above cover) */}
      <div className="px-1">
        {book.series && (
          <div className="text-[11px] font-semibold uppercase tracking-[.06em] text-[#0D1801]/50">
            {book.series}
          </div>
        )}
        <div className="text-[15px] font-extrabold leading-tight text-[#0D1801]">
          {book.title}
        </div>
      </div>

      {/* Cover with overlays */}
      <div className="relative">
        <BookCover
          src={book.coverUrl}
          alt={book.title}
          radius={10}
          className="aspect-square w-full"
          backgroundColor={book.backgroundColor}
        />
        {/* Badge top-left */}
        {book.badge && (
          <div className="absolute left-2 top-2">
            <Badge variant="iroly">{book.badge}</Badge>
          </div>
        )}
        {/* Price chip bottom-left */}
        {book.price && (
          <div className="absolute bottom-2 left-2">
            <PriceChip price={book.price} />
          </div>
        )}
        {/* Hover overlay with Add To Bag */}
        {hovered && (
          <div className="absolute inset-0 flex items-end justify-center rounded-[10px] bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.55)] pb-3">
            <button
              className="flex items-center gap-1.5 rounded-full bg-[#BFFF00] px-3 py-1.5 text-xs font-bold text-[#0D1801] shadow hover:opacity-90"
              onClick={(e) => { e.stopPropagation(); onAdd?.(); }}
            >
              <ShoppingBag size={12} /> Add To Bag
            </button>
          </div>
        )}
      </div>

      {/* Bottom row: pages + difficulty, quick view button */}
      <div className="flex items-center justify-between px-1">
        <div className="text-[11px] text-[#0D1801]/60">
          {book.specifications && <>{book.specifications.pages} pages</>}
          {book.difficulty && <> · {book.difficulty}</>}
        </div>
        <button
          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0D1801]/[0.08] text-[#0D1801] hover:bg-[#0D1801]/[0.15]"
          onClick={(e) => { e.stopPropagation(); onQuickView?.(); }}
          title="Quick view"
        >
          <Eye size={13} />
        </button>
      </div>
    </div>
  );
}
