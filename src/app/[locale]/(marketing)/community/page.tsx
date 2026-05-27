/**
 * Community Page — /community
 * Matches prototype PageCommunity (lines 1855-2013).
 */
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SkewUnderline } from "@/components/skew-underline";
import { NewsletterSection } from "@/components/newsletter-section";
import { CommunityGallery } from "@/components/community/community-gallery";
import { CommunitySidebar } from "@/components/community/community-sidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "community" });
  const title = `${t("title")} — iRoly`;
  const description = t("subtitle");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/community`,
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

const HERO_CARDS = [
  { bg: "#FFE8C2", accent: "#FFB68A", handle: "sleepyfox22", rotate: "rotate(2deg) translateY(0px)"   },
  { bg: "#FFD6E5", accent: "#C7558B", handle: "melisa.colors", rotate: "rotate(-3deg) translateY(18px)" },
  { bg: "#C2E0FF", accent: "#5588D9", handle: "blue_hours",   rotate: "rotate(-2deg) translateY(-10px)" },
  { bg: "#DDF4D2", accent: "#5C9148", handle: "garden.daze",  rotate: "rotate(3deg) translateY(8px)"   },
];

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "community" });

  return (
    <main className="bg-[var(--iroly-bg)] font-sans text-[var(--iroly-fg)]">
      {/* Hero */}
      <section
        className="px-4 pb-10 pt-10 sm:px-6 sm:pt-14 md:px-8"
        style={{ background: "linear-gradient(180deg, #BFFF00 0%, #E8FF99 55%, #FFFDF8 100%)" }}
      >
        <div
          className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-8 md:grid-cols-[1.1fr_.9fr] md:gap-12"
        >
          <div>
            <div
              className="mb-[18px] inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[.04em] text-[#BFFF00]"
              style={{ background: "rgba(13,24,1,.85)" }}
            >
              👥 {t("badge")}
            </div>
            <h1
              className="m-0 text-[44px] leading-[.95] text-[#0D1801] sm:text-[60px] md:text-[80px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-.03em" }}
            >
              The iRoly<br /><SkewUnderline>Community</SkewUnderline>.
            </h1>
            <p className="mt-5 max-w-[520px] text-[19px] leading-[1.55] text-[#1d2a14]">
              {t("subtitle")}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-full border-none px-5 py-3.5 text-[15px] font-extrabold text-[#BFFF00]"
                style={{ background: "#0D1801", cursor: "pointer" }}
              >
                + {t("shareArtwork")}
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-full border border-[#0D1801] bg-transparent px-5 py-3.5 text-[15px] font-extrabold text-[#0D1801]"
                style={{ cursor: "pointer" }}
              >
                ◆ {t("challenge")}
              </button>
            </div>
            {/* Stats */}
            <div className="mt-9 flex gap-8">
              {[["14.8K", t("stats.colorists")], ["42K", t("stats.artworks")], ["180", t("stats.countries")]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 28, fontFamily: "var(--font-display)", fontWeight: 900, color: "#0D1801" }}>{n}</div>
                  <div className="text-[12px] text-[#1d2a14]">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero art cards grid */}
          <div className="grid grid-cols-2 gap-3.5" style={{ transform: "rotate(-2deg)" }}>
            {HERO_CARDS.map(({ bg, accent, handle, rotate }, i) => (
              <div
                key={i}
                className="rounded-[18px] p-3.5"
                style={{ background: bg, transform: rotate }}
              >
                <div className="relative flex aspect-square items-center justify-center rounded-xl bg-white p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/coloring-pages/free-coloring-page.svg" alt="" className="h-full w-full" />
                  <div
                    className="absolute inset-3 rounded-lg"
                    style={{ background: accent, mixBlendMode: "multiply", opacity: 0.35 }}
                  />
                </div>
                <div className="mt-2 text-[11px] font-bold">@{handle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content: gallery + sidebar */}
      <div
        className="mx-auto grid max-w-[1320px] grid-cols-1 gap-8 px-4 py-10 sm:px-6 md:px-8 lg:grid-cols-[1fr_320px]"
      >
        {/* Gallery — includes sticky filter bar (client component) */}
        <div>
          <CommunityGallery />
        </div>

        {/* Sidebar — client component for interactive follow/challenge buttons */}
        <aside className="sticky top-[84px] flex flex-col gap-[18px] self-start">
          <CommunitySidebar
            challengeBadge={t("sidebar.challengeBadge")}
            challengeTitle={t("sidebar.challengeTitle")}
            challengeDesc={t("sidebar.challengeDesc")}
            challengeEnds={t("sidebar.challengeEnds")}
            joinChallenge={t("sidebar.joinChallenge")}
            topColorists={t("sidebar.topColorists")}
            follow={t("sidebar.follow")}
            guidelinesLabel={t("sidebar.guidelinesLabel")}
            guidelinesTitle={t("sidebar.guidelinesTitle")}
            guidelinesDesc={t("sidebar.guidelinesDesc")}
            guidelinesLink={t("sidebar.guidelinesLink")}
          />
        </aside>
      </div>

      <div className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-6 md:px-8">
        <NewsletterSection />
      </div>
    </main>
  );
}
