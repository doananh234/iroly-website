/**
 * Right-hand info panel for the book detail page.
 * Shows title, rating, price, description, specs, tags, CTAs, credits upsell.
 */
import type { FallbackBook } from "@/data/fallback";
import { BookActionButtons } from "@/components/shop/book-action-buttons";

interface BookInfoPanelProps {
  book: FallbackBook;
  addToBagLabel: string;
}

export function BookInfoPanel({ book, addToBagLabel }: BookInfoPanelProps) {
  return (
    <div>
      {/* Series */}
      <div
        className="text-[13px] font-bold uppercase tracking-[.06em]"
        style={{ color: "#777" }}
      >
        {book.series}
      </div>

      {/* Title */}
      <h1
        className="mb-3.5 mt-1.5 text-[36px] leading-[1] tracking-[-0.025em] sm:text-[44px] md:text-[56px]"
        style={{ fontWeight: 900, fontFamily: "var(--font-display)" }}
      >
        {book.title}
      </h1>

      {/* Rating row */}
      <div className="mb-[18px] flex flex-wrap items-center gap-3.5 text-[13px]">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} />
          ))}
        </div>
        <span className="font-bold" style={{ color: "#0D1801" }}>4.92</span>
        <span style={{ color: "#999" }}>·</span>
        <span style={{ color: "#666" }}>312 reviews</span>
        <span style={{ color: "#999" }}>·</span>
        <span style={{ color: "#666" }}>
          {book.participantCount.toLocaleString()} coloring this
        </span>
      </div>

      {/* Price */}
      <div className="mb-[22px] flex items-baseline gap-3">
        <span
          className="text-[32px] leading-none tracking-[-0.02em] sm:text-[40px]"
          style={{ fontWeight: 900, fontFamily: "var(--font-display)" }}
        >
          {book.price}
        </span>
        {book.oldPrice && (
          <span className="text-[18px] line-through" style={{ color: "#999" }}>
            {book.oldPrice}
          </span>
        )}
        {book.oldPrice && (
          <span
            className="rounded-full px-2.5 py-1 text-[12px] font-bold"
            style={{ background: "#DC2626", color: "#fff" }}
          >
            33% Off · Ends Sun
          </span>
        )}
      </div>

      {/* Description */}
      <p
        className="mb-6 max-w-[520px] leading-[1.55]"
        style={{ fontSize: 17, color: "#3a3a3a" }}
      >
        {book.description ??
          "A beautiful coloring book with detailed illustrations. Perfect for unwinding and expressing your creativity."}
      </p>

      {/* Spec cards */}
      <div className="mb-6 grid grid-cols-3 gap-2.5">
        {[
          { k: "Pages", v: String(book.pages) },
          { k: "Difficulty", v: book.difficulty },
          { k: "Format", v: "iPad · iPhone · Print" },
        ].map(({ k, v }) => (
          <div
            key={k}
            className="flex flex-col gap-1 rounded-[12px] px-3.5 py-3"
            style={{ background: "var(--iroly-bg-2)" }}
          >
            <div
              className="text-[11px] font-semibold uppercase tracking-[.04em]"
              style={{ color: "var(--iroly-fg-muted)" }}
            >
              {k}
            </div>
            <div className="text-[14px] font-extrabold" style={{ color: "var(--iroly-fg)" }}>
              {v}
            </div>
          </div>
        ))}
      </div>

      {/* Tags */}
      {book.tags && book.tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-1.5">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1.5 text-[12px] font-semibold"
              style={{ background: "rgba(0,0,0,.05)", color: "#1d2a14" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA buttons (client component for wishlist + try-free interactivity) */}
      <BookActionButtons
        bookId={book.id}
        price={book.price}
        tryoutPage={book.tryoutPage}
        addToBagLabel={addToBagLabel}
      />

      {/* Credits upsell */}
      <div
        className="mt-[18px] flex items-center gap-3 rounded-[14px] p-3.5"
        style={{ background: "#FFFAE5" }}
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
          style={{ background: "#BFFF00" }}
        >
          <DiamondIcon />
        </div>
        <div className="text-[13px]" style={{ color: "#3a3a14" }}>
          Or unlock with <b>12 credits</b> from your wallet. Save 25% on the 60-credit pack.
        </div>
      </div>
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#0D1801" stroke="none">
      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D1801" strokeWidth="2">
      <path d="M6 3h12l4 6-10 13L2 9z" />
    </svg>
  );
}
