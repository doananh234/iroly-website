"use client";

/**
 * ShareButton — calls Web Share API or copies URL to clipboard.
 * Shows "Link copied!" toast briefly on clipboard fallback.
 */
import { useState } from "react";
import { Share2 } from "lucide-react";
import { useShare } from "@/hooks/use-share";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  /** "icon" = circle icon only (default), "pill" = icon + label */
  variant?: "icon" | "pill";
  size?: "sm" | "md";
  className?: string;
  style?: React.CSSProperties;
}

export function ShareButton({
  title,
  text,
  url,
  variant = "icon",
  size = "md",
  className = "",
  style,
}: ShareButtonProps) {
  const { share } = useShare();
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    const before = typeof navigator !== "undefined" && !!navigator.share;
    await share({ title, text, url });
    // If no Web Share API (clipboard fallback used), show toast
    if (!before) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const iconSize = size === "sm" ? 14 : 16;
  const buttonSize = size === "sm" ? { width: 34, height: 34 } : { width: 38, height: 38 };

  if (variant === "pill") {
    return (
      <div className="relative inline-flex">
        <button
          onClick={handleClick}
          className={`inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-[13px] font-bold text-[#0D1801] ${className}`}
          style={{ cursor: "pointer", ...style }}
        >
          <Share2 size={iconSize} />
          Share
        </button>
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-[#0D1801] px-3 py-1 text-[11px] font-bold text-white whitespace-nowrap">
            Link copied!
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-flex">
      <button
        onClick={handleClick}
        className={`flex items-center justify-center rounded-full border border-black/10 bg-white text-[#0D1801] ${className}`}
        style={{ cursor: "pointer", ...buttonSize, ...style }}
        aria-label="Share"
      >
        <Share2 size={iconSize} />
      </button>
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-[#0D1801] px-3 py-1 text-[11px] font-bold text-white whitespace-nowrap">
          Link copied!
        </span>
      )}
    </div>
  );
}
