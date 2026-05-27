"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SkewUnderline } from "@/components/skew-underline";
import { authClient } from "@/lib/auth-client";
import { Mail, Lock, Eye, EyeOff, UserRound } from "lucide-react";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const tSocial = useTranslations("auth.social");
  const locale = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authClient.signUp.email({ name, email, password });
      window.location.href = `/${locale}`;
    } catch {
      setError(t("error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-[32px] font-black leading-tight tracking-tight text-[#0D1801] sm:text-[36px]">
          <SkewUnderline color="#BFFF00" height="40%">
            {t("title")}
          </SkewUnderline>
        </h1>
        <p className="mt-2 text-[15px] text-[#666]">{t("subtitle")}</p>
      </div>

      {/* Social buttons */}
      <div className="flex flex-col gap-3">
        <Button
          variant="outline"
          className="h-12 w-full gap-3 rounded-full border-black/[0.1] text-sm font-semibold hover:bg-black/[0.02]"
          onClick={() => authClient.signIn.social({ provider: "google" })}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          {t("continueWith", { provider: tSocial("google") })}
        </Button>

        <Button
          variant="outline"
          className="h-12 w-full gap-3 rounded-full border-black/[0.1] text-sm font-semibold hover:bg-black/[0.02]"
          onClick={() => authClient.signIn.social({ provider: "apple" })}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          {t("continueWith", { provider: tSocial("apple") })}
        </Button>
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <Separator className="flex-1" />
        <span className="text-xs font-medium text-[#999]">{t("orContinueWith")}</span>
        <Separator className="flex-1" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#0D1801]">
            {t("name")}
          </label>
          <div className="relative">
            <UserRound size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999]" />
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mei Yoshida"
              className="h-12 rounded-xl border-black/[0.1] pl-10 text-[15px] focus-visible:ring-[#BFFF00]"
              required
            />
          </div>
        </div>

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

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-[#0D1801]">
            {t("password")}
          </label>
          <div className="relative">
            <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999]" />
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-12 rounded-xl border-black/[0.1] pl-10 pr-10 text-[15px] focus-visible:ring-[#BFFF00]"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-transparent p-0.5 text-[#999] hover:text-[#0D1801]"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="mt-1 text-xs text-[#999]">{t("passwordHint")}</p>
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

      {/* Terms notice */}
      <p className="mt-4 text-center text-xs text-[#999]">
        {t("terms")}
      </p>

      {/* Footer link */}
      <p className="mt-4 text-center text-sm text-[#666]">
        {t("hasAccount")}{" "}
        <Link href="/login" className="font-bold text-[#0D1801] hover:underline">
          {t("login")}
        </Link>
      </p>
    </div>
  );
}
