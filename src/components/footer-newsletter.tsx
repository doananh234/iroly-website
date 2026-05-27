"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/** Newsletter signup column for the footer — client-side only, no backend call yet. */
export function FooterNewsletter() {
  const t = useTranslations("common.footer");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      setError(t("invalidEmail"));
      return;
    }
    setError("");
    setSubmitted(true);
    setEmail("");
  }

  return (
    <div className="col-span-2 md:col-span-1">
      <div className="mb-3.5 text-[13px] font-bold uppercase tracking-[.06em] text-[#BFFF00]">
        {t("newsletterTitle")}
      </div>
      <p className="mb-3 text-[13px] text-[#A8B099]">
        {t("newsletterSubtitle")}
      </p>

      {submitted ? (
        <div className="rounded-full bg-[#BFFF00] px-4 py-2.5 text-center text-[13px] font-extrabold text-[#0D1801]">
          {t("seeYouFriday")}
        </div>
      ) : (
        <form className="flex flex-col gap-1.5" onSubmit={handleSubmit}>
          <div className="flex gap-1.5">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="you@calm.inbox"
              className="flex-1 rounded-full border border-white/[0.15] bg-white/[0.05] px-3.5 py-2.5 text-[13px] text-white outline-none placeholder:text-white/40"
            />
            <button
              type="submit"
              className="cursor-pointer rounded-full border-none bg-[#BFFF00] px-4 py-2.5 text-[13px] font-extrabold text-[#0D1801]"
            >
              {t("subscribe")}
            </button>
          </div>
          {error && (
            <p className="pl-3.5 text-[11px] text-red-400">{error}</p>
          )}
        </form>
      )}
    </div>
  );
}
