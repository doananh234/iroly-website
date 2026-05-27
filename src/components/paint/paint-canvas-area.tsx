"use client";
/**
 * Center canvas area with SVG outline overlay, download/share buttons.
 * Simplified version: shows SVG overlay on colored canvas background.
 * Matches prototype PaintStage + center section (lines 1633-1656).
 */
import { useRef, useEffect, useCallback } from "react";
import type { PaintTool, OutlineKey } from "./paint-tool-sidebar";

interface PaintCanvasAreaProps {
  outline: OutlineKey;
  color: string;
  size: number;
  tool: PaintTool;
  onDownload: () => void;
  onShare: () => void;
  onSaveGallery: () => void;
}

export function PaintCanvasArea({
  outline, color, size, tool, onDownload, onShare, onSaveGallery,
}: PaintCanvasAreaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const draw = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      if (lastPos.current) {
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
      } else {
        ctx.moveTo(x, y);
      }
      ctx.lineTo(x, y);
      ctx.stroke();
      lastPos.current = { x, y };
    },
    [color, size, tool],
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    lastPos.current = null;
    const { x, y } = getPos(e);
    draw(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const { x, y } = getPos(e);
    draw(x, y);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    lastPos.current = null;
  };

  // Clear canvas when outline changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [outline]);

  return (
    <section className="flex flex-col items-center gap-[18px]">
      {/* Canvas with SVG outline overlay */}
      <div
        className="relative w-full overflow-hidden rounded-3xl"
        style={{ maxWidth: 600, aspectRatio: "1", background: "#FFFEF8", boxShadow: "0 12px 40px rgba(0,0,0,.1)" }}
      >
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          className="absolute inset-0 h-full w-full cursor-crosshair"
          style={{ touchAction: "none" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        {/* SVG outline overlay (pointer-events-none so drawing works below) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/coloring-pages/free-coloring-page.svg"
            alt="Coloring outline"
            className="h-full w-full object-contain"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-2.5">
        <button
          onClick={onDownload}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border-none px-[22px] py-3.5 text-[14px] font-extrabold text-[#BFFF00]"
          style={{ background: "#0D1801", boxShadow: "0 6px 18px rgba(13,24,1,.2)" }}
        >
          ↓ Download PNG
        </button>
        <button
          onClick={onShare}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border-none px-[22px] py-3.5 text-[14px] font-extrabold text-[#0D1801]"
          style={{ background: "#BFFF00" }}
        >
          ↑ Share artwork
        </button>
        <button
          onClick={onSaveGallery}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full px-[22px] py-3.5 text-[14px] font-extrabold text-[#0D1801]"
          style={{ background: "#fff", border: "1.5px solid rgba(13,24,1,.12)" }}
        >
          ♥ Save to gallery
        </button>
      </div>

      <p className="m-0 text-center text-[12px] text-[#666]">
        Tip: draw on the canvas above · press{" "}
        <kbd className="rounded bg-[#F5F2EA] px-1.5 py-0.5 font-mono text-[11px]">⌘Z</kbd>{" "}
        to undo.
      </p>
    </section>
  );
}
