import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CategoryPageClient } from "@/components/shop/category-page-client";
import { getPublicBooksForShop } from "@/data/books";
import { getPublicCategories } from "@/data/categories";
import { FALLBACK_CATEGORIES } from "@/data/fallback";

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const categories = await getPublicCategories();
    if (categories.length > 0) {
      return categories.map((cat) => ({ slug: cat.id }));
    }
  } catch {
    // Firebase not available at build time
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });

  const allCategories = await getPublicCategories();
  const firestoreCat = allCategories.find((c) => c.id === slug);
  const fallbackCat = FALLBACK_CATEGORIES.find((c) => c.id === slug);
  if (!firestoreCat && !fallbackCat) notFound();

  const category = {
    id: slug,
    name:
      firestoreCat?.displayName ||
      firestoreCat?.name ||
      fallbackCat?.name ||
      slug,
    backgroundColor: fallbackCat?.backgroundColor ?? "#F5F0EB",
  };

  const allBooks = await getPublicBooksForShop();
  const categoryBooks = allBooks.filter((b) => b.category === slug);

  return (
    <CategoryPageClient
      category={category}
      books={categoryBooks}
      allCategories={allCategories.map((c) => ({
        id: c.id,
        name: c.displayName || c.name,
      }))}
      shopTitle={t("title")}
    />
  );
}
