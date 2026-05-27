"use client";

import { useState } from "react";

const TABS = [
  { id: "about", label: "About this book" },
  { id: "preview", label: "Sample Pages (4)" },
  { id: "reviews", label: "Reviews · 312" },
  { id: "shipping", label: "Print & Delivery" },
];

const SAMPLE_PAGES = [1, 2, 3, 4];

export function BookDetailTabs() {
  const [tab, setTab] = useState("about");

  return (
    <section
      className="mx-auto px-4 pb-16 pt-6 sm:px-6 md:px-8"
      style={{ maxWidth: 1320 }}
    >
      {/* Tab bar */}
      <div
        className="mb-6 flex gap-1 overflow-x-auto"
        style={{ borderBottom: "1px solid rgba(0,0,0,.08)", scrollbarWidth: "none" }}
      >
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="mr-4 border-none bg-transparent pb-[14px] pt-[14px] text-[14px]"
            style={{
              fontWeight: tab === id ? 800 : 600,
              color: tab === id ? "#0D1801" : "#777",
              borderBottom: tab === id ? "2px solid #0D1801" : "2px solid transparent",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === "preview" && (
        <div className="grid grid-cols-2 gap-[14px] sm:grid-cols-4">
          {SAMPLE_PAGES.map((n) => (
            <div
              key={n}
              className="relative rounded-[18px] p-[14px]"
              style={{ background: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,.06)" }}
            >
              <div
                className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[11px] font-bold"
                style={{ background: "#0D1801", color: "#fff" }}
              >
                Pg {n}
              </div>
              <div
                className="flex aspect-square items-center justify-center rounded-[12px]"
                style={{ background: "#FAFAF5" }}
              >
                <svg
                  width="60%"
                  height="60%"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="1.5"
                >
                  <circle cx="50" cy="35" r="20" />
                  <path d="M30 70 Q50 55 70 70" />
                  <circle cx="40" cy="30" r="3" fill="#ccc" />
                  <circle cx="60" cy="30" r="3" fill="#ccc" />
                </svg>
              </div>
              {n === 1 && (
                <div className="mt-2.5 text-[12px]" style={{ color: "#666" }}>
                  Free preview
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "about" && (
        <div className="max-w-2xl text-[15px] leading-relaxed" style={{ color: "#3a3a3a" }}>
          <p>
            Tiny Friends is a 12-page coloring book filled with adorable animal characters
            designed for a calm, stress-free experience. Each page features thick, friendly
            outlines perfect for all skill levels.
          </p>
          <p className="mt-4">
            Unlock the full book in the iRoly app and color on your iPad, iPhone, or print
            the pages at home for a traditional coloring experience.
          </p>
        </div>
      )}

      {tab === "reviews" && (
        <div className="text-[14px]" style={{ color: "#666" }}>
          Reviews coming soon.
        </div>
      )}

      {tab === "shipping" && (
        <div className="text-[14px]" style={{ color: "#666" }}>
          Print &amp; delivery info coming soon.
        </div>
      )}
    </section>
  );
}
