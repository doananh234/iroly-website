import { getTranslations } from "next-intl/server";
import { SkewUnderline } from "@/components/skew-underline";
import { BookCover } from "@/components/book-cover";
import { HeroCtaButtons } from "@/components/hero-cta-buttons";
import { Star, Sparkles, Diamond } from "lucide-react";
import type { AppHomeTrendingBook } from "@/types";

interface HeroHomeProps {
  topBooks: AppHomeTrendingBook[];
}

export async function HeroHome({ topBooks }: HeroHomeProps) {
  const t = await getTranslations("home");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#BFFF00] via-[#E8FF99] via-40% to-[#FFFDF8]">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-8 px-4 pb-12 pt-10 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:gap-14 md:px-8 md:pb-[88px] md:pt-16">
        {/* Left column — text */}
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#0D1801]/85 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[#BFFF00]">
            <Sparkles size={14} />
            {t("hero.eyebrow", { count: "1,402" })}
          </div>

          <h1 className="font-display text-[40px] font-black leading-[0.92] tracking-[-0.035em] text-[#0D1801] sm:text-[64px] md:text-[80px] lg:text-[96px]">
            Color the
            <br />
            calm{" "}
            <SkewUnderline color="rgba(255,255,255,.65)" height="28px">
              back in.
            </SkewUnderline>
          </h1>

          <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-[#1d2a14]">
            {t("hero.subtitle")}
          </p>

          <HeroCtaButtons />

          {/* Avatar stack + rating */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <div className="flex">
              {["#FFE8C2", "#FFD6E5", "#C2E0FF", "#DDF4D2"].map((c, i) => (
                <div
                  key={i}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xs font-extrabold text-[#0D1801]"
                  style={{ background: c, marginLeft: i ? -10 : 0 }}
                >
                  {["T", "C", "M", "L"][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-[#0D1801] text-[#0D1801]" />
                ))}
              </div>
              <div className="mt-0.5 text-[13px] text-[#1d2a14]">
                <b>4.92</b> {t("trust.rating", { rating: "", count: "2,180" }).replace(/^\s+/, "")}
              </div>
            </div>
          </div>
        </div>

        {/* Right column — tilted book covers */}
        {/* Mobile: 2 overlapping covers centered */}
        <div className="relative mx-auto h-[280px] w-full max-w-[320px] md:hidden">
          {topBooks[0] && (
            <div className="absolute left-4 top-4" style={{ transform: "rotate(-6deg)" }}>
              <BookCover src={topBooks[0].imageUrl} alt={topBooks[0].title} size={200} radius={18} />
            </div>
          )}
          {topBooks[1] && (
            <div className="absolute right-4 top-0" style={{ transform: "rotate(5deg)" }}>
              <BookCover src={topBooks[1].imageUrl} alt={topBooks[1].title} size={180} radius={18} />
            </div>
          )}
          {topBooks[0] && (
            <div
              className="absolute right-2 top-2 rounded-[20px] bg-[#0D1801] px-3 py-1 text-xs font-black italic text-white shadow-lg"
              style={{ transform: "rotate(8deg)" }}
            >
              TOP.1
            </div>
          )}
        </div>

        {/* Desktop: 3 tilted covers + floating chip (matching prototype exactly) */}
        <div className="relative hidden h-[540px] md:block">
          {/* Cover 1: top-left, rotated -8deg, 280px */}
          {topBooks[0] && (
            <div className="absolute left-0 top-10" style={{ transform: "rotate(-8deg)" }}>
              <BookCover
                src={topBooks[0].imageUrl}
                alt={topBooks[0].title}
                size={280}
                radius={20}
                className="shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              />
            </div>
          )}
          {/* Cover 2: top-right, rotated 6deg, 260px */}
          {topBooks[1] && (
            <div className="absolute right-0 top-0" style={{ transform: "rotate(6deg)" }}>
              <BookCover
                src={topBooks[1].imageUrl}
                alt={topBooks[1].title}
                size={260}
                radius={20}
                className="shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              />
            </div>
          )}
          {/* Cover 3: bottom-right, rotated -3deg, 220px */}
          {topBooks[2] && (
            <div className="absolute bottom-0 right-[60px]" style={{ transform: "rotate(-3deg)" }}>
              <BookCover
                src={topBooks[2].imageUrl}
                alt={topBooks[2].title}
                size={220}
                radius={18}
                className="shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              />
            </div>
          )}

          {/* TOP.1 pill */}
          {topBooks[0] && (
            <div
              className="absolute left-[240px] top-6 rounded-[20px] bg-[#0D1801] px-3.5 py-1.5 text-[13px] font-black italic text-white shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
              style={{ transform: "rotate(8deg)" }}
            >
              TOP.1
            </div>
          )}

          {/* Floating chip — "This week / 12 new pages" */}
          <div className="absolute bottom-10 left-5 flex items-center gap-2.5 rounded-[14px] bg-white px-3.5 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#BFFF00]">
              <Diamond size={18} className="text-[#0D1801]" />
            </div>
            <div>
              <div className="text-[11px] text-[#666]">This week</div>
              <div className="text-sm font-extrabold text-[#0D1801]">12 new pages</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
