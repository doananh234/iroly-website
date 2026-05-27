"use client";
/**
 * Profile page client component — tabs + content + sidebar.
 * Matches prototype PageProfile (lines 2091-2258).
 */
import { useState } from "react";
import { ArtworkTab, BooksTab, CollectionsTab, LikedTab, ActivityTab } from "./profile-tab-content";
import { ProfileSidebar } from "./profile-sidebar";

const TABS = [
  { id: "artwork",     label: "Artwork",     count: "142" },
  { id: "books",       label: "Books",       count: "12" },
  { id: "collections", label: "Collections", count: "28" },
  { id: "liked",       label: "Liked",       count: "340" },
  { id: "activity",    label: "Activity",    count: "" },
];

export function ProfilePageClient() {
  const [tab, setTab] = useState("artwork");

  return (
    <div>
      {/* Tabs row — horizontally scrollable on mobile */}
      <div className="border-b border-black/[0.08]">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 md:px-8">
          <div
            className="-mb-px flex gap-1 overflow-x-auto pt-6"
            style={{ scrollbarWidth: "none" }}
          >
            {TABS.map(({ id, label, count }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-3.5 text-[13px] sm:px-[18px] sm:text-[14px]"
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: `2px solid ${tab === id ? "#0D1801" : "transparent"}`,
                  color: tab === id ? "#0D1801" : "#666",
                  fontWeight: tab === id ? 800 : 600,
                  cursor: "pointer",
                }}
              >
                {label}
                {count && (
                  <span className="rounded-full bg-[#F5F2EA] px-2 py-0.5 text-[11px] font-bold text-[#666]">
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main grid: content + sidebar — sidebar collapses below on mobile */}
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-6 px-4 pb-20 pt-8 sm:px-6 md:gap-8 md:px-8 lg:grid-cols-[1fr_300px]">
        {/* Tab panel */}
        <div>
          {tab === "artwork"     && <ArtworkTab />}
          {tab === "books"       && <BooksTab />}
          {tab === "collections" && <CollectionsTab />}
          {tab === "liked"       && <LikedTab />}
          {tab === "activity"    && <ActivityTab />}
        </div>

        <ProfileSidebar />
      </div>
    </div>
  );
}
