/**
 * Blog Detail Page — /journal/[slug]
 * Matches prototype PageBlogDetail (lines 736-895).
 * Hardcoded content for the "Tiny Friends" process article.
 */
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { SkewUnderline } from "@/components/skew-underline";
import { NewsletterSection } from "@/components/newsletter-section";
import { JsonLd } from "@/components/json-ld";
import { BlogArticleBody } from "@/components/blog-detail/blog-article-body";
import { BlogArticleActions } from "@/components/blog-detail/blog-article-actions";
import { BlogComments } from "@/components/blog-detail/blog-comments";
import { BlogRelatedPosts } from "@/components/blog-detail/blog-related-posts";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog-detail" });
  const title = `${t("title")} — iRoly Journal`;
  const description = t("lead");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/journal/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: "/assets/logos/app-icon.png", width: 512, height: 512 }],
      type: "article",
      siteName: "iRoly",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog-detail" });

  const tags = t.raw("tags") as string[];

  return (
    <main className="bg-[#FFFDF8] font-sans text-[#0D1801]">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: "How we draw a Tiny Friend from sketch to finished page.",
        author: { "@type": "Person", name: "Mei Yoshida" },
        datePublished: "2026-05-09",
        publisher: { "@type": "Organization", name: "iRoly Studio" },
      }} />
      {/* Article header */}
      <article className="mx-auto max-w-[760px] px-4 pb-6 pt-10 sm:px-6 sm:pt-14 md:px-8">
        {/* Breadcrumb */}
        <div className="text-[13px] text-[#666]">
          <Link href="/journal" className="text-[#666] no-underline hover:text-[#0D1801]">
            {t("breadcrumb.journal")}
          </Link>
          {" → "}
          <span className="font-semibold text-[#0D1801]">{t("breadcrumb.category")}</span>
        </div>

        {/* Category + date */}
        <div className="mt-7 flex items-center gap-2.5 text-[12px]">
          <span
            className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[.06em]"
            style={{ background: "#0D1801", color: "#BFFF00" }}
          >
            {t("meta.category")}
          </span>
          <span className="text-[#666]">· {t("meta.date")} · {t("meta.readTime")}</span>
        </div>

        {/* Title */}
        <h1
          className="m-0 mt-[18px] mb-[22px] text-[36px] leading-[1] text-[#0D1801] sm:text-[48px] md:text-[64px]"
          style={{ fontWeight: 900, fontFamily: "var(--font-display)", letterSpacing: "-.025em" }}
        >
          How we draw a <SkewUnderline>Tiny Friend</SkewUnderline> from sketch to finished page.
        </h1>

        {/* Lead */}
        <p
          className="m-0"
          style={{ fontSize: 22, color: "#3a3a3a", lineHeight: 1.5, fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          {t("lead")}
        </p>

        {/* Author row */}
        <div className="mt-8 flex items-center gap-3.5 border-t border-black/[.08] pt-6">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full font-black"
            style={{ background: "#FFE8C2", fontFamily: "var(--font-display)" }}
          >
            MY
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, fontFamily: "var(--font-display)" }}>{t("author.name")}</div>
            <div className="text-[13px] text-[#666]">{t("author.role")}</div>
          </div>
          <div className="ml-auto flex gap-2">
            <BlogArticleActions />
          </div>
        </div>
      </article>

      {/* Hero image */}
      <div className="mx-auto max-w-[1100px] px-4 py-2 sm:px-6 md:px-8">
        <div className="flex min-h-[420px] items-center justify-center rounded-[28px] p-14" style={{ background: "#FFE8C2" }}>
          {/* Book cover placeholder matching prototype BookCover */}
          <div
            className="flex items-center justify-center rounded-[18px]"
            style={{ width: 320, height: 400, background: "#FFD79E", boxShadow: "0 8px 24px rgba(0,0,0,.1)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/coloring-pages/free-coloring-page.svg"
              alt="Tiny Friends book cover"
              style={{ width: "70%", opacity: 0.8 }}
            />
          </div>
        </div>
        <div className="mt-2.5 text-center text-[12px] italic text-[#666]">{t("heroCaption")}</div>
      </div>

      {/* Article body */}
      <BlogArticleBody />

      {/* Tags & share */}
      <section className="mx-auto max-w-[760px] border-t border-black/[.08] px-4 pb-14 pt-7 sm:px-6 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-[#1d2a14]"
                style={{ background: "rgba(0,0,0,.05)" }}
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2.5 text-[13px] text-[#666]">
            <span>{t("share")}</span>
            <a
              href="https://x.com/intent/tweet?url=&text=How+we+draw+a+Tiny+Friend"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full text-[11px] font-bold text-[#0D1801] no-underline"
              style={{ background: "rgba(0,0,0,.04)" }}
            >
              X
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full text-[11px] font-bold text-[#0D1801] no-underline"
              style={{ background: "rgba(0,0,0,.04)" }}
            >
              IG
            </a>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u="
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-full text-[11px] font-bold text-[#0D1801] no-underline"
              style={{ background: "rgba(0,0,0,.04)" }}
            >
              FB
            </a>
          </div>
        </div>
      </section>

      {/* Author card */}
      <section className="mx-auto max-w-[1100px] px-4 pb-16 sm:px-6 md:px-8">
        <div
          className="grid items-center gap-5 rounded-[28px] px-6 py-7 sm:gap-7 sm:px-10 sm:py-9"
          style={{ background: "#FFE8C2", gridTemplateColumns: "auto 1fr" }}
        >
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full text-[36px] font-black text-[#0D1801]"
            style={{ background: "#fff", fontFamily: "var(--font-display)" }}
          >
            MY
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[.06em] text-[#3a3a14]">
              {t("authorCard.label")}
            </div>
            <h3
              className="my-1.5 text-[#0D1801]"
              style={{ fontSize: 28, fontWeight: 900, fontFamily: "var(--font-display)", letterSpacing: "-.015em" }}
            >
              {t("author.name")}
            </h3>
            <p className="m-0 max-w-[480px] text-[14px] leading-[1.55] text-[#3a3a14]">
              {t("authorCard.bio")}
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14px] font-bold text-white no-underline"
              style={{ background: "#0D1801" }}
            >
              {t("authorCard.cta")} →
            </Link>
          </div>
        </div>
      </section>

      {/* Comments */}
      <BlogComments title={t("comments.title")} />

      {/* Related posts */}
      <BlogRelatedPosts title={t("relatedTitle")} />

      {/* Newsletter */}
      <div className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-6 md:px-8">
        <NewsletterSection />
      </div>
    </main>
  );
}
