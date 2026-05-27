"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";

/** Danger zone section: delete account with confirmation dialog. */
export function SettingsDangerZone() {
  const t = useTranslations("account.settings");
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading]       = useState(false);

  async function handleDelete() {
    setLoading(true);
    try {
      // In production: call authClient.deleteUser() or similar endpoint
      await new Promise((res) => setTimeout(res, 1200));
      window.location.href = "/";
    } catch {
      setLoading(false);
      setConfirming(false);
    }
  }

  return (
    <section className="rounded-2xl border border-red-200 bg-red-50/50 p-5 dark:border-red-900/40 dark:bg-red-950/10">
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle size={16} className="text-red-500" />
        <h2 className="text-base font-black text-red-600 dark:text-red-400">{t("dangerZone")}</h2>
      </div>

      {!confirming ? (
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-[var(--iroly-fg-muted)]">
            Permanently remove your account and all associated data.
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setConfirming(true)}
            className="shrink-0 rounded-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-700 dark:text-red-400"
          >
            <Trash2 size={13} className="mr-1.5" />
            {t("deleteAccount")}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">{t("deleteConfirm")}</p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="rounded-full bg-red-600 text-sm font-bold text-white hover:bg-red-700"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Deleting…
                </span>
              ) : t("deleteButton")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirming(false)}
              className="rounded-full border-black/[0.1] font-semibold hover:bg-black/[0.04]"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
