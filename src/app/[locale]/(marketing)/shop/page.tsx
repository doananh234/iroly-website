import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ShopPageClient } from "@/components/shop/shop-page-client";
import { getPublicBooksForShop } from "@/data/books";
import { getPublicCategories } from "@/data/categories";

export const dynamic = "force-static";

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

export default async function ShopPage() {
  const books = await getPublicBooksForShop();
  const categories = await getPublicCategories();

  return (
    <ShopPageClient
      books={books}
      categories={categories.map((c) => ({
        id: c.id,
        name: c.displayName || c.name,
      }))}
    />
  );
}
