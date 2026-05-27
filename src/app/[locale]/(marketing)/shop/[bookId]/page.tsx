import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getBookForShop, getPublicBooksForShop } from "@/data/books";
import { BookDetailTabs } from "@/components/shop/book-detail-tabs";
import { BookCoverGallery } from "@/components/shop/book-cover-gallery";
import { BookInfoPanel } from "@/components/shop/book-info-panel";
import { BookCard } from "@/components/book-card";
import { JsonLd } from "@/components/json-ld";

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const books = await getPublicBooksForShop();
    return books.map((b) => ({ bookId: b.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; bookId: string }>;
}): Promise<Metadata> {
  const { locale, bookId } = await params;
  const book = await getBookForShop(bookId);
  const t = await getTranslations({ locale, namespace: "book" });
  const title = book ? `${book.title} — iRoly` : "Book — iRoly";
  const description = book?.description ?? t("description");
  const image = book?.coverUrl ?? "/assets/logos/app-icon.png";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/shop/${bookId}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 512, height: 512 }],
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

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ locale: string; bookId: string }>;
}) {
  const { locale, bookId } = await params;
  const t = await getTranslations({ locale, namespace: "book" });

  const book = await getBookForShop(bookId);

  if (!book) {
    return (
      <main className="mx-auto max-w-[1320px] px-8 py-24 text-center">
        <p className="text-muted-foreground">Book not found.</p>
        <Link
          href="/shop"
          className="mt-4 inline-block text-sm font-semibold underline"
        >
          {t("backToShop")}
        </Link>
      </main>
    );
  }

  const allBooks = await getPublicBooksForShop();
  const relatedBooks = allBooks.filter((b) => b.id !== book!.id).slice(0, 4);
  const addToBagLabel = t("addToBagWithPrice", { price: book.price });

  return (
    <div style={{ fontFamily: "var(--font-sans)", color: "var(--iroly-fg)", background: "var(--iroly-bg)" }}>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: book.title,
        image: book.coverUrl,
        description: `${book.pages} pages of ${book.difficulty} coloring`,
        brand: { "@type": "Brand", name: "iRoly" },
        offers: {
          "@type": "Offer",
          price: book.price?.replace(/[^0-9.]/g, ""),
          priceCurrency: "JPY",
          availability: "https://schema.org/InStock",
        },
      }} />
      {/* ── Breadcrumb ── */}
      <div
        className="mx-auto px-4 pt-6 text-[13px] sm:px-6 md:px-8"
        style={{ maxWidth: 1320, color: "#666" }}
      >
        <Link href="/shop" className="hover:text-[#0D1801]">Shop</Link>
        {" → "}
        <span>{book.series}</span>
        {" → "}
        <span className="font-semibold" style={{ color: "#0D1801" }}>{book.title}</span>
      </div>

      {/* ── Main 2-column layout ── */}
      <section
        className="mx-auto grid grid-cols-1 gap-8 px-4 pb-14 pt-6 sm:px-6 md:px-8 lg:grid-cols-2 lg:gap-14"
        style={{ maxWidth: 1320, alignItems: "start" }}
      >
        <BookCoverGallery book={book} />
        <BookInfoPanel book={book} addToBagLabel={addToBagLabel} />
      </section>

      {/* ── Tabbed content: About / Sample Pages / Reviews / Print ── */}
      <BookDetailTabs />

      {/* ── Related books ── */}
      <section className="mx-auto px-4 pb-20 sm:px-6 md:px-8" style={{ maxWidth: 1320 }}>
        <h2
          className="mb-6 text-[24px] font-black tracking-[-0.02em] sm:text-[32px]"
          style={{ fontFamily: "var(--font-display)", color: "#0D1801" }}
        >
          {t("relatedBooks")}
        </h2>
        <div className="grid grid-cols-2 gap-[18px] sm:grid-cols-4">
          {relatedBooks.map((rb) => (
              <BookCard
                key={rb.id}
                href={`/shop/${rb.id}`}
                book={{
                  id: rb.id,
                  title: rb.title,
                  series: rb.series,
                  coverUrl: rb.coverUrl,
                  price: rb.price,
                  oldPrice: rb.oldPrice ?? undefined,
                  badge: rb.badge ?? undefined,
                  backgroundColor: rb.backgroundColor,
                  difficulty: rb.difficulty,
                  specifications: { pages: rb.pages },
                }}
                density="comfy"
              />
          ))}
        </div>
      </section>
    </div>
  );
}
