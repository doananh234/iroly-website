import { Plus } from "lucide-react";
import type { FaqItem } from "@/data/fallback";

interface PricingFaqGridProps {
  title: string;
  items: FaqItem[];
}

/** 2-column FAQ grid with warm background, matching prototype PagePricing. */
export function PricingFaqGrid({ title, items }: PricingFaqGridProps) {
  return (
    <section className="mx-auto max-w-[1100px] px-4 pb-20 sm:px-6 md:px-8">
      <h2
        className="mb-6 text-[28px] font-black leading-tight tracking-[-0.02em] text-[#0D1801] md:text-[44px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-[14px] px-[22px] py-[18px] cursor-pointer"
            style={{ background: "#F5F2EA" }}
          >
            <summary className="flex list-none items-center justify-between gap-4">
              <span
                className="text-[16px] font-black text-[#0D1801]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.q}
              </span>
              <Plus size={16} className="shrink-0 text-[#0D1801]" />
            </summary>
            <p className="mt-2.5 text-[14px] leading-[1.55] text-[#3a3a3a]">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
