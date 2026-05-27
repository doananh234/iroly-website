"use client";

import { useState } from "react";
import { Check, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const QUESTS = [
  { id: "color", label: "Color one page", xp: "+10 XP" },
  { id: "share", label: "Share an artwork", xp: "+15 XP" },
  { id: "like", label: "Like 3 artworks", xp: "+5 XP" },
];

export function DailyQuestWidget() {
  const [expanded, setExpanded] = useState(false);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  function toggleQuest(id: string) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const doneCount = completed.size;

  return (
    <div
      className={cn(
        "pointer-events-auto overflow-hidden rounded-[20px] bg-white transition-all duration-300",
        expanded
          ? "w-[360px] shadow-[0_16px_48px_rgba(0,0,0,0.3)]"
          : "w-auto shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
      )}
    >
      {/* Collapsed bar — always visible, single line */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full cursor-pointer items-center gap-3 whitespace-nowrap border-none bg-transparent px-3 py-2.5 text-left"
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[14px] text-white"
          style={{ background: "#FFB068" }}
        >
          ✦
        </div>
        <span className="text-[12px] font-extrabold uppercase tracking-[.06em] text-[#0D1801]">
          Daily Quest
        </span>
        <span className="text-[11px] text-[#666]">·</span>
        <span className="text-[11px] text-[#666]">{doneCount}/3</span>
        {/* Progress ring — always visible */}
        <div className="relative ml-auto h-7 w-7 shrink-0">
          <svg viewBox="0 0 28 28" className="h-7 w-7 -rotate-90">
            <circle cx="14" cy="14" r="11" fill="none" stroke="#F0EEE9" strokeWidth="2.5" />
            <circle
              cx="14"
              cy="14"
              r="11"
              fill="none"
              stroke="#BFFF00"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${(doneCount / 3) * 69.1} 69.1`}
              className="transition-all duration-500"
            />
          </svg>
        </div>
        {expanded ? (
          <ChevronDown size={14} className="shrink-0 text-[#999]" />
        ) : (
          <ChevronUp size={14} className="shrink-0 text-[#999]" />
        )}
      </button>

      {/* Expanded content */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-black/[0.06] px-4 pb-4 pt-3">
            <div className="flex flex-col gap-2">
              {QUESTS.map((quest) => {
                const done = completed.has(quest.id);
                return (
                  <button
                    key={quest.id}
                    onClick={() => toggleQuest(quest.id)}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all",
                      done
                        ? "border-[#BFFF00] bg-[#BFFF00]/10"
                        : "border-black/[0.08] bg-[#FAFAF8] hover:bg-[#F5F2EA]",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all",
                        done ? "bg-[#BFFF00]" : "border-2 border-[#ddd] bg-white",
                      )}
                    >
                      {done && <Check size={14} className="text-[#0D1801]" strokeWidth={3} />}
                    </div>
                    <span
                      className={cn(
                        "flex-1 text-[13px] font-semibold",
                        done ? "text-[#0D1801]/60 line-through" : "text-[#0D1801]",
                      )}
                    >
                      {quest.label}
                    </span>
                    <span className="text-[11px] font-bold text-[#BFFF00]">{quest.xp}</span>
                  </button>
                );
              })}
            </div>
            {doneCount === 3 && (
              <div className="mt-3 rounded-xl bg-[#BFFF00] px-4 py-3 text-center text-[13px] font-bold text-[#0D1801]">
                🎉 All quests complete! +30 XP earned
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
