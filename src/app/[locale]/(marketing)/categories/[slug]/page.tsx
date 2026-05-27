import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { SkewUnderline } from "@/components/skew-underline";
import { BookCard } from "@/components/book-card";
import { ShopSortSelect } from "@/components/shop/shop-sort-select";
import { JsonLd } from "@/components/json-ld";
import { getPublicBooksForShop } from "@/data/books";
import { getPublicCategories } from "@/data/categories";
import { FALLBACK_CATEGORIES } from "@/data/fallback";
import type { FallbackBook } from "@/data/fallback";

export const revalidate = 120;

// Pre-render all category pages at build time
export async function generateStaticParams() {
  const categories = await getPublicCategories();
  if (categories.length > 0) {
    return categories.map((cat) => ({ slug: cat.id }));
  }
  return FALLBACK_CATEGORIES.map((cat) => ({ slug: cat.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const allCats = await getPublicCategories();
  const cat = allCats.find((c) => c.id === slug);
  if (!cat) return { title: "Category Not Found" };

  const t = await getTranslations({ locale, namespace: "shop" });
  const catName = cat.displayName || cat.name;
  const title = `${catName} — ${t("title")}`;
  const description = `Browse ${catName} coloring books on iRoly. Cute, calm, low-pressure coloring for everyone.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/categories/${slug}`,
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

function sortBooks(books: FallbackBook[], sort?: string): FallbackBook[] {
  const sorted = [...books];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    case "price-low":
      return sorted.sort(
        (a, b) => parseFloat(a.price.replace(/[^\d.]/g, "")) - parseFloat(b.price.replace(/[^\d.]/g, "")),
      );
    case "price-high":
      return sorted.sort(
        (a, b) => parseFloat(b.price.replace(/[^\d.]/g, "")) - parseFloat(a.price.replace(/[^\d.]/g, "")),
      );
    default:
      return sorted.sort((a, b) => a.rank - b.rank);
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { locale, slug } = await params;
  const { sort } = await searchParams;
  const t = await getTranslations({ locale, namespace: "shop" });

  const allCategories = await getPublicCategories();
  const firestoreCat = allCategories.find((c) => c.id === slug);
  const fallbackCat = FALLBACK_CATEGORIES.find((c) => c.id === slug);
  if (!firestoreCat && !fallbackCat) notFound();

  const category = {
    id: slug,
    name: firestoreCat?.displayName || firestoreCat?.name || fallbackCat?.name || slug,
    backgroundColor: fallbackCat?.backgroundColor ?? "#F5F0EB",
  };

  const allBooks = await getPublicBooksForShop();
  const books = sortBooks(
    allBooks.filter((b) => b.category === slug),
    sort,
  );

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "var(--font-sans)", color: "var(--iroly-fg)", background: "var(--iroly-bg)" }}
    >
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${category.name} Coloring Books`,
        description: `Browse ${category.name} coloring books on iRoly`,
        numberOfItems: books.length,
      }} />
      {/* Hero gradient band */}
      <section style={{ background: `linear-gradient(180deg, ${category.backgroundColor} 0%, var(--iroly-bg) 100%)` }}>
        <div
          className="mx-auto px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-[52px] md:px-8"
          style={{ maxWidth: 1320 }}
        >
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-1.5 text-[13px]" style={{ color: "var(--iroly-fg-muted)" }}>
            <Link href="/shop" className="hover:text-[var(--iroly-fg)]" style={{ color: "var(--iroly-fg-muted)", textDecoration: "none" }}>
              {t("title")}
            </Link>
            <span>→</span>
            <span className="font-semibold" style={{ color: "var(--iroly-fg)" }}>{category.name}</span>
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
              <p className="mt-3 text-[15px]" style={{ color: "var(--iroly-fg-muted)" }}>
                {books.length} {books.length === 1 ? "book" : "books"}
              </p>
            </div>
            <ShopSortSelect currentSort={sort} />
          </div>
        </div>
      </section>

      {/* Category pill rail — link to all categories */}
      <div className="mx-auto px-4 pt-5 sm:px-6 md:px-8" style={{ maxWidth: 1320 }}>
        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          <Link
            href="/shop"
            className="shrink-0 rounded-full px-[18px] py-[10px] text-[13px] font-bold no-underline transition-colors"
            style={{ background: "rgba(0,0,0,.04)", color: "var(--iroly-fg)", whiteSpace: "nowrap" }}
          >
            All
          </Link>
          {allCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}` as any}
              className="shrink-0 rounded-full px-[18px] py-[10px] text-[13px] font-bold no-underline transition-colors"
              style={{
                background: cat.id === slug ? "var(--iroly-fg)" : "rgba(0,0,0,.04)",
                color: cat.id === slug ? "var(--iroly-accent)" : "var(--iroly-fg)",
                whiteSpace: "nowrap",
              }}
            >
              {cat.displayName || cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Book grid */}
      <section className="mx-auto px-4 pb-20 pt-8 sm:px-6 md:px-8" style={{ maxWidth: 1320 }}>
        {books.length === 0 ? (
          <div className="py-20 text-center text-[15px]" style={{ color: "var(--iroly-fg-muted)" }}>
            No books found in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-[18px] sm:grid-cols-3 lg:grid-cols-4">
            {books.map((book) => (
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
