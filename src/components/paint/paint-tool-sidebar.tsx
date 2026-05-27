"use client";
/**
 * Left sidebar: tools, brush size, history, outline picker.
 * Matches prototype PagePaint left aside (lines 1570-1631).
 */

export type PaintTool = "brush" | "fill" | "eraser" | "eyedropper";
export type OutlineKey = "fox" | "garden" | "mug" | "mandala";

const TOOLS: { id: PaintTool; label: string; icon: string }[] = [
  { id: "brush",      label: "Brush",      icon: "✏" },
  { id: "fill",       label: "Fill",        icon: "🪣" },
  { id: "eraser",     label: "Eraser",      icon: "◻" },
  { id: "eyedropper", label: "Eyedropper",  icon: "🔬" },
];

export const PAGES: { id: OutlineKey; label: string; tags: string }[] = [
  { id: "fox",     label: "Sleepy Fox",      tags: "Easy · Animals" },
  { id: "garden",  label: "Bold Garden",     tags: "Medium · Plants" },
  { id: "mug",     label: "Cozy Mug",        tags: "Easy · Objects" },
  { id: "mandala", label: "Lotus Mandala",   tags: "Hard · Patterns" },
];

interface PaintToolSidebarProps {
  tool: PaintTool;
  size: number;
  color: string;
  outline: OutlineKey;
  canUndo: boolean;
  canRedo: boolean;
  onToolChange: (t: PaintTool) => void;
  onSizeChange: (s: number) => void;
  onOutlineChange: (o: OutlineKey) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
}

export function PaintToolSidebar({
  tool, size, color, outline, canUndo, canRedo,
  onToolChange, onSizeChange, onOutlineChange, onUndo, onRedo, onClear,
}: PaintToolSidebarProps) {
  return (
    <aside className="sticky top-6 flex flex-col gap-[18px] rounded-3xl border border-black/[.06] bg-white p-5">
      {/* Tools */}
      <div>
        <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#666]">Tools</div>
        <div className="flex flex-col gap-2">
          {TOOLS.map(({ id, label, icon }) => {
            const active = tool === id;
            return (
              <button
                key={id}
                onClick={() => onToolChange(id)}
                className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3.5 py-3 text-left text-[13px] font-bold"
                style={{
                  border: `1.5px solid ${active ? "#0D1801" : "rgba(13,24,1,.12)"}`,
                  background: active ? "#0D1801" : "#fff",
                  color: active ? "#BFFF00" : "#0D1801",
                }}
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-[16px]"
                  style={{ background: active ? "#BFFF00" : "#F5F2EA", color: "#0D1801" }}
                >
                  {icon}
                </span>
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brush size */}
      <div>
        <div className="mb-2.5 flex items-baseline justify-between">
          <div className="text-[11px] font-extrabold uppercase tracking-[.08em] text-[#666]">Brush size</div>
          <div className="text-[13px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>{size}px</div>
        </div>
        <div className="flex h-[72px] items-center justify-center rounded-xl bg-[#F5F2EA] p-3.5">
          <div
            className="rounded-full"
            style={{
              width: size, height: size,
              background: tool === "eraser" ? "#fff" : color,
              border: tool === "eraser" ? "2px dashed #0D1801" : "none",
              boxShadow: tool === "eraser" ? "none" : "0 2px 8px rgba(0,0,0,.15)",
              maxWidth: 72, maxHeight: 72,
            }}
          />
        </div>
        <input
          type="range"
          min={4}
          max={80}
          value={size}
          onChange={(e) => onSizeChange(+e.target.value)}
          className="mt-2.5 w-full accent-[#0D1801]"
        />
      </div>

      {/* History */}
      <div>
        <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#666]">History</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-black/[.12] bg-white py-2.5 text-[13px] font-bold"
            style={{ opacity: canUndo ? 1 : 0.35, cursor: canUndo ? "pointer" : "not-allowed" }}
          >
            ← Undo
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-black/[.12] bg-white py-2.5 text-[13px] font-bold"
            style={{ opacity: canRedo ? 1 : 0.35, cursor: canRedo ? "pointer" : "not-allowed" }}
          >
            Redo →
          </button>
        </div>
        <button
          onClick={onClear}
          className="mt-2 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-black/[.12] bg-white py-2.5 text-[13px] font-bold text-[#a13]"
        >
          ✕ Clear canvas
        </button>
      </div>

      {/* Coloring page picker */}
      <div>
        <div className="mb-2.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#666]">Coloring page</div>
        <div className="flex flex-col gap-2">
          {PAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => onOutlineChange(p.id)}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl p-2 text-left"
              style={{
                border: `1.5px solid ${outline === p.id ? "#0D1801" : "rgba(13,24,1,.08)"}`,
                background: outline === p.id ? "#F5F8E5" : "#fff",
              }}
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-black/[.08] bg-[#FFFEF8]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/coloring-pages/free-coloring-page.svg" alt="" className="h-9 w-9 opacity-80" />
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-extrabold" style={{ fontFamily: "var(--font-display)" }}>{p.label}</div>
                <div className="text-[11px] text-[#666]">{p.tags}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
