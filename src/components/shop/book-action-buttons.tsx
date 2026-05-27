"use client";

/**
 * BookActionButtons — client component for book detail page CTAs.
 * Contains: "Add To Bag" pill, "Try First Page Free" button, and wishlist heart.
 * Extracted from BookInfoPanel (server component) to allow hooks usage.
 */

import { AddToCartButton } from "@/components/add-to-cart-button";
import { useWishlist } from "@/hooks/use-wishlist";
import Link from "next/link";

interface BookActionButtonsProps {
  bookId: string;
  price?: string;
  tryoutPage?: string;
  addToBagLabel: string;
}

export function BookActionButtons({
  bookId,
  price,
  tryoutPage,
  addToBagLabel,
}: BookActionButtonsProps) {
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(bookId);

  return (
    <div className="flex flex-wrap gap-2.5">
      <AddToCartButton
        bookId={bookId}
        variant="pill"
        price={price}
        className="flex-1"
      />
      <Link
        href={tryoutPage ?? "/free-pages"}
        target={tryoutPage ? "_blank" : undefined}
        rel={tryoutPage ? "noopener noreferrer" : undefined}
        className="flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-[18px] text-[16px] font-bold"
        style={{
          background: "#BFFF00",
          color: "#0D1801",
        }}
      >
        Try First Page Free
      </Link>
      <button
        className="flex h-14 w-14 items-center justify-center rounded-full transition-colors"
        style={{
          background: "#fff",
          border: "1.5px solid rgba(0,0,0,.1)",
          cursor: "pointer",
        }}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggle(bookId)}
      >
        <HeartIcon filled={wishlisted} />
      </button>
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "#DC2626" : "none"}
      stroke={filled ? "#DC2626" : "#0D1801"}
      strokeWidth="2"
    >
      <path d="M12 21s-7-5-9-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 5-9 10-9 10z" />
    </svg>
  );
}
