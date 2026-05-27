"use client";

import { useTranslations } from "next-intl";

interface StatItem {
  label: string;
  value: string | number;
}

interface AccountStatsProps {
  booksOwned: number;
  pagesColored: number;
  credits: number;
  memberSince: string;
}

/** Four-stat row for the account dashboard. */
export function AccountStats({ booksOwned, pagesColored, credits, memberSince }: AccountStatsProps) {
  const t = useTranslations("account.stats");

  const stats: StatItem[] = [
    { label: t("booksOwned"), value: booksOwned },
    { label: t("pagesColored"), value: pagesColored },
    { label: t("credits"), value: credits },
    { label: t("memberSince"), value: memberSince },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map(({ label, value }) => (
        <div
          key={label}
          className="rounded-2xl border border-black/[0.07] bg-white p-4 text-center dark:border-white/[0.08] dark:bg-white/[0.04]"
        >
          <p className="text-xl font-black text-[#0D1801] dark:text-white">{value}</p>
          <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--iroly-fg-muted)]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
