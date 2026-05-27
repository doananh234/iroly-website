import { HeroHome } from "@/components/hero-home";
import { NewsletterSection } from "@/components/newsletter-section";
import { CategoryRailSection } from "@/components/home/category-rail-section";
import { TrendingSection } from "@/components/home/trending-section";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { FreeTeaserSection } from "@/components/home/free-teaser-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { TrustBar } from "@/components/trust-bar";
import { JsonLd } from "@/components/json-ld";
import { Star, Zap, Package, RefreshCw } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getPublicBooksForShop } from "@/data/books";
import { getPublicCategories } from "@/data/categories";
import {
  FALLBACK_BOOKS,
  FALLBACK_CATEGORIES,
  FALLBACK_TESTIMONIALS,
} from "@/data/fallback";
import type { FallbackCategory } from "@/data/fallback";
import type { Metadata } from "next";
import type { AppHomeTrendingBook } from "@/types";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const title = t("meta.title") || "iRoly — Coloring Books for Calm Minds";
  const description = t("hero.subtitle");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
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

export default async function HomePage() {
  // Fetch live data from Firestore with fallback
  const shopBooks = await getPublicBooksForShop();
  const firestoreCategories = await getPublicCategories();

  // Map categories to FallbackCategory shape for components
  let categories: FallbackCategory[] = FALLBACK_CATEGORIES;
  if (firestoreCategories.length > 0) {
    categories = firestoreCategories.map((c) => {
      const fallback = FALLBACK_CATEGORIES.find((fc) => fc.id === c.id);
      return {
        id: c.id,
        name: c.displayName || c.name,
        backgroundColor: fallback?.backgroundColor ?? "#F5F0EB",
      };
    });
  }

  // Try to fetch home data from Firestore for trending hero + free pages
  let trendingBooks: AppHomeTrendingBook[] = [];
  let freeColoringPages: { title: string; series: string; imageUrl: string; backgroundColor: string }[] = [];
  try {
    const { getHomeData } = await import("@/data/home");
    const homeData = await getHomeData();
    if (homeData && homeData.trendingBooks.length > 0) {
      trendingBooks = homeData.trendingBooks;
    }
    if (homeData?.freeColoringPages?.length) {
      freeColoringPages = homeData.freeColoringPages.map((p) => ({
        title: p.bookTitle,
        series: p.series,
        imageUrl: p.imageUrl?.startsWith("http") ? p.imageUrl : `https://image.lagroups.org/${(p.imageUrl || "").replace(/^\//, "")}`,
        backgroundColor: p.backgroundColor,
      }));
    }
  } catch {
    // Firebase not configured
  }

  // Use shop books if Firestore home data returned nothing
  if (trendingBooks.length === 0) {
    trendingBooks = shopBooks.slice(0, 5).map((b) => ({
      id: b.id,
      rank: b.rank,
      title: b.title,
      subtitle: b.series,
      imageUrl: b.coverUrl,
      participantCount: String(b.participantCount),
    }));
  }

  const trustItems = [
    { icon: <Star size={14} className="fill-current" />, label: "4.92 · 2,180 reviews" },
    { icon: <Zap size={14} />, label: "Instant unlock in app" },
    { icon: <Package size={14} />, label: "No subscription" },
    { icon: <RefreshCw size={14} />, label: "7-day refund policy" },
  ];

  return (
    <main>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "iRoly",
        url: "https://iroly.com",
        description: "Cute, calm, low-pressure coloring books for everyone.",
        publisher: {
          "@type": "Organization",
          name: "iRoly Studio",
          logo: { "@type": "ImageObject", url: "https://iroly.com/assets/logos/app-icon.png" },
        },
      }} />
      {/* 1. Hero */}
      <HeroHome topBooks={trendingBooks} />

      {/* 2. Category Rail */}
      <CategoryRailSection categories={categories} />

      {/* 3. Trending Top 10 */}
      <TrendingSection books={shopBooks} />

      {/* 4. New Arrivals */}
      <NewArrivalsSection books={shopBooks} />

      {/* 5. Free Page Teaser — admin-configured or random from public books */}
      <FreeTeaserSection books={shopBooks} configuredPages={freeColoringPages} />

      {/* 6. Testimonials */}
      <TestimonialsSection testimonials={FALLBACK_TESTIMONIALS} />

      {/* 7. Newsletter */}
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-8">
        <NewsletterSection />
      </div>

      {/* 8. Trust Bar */}
      <TrustBar
        items={trustItems}
        className="border-t border-black/[0.06] bg-[#FFFDF8]"
      />
    </main>
  );
}
