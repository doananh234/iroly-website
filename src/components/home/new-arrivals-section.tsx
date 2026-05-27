import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { SectionHead } from "@/components/section-head";
import { BookCard } from "@/components/book-card";
import type { FallbackBook } from "@/data/fallback";

interface NewArrivalsSectionProps {
  books: FallbackBook[];
}

/**
 * New Arrivals — 4-column BookCard grid.
 * Matches prototype PageHome `New Arrivals` Section (after Trending in current spec order).
 */
export async function NewArrivalsSection({ books }: NewArrivalsSectionProps) {
  const t = await getTranslations("home");
  const arrivals = books.filter((b) => b.isNew).slice(0, 4);
  // Fall back to first 4 books if no "new" books are tagged
  const displayBooks = arrivals.length >= 4 ? arrivals : books.slice(0, 4);

  return (
    <section className="border-t border-[var(--iroly-border)] bg-[var(--iroly-bg-3)] py-16">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionHead
          kicker={t("newArrivals.kicker")}
          title={t("newArrivals.title")}
          action={
            <Link
              href="/shop"
              className="flex-shrink-0 text-sm font-semibold text-[#666] no-underline hover:text-[#0D1801]"
            >
              See All →
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {displayBooks.map((book) => (
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
      </div>
    </section>
  );
}
