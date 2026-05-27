import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Download, Bell } from "lucide-react";
import { SkewUnderline } from "@/components/skew-underline";
import { SectionHead } from "@/components/section-head";
import { NewsletterSection } from "@/components/newsletter-section";
import { FreeArchiveGrid } from "@/components/free-pages/free-pages-archive-grid";
import { FALLBACK_FREE_PAGES } from "@/data/fallback";
import type { FreeColoringPage } from "@/data/fallback";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "free-pages" });
  const title = `${t("title")} — iRoly`;
  const description = t("subtitle");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/free-pages`,
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

export default async function FreePagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "free-pages" });

  // Fetch free coloring pages from Firestore app/home doc
  let freePages: FreeColoringPage[] = FALLBACK_FREE_PAGES;
  try {
    const { getHomeData } = await import("@/data/home");
    const homeData = await getHomeData();
    if (homeData?.freeColoringPages?.length) {
      freePages = homeData.freeColoringPages.map((p, i) => ({
        id: p.id,
        title: p.bookTitle,
        series: p.series,
        bg: p.backgroundColor || "#F5F0EB",
        imageUrl: p.imageUrl?.startsWith("http") ? p.imageUrl : `https://image.lagroups.org/${(p.imageUrl || "").replace(/^\//, "")}`,
        expires: "",
        week: i + 1,
      }));
    }
  } catch {
    // Firebase not configured — use fallback
  }

  const categoryLabels: Record<string, string> = {
    all: t("categories.all"),
    animals: t("categories.animals"),
    mandalas: t("categories.mandalas"),
    spooky: t("categories.spooky"),
    christmas: t("categories.christmas"),
    flowers: t("categories.flowers"),
    cute: t("categories.cute"),
  };

  return (
    <main className="bg-[var(--iroly-bg)] font-sans text-[var(--iroly-fg)]">
      {/* Gradient hero */}
      <section style={{ background: "linear-gradient(180deg, #BFFF00 0%, #E8FF99 60%, #FFFDF8 100%)" }}>
        <div
          className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-8 px-4 pb-12 pt-10 sm:px-6 md:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14 lg:pb-20 lg:pt-16"
        >
          {/* Left text */}
          <div>
            <div
              className="mb-5 inline-block rounded-full px-[14px] py-[6px] text-xs font-bold uppercase tracking-[.06em]"
              style={{ background: "#0D1801", color: "#BFFF00" }}
            >
              {t("kicker")}
            </div>
            <h1
              className="m-0 text-[48px] font-black leading-[.92] tracking-[-0.03em] text-[#0D1801] sm:text-[64px] md:text-[88px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Free{" "}
              <SkewUnderline color="rgba(255,255,255,.7)" height="55%">
                coloring pages.
              </SkewUnderline>
            </h1>
            <p className="mb-7 mt-5 max-w-[460px] text-[18px] leading-[1.55] text-[#1d2a14]">
              {t("subtitle")}
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="/assets/coloring-pages/free-coloring-page.svg"
                download="iroly-free-page.svg"
                className="inline-flex items-center gap-2 rounded-full px-[22px] py-4 text-[15px] font-extrabold no-underline"
                style={{ background: "#0D1801", color: "#fff" }}
              >
                <Download size={16} /> {t("printCta")}
              </a>
              <button
                className="inline-flex items-center gap-2 rounded-full border-2 px-[22px] py-4 text-[15px] font-extrabold"
                style={{ background: "transparent", color: "#0D1801", borderColor: "#0D1801", cursor: "pointer" }}
              >
                <Bell size={16} /> {t("emailCta")}
              </button>
            </div>
          </div>

          {/* Right: featured page card */}
          <div
            className="rounded-[24px] p-7"
            style={{
              background: "#fff",
              boxShadow: "0 12px 36px rgba(0,0,0,.1)",
              transform: "rotate(-2deg)",
            }}
          >
            <div className="mb-1 text-[11px] font-bold uppercase tracking-[.06em] text-[#777]">
              Friday · Week 19
            </div>
            <h3
              className="mb-3.5 font-black text-[#0D1801]"
              style={{ fontSize: 24, fontFamily: "var(--font-display)" }}
            >
              {freePages[0]?.title || t("featuredTitle")}
            </h3>
            <div
              className="aspect-square overflow-hidden rounded-[14px]"
              style={{ background: "#FAF7EF" }}
            >
              {freePages[0]?.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={freePages[0].imageUrl} alt={freePages[0].title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="h-4/5 w-4/5 rounded-[10px] bg-[#F5F2EA]" />
                </div>
              )}
            </div>
            <div className="mt-3.5 flex gap-2">
              <a
                href="/assets/coloring-pages/free-coloring-page.svg"
                download="iroly-free-page.svg"
                className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-[13px] font-extrabold no-underline"
                style={{ background: "#0D1801", color: "#fff" }}
              >
                <Download size={14} /> {t("pdfCta")}
              </a>
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-[13px] font-extrabold no-underline"
                style={{ background: "#BFFF00", color: "#0D1801" }}
              >
                {t("inAppCta")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Archive */}
      <section className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 md:px-8">
        <SectionHead
          title={
            <>
              The free{" "}
              <SkewUnderline color="rgba(191,255,0,.55)" height="55%">
                archive.
              </SkewUnderline>
            </>
          }
          subtitle={t("archiveSubtitle")}
        />
        <FreeArchiveGrid
          pages={freePages}
          freeBadge={t("freeBadge")}
          weekLabel={t("weekLabel")}
          categoryLabels={categoryLabels}
        />
      </section>

      {/* Newsletter */}
      <div className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-6 md:px-8">
        <NewsletterSection />
      </div>
    </main>
  );
}
