"use client";
/**
 * Community gallery with filter tabs and masonry-style artwork grid.
 * Matches prototype PageCommunity main content (lines 1900-1955).
 */
import { useState } from "react";
import { COMMUNITY_ART } from "@/data/fallback";

const TABS = [
  { id: "trending", label: "Trending" },
  { id: "week",     label: "This week" },
  { id: "new",      label: "New" },
  { id: "following",label: "Following" },
  { id: "challenges",label: "Challenges" },
];

const FILTERS = [
  { id: "all",    label: "All" },
  { id: "fox",    label: "Tiny Friends" },
  { id: "garden", label: "Bold Garden" },
  { id: "mug",    label: "Cozy Sundays" },
];

const GALLERY_PAGE_SIZE = 9;

export function CommunityGallery() {
  const [tab, setTab] = useState("trending");
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(GALLERY_PAGE_SIZE);
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const filtered = COMMUNITY_ART.filter(
    (item) => filter === "all" || item.outline === filter,
  );

  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  function toggleLike(index: number) {
    setLiked((s) => ({ ...s, [index]: !s[index] }));
  }

  return (
    <>
      {/* Sticky filter bar */}
      <section className="sticky top-0 z-[5] border-b border-black/[.06] bg-[#FFFDF8] px-4 py-3.5 sm:px-6 md:px-8">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4">
          <div className="flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => { setTab(id); setVisibleCount(GALLERY_PAGE_SIZE); }}
                className="shrink-0 rounded-full border-none px-4 py-2 text-[13px] font-bold"
                style={{
                  background: tab === id ? "#0D1801" : "transparent",
                  color: tab === id ? "#BFFF00" : "#0D1801",
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#666]">Page:</span>
            {FILTERS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => { setFilter(id); setVisibleCount(GALLERY_PAGE_SIZE); }}
                className="rounded-full px-3 py-1.5 text-[12px] font-bold"
                style={{
                  border: `1.5px solid ${filter === id ? "#0D1801" : "rgba(13,24,1,.12)"}`,
                  background: filter === id ? "#0D1801" : "#fff",
                  color: filter === id ? "#BFFF00" : "#0D1801",
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry gallery */}
      <div className="columns-1 gap-[18px] sm:columns-2 lg:columns-3">
        {visibleItems.map((item, i) => {
          const isLiked = !!liked[i];
          const likeCount = item.likes + (isLiked ? 1 : 0);
          return (
            <article
              key={i}
              className="mb-[18px] overflow-hidden rounded-[18px] border border-black/[.06] bg-white"
              style={{ breakInside: "avoid" }}
            >
              <div className="relative p-[18px]" style={{ background: item.bg }}>
                <div className="relative flex aspect-square items-center justify-center rounded-xl bg-white p-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/coloring-pages/free-coloring-page.svg"
                    alt=""
                    className="h-full w-full"
                  />
                  <div
                    className="absolute inset-3.5 rounded-lg"
                    style={{ background: item.accent, mixBlendMode: "multiply", opacity: 0.38 }}
                  />
                </div>
                <div
                  className="absolute left-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[.04em]"
                  style={{ background: "#0D1801", color: "#BFFF00" }}
                >
                  {item.book}
                </div>
              </div>
              <div className="px-3.5 py-3">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-extrabold text-white"
                    style={{ background: item.accent }}
                  >
                    {item.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-extrabold">{item.name}</div>
                    <div className="text-[11px] text-[#666]">@{item.handle} · {item.when}</div>
                  </div>
                </div>
                <div className="mt-2.5 flex gap-3.5 text-[12px] text-[#0D1801]">
                  <button
                    onClick={() => toggleLike(i)}
                    className="inline-flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-[12px]"
                    style={{ color: isLiked ? "#E85E5E" : "#0D1801" }}
                    aria-label={isLiked ? "Unlike" : "Like"}
                  >
                    {isLiked ? "♥" : "♡"} {likeCount}
                  </button>
                  <span className="inline-flex items-center gap-1">💬 {item.comments}</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[#666]">🎨 swipe palette</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Load more — hidden when all items are shown */}
      {hasMore && (
        <div className="mt-3 flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + GALLERY_PAGE_SIZE)}
            className="rounded-full border border-black/[.12] bg-white px-6 py-3 text-[14px] font-bold text-[#0D1801]"
            style={{ cursor: "pointer" }}
          >
            ↓ Load more
          </button>
        </div>
      )}
    </>
  );
}
