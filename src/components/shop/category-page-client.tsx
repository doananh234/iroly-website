"use client";
/**
 * Client-side wrapper for the category page.
 * Receives all category books at build time, handles sorting
 * via URL search params on the client so the page can be fully static.
 */
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Link } from "@/i18n/navigation";
import { SkewUnderline } from "@/components/skew-underline";
import { BookCard } from "@/components/book-card";
import { ShopSortSelect } from "@/components/shop/shop-sort-select";
import { JsonLd } from "@/components/json-ld";
import type { FallbackBook } from "@/data/fallback";

interface CategoryInfo {
  id: string;
  name: string;
  backgroundColor: string;
}

interface CategoryItem {
  id: string;
  name: string;
}

interface CategoryPageClientProps {
  category: CategoryInfo;
  books: FallbackBook[];
  allCategories: CategoryItem[];
  shopTitle: string;
}

function sortBooks(books: FallbackBook[], sort?: string): FallbackBook[] {
  const sorted = [...books];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case "price-low":
      return sorted.sort(
        (a, b) =>
          parseFloat(a.price.replace(/[^\d.]/g, "")) -
          parseFloat(b.price.replace(/[^\d.]/g, "")),
      );
    case "price-high":
      return sorted.sort(
        (a, b) =>
          parseFloat(b.price.replace(/[^\d.]/g, "")) -
          parseFloat(a.price.replace(/[^\d.]/g, "")),
      );
    default:
      return sorted.sort((a, b) => a.rank - b.rank);
  }
}

export function CategoryPageClient({
  category,
  books,
  allCategories,
  shopTitle,
}: CategoryPageClientProps) {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? undefined;

  const sortedBooks = useMemo(() => sortBooks(books, sort), [books, sort]);

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "var(--font-sans)",
        color: "var(--iroly-fg)",
        background: "var(--iroly-bg)",
      }}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${category.name} Coloring Books`,
          description: `Browse ${category.name} coloring books on iRoly`,
          numberOfItems: sortedBooks.length,
        }}
      />
      {/* Hero gradient band */}
      <section
        style={{
          background: `linear-gradient(180deg, ${category.backgroundColor} 0%, var(--iroly-bg) 100%)`,
        }}
      >
        <div
          className="mx-auto px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-[52px] md:px-8"
          style={{ maxWidth: 1320 }}
        >
          {/* Breadcrumb */}
          <div
            className="mb-4 flex items-center gap-1.5 text-[13px]"
            style={{ color: "var(--iroly-fg-muted)" }}
          >
            <Link
              href="/shop"
              className="hover:text-[var(--iroly-fg)]"
              style={{ color: "var(--iroly-fg-muted)", textDecoration: "none" }}
            >
              {shopTitle}
            </Link>
            <span>&rarr;</span>
            <span
              className="font-semibold"
              style={{ color: "var(--iroly-fg)" }}
            >
              {category.name}
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1
                className="m-0 leading-[0.95] tracking-[-0.03em] text-[36px] sm:text-[56px] md:text-[72px]"
                style={{ fontWeight: 900, fontFamily: "var(--font-display)" }}
              >
                <SkewUnderline color="rgba(255,255,255,.7)" height="55%">
                  {category.name}
                </SkewUnderline>
              </h1>
              <p
                className="mt-3 text-[15px]"
                style={{ color: "var(--iroly-fg-muted)" }}
              >
                {sortedBooks.length}{" "}
                {sortedBooks.length === 1 ? "book" : "books"}
              </p>
            </div>
            <ShopSortSelect currentSort={sort} />
          </div>
        </div>
      </section>

      {/* Category pill rail */}
      <div
        className="mx-auto px-4 pt-5 sm:px-6 md:px-8"
        style={{ maxWidth: 1320 }}
      >
        <div
          className="flex gap-2 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          <Link
            href="/shop"
            className="shrink-0 rounded-full px-[18px] py-[10px] text-[13px] font-bold no-underline transition-colors"
            style={{
              background: "rgba(0,0,0,.04)",
              color: "var(--iroly-fg)",
              whiteSpace: "nowrap",
            }}
          >
            All
          </Link>
          {allCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}` as any}
              className="shrink-0 rounded-full px-[18px] py-[10px] text-[13px] font-bold no-underline transition-colors"
              style={{
                background:
                  cat.id === category.id
                    ? "var(--iroly-fg)"
                    : "rgba(0,0,0,.04)",
                color:
                  cat.id === category.id
                    ? "var(--iroly-accent)"
                    : "var(--iroly-fg)",
                whiteSpace: "nowrap",
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Book grid */}
      <section
        className="mx-auto px-4 pb-20 pt-8 sm:px-6 md:px-8"
        style={{ maxWidth: 1320 }}
      >
        {sortedBooks.length === 0 ? (
          <div
            className="py-20 text-center text-[15px]"
            style={{ color: "var(--iroly-fg-muted)" }}
          >
            No books found in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-[18px] sm:grid-cols-3 lg:grid-cols-4">
            {sortedBooks.map((book) => (
              <BookCard
                key={book.id}
                href={`/shop/${book.id}`}
                book={{
                  id: book.id,
                  title: book.title,
                  series: book.series,
                  coverUrl: book.coverUrl,
                  price: book.price,
                  oldPrice: book.oldPrice ?? undefined,
                  badge: book.badge ?? undefined,
                  backgroundColor: book.backgroundColor,
                  difficulty: book.difficulty,
                  specifications: { pages: book.pages },
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
