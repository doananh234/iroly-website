"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Lock, Eye, EyeOff, Check } from "lucide-react";

/** Account settings section: email display + change password. */
export function SettingsAccount() {
  const t = useTranslations("account.settings");

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw]         = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showPw, setShowPw]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [saved, setSaved]         = useState(false);
  const [error, setError]         = useState("");

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (newPw !== confirmPw) { setError("Passwords do not match."); return; }
    if (newPw.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      await authClient.changePassword({ currentPassword: currentPw, newPassword: newPw, revokeOtherSessions: false });
      setSaved(true);
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Could not change password. Please check your current password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-black/[0.07] bg-white p-5 dark:border-white/[0.08] dark:bg-white/[0.04]">
      <h2 className="mb-4 text-base font-black text-[#0D1801] dark:text-white">{t("account")}</h2>

      {/* Email (read-only) */}
      <div className="mb-5">
        <label className="mb-1.5 block text-sm font-semibold text-[var(--iroly-fg-muted)]">{t("email")}</label>
        <Input
          type="email"
          defaultValue="user@example.com"
          readOnly
          className="h-11 cursor-not-allowed rounded-xl border-black/[0.1] bg-black/[0.03] text-[14px] dark:bg-white/[0.04]"
        />
      </div>

      {/* Change password */}
      <form onSubmit={handlePasswordChange} className="flex flex-col gap-3">
        <p className="text-sm font-black text-[#0D1801] dark:text-white">{t("changePassword")}</p>

        {(["currentPassword", "newPassword", "confirmPassword"] as const).map((field, i) => {
          const value  = [currentPw, newPw, confirmPw][i];
          const setter = [setCurrentPw, setNewPw, setConfirmPw][i];
          return (
            <div key={field} className="relative">
              <Lock size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999]" />
              <Input
                type={showPw ? "text" : "password"}
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={t(field)}
                className="h-11 rounded-xl border-black/[0.1] pl-9 pr-9 text-[14px] focus-visible:ring-[#BFFF00]"
                required
              />
              {i === 2 && (
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-transparent p-0.5 text-[#999] hover:text-[#0D1801]"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              )}
            </div>
          );
        })}

        {error && (
          <div className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}
        {saved && (
          <div className="flex items-center gap-2 rounded-xl bg-[#BFFF00]/30 px-4 py-2.5 text-sm font-semibold text-[#0D1801]">
            <Check size={14} /> Password updated!
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="h-10 w-full rounded-full bg-[#0D1801] text-sm font-bold text-white hover:bg-[#0D1801]/90 dark:bg-white dark:text-[#0D1801]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-black/30 dark:border-t-black" />
              {t("updatePassword")}
            </span>
          ) : t("updatePassword")}
        </Button>
      </form>
    </section>
  );
}
