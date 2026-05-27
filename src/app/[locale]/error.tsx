"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 text-[80px] font-black text-[#E5484D]" style={{ fontFamily: "var(--font-display)" }}>500</div>
      <h1 className="mb-2 text-2xl font-black" style={{ color: "var(--iroly-fg)" }}>Something went wrong</h1>
      <p className="mb-8 text-sm" style={{ color: "var(--iroly-fg-muted)" }}>An unexpected error occurred. Please try again.</p>
      <button onClick={reset} className="rounded-full bg-[#0D1801] px-6 py-3 text-sm font-bold text-white">Try Again</button>
    </div>
  );
}
