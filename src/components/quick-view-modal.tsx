"use client";

/**
 * QuickViewModal — shown when user clicks "Quick Look" on a BookCard.
 * Shows book cover on a colored bg (left) + book info (right).
 */

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BookCover } from "@/components/book-cover";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export interface QuickViewBook {
  id: string;
  title: string;
  series?: string;
  coverUrl: string;
  price?: string;
  oldPrice?: string;
  badge?: string;
  backgroundColor?: string;
  difficulty?: string;
  tags?: string[];
  description?: string;
  pages?: number;
  tryoutPage?: string;
}

interface QuickViewModalProps {
  book: QuickViewBook;
  open: boolean;
  onClose: () => void;
}

export function QuickViewModal({ book, open, onClose }: QuickViewModalProps) {
  const t = useTranslations("common");
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-h-[90vh] max-w-[90vw] overflow-hidden rounded-[20px] p-0 sm:max-w-[720px]">
        <DialogTitle className="sr-only">{book.title} — Quick View</DialogTitle>

        <div className="flex max-h-[90vh] flex-col sm:flex-row">
          {/* Left: cover on colored bg */}
          <div
            className="flex shrink-0 items-center justify-center p-6 sm:w-[260px] sm:p-8"
            style={{ background: book.backgroundColor ?? "#FFE8C2" }}
          >
            <BookCover
              src={book.coverUrl}
              alt={book.title}
              radius={12}
              className="h-[180px] w-[180px] sm:h-[220px] sm:w-[220px]"
            />
          </div>

          {/* Right: book info — scrollable */}
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-5 sm:gap-4 sm:p-6">
            {/* Badge + series */}
            <div className="flex flex-wrap items-center gap-2">
              {book.badge && <Badge variant="iroly">{book.badge}</Badge>}
              {book.series && (
                <span className="text-[11px] font-bold uppercase tracking-[.06em] text-gray-500">
                  {book.series}
                </span>
              )}
            </div>

            {/* Title */}
            <h2
              className="text-[22px] font-black leading-tight tracking-[-0.02em] text-[var(--iroly-fg)] sm:text-[26px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {book.title}
            </h2>

            {/* Specs row */}
            <div className="flex flex-wrap gap-1.5 text-[12px]">
              {book.pages != null && (
                <span className="rounded-lg bg-[var(--iroly-bg-2)] px-2.5 py-1.5 font-semibold text-[var(--iroly-fg)]">
                  {book.pages} pages
                </span>
              )}
              {book.difficulty && (
                <span className="rounded-lg bg-[var(--iroly-bg-2)] px-2.5 py-1.5 font-semibold text-[var(--iroly-fg)]">
                  {book.difficulty}
                </span>
              )}
              <span className="rounded-lg bg-[var(--iroly-bg-2)] px-2.5 py-1.5 font-semibold text-[var(--iroly-fg)]">
                iPad · iPhone · Print
              </span>
            </div>

            {/* Price */}
            {book.price && (
              <div className="flex items-baseline gap-2">
                <span
                  className="text-[24px] font-black tracking-[-0.02em] text-[var(--iroly-fg)] sm:text-[26px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {book.price}
                </span>
                {book.oldPrice && (
                  <span className="text-[14px] text-gray-400 line-through">
                    {book.oldPrice}
                  </span>
                )}
              </div>
            )}

            {/* CTA Buttons — always stacked (2 rows) for clean layout */}
            <div className="mt-auto flex flex-col gap-2 border-t border-[var(--iroly-border)] pt-4">
              <AddToCartButton
                bookId={book.id}
                variant="pill"
                price={book.price}
                className="w-full"
              />
              <Link
                href={(book.tryoutPage ?? "/free-pages") as any}
                target={book.tryoutPage ? "_blank" : undefined}
                rel={book.tryoutPage ? "noopener noreferrer" : undefined}
                className="flex h-[44px] w-full items-center justify-center rounded-full text-[14px] font-bold"
                style={{ background: "#BFFF00", color: "#0D1801" }}
              >
                {t("actions.tryFree")}
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
