"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/switch";

interface NotifRow {
  id: string;
  labelKey: "weeklyEmail" | "newReleases" | "communityMentions";
  default: boolean;
}

const NOTIF_ROWS: NotifRow[] = [
  { id: "weekly",    labelKey: "weeklyEmail",         default: true  },
  { id: "releases",  labelKey: "newReleases",          default: true  },
  { id: "mentions",  labelKey: "communityMentions",    default: false },
];

/** Notifications settings section. */
export function SettingsNotifications() {
  const t = useTranslations("account.settings");
  const [values, setValues] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIF_ROWS.map((r) => [r.id, r.default])),
  );

  return (
    <section className="rounded-2xl border border-black/[0.07] bg-white p-5 dark:border-white/[0.08] dark:bg-white/[0.04]">
      <h2 className="mb-4 text-base font-black text-[#0D1801] dark:text-white">{t("notifications")}</h2>
      <div className="flex flex-col divide-y divide-black/[0.06] dark:divide-white/[0.06]">
        {NOTIF_ROWS.map(({ id, labelKey }) => (
          <div key={id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <span className="text-sm font-semibold text-[var(--iroly-fg-muted)]">{t(labelKey)}</span>
            <Switch
              checked={values[id]}
              onCheckedChange={(v) => setValues((prev) => ({ ...prev, [id]: v }))}
              className="data-[state=checked]:bg-[#0D1801]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
