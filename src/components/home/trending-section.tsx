import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { SectionHead } from "@/components/section-head";
import { TrendingCard } from "@/components/trending-card";
import { SkewUnderline } from "@/components/skew-underline";
import type { FallbackBook } from "@/data/fallback";

interface TrendingSectionProps {
  books: FallbackBook[];
}

/**
 * "This Week's Top 10" trending section.
 * Row 1: 5 large comfy cards (ranks 1-5).
 * Row 2: 5 compact horizontal cards (ranks 6-10).
 * Matches prototype pages.jsx Trending component.
 */
export async function TrendingSection({ books }: TrendingSectionProps) {
  const t = await getTranslations("home");
  const top10 = books.slice(0, 10);

  return (
    <section className="mx-auto max-w-[1320px] px-4 py-16 sm:px-8">
      <SectionHead
        kicker={t("trending.kicker")}
        title={
          <span>
            <SkewUnderline height="55%">{t("trending.title")}</SkewUnderline>
          </span>
        }
        subtitle={t("trending.subtitle")}
        action={
          <Link
            href="/shop"
            className="flex-shrink-0 text-sm font-semibold text-[#666] no-underline hover:text-[#0D1801]"
          >
            See All →
          </Link>
        }
      />

      {/* Row 1: ranks 1–5, large vertical cards */}
      <div className="grid grid-cols-2 gap-[18px] sm:grid-cols-3 lg:grid-cols-5">
        {top10.slice(0, 5).map((book) => (
          <TrendingCard
            key={book.id}
            rank={book.rank}
            variant="comfy"
            book={{
              id: book.id,
              title: book.title,
              series: book.series,
              coverUrl: book.coverUrl,
              price: book.price,
              backgroundColor: book.backgroundColor,
              participantCount: book.participantCount,
            }}
          />
        ))}
      </div>

      {/* Row 2: ranks 6–10, compact horizontal cards */}
      {top10.length > 5 && (
        <div className="mt-[18px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-5">
          {top10.slice(5, 10).map((book) => (
            <TrendingCard
              key={book.id}
              rank={book.rank}
              variant="compact"
              book={{
                id: book.id,
                title: book.title,
                series: book.series,
                coverUrl: book.coverUrl,
                price: book.price,
                backgroundColor: book.backgroundColor,
                participantCount: book.participantCount,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
