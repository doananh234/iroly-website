"use client";
/**
 * Profile sidebar — Badges, Streak, Recent Palettes.
 * Matches prototype PageProfile sidebar (lines 2201-2257).
 */

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

export function ProfileSidebar() {
  return (
    <aside className="flex flex-col gap-[18px]">
      {/* Badges */}
      <div className="rounded-[22px] border border-black/[.06] bg-white p-[22px]">
        <div className="mb-3.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#666]">
          Badges · 8 of 24
        </div>
        <div className="grid grid-cols-4 gap-2.5">
          {BADGES.map(({ color, icon, label }) => (
            <div
              key={label}
              title={label}
              className="flex aspect-square cursor-pointer items-center justify-center rounded-xl text-[18px] text-[#0D1801]"
              style={{ background: color }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>

      {/* Streak */}
      <div className="rounded-[22px] bg-[#0D1801] p-[22px] text-white">
        <div className="flex items-baseline justify-between">
          <div className="text-[11px] font-extrabold uppercase tracking-[.08em] text-[#BFFF00]">Current streak</div>
          <div className="text-[48px] font-black tracking-[-0.03em] text-[#BFFF00]" style={{ fontFamily: "var(--font-display)" }}>34</div>
        </div>
        <div className="text-[13px] opacity-80">days of quiet color</div>
        <div className="mt-3.5 flex gap-1">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="h-8 flex-1 rounded" style={{ background: i < 12 ? "#BFFF00" : "rgba(255,255,255,.08)" }} />
          ))}
        </div>
        <div className="mt-1.5 text-[11px] opacity-55">Last 14 days</div>
      </div>

      {/* Recent palettes */}
      <div className="rounded-[22px] border border-black/[.06] bg-white p-[22px]">
        <div className="mb-3.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#666]">Recent palettes</div>
        <div className="flex flex-col gap-2">
          {RECENT_PALETTES.map(({ name, colors }) => (
            <button
              key={name}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-black/[.06] bg-white p-2 text-left"
            >
              <div className="flex gap-0.5">
                {colors.map((c, i) => (<div key={i} className="h-[26px] w-3.5 rounded-sm" style={{ background: c }} />))}
              </div>
              <div className="text-[13px] font-bold">{name}</div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
