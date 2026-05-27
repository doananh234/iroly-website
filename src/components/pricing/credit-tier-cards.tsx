import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { CreditTier } from "@/data/fallback";

interface CreditTierCardsProps {
  tiers: CreditTier[];
  popularLabel?: string;
}

/** Three distinct-styled credit tier cards matching prototype PagePricing. */
export function CreditTierCards({ tiers, popularLabel = "Most Popular" }: CreditTierCardsProps) {
  return (
    <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-5 px-4 sm:px-6 md:grid-cols-3 md:px-8">
      {tiers.map((tier) => {
        const isLibrary = tier.popular;
        const isStudio = tier.dark;
        const bg = isStudio ? "#0D1801" : isLibrary ? "#BFFF00" : "#F5F2EA";
        const textColor = isStudio ? "#fff" : "#0D1801";
        const subColor = isStudio ? "rgba(255,255,255,.65)" : "rgba(13,24,1,.6)";
        const checkBg = isStudio ? "#BFFF00" : "#0D1801";
        const checkColor = isStudio ? "#0D1801" : "#fff";
        const btnBg = isStudio ? "#BFFF00" : "#0D1801";
        const btnColor = isStudio ? "#0D1801" : "#fff";

        return (
          <div
            key={tier.id}
            style={{ background: bg, color: textColor }}
            className="relative flex flex-col rounded-[24px] border-2 border-transparent p-7"
            data-popular={isLibrary}
          >
            {/* Popular badge */}
            {isLibrary && (
              <div
                className="absolute -top-3.5 left-7 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[.06em]"
                style={{ background: "#0D1801", color: "#BFFF00" }}
              >
                {popularLabel}
              </div>
            )}

            {/* Tag line */}
            <div className="text-xs font-bold uppercase tracking-[.06em]" style={{ opacity: 0.7 }}>
              {tier.includes}
            </div>

            {/* Name */}
            <h3
              className="mt-2 font-black leading-none tracking-[-0.015em]"
              style={{ fontSize: 36, fontFamily: "var(--font-display)", color: textColor }}
            >
              {tier.label}
            </h3>

            {/* Price */}
            <div
              className="mt-4 font-black leading-none tracking-[-0.02em]"
              style={{ fontSize: 56, fontFamily: "var(--font-display)", color: textColor }}
            >
              {tier.price}
            </div>
            <div className="mt-1 text-[13px]" style={{ color: subColor }}>
              {typeof tier.credits === "number" ? tier.credits : tier.credits} credits · {tier.per}
            </div>

            {/* Perks */}
            <ul className="mb-7 mt-6 flex flex-1 flex-col gap-2">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-[14px]" style={{ color: textColor }}>
                  <span
                    className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full"
                    style={{ background: checkBg }}
                  >
                    <Check size={11} color={checkColor} strokeWidth={3} />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            {/* CTA — link to checkout for credit purchase */}
            <Link
              href="/checkout"
              className="block rounded-full py-3.5 text-center text-[15px] font-extrabold transition-opacity hover:opacity-90"
              style={{ background: btnBg, color: btnColor }}
            >
              Buy {tier.label}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
