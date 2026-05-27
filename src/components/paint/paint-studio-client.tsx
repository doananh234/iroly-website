"use client";
/**
 * Full interactive paint studio — client component.
 * Orchestrates: tool sidebar, canvas, color sidebar, toast, share modal.
 * Matches prototype PagePaint state management (lines 1430-1441).
 */
import { useState, useCallback } from "react";
import { PaintToolSidebar, type PaintTool, type OutlineKey } from "./paint-tool-sidebar";
import { PaintCanvasArea } from "./paint-canvas-area";
import { PaintColorSidebar } from "./paint-color-sidebar";

export function PaintStudioClient() {
  const [tool, setTool] = useState<PaintTool>("brush");
  const [color, setColor] = useState("#FFB68A");
  const [size, setSize] = useState(24);
  const [recents, setRecents] = useState(["#FFB68A","#9EC9F0","#BFFF00","#FFC747"]);
  const [outline, setOutline] = useState<OutlineKey>("fox");
  const [shareOpen, setShareOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [canUndo] = useState(false);
  const [canRedo] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  }, []);

  const pickColor = useCallback((c: string) => {
    setColor(c);
    setRecents((prev) => [c, ...prev.filter((x) => x !== c)].slice(0, 8));
  }, []);

  const handleDownload = () => showToast("Saved to your device.");
  const handleSaveGallery = () => showToast("Saved to your iRoly gallery.");
  const handleClear = () => showToast("Canvas cleared.");
  const handleUndo = () => {};
  const handleRedo = () => {};

  const handleShareAction = (lbl: string) => {
    setShareOpen(false);
    showToast(lbl === "Copy link" ? "Link copied." : `Shared to ${lbl}.`);
  };

  return (
    <>
      {/* Community stats pill */}
      <div className="mb-6 flex items-center gap-2.5 self-start rounded-full border border-black/[.08] bg-white px-4 py-2">
        <span className="text-[16px]">👥</span>
        <span className="text-[13px] font-bold">347 painting now</span>
        <div className="flex">
          {["#FFC9A3","#9EC9F0","#FF9DC0","#BFFF00"].map((c, i) => (
            <div
              key={i}
              className="h-7 w-7 rounded-full border-2 border-white"
              style={{ background: c, marginLeft: i ? -8 : 0 }}
            />
          ))}
        </div>
      </div>

      {/* Mobile: canvas + collapsible sidebars stacked. Desktop: 3-col grid. */}
      {/* Desktop 3-column */}
      <div className="hidden items-start gap-7 lg:grid" style={{ gridTemplateColumns: "240px 1fr 300px" }}>
        <PaintToolSidebar
          tool={tool} size={size} color={color} outline={outline}
          canUndo={canUndo} canRedo={canRedo}
          onToolChange={setTool} onSizeChange={setSize} onOutlineChange={setOutline}
          onUndo={handleUndo} onRedo={handleRedo} onClear={handleClear}
        />
        <PaintCanvasArea
          outline={outline} color={color} size={size} tool={tool}
          onDownload={handleDownload} onShare={() => setShareOpen(true)} onSaveGallery={handleSaveGallery}
        />
        <PaintColorSidebar color={color} recents={recents} onPickColor={pickColor} />
      </div>

      {/* Mobile stacked layout */}
      <div className="flex flex-col gap-4 lg:hidden">
        <PaintCanvasArea
          outline={outline} color={color} size={size} tool={tool}
          onDownload={handleDownload} onShare={() => setShareOpen(true)} onSaveGallery={handleSaveGallery}
        />
        <details className="rounded-2xl border border-black/[.06] bg-white p-4">
          <summary className="cursor-pointer text-[13px] font-extrabold uppercase tracking-[.06em] text-[#666]">Tools &amp; Pages</summary>
          <div className="mt-4">
            <PaintToolSidebar
              tool={tool} size={size} color={color} outline={outline}
              canUndo={canUndo} canRedo={canRedo}
              onToolChange={setTool} onSizeChange={setSize} onOutlineChange={setOutline}
              onUndo={handleUndo} onRedo={handleRedo} onClear={handleClear}
            />
          </div>
        </details>
        <details className="rounded-2xl border border-black/[.06] bg-white p-4">
          <summary className="cursor-pointer text-[13px] font-extrabold uppercase tracking-[.06em] text-[#666]">Colors</summary>
          <div className="mt-4">
            <PaintColorSidebar color={color} recents={recents} onPickColor={pickColor} />
          </div>
        </details>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-7 left-1/2 z-[1000] -translate-x-1/2 rounded-full px-[22px] py-3 text-[14px] font-bold text-[#BFFF00]"
          style={{ background: "#0D1801", boxShadow: "0 8px 24px rgba(0,0,0,.25)" }}
        >
          {toast}
        </div>
      )}

      {/* Share modal */}
      {shareOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center"
          style={{ background: "rgba(13,24,1,.55)", backdropFilter: "blur(6px)" }}
          onClick={() => setShareOpen(false)}
        >
          <div
            className="relative mx-4 w-full max-w-[460px] rounded-3xl p-6 sm:p-8"
            style={{ background: "#FFFDF8", boxShadow: "0 24px 60px rgba(0,0,0,.3)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShareOpen(false)}
              className="absolute right-4 top-4 flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border-none bg-[#F5F2EA] text-[18px]"
            >
              ✕
            </button>
            <div className="text-[11px] font-extrabold uppercase tracking-[.08em] text-[#666]">Share your artwork</div>
            <h3
              className="mb-1 mt-2"
              style={{ fontSize: 26, fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-.015em" }}
            >
              Send it into the world.
            </h3>
            <p className="mb-5 mt-0 text-[14px] text-[#666]">
              Choose where to share. We&apos;ll include a watermark linking back to iRoly.
            </p>
            <div className="grid grid-cols-4 gap-2.5">
              {[
                { icon: "𝕏", label: "X",         bg: "#0D1801", fg: "#fff" },
                { icon: "📷", label: "Instagram",  bg: "#E83E8C", fg: "#fff" },
                { icon: "f",  label: "Facebook",   bg: "#1877F2", fg: "#fff" },
                { icon: "🔗", label: "Copy link",  bg: "#F5F2EA", fg: "#0D1801" },
              ].map(({ icon, label, bg, fg }) => (
                <button
                  key={label}
                  onClick={() => handleShareAction(label)}
                  className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-none px-2 py-[18px] text-[12px] font-bold"
                  style={{ background: bg, color: fg }}
                >
                  <span className="text-[20px]">{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
