"use client";

import { BookCover } from "@/components/book-cover";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrendingCardProps {
  book: {
    id: string;
    title: string;
    series?: string;
    coverUrl: string;
    price?: string;
    backgroundColor?: string;
    participantCount?: number;
  };
  rank: number;
  /** compact = horizontal list row (ranks 6-10), comfy = vertical card (ranks 1-5) */
  variant?: "comfy" | "compact";
  className?: string;
  onClick?: () => void;
}

/**
 * Trending card matching prototype pages.jsx Trending section.
 * Comfy (top 5): vertical card with cover, TOP.n pill, series+title+stats below.
 * Compact (bottom 5): horizontal row with small cover and details.
 */
export function TrendingCard({
  book,
  rank,
  variant = "comfy",
  className,
  onClick,
}: TrendingCardProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex cursor-pointer items-center gap-3 rounded-[14px] bg-[var(--iroly-bg-3)] p-3 transition-all hover:shadow-md",
          className,
        )}
        onClick={onClick}
      >
        {/* Small cover with TOP pill */}
        <div className="relative flex-shrink-0">
          <BookCover
            src={book.coverUrl}
            alt={book.title}
            size={72}
            radius={10}
            backgroundColor={book.backgroundColor}
          />
          <div
            className="absolute -left-1.5 -top-2 rounded-[16px] bg-[#0D1801] px-2 py-0.5 text-[11px] font-black italic text-white"
            style={{ lineHeight: 1.2 }}
          >
            TOP.{rank}
          </div>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          {book.series && (
            <div className="text-[11px] font-semibold uppercase tracking-[.06em] text-[#777]">
              {book.series}
            </div>
          )}
          <div className="truncate text-[14px] font-extrabold text-[var(--iroly-fg)]">
            {book.title}
          </div>
          <div className="mt-1 flex items-center gap-2">
            {book.participantCount !== undefined && (
              <span className="inline-flex items-center gap-1 text-[11px] text-[#555]">
                <User size={10} className="text-[#555]" />
                {book.participantCount.toLocaleString()}
              </span>
            )}
            {book.price && (
              <span className="text-[13px] font-black text-[#0D1801]">{book.price}</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // comfy: vertical card (rank 1-5)
  return (
    <div
      className={cn(
        "relative cursor-pointer rounded-[18px] bg-[var(--iroly-bg-2)] p-4 pt-9 transition-all hover:shadow-[0_8px_18px_rgba(0,0,0,0.10)]",
        className,
      )}
      onClick={onClick}
    >
      {/* TOP.n pill — rotated, outside top edge */}
      <div
        className="absolute -top-3.5 right-3.5 rotate-[8deg] rounded-[20px] bg-[#0D1801] px-3 py-1.5 text-[13px] font-black italic text-white shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
      >
        TOP.{rank}
      </div>

      {/* Cover */}
      <BookCover
        src={book.coverUrl}
        alt={book.title}
        radius={12}
        className="aspect-square w-full"
        backgroundColor={book.backgroundColor}
      />

      {/* Info below cover */}
      <div className="mt-3">
        {book.series && (
          <div className="text-[11px] font-semibold uppercase tracking-[.06em] text-[#777]">
            {book.series}
          </div>
        )}
        <div className="text-[16px] font-extrabold text-[var(--iroly-fg)]">{book.title}</div>
        <div className="mt-2 flex items-center justify-between">
          {book.participantCount !== undefined && (
            <span className="inline-flex items-center gap-1 text-[12px] text-[#555]">
              <User size={12} className="text-[#555]" />
              {book.participantCount.toLocaleString()}
            </span>
          )}
          {book.price && (
            <span className="text-[15px] font-black text-[#0D1801]">{book.price}</span>
          )}
        </div>
      </div>
    </div>
  );
}
