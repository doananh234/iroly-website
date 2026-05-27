"use client";
/**
 * Profile tab content panels — Artwork, Books, Collections, Liked, Activity.
 * Used by ProfilePageClient. Each panel matches prototype PageProfile (lines 2112-2198).
 */
import { PROFILE_ART, PROFILE_BOOKS, COMMUNITY_ART } from "@/data/fallback";

const COLLECTIONS = [
  { name: "Foxes only",    count: "24 pieces", palette: ["#FFE8C2","#FFB68A","#FFD79E","#FFC9A3"] },
  { name: "Cool blues",    count: "18 pieces", palette: ["#C2E0FF","#9EC9F0","#5588D9","#5EBFAE"] },
  { name: "Garden series", count: "16 pieces", palette: ["#DDF4D2","#A8BD8F","#5C9148","#BFFF00"] },
  { name: "Sunday slow",   count: "12 pieces", palette: ["#FCE7F3","#FF9DC0","#C7558B","#FFE38A"] },
];

const ACTIVITY = [
  { icon: "♥", color: "#FF9DC0", text: "sky.archive liked your artwork",             detail: '"Tiny Friends · Sunset"', when: "2 hours ago" },
  { icon: "💬",color: "#9EC9F0", text: "sky.archive left a comment on your artwork", detail: '"Bold Garden · No 4"',    when: "5 hours ago" },
  { icon: "+", color: "#BFFF00", text: "sky.archive started following you",           detail: "",                        when: "1 day ago" },
  { icon: "◆", color: "#FFC747", text: 'You earned the badge "30-day streak"',        detail: "",                        when: "2 days ago" },
];

export function ArtworkTab() {
  return (
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
  );
}

export function BooksTab() {
  return (
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
  );
}

export function CollectionsTab() {
  return (
    <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
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
  );
}

export function LikedTab() {
  return (
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
  );
}

export function ActivityTab() {
  return (
    <div className="flex flex-col gap-2.5">
      {ACTIVITY.map(({ icon, color, text, detail, when }, i) => (
        <div
          key={i}
          className="grid items-center gap-3.5 rounded-2xl border border-black/[.06] bg-white px-[18px] py-3.5"
          style={{ gridTemplateColumns: "auto 1fr auto" }}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full text-[#0D1801]" style={{ background: color }}>
            {icon}
          </div>
          <div className="text-[13px]">{text} {detail && <b>{detail}</b>}</div>
          <div className="text-[11px] text-[#666]">{when}</div>
        </div>
      ))}
    </div>
  );
}
