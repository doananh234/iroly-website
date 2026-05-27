"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SkewUnderline } from "@/components/skew-underline";
import { authClient } from "@/lib/auth-client";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgotPassword");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authClient.resetPassword({ email, redirectTo: "/reset-password" } as any);
      setSent(true);
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#BFFF00]">
          <CheckCircle size={32} className="text-[#0D1801]" />
        </div>
        <h1 className="font-display text-[28px] font-black text-[#0D1801] sm:text-[32px]">
          {t("sentTitle")}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#666]">
          {t("sentDescription", { email })}
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Button
            variant="outline"
            className="h-12 w-full rounded-full text-sm font-semibold"
            onClick={() => setSent(false)}
          >
            {t("resend")}
          </Button>
          <Link href="/login">
            <Button
              variant="ghost"
              className="h-10 w-full gap-2 rounded-full text-sm font-semibold text-[#0D1801]"
            >
              <ArrowLeft size={16} />
              {t("backToLogin")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Back link */}
      <Link
        href="/login"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0D1801]/60 hover:text-[#0D1801]"
      >
        <ArrowLeft size={14} />
        {t("backToLogin")}
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-[32px] font-black leading-tight tracking-tight text-[#0D1801] sm:text-[36px]">
          <SkewUnderline color="#BFFF00" height="40%">
            {t("title")}
          </SkewUnderline>
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-[#666]">
          {t("subtitle")}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#0D1801]">
            {t("email")}
          </label>
          <div className="relative">
            <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999]" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 rounded-xl border-black/[0.1] pl-10 text-[15px] focus-visible:ring-[#BFFF00]"
              required
            />
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="h-12 w-full rounded-full bg-[#0D1801] text-[15px] font-bold text-white hover:bg-[#0D1801]/90"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {t("submit")}
            </span>
          ) : (
            t("submit")
          )}
        </Button>
      </form>
    </div>
  );
}
