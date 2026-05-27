import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { FallbackCategory } from "@/data/fallback";

interface CategoryRailSectionProps {
  categories: FallbackCategory[];
}

/**
 * "Browse by mood" category circle rail.
 * Matches prototype pages.jsx CategoryRail — 7-column grid, light cream bg,
 * top/bottom border in rgba(0,0,0,.04).
 */
export async function CategoryRailSection({ categories }: CategoryRailSectionProps) {
  const t = await getTranslations("home");

  return (
    <section className="border-b border-t border-[var(--iroly-border)] bg-[var(--iroly-bg)] py-10">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        {/* Header row */}
        <div className="mb-6 flex items-baseline justify-between">
          <h3 className="font-display m-0 text-[22px] font-black text-[var(--iroly-fg)]">
            {t("categories.title")}
          </h3>
          <Link
            href="/shop"
            className="text-sm font-semibold text-[#666] no-underline hover:text-[#0D1801]"
          >
            {t("categories.viewAll")} →
          </Link>
        </div>

        {/* 7-column grid — collapses to 4 on mobile, 7 on lg */}
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-7 sm:gap-[18px]">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}` as any}
              className="flex flex-col items-center gap-2 no-underline"
            >
              {/* Circle */}
              <div
                className="w-full rounded-full p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                style={{ background: cat.backgroundColor, aspectRatio: "1" }}
              >
                <div
                  className="relative h-full w-full overflow-hidden rounded-full"
                  style={{ background: cat.backgroundColor }}
                >
                  <Image
                    src={`/assets/categories/${cat.id}.png`}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-center text-[13px] font-semibold text-[var(--iroly-fg)]">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
