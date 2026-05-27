"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { Palette, Play } from "lucide-react";

export function HeroCtaButtons() {
  const t = useTranslations("home");
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href="/shop">
          <Button
            size="lg"
            className="gap-2 rounded-full bg-[#0D1801] px-[26px] py-4 text-base text-white hover:bg-[#0D1801]/90"
          >
            <Palette size={18} /> {t("hero.cta")}
          </Button>
        </Link>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 rounded-full border-[#0D1801]/15 px-[22px] py-4 text-base text-[#0D1801]"
          onClick={() => setShowVideo(true)}
        >
          <Play size={18} /> {t("hero.ctaSecondary")}
        </Button>
      </div>

      {/* Video dialog — uses MagicUI HeroVideoDialog internally */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative mx-4 aspect-video w-full max-w-4xl overflow-hidden rounded-2xl border-2 border-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 z-10 rounded-full bg-white/20 p-2 text-white backdrop-blur-md hover:bg-white/30"
              onClick={() => setShowVideo(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="How iRoly Works"
              className="h-full w-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>
      )}
    </>
  );
}
