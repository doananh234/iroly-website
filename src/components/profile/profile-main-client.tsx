"use client";
/**
 * Profile main area: tabs + content + sidebar — full client component.
 * Matches prototype PageProfile (lines 2091-2258).
 */
import { useState } from "react";
import { PROFILE_ART, PROFILE_BOOKS, COMMUNITY_ART } from "@/data/fallback";

const TABS = [
  { id: "artwork",     label: "Artwork",     count: "142" },
  { id: "books",       label: "Books",       count: "12" },
  { id: "collections", label: "Collections", count: "28" },
  { id: "liked",       label: "Liked",       count: "340" },
  { id: "activity",   label: "Activity",    count: "" },
];

const COLLECTIONS = [
  { name: "Foxes only",    count: "24 pieces", palette: ["#FFE8C2","#FFB68A","#FFD79E","#FFC9A3"] },
  { name: "Cool blues",    count: "18 pieces", palette: ["#C2E0FF","#9EC9F0","#5588D9","#5EBFAE"] },
  { name: "Garden series", count: "16 pieces", palette: ["#DDF4D2","#A8BD8F","#5C9148","#BFFF00"] },
  { name: "Sunday slow",   count: "12 pieces", palette: ["#FCE7F3","#FF9DC0","#C7558B","#FFE38A"] },
];

const ACTIVITY = [
  { icon: "♥", color: "#FF9DC0", text: "sky.archive liked your artwork",                detail: '"Tiny Friends · Sunset"', when: "2 hours ago" },
  { icon: "💬",color: "#9EC9F0", text: "sky.archive left a comment on your artwork",    detail: '"Bold Garden · No 4"',    when: "5 hours ago" },
  { icon: "+", color: "#BFFF00", text: "sky.archive started following you",              detail: "",                        when: "1 day ago" },
  { icon: "◆", color: "#FFC747", text: 'You earned the badge "30-day streak"',           detail: "",                        when: "2 days ago" },
];

const BADGES = [
  { color: "#BFFF00", icon: "✓",  label: "First page" },
  { color: "#FFC747", icon: "◆",  label: "30-day streak" },
  { color: "#FF9DC0", icon: "↑",  label: "First share" },
  { color: "#9EC9F0", icon: "📚", label: "12 books" },
  { color: "#5EBFAE", icon: "💯", label: "100 pages" },
  { color: "#C7558B", icon: "⭐", label: "Top 100" },
  { color: "#FFB68A", icon: "👑", label: "Founder" },
  { color: "#A8BD8F", icon: "🌿", label: "Botanist" },
];

const RECENT_PALETTES = [
  { name: "Tokyo Rooftop", colors: ["#FFE38A","#FFB68A","#FF8A6B","#C7558B","#5588D9"] },
  { name: "Garden Hour",   colors: ["#DDF4D2","#A8BD8F","#5C9148","#BFFF00","#FFC747"] },
  { name: "Cozy Brew",     colors: ["#FFE8C2","#FFB68A","#A87E5B","#0D1801","#FF8A6B"] },
];

interface ProfileMainClientProps {
  streakLabel: string;
  streakDays: string;
  badgesLabel: string;
  badgesOf: string;
  palettesLabel: string;
}

