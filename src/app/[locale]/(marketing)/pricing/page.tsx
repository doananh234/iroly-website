import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SkewUnderline } from "@/components/skew-underline";
import { SectionHead } from "@/components/section-head";
import { BookCard } from "@/components/book-card";
import { NewsletterSection } from "@/components/newsletter-section";
import { CreditTierCards } from "@/components/pricing/credit-tier-cards";
import { PricingFaqGrid } from "@/components/pricing/pricing-faq-grid";
import { JsonLd } from "@/components/json-ld";
import { FALLBACK_CREDIT_TIERS, FALLBACK_FAQ, FALLBACK_BOOKS } from "@/data/fallback";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  const title = `${t("title")} — iRoly`;
  const description = t("subtitle");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/pricing`,
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

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });

  const faq = (t.raw("faq") as Array<{ q: string; a: string }>).map((item) => ({
    q: item.q,
    a: item.a,
  }));

  const alacarte = FALLBACK_BOOKS.slice(0, 4).map((b) => ({
    id: b.id,
    title: b.title,
    series: b.series,
    coverUrl: b.coverUrl,
    price: b.price,
    oldPrice: b.oldPrice ?? undefined,
    badge: b.badge ?? undefined,
    backgroundColor: b.backgroundColor,
    difficulty: b.difficulty,
  }));

  return (
    <main className="bg-[var(--iroly-bg)] font-sans text-[var(--iroly-fg)]">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        name: "iRoly Credit Packs",
        itemListElement: FALLBACK_CREDIT_TIERS.map((tier) => ({
          "@type": "Offer",
          name: tier.label,
          price: tier.price.replace(/[^0-9.]/g, ""),
          priceCurrency: "JPY",
        })),
      }} />
      {/* Hero */}
      <section className="mx-auto max-w-[880px] px-4 pb-10 pt-12 text-center sm:px-6 sm:pt-[72px] md:px-8">
        <div
          className="mb-[22px] inline-block rounded-full px-[14px] py-[6px] text-xs font-bold uppercase tracking-[.06em]"
          style={{ background: "#BFFF00", color: "#0D1801" }}
        >
          {t("kicker")}
        </div>
        <h1
          className="m-0 text-[44px] font-black leading-[.9] tracking-[-0.03em] text-[#0D1801] sm:text-[64px] md:text-[88px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          No subscriptions.
          <br />
          Just{" "}
          <SkewUnderline color="rgba(191,255,0,.55)" height="55%">
            credits.
          </SkewUnderline>
        </h1>
        <p className="mx-auto mt-6 max-w-[600px] text-base leading-[1.55] text-[#3a3a3a] sm:text-[19px]">
          {t("subtitle")}
        </p>
      </section>

      {/* Credit tier cards */}
      <section className="pb-16 pt-6">
        <CreditTierCards tiers={FALLBACK_CREDIT_TIERS} popularLabel={t("popular")} />
      </section>

      {/* À la carte books */}
      <section className="mx-auto max-w-[1320px] px-4 pb-16 sm:px-6 md:px-8">
        <SectionHead
          title={
            <>
              Or buy a book{" "}
              <SkewUnderline color="rgba(191,255,0,.55)" height="55%">
                à la carte.
              </SkewUnderline>
            </>
          }
          subtitle={t("alacarteSubtitle")}
        />
        <div className="grid grid-cols-2 gap-[18px] sm:grid-cols-4">
          {alacarte.map((book) => (
            <BookCard key={book.id} href={`/shop/${book.id}`} book={book} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <PricingFaqGrid title={t("faqTitle")} items={faq} />

      {/* Newsletter */}
      <div className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-6 md:px-8">
        <NewsletterSection />
      </div>
    </main>
  );
}
