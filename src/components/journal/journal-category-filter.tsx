"use client";

import { useState } from "react";

interface JournalCategoryFilterProps {
  filters: Record<string, string>;
}

/** Category pill filter for the Journal page. */
export function JournalCategoryFilter({ filters }: JournalCategoryFilterProps) {
  const [active, setActive] = useState("all");
  const entries = Object.entries(filters);

  return (
    <div className="flex flex-wrap gap-2">
      {entries.map(([key, label]) => (
        <button
          key={key}
          onClick={() => setActive(key)}
          className="rounded-full px-3.5 py-2 text-[13px] font-bold transition-colors"
          style={{
            background: active === key ? "#0D1801" : "rgba(0,0,0,.04)",
            color: active === key ? "#BFFF00" : "#0D1801",
            border: "none",
            cursor: "pointer",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
