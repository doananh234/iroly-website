import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { SkewUnderline } from "@/components/skew-underline";
import { SectionHead } from "@/components/section-head";
import { NewsletterSection } from "@/components/newsletter-section";
import { JournalCategoryFilter } from "@/components/journal/journal-category-filter";
import { Link } from "@/i18n/navigation";

export const revalidate = 3600;

const FEATURED_POST = {
  category: "Process",
  readTime: "6 min read",
  title: "How we draw a Tiny Friend from sketch to finished page.",
  excerpt:
    "An 8-step look at Mei's process — from gestural pencil thumbnails to the final dashed-bordered cover.",
};

const POSTS = [
  { bg: "#C2E0FF", cat: "Process",     title: "On the dashed border (and why every cover has one)",   date: "May 9, 2026",  excerpt: "The one detail that ties the whole library together. People ask about it constantly." },
  { bg: "#FCE7F3", cat: "Interviews",  title: "A coffee with Aiko, our newest editorial lead",        date: "May 2, 2026",  excerpt: "We sat down with Aiko to talk books, palettes, and what makes a great coloring page." },
  { bg: "#DDF4D2", cat: "New Books",   title: "Bold Garden is the book I wish I had at age 6",        date: "Apr 25, 2026", excerpt: "Big shapes, easy lines, and enough charm to keep adults coming back too." },
  { bg: "#FFEDA0", cat: "Free Pages",  title: "Five free pages perfect for Sunday afternoon",         date: "Apr 18, 2026", excerpt: "Slow down, pick a page, and spend an hour with nothing but color and quiet." },
  { bg: "#FFD6D6", cat: "Process",     title: "Why we never built a streak feature",                  date: "Apr 11, 2026", excerpt: "We tried it in beta. Here's why it ended up on the cutting room floor." },
  { bg: "#E2E8F0", cat: "Process",     title: "Color theory for Spooky books: warm meets cold",       date: "Apr 4, 2026",  excerpt: "How to balance eerie and cozy in a single palette — and why contrast is everything." },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "journal" });
  const title = `${t("title")} — iRoly`;
  const description = t("subtitle");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/journal`,
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

export default async function JournalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "journal" });

  const filters: Record<string, string> = {
    all: t("filters.all"),
    process: t("filters.process"),
    interviews: t("filters.interviews"),
    freePages: t("filters.freePages"),
    newBooks: t("filters.newBooks"),
  };

  return (
    <main className="bg-[var(--iroly-bg)] font-sans text-[var(--iroly-fg)]">
      {/* Hero with gradient */}
      <section
        className="px-4 pb-6 pt-12 sm:px-6 sm:pt-[72px] md:px-8"
        style={{ background: "linear-gradient(180deg, #BFFF00 0%, #E8FF99 60%, #FFFDF8 100%)" }}
      >
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <div className="mb-2 text-[12px] font-bold uppercase tracking-[.06em] text-[#666]">
              {t("kicker")}
            </div>
            <h1
              className="m-0 text-[44px] font-black leading-[.92] tracking-[-0.03em] text-[#0D1801] sm:text-[64px] md:text-[88px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Notes from{" "}
              <SkewUnderline color="rgba(255,255,255,.7)" height="55%">
                the studio.
              </SkewUnderline>
            </h1>
          </div>
          {/* Category filter — client */}
          <div className="shrink-0 sm:self-end sm:pb-3">
            <JournalCategoryFilter filters={filters} />
          </div>
        </div>
      </section>

      {/* Featured post */}
      <section className="mx-auto max-w-[1320px] px-4 pb-4 pt-6 sm:px-6 md:px-8">
        <Link href="/journal/how-we-draw-a-tiny-friend" className="block no-underline">
        <article
          className="grid grid-cols-1 overflow-hidden rounded-[28px] lg:grid-cols-[1.1fr_1fr]"
          style={{ background: "#FFE8C2" }}
        >
          <div className="p-7 md:p-14">
            <div
              className="mb-4 text-[12px] font-bold uppercase tracking-[.06em] text-[#0D1801]"
              style={{ opacity: 0.7 }}
            >
              {t("featuredBadge")} · {FEATURED_POST.readTime}
            </div>
            <h2
              className="m-0 max-w-[480px] text-[28px] font-black leading-[1.05] tracking-[-0.02em] text-[#0D1801] sm:text-[36px] md:text-[48px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {FEATURED_POST.title}
            </h2>
            <p className="mb-7 mt-[18px] max-w-[460px] text-[16px] leading-[1.55] text-[#3a3a14]">
              {FEATURED_POST.excerpt}
            </p>
            <span
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-extrabold text-white"
              style={{ background: "#0D1801" }}
            >
              {t("readArticle")} <ArrowRight size={14} />
            </span>
          </div>
          {/* Right: book cover placeholder — hidden on mobile */}
          <div
            className="hidden items-center justify-center p-8 lg:flex"
            style={{ background: "#FFD79E" }}
          >
            <div
              className="aspect-square w-[240px] max-w-full rounded-[16px]"
              style={{ background: "#FFE8C2", boxShadow: "0 8px 24px rgba(0,0,0,.1)" }}
            />
          </div>
        </article>
        </Link>
      </section>

      {/* Post grid */}
      <section className="mx-auto max-w-[1320px] px-4 py-12 sm:px-6 md:px-8">
        <SectionHead title={t("recentTitle")} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post) => (
            <Link
              key={post.title}
              href="/journal/how-we-draw-a-tiny-friend"
              className="block no-underline"
            >
              <article className="cursor-pointer">
                {/* Colored image area */}
                <div
                  className="flex items-center justify-center rounded-[20px] p-7"
                  style={{ background: post.bg, aspectRatio: "4/3" }}
                >
                  <div className="h-3/4 w-3/4 rounded-[10px] bg-white/50" />
                </div>
                {/* Meta */}
                <div className="mt-3.5 flex items-center gap-2 text-[12px] text-[#666]">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[.04em]"
                    style={{ background: "#0D1801", color: "#BFFF00" }}
                  >
                    {post.cat}
                  </span>
                  <span>· {post.date}</span>
                </div>
                <h3
                  className="mt-2.5 font-extrabold leading-[1.2] text-[#0D1801]"
                  style={{ fontSize: 21, fontFamily: "var(--font-display)" }}
                >
                  {post.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-[1.5] text-[#555]">{post.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <div className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-6 md:px-8">
        <NewsletterSection />
      </div>
    </main>
  );
}
