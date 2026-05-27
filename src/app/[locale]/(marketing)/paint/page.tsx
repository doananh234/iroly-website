/**
 * Paint Studio Page — /paint
 * Matches prototype PagePaint (lines 1430-1834).
 * Interactive portions delegated to PaintStudioClient (client component).
 */
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SkewUnderline } from "@/components/skew-underline";
import { NewsletterSection } from "@/components/newsletter-section";
import { PaintStudioClient } from "@/components/paint/paint-studio-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "paint" });
  const title = `${t("title")} — iRoly`;
  const description = t("subtitle");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/paint`,
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

export default async function PaintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "paint" });

  return (
    <main className="bg-[#FFFDF8] font-sans text-[#0D1801]">
      {/* Header */}
      <header className="border-b border-black/[.05] px-4 pb-7 pt-10 sm:px-6 sm:pt-12 md:px-8">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-[#BFFF00] px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-[.04em] text-[#0D1801]">
                ✦ {t("badge")}
              </div>
              <h1
                className="m-0 text-[36px] leading-[.95] text-[#0D1801] sm:text-[48px] md:text-[64px]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-.03em" }}
              >
                The <SkewUnderline>Paint Studio</SkewUnderline>.
              </h1>
              <p className="mt-3.5 max-w-[540px] text-base leading-[1.5] text-[#3a3a3a] sm:text-[18px]">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Studio — client component */}
      <div className="mx-auto max-w-[1320px] px-4 py-8 sm:px-6 md:px-8">
        <PaintStudioClient />
      </div>

      {/* Tips + shortcuts */}
      <section className="mx-auto max-w-[1320px] px-4 pb-16 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Mei's tips */}
          <div className="rounded-[22px] p-7" style={{ background: "#FFE8C2" }}>
            <div className="text-[11px] font-extrabold uppercase tracking-[.08em] text-[#3a3a14]">
              {t("tipsLabel")}
            </div>
            <h3
              className="mb-[18px] mt-2"
              style={{ fontSize: 28, fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-.015em" }}
            >
              {t("tipsTitle")}
            </h3>
            <ul className="m-0 flex flex-col gap-3 p-0" style={{ listStyle: "none" }}>
              {[
                ["01", "Start with the biggest shape.", "Lay the largest fill first — sky, a wall, a tea cup body. It anchors the page."],
                ["02", "Pick three colors, not ten.",   "Constraints make a piece feel composed. Add a fourth only if you must."],
                ["03", "Leave one shape empty.",         "Negative space is the secret ingredient."],
              ].map(([n, heading, sub]) => (
                <li key={n} className="grid items-start gap-3.5" style={{ gridTemplateColumns: "auto 1fr" }}>
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-black text-[#BFFF00]"
                    style={{ background: "#0D1801", fontFamily: "var(--font-display)" }}
                  >
                    {n}
                  </div>
                  <div>
                    <div className="text-[16px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>{heading}</div>
                    <div className="mt-0.5 text-[13px] text-[#3a3a14]">{sub}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Keyboard shortcuts */}
          <div className="rounded-[22px] border border-black/[.06] bg-white p-7">
            <div className="text-[11px] font-extrabold uppercase tracking-[.08em] text-[#666]">
              {t("shortcutsLabel")}
            </div>
            <h3
              className="mb-[18px] mt-2"
              style={{ fontSize: 24, fontFamily: "var(--font-display)", fontWeight: 900 }}
            >
              {t("shortcutsTitle")}
            </h3>
            <div className="flex flex-col gap-2.5">
              {[
                ["Brush",          "B"],
                ["Eraser",         "E"],
                ["Undo",           "⌘ Z"],
                ["Redo",           "⌘ ⇧ Z"],
                ["Increase brush", "]"],
                ["Decrease brush", "["],
                ["Save artwork",   "⌘ S"],
              ].map(([action, key]) => (
                <div
                  key={action}
                  className="flex items-center justify-between rounded-[10px] bg-[#F5F2EA] px-3.5 py-2.5"
                >
                  <span className="text-[14px]">{action}</span>
                  <kbd className="rounded border border-black/[.08] bg-white px-2.5 py-1 font-mono text-[12px]">
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <div className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-6 md:px-8">
        <NewsletterSection />
      </div>
    </main>
  );
}
