import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SkewUnderline } from "@/components/skew-underline";
import { ShopCategoryFilter } from "@/components/shop/shop-category-filter";
import { ShopSidebarFacets } from "@/components/shop/shop-sidebar-facets";
import { ShopBookGrid } from "@/components/shop/shop-book-grid";
import { ShopSortSelect } from "@/components/shop/shop-sort-select";
import { getPublicBooksForShop } from "@/data/books";
import { getPublicCategories } from "@/data/categories";
import type { FallbackBook } from "@/data/fallback";

export const revalidate = 120;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  const title = t("title");
  const description = t("subtitle");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/shop`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: "/assets/logos/app-icon.png", width: 512, height: 512 }],
      type: "website",
      siteName: "iRoly",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function filterAndSort(
  books: FallbackBook[],
  category: string | undefined,
  sort: string | undefined,
  q: string | undefined
): FallbackBook[] {
  let result = [...books];

  // Filter by category
  if (category) {
    result = result.filter((b) => b.category === category);
  }

  // Filter by search query
  if (q) {
    const query = q.toLowerCase();
    result = result.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.series.toLowerCase().includes(query)
    );
  }

  // Filter by difficulty (via sidebar)
  // difficulty param handled below in main — passed in via separate arg if needed

  // Sort
  switch (sort) {
    case "newest":
      result = result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case "price-low":
      result = result.sort(
        (a, b) => parseFloat(a.price.replace(/[^\d.]/g, "")) - parseFloat(b.price.replace(/[^\d.]/g, ""))
      );
      break;
    case "price-high":
      result = result.sort(
        (a, b) => parseFloat(b.price.replace(/[^\d.]/g, "")) - parseFloat(a.price.replace(/[^\d.]/g, ""))
      );
      break;
    case "popular":
    default:
      result = result.sort((a, b) => a.rank - b.rank);
      break;
  }

  return result;
}

export default async function ShopPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ sort?: string; q?: string; difficulty?: string }>;
}) {
  const { locale } = await params;
  const { sort, q, difficulty } = await searchParams;

  const books: FallbackBook[] = await getPublicBooksForShop();
  const categories = await getPublicCategories();

  // Apply difficulty filter from sidebar
  let filteredBooks = books;
  if (difficulty) {
    filteredBooks = filteredBooks.filter(
      (b) => b.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }

  filteredBooks = filterAndSort(filteredBooks, undefined, sort, q);

  const totalCount = filteredBooks.length;

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "var(--font-sans)", color: "var(--iroly-fg)", background: "var(--iroly-bg)" }}
    >
      {/* Hero gradient band */}
      <section style={{ background: "linear-gradient(180deg, #BFFF00 0%, #E8FF99 60%, #FFFDF8 100%)" }}>
        <div
          className="mx-auto flex flex-col gap-4 px-4 pb-8 pt-10 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:pb-10 sm:pt-[52px] md:px-8"
          style={{ maxWidth: 1320 }}
        >
          <div>
            <div
              className="text-[12px] font-bold uppercase tracking-[.06em]"
              style={{ color: "#0D1801" }}
            >
              The Library · {totalCount} Books
              {q && <span className="ml-2 normal-case font-normal">for &ldquo;{q}&rdquo;</span>}
            </div>
            <h1
              className="m-0 mt-3 leading-[0.95] tracking-[-0.03em] text-[40px] sm:text-[60px] md:text-[80px]"
              style={{
                fontWeight: 900,
                fontFamily: "var(--font-display)",
                color: "#0D1801",
              }}
            >
              Shop{" "}
              <SkewUnderline color="rgba(255,255,255,.7)" height="55%">
                everything.
              </SkewUnderline>
            </h1>
          </div>

          {/* Sort controls */}
          <div className="flex items-center gap-2">
            <ShopSortSelect currentSort={sort} />
          </div>
        </div>
      </section>

      {/* Category pill rail */}
      <div className="mx-auto px-4 pt-5 sm:px-6 md:px-8" style={{ maxWidth: 1320 }}>
        <ShopCategoryFilter categories={categories.map((c) => ({ id: c.id, name: c.displayName || c.name }))} />
      </div>

      {/* Sidebar + grid */}
      <section
        className="mx-auto grid grid-cols-1 gap-6 px-4 pb-20 pt-8 sm:px-6 md:px-8 lg:grid-cols-[240px_1fr] lg:gap-9"
        style={{
          maxWidth: 1320,
          fontFamily: "var(--font-sans)",
        }}
      >
        {/* Sidebar: hidden on mobile, shown on lg+ */}
        <div className="hidden lg:block">
          <ShopSidebarFacets
            activeDifficulty={difficulty}
            currentSort={sort}
            currentQ={q}
          />
        </div>
        <ShopBookGrid books={filteredBooks} totalCount={totalCount} />
      </section>
    </div>
  );
}
