"use client";

/**
 * Community sidebar — challenge card + top colorists with interactive follow buttons.
 */
import { useState } from "react";
import { Link } from "@/i18n/navigation";

const TOP_COLORISTS = [
  { rank: "1", handle: "sky.archive",        name: "Cam D.",  likes: "312 likes", color: "#9EC9F0" },
  { rank: "2", handle: "seafoam.afternoons",  name: "Nina P.", likes: "233 likes", color: "#5EBFAE" },
  { rank: "3", handle: "blue_hours",          name: "Toma R.", likes: "201 likes", color: "#5588D9" },
  { rank: "4", handle: "plum.skies",          name: "Ren W.",  likes: "184 likes", color: "#8E5AA8" },
  { rank: "5", handle: "sleepyfox22",         name: "Mei Y.",  likes: "142 likes", color: "#FFB68A" },
];

interface CommunitySidebarProps {
  challengeBadge: string;
  challengeTitle: string;
  challengeDesc: string;
  challengeEnds: string;
  joinChallenge: string;
  topColorists: string;
  follow: string;
  guidelinesLabel: string;
  guidelinesTitle: string;
  guidelinesDesc: string;
  guidelinesLink: string;
}

export function CommunitySidebar({
  challengeBadge,
  challengeTitle,
  challengeDesc,
  challengeEnds,
  joinChallenge,
  topColorists,
  follow,
  guidelinesLabel,
  guidelinesTitle,
  guidelinesDesc,
  guidelinesLink,
}: CommunitySidebarProps) {
  const [followState, setFollowState] = useState<Record<string, boolean>>({});

  function toggleFollow(handle: string) {
    setFollowState((s) => ({ ...s, [handle]: !s[handle] }));
  }

  return (
    <>
      {/* Challenge card */}
      <div className="rounded-[22px] bg-[#0D1801] p-[22px] text-white">
        <div
          className="mb-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[.06em] text-[#0D1801]"
          style={{ background: "#BFFF00" }}
        >
          ◆ {challengeBadge}
        </div>
        <h3
          className="mb-1 mt-2.5 text-white"
          style={{ fontSize: 24, fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-.01em" }}
        >
          {challengeTitle}
        </h3>
        <p className="mb-3.5 mt-0 text-[13px] leading-[1.5] text-[#BFFF00] opacity-85">
          {challengeDesc}
        </p>
        <div className="mb-3.5 flex gap-1">
          {["#FFE38A","#FFB68A","#FF8A6B","#C7558B","#5588D9"].map((c, i) => (
            <div key={i} className="h-6 flex-1 rounded" style={{ background: c }} />
          ))}
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-[#BFFF00] opacity-80">{challengeEnds}</span>
        </div>
        <Link
          href="/paint"
          className="mt-3.5 block w-full rounded-full border-none px-4 py-3 text-center text-[14px] font-extrabold text-[#0D1801] no-underline"
          style={{ background: "#BFFF00", cursor: "pointer" }}
        >
          {joinChallenge} →
        </Link>
      </div>

      {/* Top colorists */}
      <div className="rounded-[22px] border border-black/[.06] bg-white p-[22px]">
        <div className="mb-3.5 text-[11px] font-extrabold uppercase tracking-[.08em] text-[#666]">
          {topColorists}
        </div>
        <div className="flex flex-col gap-3">
          {TOP_COLORISTS.map(({ rank, handle, name, likes, color }) => (
            <div key={handle} className="grid items-center gap-2.5" style={{ gridTemplateColumns: "24px auto 1fr auto" }}>
              <div
                style={{ fontFamily: "var(--font-display)", fontWeight: 900, color: Number(rank) <= 3 ? "#0D1801" : "#999", fontSize: 16 }}
              >
                {rank}
              </div>
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-extrabold text-white"
                style={{ background: color }}
              >
                {name[0]}
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-extrabold">{name}</div>
                <div className="text-[11px] text-[#666]">@{handle} · {likes}</div>
              </div>
              <button
                onClick={() => toggleFollow(handle)}
                className="rounded-full border border-black/[.12] px-3 py-1.5 text-[11px] font-bold"
                style={{
                  cursor: "pointer",
                  background: followState[handle] ? "#E8FF99" : "#fff",
                  color: "#0D1801",
                }}
              >
                {followState[handle] ? "Following" : follow}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Community guidelines */}
      <div className="rounded-[22px] p-[22px]" style={{ background: "#FFE8C2" }}>
        <div className="text-[11px] font-extrabold uppercase tracking-[.08em] text-[#3a3a14]">
          {guidelinesLabel}
        </div>
        <h4
          className="mb-2 mt-1.5"
          style={{ fontSize: 18, fontFamily: "var(--font-display)", fontWeight: 900 }}
        >
          {guidelinesTitle}
        </h4>
        <p className="m-0 text-[12px] leading-[1.5] text-[#3a3a14]">
          {guidelinesDesc}
        </p>
        <a href="#" className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-[#0D1801] no-underline">
          {guidelinesLink} →
        </a>
      </div>
    </>
  );
}
