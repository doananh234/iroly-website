"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";

export function NewsletterSection() {
  const t = useTranslations("home.newsletter");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#BFFF00] to-[#E8FF99] px-6 py-10 text-center sm:px-10 md:px-14 md:py-14">
      {/* Decorative blobs */}
      <div className="absolute -left-10 -top-10 h-[180px] w-[180px] rounded-full bg-white/30 blur-[40px]" />
      <div className="absolute -bottom-15 -right-10 h-[220px] w-[220px] rounded-full bg-[#0D1801]/[0.08] blur-[60px]" />

      <div className="relative">
        <div className="mb-2.5 text-xs font-extrabold uppercase tracking-widest text-[#0D1801]">
          {t("kicker")}
        </div>
        <h2 className="mx-auto mb-3 max-w-[640px] text-[28px] font-black leading-[1.05] text-[#0D1801] sm:text-[36px] md:text-[44px]">
          {t("title")}
        </h2>
        <p className="mx-auto mb-6 max-w-[480px] text-base leading-relaxed text-[#0D1801]/75">
          {t("subtitle")}
        </p>

        {done ? (
          <div className="inline-flex items-center gap-2.5 rounded-full bg-[#0D1801]/90 px-5 py-3.5 font-bold text-[#BFFF00]">
            <CheckCircle size={18} /> {t("success")}
          </div>
        ) : (
          <div className="mx-auto max-w-[480px]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const trimmed = email.trim();
                if (!trimmed || !trimmed.includes("@")) {
                  setError("Please enter a valid email address.");
                  return;
                }
                setError("");
                setDone(true);
              }}
              className="flex flex-col gap-2 sm:flex-row sm:gap-1.5 sm:rounded-full sm:bg-white sm:p-1.5 sm:shadow-md"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder={t("placeholder")}
                className="w-full flex-1 rounded-full border-none bg-white text-base shadow-md focus-visible:ring-0 sm:shadow-none"
              />
              <Button
                type="submit"
                className="w-full rounded-full bg-[#0D1801] px-5 font-extrabold text-white hover:bg-[#0D1801]/90 sm:w-auto"
              >
                {t("cta")}
              </Button>
            </form>
            {error && (
              <p className="mt-2 pl-3.5 text-left text-[12px] text-red-600">{error}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
