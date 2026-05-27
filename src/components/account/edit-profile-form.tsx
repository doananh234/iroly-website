"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AccountAvatar } from "@/components/account/account-avatar";
import { authClient } from "@/lib/auth-client";
import { Camera, Check } from "lucide-react";

/** Client-side edit profile form. */
export function EditProfileForm() {
  const t = useTranslations("account.edit");

  const [displayName, setDisplayName] = useState("Colorist User");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authClient.updateUser({ name: displayName });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Could not save changes. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Avatar section */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <AccountAvatar name={displayName} size={96} />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#0D1801] text-white shadow-sm hover:bg-[#0D1801]/90"
            title={t("changeAvatar")}
          >
            <Camera size={13} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" />
        </div>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="text-xs font-semibold text-[var(--iroly-fg-muted)] hover:text-[#0D1801] dark:hover:text-white"
        >
          {t("changeAvatar")}
        </button>
      </div>

      {/* Display Name */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#0D1801] dark:text-white">
          {t("displayName")}
        </label>
        <Input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value.slice(0, 15))}
          maxLength={15}
          className="h-12 rounded-xl border-black/[0.1] text-[15px] focus-visible:ring-[#BFFF00]"
          required
        />
        <p className="mt-1 text-xs text-[var(--iroly-fg-muted)]">{t("displayNameHint")}</p>
      </div>

      {/* Bio */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-[#0D1801] dark:text-white">
          {t("bio")}
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value.slice(0, 200))}
          maxLength={200}
          rows={4}
          className="w-full resize-none rounded-xl border border-black/[0.1] bg-transparent px-3 py-2.5 text-[15px] text-[#0D1801] outline-none transition-shadow focus:ring-2 focus:ring-[#BFFF00] dark:border-white/[0.12] dark:text-white"
          placeholder="A few words about yourself…"
        />
        <p className="mt-1 text-xs text-[var(--iroly-fg-muted)]">
          {t("bioHint", { count: bio.length })}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Saved toast */}
      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-[#BFFF00]/30 px-4 py-3 text-sm font-semibold text-[#0D1801]">
          <Check size={15} />
          {t("saved")}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="h-12 flex-1 rounded-full bg-[#0D1801] font-bold text-white hover:bg-[#0D1801]/90 dark:bg-white dark:text-[#0D1801]"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-black/30 dark:border-t-black" />
              {t("save")}
            </span>
          ) : (
            t("save")
          )}
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-12 rounded-full border-black/[0.1] px-6 font-semibold hover:bg-black/[0.04]"
        >
          <Link href="/account">{t("cancel")}</Link>
        </Button>
      </div>
    </form>
  );
}
