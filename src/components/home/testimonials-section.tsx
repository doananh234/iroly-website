import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import type { FallbackTestimonial } from "@/data/fallback";

interface TestimonialsSectionProps {
  testimonials: FallbackTestimonial[];
}

function TestimonialCard({ item }: { item: FallbackTestimonial }) {
  return (
    <div className="mx-3 w-[320px] shrink-0 rounded-2xl border border-white/[0.08] bg-white/[0.05] p-6 backdrop-blur-sm sm:w-[360px]">
      {/* Stars */}
      <div className="mb-3 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className="fill-[#BFFF00] text-[#BFFF00]" />
        ))}
      </div>
      {/* Quote */}
      <p
        className="mb-4 text-[17px] font-bold leading-[1.4] text-[#E4E9DA] sm:text-[19px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        &ldquo;{item.quote}&rdquo;
      </p>
      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black text-[#0D1801]"
          style={{ background: "#BFFF00" }}
        >
          {item.name.charAt(0)}
        </div>
        <div>
          <div className="text-[13px] font-bold text-[#BFFF00]">{item.name}</div>
          <div className="text-[11px] text-white/50">{item.tag}</div>
        </div>
      </div>
    </div>
  );
}

export async function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const t = await getTranslations("home.testimonials");

  return (
    <section className="overflow-hidden bg-[#0D1801] py-12 sm:py-16">
      {/* Section kicker */}
      <div className="mb-8 text-center">
        <div className="inline-block rounded bg-[#BFFF00] px-[10px] py-1 text-xs font-bold uppercase tracking-[.04em] text-[#0D1801]">
          {t("kicker")}
        </div>
      </div>

      {/* Marquee — first row scrolls left */}
      <Marquee pauseOnHover className="[--duration:35s] [--gap:0px]">
        {testimonials.map((item, i) => (
          <TestimonialCard key={i} item={item} />
        ))}
      </Marquee>

      {/* Marquee — second row scrolls right */}
      <div className="mt-4">
        <Marquee pauseOnHover reverse className="[--duration:40s] [--gap:0px]">
          {[...testimonials].reverse().map((item, i) => (
            <TestimonialCard key={i} item={item} />
          ))}
        </Marquee>
      </div>

      {/* Gradient fade edges */}
      <div className="pointer-events-none relative -mt-[1px]">
        <div className="absolute -top-[200px] left-0 h-[200px] w-[80px] bg-gradient-to-r from-[#0D1801] to-transparent sm:w-[120px]" />
        <div className="absolute -top-[200px] right-0 h-[200px] w-[80px] bg-gradient-to-l from-[#0D1801] to-transparent sm:w-[120px]" />
      </div>
    </section>
  );
}
