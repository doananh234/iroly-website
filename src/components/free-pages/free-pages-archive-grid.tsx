"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type { FreeColoringPage } from "@/data/fallback";

const CATEGORIES = ["All", "Animals", "Mandalas", "Spooky", "Christmas", "Flowers", "Cute"] as const;

interface FreeArchiveGridProps {
  pages: FreeColoringPage[];
  freeBadge: string;
  weekLabel: string;
  categoryLabels: Record<string, string>;
}

/** Category filter + 4-col archive grid for free pages. */
export function FreeArchiveGrid({ pages, freeBadge, weekLabel, categoryLabels }: FreeArchiveGridProps) {
  const [active, setActive] = useState("All");

  return (
    <>
      {/* Category pills */}
      <div className="mb-[18px] flex flex-wrap gap-2">
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="rounded-full px-[14px] py-2 text-[13px] font-bold"
            style={{
              background: active === cat ? "#0D1801" : "rgba(0,0,0,.04)",
              color: active === cat ? "#BFFF00" : "#0D1801",
              border: "none",
              cursor: "pointer",
            }}
          >
            {categoryLabels[cat.toLowerCase()] ?? cat}
          </button>
        ))}
      </div>

      {/* Archive grid */}
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
        {pages.map((page) => (
          <div
            key={page.id}
            className="rounded-[18px] p-3.5"
            style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,.04)" }}
          >
            {/* Image area */}
            <div
              className="relative aspect-square overflow-hidden rounded-[12px]"
              style={{ background: page.bg }}
            >
              {page.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={page.imageUrl} alt={page.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="h-3/4 w-3/4 rounded-[8px] bg-white/60" />
                </div>
              )}
              {/* Free badge */}
              <div className="absolute left-2 top-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-[.04em]"
                  style={{ background: "#0D1801", color: "#BFFF00" }}
                >
                  {freeBadge}
                </span>
              </div>
            </div>

            {/* Footer row */}
            <div className="mt-2.5 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[.04em] text-[#777]">
                  {weekLabel.replace("{week}", String(page.week))}
                </div>
                <div
                  className="text-[14px] font-extrabold text-[#0D1801]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {page.title}
                </div>
              </div>
              <a
                href="/assets/coloring-pages/free-coloring-page.svg"
                download="iroly-free-page.svg"
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: "#0D1801" }}
                aria-label="Download"
              >
                <Download size={14} color="#BFFF00" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
