"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BookCover } from "@/components/book-cover";
import { Badge } from "@/components/ui/badge";
import { PriceChip } from "@/components/price-chip";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { QuickViewModal } from "@/components/quick-view-modal";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: {
    id: string;
    title: string;
    series?: string;
    coverUrl: string;
    price?: string;
    oldPrice?: string;
    badge?: string;
    discount?: string;
    backgroundColor?: string;
    category?: string;
    difficulty?: string;
    specifications?: { pages: number };
    tags?: string[];
    description?: string;
    pages?: number;
    tryoutPage?: string;
  };
  /** Link destination, e.g. "/shop/tiny-friends" */
  href?: string;
  density?: "compact" | "comfy";
}

export function BookCard({ book, href, density = "comfy" }: BookCardProps) {
  const t = useTranslations("common");
  const [hovered, setHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const pad = density === "compact" ? "p-[6px]" : "p-[10px]";

  const cardContent = (
    <>
      {/* Cover area */}
      <div className="relative">
        <BookCover
          src={book.coverUrl}
          alt={book.title}
          radius={10}
          className="aspect-square w-full"
          backgroundColor={book.backgroundColor}
        />
        {book.badge && (
          <div className="absolute left-2.5 top-2.5">
            <Badge variant="iroly">{book.badge}</Badge>
          </div>
        )}
        {book.discount && (
          <div className="absolute right-2.5 top-2.5">
            <Badge variant="discount">{book.discount}</Badge>
          </div>
        )}
        {book.price && (
          <div className="absolute bottom-2.5 left-2.5">
            <PriceChip price={book.price} />
          </div>
        )}
        {/* Hover overlay */}
        <div
          className={cn(
            "absolute inset-0 flex items-end justify-between rounded-[10px] bg-gradient-to-t from-black/55 to-transparent p-2.5 transition-opacity duration-[180ms]",
            hovered ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <button
            className="rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-bold text-[#0D1801]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowQuickView(true);
            }}
          >
            {t("actions.quickLook")}
          </button>
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <AddToCartButton bookId={book.id} variant="inline" />
          </div>
        </div>
      </div>

      {/* Info area */}
      <div className="flex flex-col gap-1 px-1 pb-0.5">
        {(book.series || book.category) && (
          <div className="text-[11px] font-medium uppercase tracking-[.06em] text-[var(--iroly-fg-muted)]">
            {book.series ?? book.category}
          </div>
        )}
        <div
          className={cn(
            "font-extrabold leading-tight text-[var(--iroly-fg)]",
            density === "compact" ? "text-[13px]" : "text-[15px]",
          )}
        >
          {book.title}
        </div>
        {book.specifications && (
          <div className="text-[11px] text-[var(--iroly-fg-muted)]">
            {book.specifications.pages} pages
            {book.difficulty && <> · {book.difficulty}</>}
          </div>
        )}
      </div>
    </>
  );

  const cardClasses = cn(
    "flex cursor-pointer flex-col gap-3 rounded-[14px] border border-[var(--iroly-border)] bg-[var(--iroly-card)] no-underline transition-all duration-[180ms]",
    pad,
    hovered ? "-translate-y-0.5 shadow-[0_8px_18px_rgba(0,0,0,0.10)]" : "shadow-none",
  );

  return (
    <>
      {href ? (
        <Link
          href={href as any}
          className={cn(cardClasses, "block")}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {cardContent}
        </Link>
      ) : (
        <div
          className={cardClasses}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {cardContent}
        </div>
      )}

      {/* Quick View Modal — rendered outside the link to avoid nesting issues */}
      <QuickViewModal
        book={{
          id: book.id,
          title: book.title,
          series: book.series,
          coverUrl: book.coverUrl,
          price: book.price,
          oldPrice: book.oldPrice,
          badge: book.badge,
          backgroundColor: book.backgroundColor,
          difficulty: book.difficulty,
          tags: book.tags,
          description: book.description,
          pages: book.pages ?? book.specifications?.pages,
          tryoutPage: book.tryoutPage,
        }}
        open={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
}
