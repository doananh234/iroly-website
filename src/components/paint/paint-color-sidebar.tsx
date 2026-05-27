"use client";
/**
 * Right sidebar: color picker, palette swatches, recent colors, palette of the week.
 * Matches prototype PagePaint right aside (lines 1660-1710).
 */

export const PAINT_PALETTE: [string, string][] = [
  ["Cream",        "#FFE8C2"],
  ["Peach",        "#FFD79E"],
  ["Apricot",      "#FFB68A"],
  ["Coral",        "#FF8A6B"],
  ["Rose",         "#FF9DC0"],
  ["Pink",         "#C7558B"],
  ["Plum",         "#8E5AA8"],
  ["Blue",         "#5588D9"],
  ["Sky",          "#9EC9F0"],
  ["Teal",         "#5EBFAE"],
  ["Sage",         "#A8BD8F"],
  ["Green",        "#5C9148"],
  ["Lime",         "#BFFF00"],
  ["Yellow",       "#FFC747"],
  ["Amber",        "#FFE38A"],
  ["Ink",          "#0D1801"],
  ["Stone",        "#3a3a14"],
  ["Smoke",        "#A8B099"],
  ["Paper",        "#FFFEF8"],
  ["Warm white",   "#F5F2EA"],
];

const PALETTE_OF_WEEK = ["#FFE38A","#FFB68A","#FF8A6B","#C7558B","#5588D9"];

interface PaintColorSidebarProps {
  color: string;
  recents: string[];
  onPickColor: (c: string) => void;
}

export function PaintColorSidebar({ color, recents, onPickColor }: PaintColorSidebarProps) {
  const colorName = PAINT_PALETTE.find(([, c]) => c === color)?.[0] ?? "Custom";

  return (
    <aside className="sticky top-6 flex flex-col gap-[18px] rounded-3xl border border-black/[.06] bg-white p-5">
      {/* Active color */}
      <div>
        <div className="mb-2.5 flex items-baseline justify-between">
          <div className="text-[11px] font-extrabold uppercase tracking-[.08em] text-[#666]">Active</div>
          <div className="font-mono text-[11px] text-[#0D1801]">{color.toUpperCase()}</div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-[#F5F2EA] p-3">
          <div
            className="h-16 w-16 flex-shrink-0 rounded-2xl"
            style={{ background: color, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.08)" }}
          />
          <div>
            <div style={{ fontSize: 16, fontFamily: "var(--font-display)", fontWeight: 900 }}>{colorName}</div>
            <label className="mt-1 inline-flex cursor-pointer items-center gap-1 text-[11px] text-[#666]">
              Pick custom{" "}
              <input
                type="color"
                value={color}
                onChange={(e) => onPickColor(e.target.value)}
                className="h-6 w-6 cursor-pointer border-none bg-transparent p-0"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Cozy palette */}
      <div>
        <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#666]">Cozy palette</div>
        <div className="grid grid-cols-5 gap-1.5">
          {PAINT_PALETTE.map(([name, c]) => (
            <button
              key={c}
              onClick={() => onPickColor(c)}
              title={name}
              className="aspect-square w-full rounded-[10px] p-0 transition-transform"
              style={{
                background: c,
                border: color === c ? "3px solid #0D1801" : "1.5px solid rgba(0,0,0,.08)",
                transform: color === c ? "scale(1.08)" : "scale(1)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* Recent */}
      <div>
        <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#666]">Recent</div>
        <div className="flex flex-wrap gap-1.5">
          {recents.map((c, i) => (
            <button
              key={i}
              onClick={() => onPickColor(c)}
              className="h-9 w-9 rounded-full p-0"
              style={{ background: c, border: "1.5px solid rgba(0,0,0,.08)", cursor: "pointer" }}
            />
          ))}
        </div>
      </div>

      {/* Palette of the week */}
      <div className="rounded-2xl bg-[#0D1801] p-4 text-white">
        <div className="text-[11px] font-extrabold uppercase tracking-[.08em] text-[#BFFF00]">Palette of the week</div>
        <div className="my-1.5 mb-2.5 text-base font-extrabold" style={{ fontFamily: "var(--font-display)" }}>Tokyo Rooftop, May</div>
        <div className="flex gap-1">
          {PALETTE_OF_WEEK.map((c, i) => (
            <button
              key={i}
              onClick={() => onPickColor(c)}
              className="h-7 flex-1 cursor-pointer rounded border-none"
              style={{ background: c }}
            />
          ))}
        </div>
        <div className="mt-2 text-[11px] opacity-70">Curated by Mei · tap a swatch</div>
      </div>
    </aside>
  );
}
