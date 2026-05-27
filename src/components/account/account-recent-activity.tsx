"use client";

import { useTranslations } from "next-intl";
import { Palette, ShoppingBag } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "colored" | "purchased";
  text: string;
  time: string;
}

const FALLBACK_ACTIVITY: ActivityItem[] = [
  { id: "a1", type: "colored",   text: "Colored Tiny Friends page 3",    time: "2h ago" },
  { id: "a2", type: "purchased", text: "Purchased Bold Garden",           time: "1d ago" },
  { id: "a3", type: "colored",   text: "Colored Cutie Patterns page 7",  time: "2d ago" },
  { id: "a4", type: "purchased", text: "Purchased Merry Friends",         time: "5d ago" },
  { id: "a5", type: "colored",   text: "Colored Tiny Friends page 1",    time: "1w ago" },
];

/** Simple recent-activity list for the account dashboard. */
export function AccountRecentActivity() {
  const t = useTranslations("account");

  return (
    <section>
      <h2 className="mb-4 text-lg font-black text-[#0D1801] dark:text-white">
        {t("recentActivity")}
      </h2>
      <ul className="flex flex-col divide-y divide-black/[0.06] rounded-2xl border border-black/[0.07] bg-white dark:divide-white/[0.06] dark:border-white/[0.08] dark:bg-white/[0.04]">
        {FALLBACK_ACTIVITY.map(({ id, type, text, time }) => (
          <li key={id} className="flex items-center gap-3 px-4 py-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
              style={{ background: type === "colored" ? "#BFFF00" : "#C2E0FF" }}
            >
              {type === "colored" ? (
                <Palette size={14} className="text-[#0D1801]" />
              ) : (
                <ShoppingBag size={14} className="text-[#0D1801]" />
              )}
            </span>
            <span className="flex-1 text-sm font-medium text-[#0D1801] dark:text-white">{text}</span>
            <span className="shrink-0 text-xs text-[var(--iroly-fg-muted)]">{time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
