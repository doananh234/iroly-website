import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { SkewUnderline } from "@/components/skew-underline";
import { Download, Palette } from "lucide-react";
import type { FallbackBook } from "@/data/fallback";

/**
 * "A new free page every Friday" dark CTA section.
 * Shows random free coloring pages from public books.
 */

interface FreeTeaserSectionProps {
  books?: FallbackBook[];
  configuredPages?: { title: string; series: string; imageUrl: string; backgroundColor: string }[];
}

/** Pick N random items from array */
function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

/** Get free coloring page images from books */
function getFreePages(books: FallbackBook[]): { title: string; series: string; imageUrl: string; backgroundColor: string }[] {
  const pages: { title: string; series: string; imageUrl: string; backgroundColor: string }[] = [];
  for (const book of books) {
    if (!book.previewPages?.length) continue;
    for (const url of book.previewPages) {
      pages.push({
        title: book.title,
        series: book.series || book.category,
        imageUrl: url,
        backgroundColor: book.backgroundColor || "#DDF4D2",
      });
    }
  }
  return pages;
}

export async function FreeTeaserSection({ books = [], configuredPages }: FreeTeaserSectionProps) {
  const t = await getTranslations("home.freeTeaser");

  // Use admin-configured pages if available, otherwise random from books
  const selected = configuredPages && configuredPages.length > 0
    ? configuredPages.slice(0, 3)
    : pickRandom(getFreePages(books), 3);

  const main = selected[0];
  const card1 = selected[1];
  const card2 = selected[2];

  return (
    <section className="mx-auto max-w-[1320px] px-4 py-16 sm:px-8">
      <div className="overflow-hidden rounded-[28px] bg-[#0D1801] px-6 py-10 sm:px-10 md:px-14 md:py-14">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 inline-block rounded bg-[#BFFF00] px-[10px] py-1 text-xs font-bold uppercase tracking-[.04em] text-[#0D1801]">
            {t("kicker")}
          </div>
          <h2 className="font-display m-0 text-[32px] font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-[40px] md:text-[44px]">
            {t("titleStart")}
            <SkewUnderline color="rgba(191,255,0,0.35)" height="55%">
              {t("titleHighlight")}
            </SkewUnderline>
            {t("titleEnd")}
          </h2>
          <p className="mt-3 max-w-[560px] text-[17px] text-white/70">
            {t("subtitle")}
          </p>
        </div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {/* Main featured card */}
          <div className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[20px] bg-[#FFEDA0] p-6 sm:min-h-[360px] sm:col-span-1">
            <div>
              <div className="mb-2 inline-block rounded-[12px_12px_12px_4px] bg-[#0D1801] px-2.5 py-1 text-[12px] font-bold text-[#BFFF00]">
                Free This Week
              </div>
              <h3 className="font-display mt-3 text-[26px] font-black leading-tight text-[#0D1801]">
                {main?.title || "Free Coloring Page"}
              </h3>
            </div>
            {main?.imageUrl && (
              <div className="my-3 flex items-center justify-center rounded-[14px] bg-white/80 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={main.imageUrl} alt={main.title} className="h-32 w-32 rounded-lg object-cover" />
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/free-pages"
                className="inline-flex items-center gap-2 rounded-full bg-[#0D1801] px-4 py-2.5 text-sm font-bold text-white no-underline hover:opacity-90"
              >
                <Download size={16} /> {t("cta")}
              </Link>
              <Link
                href="/paint"
                className="inline-flex items-center gap-2 rounded-full border border-[#0D1801]/20 bg-white px-4 py-2.5 text-sm font-bold text-[#0D1801] no-underline hover:opacity-90"
              >
                <Palette size={16} /> Color in App
              </Link>
            </div>
          </div>

          {/* Secondary card 1 */}
          <FreeTeaserCard page={card1} fallbackBg="#DDF4D2" ctaLabel="Print PDF" />

          {/* Secondary card 2 */}
          <FreeTeaserCard page={card2} fallbackBg="#FCE7F3" ctaLabel="Print PDF" />
        </div>

        {/* Footer link */}
        <div className="mt-6 text-center">
          <Link
            href="/free-pages"
            className="text-sm font-semibold text-[#BFFF00] no-underline hover:underline"
          >
            {t("ctaSecondary")} →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FreeTeaserCard({
  page,
  fallbackBg,
  ctaLabel,
}: {
  page?: { title: string; series: string; imageUrl: string; backgroundColor: string };
  fallbackBg: string;
  ctaLabel: string;
}) {
  const bg = page?.backgroundColor || fallbackBg;

  return (
    <div className="flex min-h-[260px] flex-col justify-between rounded-[20px] p-5" style={{ background: bg }}>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[.06em] text-[#0D1801]/60">
          {page?.series || "Coloring Page"}
        </div>
        <h4 className="font-display mt-1.5 text-[22px] font-black leading-tight text-[#0D1801]">
          {page?.title || "Free Page"}
        </h4>
      </div>
      <div className="my-3 flex flex-1 items-center justify-center rounded-[14px] bg-white/80 p-3">
        {page?.imageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={page.imageUrl} alt={page.title} className="h-28 w-28 rounded-lg object-cover" />
        ) : (
          <div className="h-24 w-24 rounded-full" style={{ background: bg }} aria-hidden />
        )}
      </div>
      <Link
        href="/free-pages"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0D1801] px-4 py-2.5 text-sm font-bold text-white no-underline hover:opacity-90"
      >
        <Download size={16} /> {ctaLabel}
      </Link>
    </div>
  );
}