export function ProfileMainClient({
  streakLabel, streakDays, badgesLabel, badgesOf, palettesLabel,
}: ProfileMainClientProps) {
  const [tab, setTab] = useState("artwork");

  return (
    <div className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-6 md:px-8">
      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-black/[.08]" style={{ scrollbarWidth: "none" }}>
        {TABS.map(({ id, label, count }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="inline-flex items-center gap-1.5 px-[18px] py-3.5 text-[14px]"
            style={{
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${tab === id ? "#0D1801" : "transparent"}`,
              color: tab === id ? "#0D1801" : "#666",
              fontWeight: tab === id ? 800 : 600,
              cursor: "pointer",
              marginBottom: -1,
            }}
          >
            {label}
            {count && (
              <span className="rounded-full bg-[#F5F2EA] px-2 py-0.5 text-[11px] font-bold text-[#666]">
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main grid: content + sidebar */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        {/* Tab content */}
        <div>
          {tab === "artwork" && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {PROFILE_ART.map((item, i) => (
                <article key={i} className="cursor-pointer overflow-hidden rounded-[18px] border border-black/[.06] bg-white">
                  <div className="relative p-[18px]" style={{ background: item.bg }}>
                    <div className="relative aspect-square rounded-xl bg-white p-3.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/coloring-pages/free-coloring-page.svg" alt="" className="h-full w-full" />
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
                  <div className="flex justify-between px-3.5 py-2.5 text-[12px] text-[#666]">
                    <span>♥ {item.likes}</span><span>{item.when}</span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {tab === "books" && (
            <div className="grid grid-cols-2 gap-[18px] sm:grid-cols-3 md:grid-cols-4">
              {PROFILE_BOOKS.map((book, i) => (
                <div key={i} className="relative">
                  <div className="flex aspect-[3/4] items-end rounded-[18px] p-[18px]" style={{ background: book.bg }}>
                    <div className="w-full">
                      <div className="text-[11px] font-bold uppercase tracking-[.06em]" style={{ color: book.accent, opacity: 0.85 }}>iRoly</div>
                      <div className="mt-1 text-[18px] font-black text-[#0D1801]" style={{ fontFamily: "var(--font-display)" }}>{book.title}</div>
                    </div>
                  </div>
                  <div
                    className="absolute right-2.5 top-2.5 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[.04em]"
                    style={{ background: book.status === "owned" ? "#0D1801" : "#fff", color: book.status === "owned" ? "#BFFF00" : "#0D1801" }}
                  >
                    {book.status}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "collections" && (
            <div className="grid grid-cols-2 gap-[18px]">
              {COLLECTIONS.map(({ name, count, palette }) => (
                <div key={name} className="cursor-pointer rounded-[18px] border border-black/[.06] bg-white p-5">
                  <div className="mb-3.5 grid h-[140px] grid-cols-2 gap-1" style={{ gridTemplateRows: "1fr 1fr" }}>
                    {palette.map((c, i) => (<div key={i} className="rounded-lg" style={{ background: c }} />))}
                  </div>
                  <div className="text-[18px] font-black" style={{ fontFamily: "var(--font-display)" }}>{name}</div>
                  <div className="mt-0.5 text-[12px] text-[#666]">{count}</div>
                </div>
              ))}
            </div>
          )}

          {tab === "liked" && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {COMMUNITY_ART.slice(0, 6).map((item, i) => (
                <article key={i} className="overflow-hidden rounded-[18px] border border-black/[.06] bg-white">
                  <div className="relative p-[18px]" style={{ background: item.bg }}>
                    <div className="relative aspect-square rounded-xl bg-white p-3.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/assets/coloring-pages/free-coloring-page.svg" alt="" className="h-full w-full" />
                      <div className="absolute inset-3.5 rounded-lg" style={{ background: item.accent, mixBlendMode: "multiply", opacity: 0.38 }} />
                    </div>
                  </div>
                  <div className="px-3.5 py-2.5 text-[12px] text-[#666]">@{item.handle}</div>
                </article>
              ))}
            </div>
          )}

          {tab === "activity" && (
            <div className="flex flex-col gap-2.5">
              {ACTIVITY.map(({ icon, color, text, detail, when }, i) => (
                <div key={i} className="grid items-center gap-3.5 rounded-2xl border border-black/[.06] bg-white px-[18px] py-3.5" style={{ gridTemplateColumns: "auto 1fr auto" }}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-[#0D1801]" style={{ background: color }}>{icon}</div>
                  <div className="text-[13px]">{text} {detail && <b>{detail}</b>}</div>
                  <div className="text-[11px] text-[#666]">{when}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-[18px]">
          {/* Badges */}
          <div className="rounded-[22px] border border-black/[.06] bg-white p-[22px]">
            <div className="mb-3.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#666]">
              {badgesLabel} · 8 {badgesOf} 24
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {BADGES.map(({ color, icon, label }) => (
                <div key={label} title={label} className="flex aspect-square cursor-pointer items-center justify-center rounded-xl text-[18px] text-[#0D1801]" style={{ background: color }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Streak */}
          <div className="rounded-[22px] bg-[#0D1801] p-[22px] text-white">
            <div className="flex items-baseline justify-between">
              <div className="text-[11px] font-extrabold uppercase tracking-[.08em] text-[#BFFF00]">{streakLabel}</div>
              <div className="text-[48px] font-black tracking-[-0.03em] text-[#BFFF00]" style={{ fontFamily: "var(--font-display)" }}>34</div>
            </div>
            <div className="text-[13px] opacity-80">{streakDays}</div>
            <div className="mt-3.5 flex gap-1">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="h-8 flex-1 rounded" style={{ background: i < 12 ? "#BFFF00" : "rgba(255,255,255,.08)" }} />
              ))}
            </div>
          </div>

          {/* Recent palettes */}
          <div className="rounded-[22px] border border-black/[.06] bg-white p-[22px]">
            <div className="mb-3.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#666]">{palettesLabel}</div>
            <div className="flex flex-col gap-2">
              {RECENT_PALETTES.map(({ name, colors }) => (
                <button key={name} className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-black/[.06] bg-white p-2 text-left">
                  <div className="flex gap-0.5">
                    {colors.map((c, i) => (<div key={i} className="h-[26px] w-3.5 rounded-sm" style={{ background: c }} />))}
                  </div>
                  <div className="text-[13px] font-bold">{name}</div>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
