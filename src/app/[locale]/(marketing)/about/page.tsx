import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SkewUnderline } from "@/components/skew-underline";
import { SectionHead } from "@/components/section-head";

export const revalidate = 3600;

const STATS = [
  { color: "#FFE8C2", number: "12,400", key: "booksSold" },
  { color: "#C2E0FF", number: "142",    key: "freePages" },
  { color: "#FCE7F3", number: "64",     key: "booksInLibrary" },
  { color: "#DDF4D2", number: "9",      key: "artists" },
] as const;

const TEAM = [
  { name: "Mei Yoshida",       role: "Founder · Illustrator", initials: "MY", color: "#FFE8C2" },
  { name: "Tora Wakabayashi",  role: "Lead Artist",           initials: "TW", color: "#C2E0FF" },
  { name: "Sara Klein",        role: "Engineering",           initials: "SK", color: "#FCE7F3" },
  { name: "Aiko Tanaka",       role: "Books & Editorial",     initials: "AT", color: "#DDF4D2" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const title = `${t("title")} — iRoly`;
  const description = t("story.p1");
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/about`,
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const rules = t.raw("rules") as Array<{ title: string; desc: string }>;

  return (
    <main className="bg-[var(--iroly-bg)] font-sans text-[var(--iroly-fg)]">
      {/* Hero */}
      <section className="mx-auto max-w-[1100px] px-4 pb-10 pt-12 sm:px-6 sm:pt-20 md:px-8">
        <div
          className="mb-[22px] inline-block rounded px-[14px] py-[6px] text-xs font-bold uppercase tracking-[.06em]"
          style={{ background: "#BFFF00", color: "#0D1801" }}
        >
          {t("kicker")}
        </div>
        <h1
          className="m-0 max-w-[900px] text-[44px] font-black leading-[.9] tracking-[-0.035em] text-[#0D1801] sm:text-[64px] md:text-[96px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          A small studio
          <br />
          making{" "}
          <SkewUnderline color="rgba(191,255,0,.55)" height="55%">
            {locale === "ja" ? "もっと静かな" : locale === "zh" ? "更宁静" : "a quieter"}
          </SkewUnderline>
          <br />
          {locale === "ja" ? "アプリを作る小さなスタジオ。" : locale === "zh" ? "应用的小工作室。" : "kind of app."}
        </h1>
      </section>

      {/* Story + Stats */}
      <section
        className="mx-auto grid max-w-[1100px] grid-cols-1 gap-8 px-4 pb-16 pt-6 sm:px-6 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14"
        style={{ alignItems: "start" }}
      >
        {/* Story text */}
        <div className="text-[19px] leading-[1.7] text-[#3a3a3a]">
          <p className="mb-6">{t("story.p1")}</p>
          <p className="mb-6">{t("story.p2")}</p>
          <p className="mb-0">{t("story.p3")}</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3.5">
          {STATS.map(({ color, number, key }) => (
            <div
              key={key}
              className="rounded-[18px] p-6"
              style={{ background: color }}
            >
              <div
                className="font-black leading-none tracking-[-0.02em] text-[#0D1801]"
                style={{ fontSize: 44, fontFamily: "var(--font-display)" }}
              >
                {number}
              </div>
              <div className="mt-1 text-[13px] font-semibold text-[#1d2a14]">
                {t(`stats.${key}`)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Four house rules — dark section */}
      <section className="py-16" style={{ background: "#0D1801" }}>
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 md:px-8">
          <SectionHead
            kicker={t("rulesKicker")}
            title={
              <span style={{ color: "#fff" }}>
                Four{" "}
                <SkewUnderline color="rgba(191,255,0,.35)" height="55%">
                  house rules.
                </SkewUnderline>
              </span>
            }
          />
          <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
            {rules.map((rule) => (
              <div
                key={rule.title}
                className="rounded-[22px] p-7"
                style={{ background: "#0D1801", border: "1px solid rgba(255,255,255,.08)" }}
              >
                <Check size={22} color="#BFFF00" />
                <h3
                  className="mb-2 mt-3 font-black text-white"
                  style={{ fontSize: 24, fontFamily: "var(--font-display)" }}
                >
                  {rule.title}
                </h3>
                <p className="m-0 text-[15px] leading-[1.6]" style={{ color: "#A8B099" }}>
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-[1100px] px-4 py-16 sm:px-6 md:px-8">
        <SectionHead title={t("teamTitle")} />
        <div className="grid grid-cols-2 gap-[18px] sm:grid-cols-4">
          {TEAM.map((member) => (
            <div key={member.name}>
              {/* Avatar */}
              <div
                className="flex aspect-square w-full items-center justify-center rounded-[20px] font-black text-[#0D1801]"
                style={{
                  background: member.color,
                  fontSize: 64,
                  fontFamily: "var(--font-display)",
                }}
              >
                {member.initials}
              </div>
              <div
                className="mt-3 text-[17px] font-extrabold text-[#0D1801]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {member.name}
              </div>
              <div className="text-[13px] text-[#666]">{member.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* App download CTA */}
      <section className="bg-[#F5FDE0] px-4 py-16 sm:px-6 md:px-8">
        <div className="mx-auto max-w-[760px] text-center">
          <h2
            className="mb-3 font-black text-[#0D1801]"
            style={{ fontSize: 28, fontFamily: "var(--font-display)" }}
          >
            {t("appCta.heading")}
          </h2>
          <p className="mb-8 text-[#555]">{t("appCta.body")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-7 py-4 text-[15px] font-extrabold text-white no-underline"
              style={{ background: "#0D1801" }}
            >
              {t("appCta.iosLabel")}
            </a>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-[#0D1801] px-7 py-4 text-[15px] font-extrabold text-[#0D1801] no-underline"
              style={{ background: "transparent" }}
            >
              {t("appCta.androidLabel")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
