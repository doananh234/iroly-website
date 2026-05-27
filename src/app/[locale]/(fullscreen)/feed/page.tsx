"use client";
/**
 * Feed Page — /feed
 * TikTok-style vertical scroll-snap feed.
 * Matches prototype PageFeed (lines 2395-2412).
 * This is a full client page due to scroll-snap and interactive nature.
 */
import { FEED_POSTS } from "@/data/fallback";
import { FeedPostCard } from "@/components/feed/feed-post-card";
import { DailyQuestWidget } from "@/components/feed/daily-quest-widget";

export default function FeedPage() {
  return (
    <div className="relative bg-[#0D1801] font-sans text-[#0D1801]">
      {/* Scroll-snap container */}
      <div
        className="h-screen overflow-y-auto"
        style={{ scrollSnapType: "y mandatory", minHeight: 720 }}
      >
        {FEED_POSTS.map((post, i) => (
          <FeedPostCard key={i} post={post} />
        ))}
      </div>

      {/* Daily Quest — fixed center bottom overlay, expand/collapse */}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 justify-center">
        <DailyQuestWidget />
      </div>

      {/* Side nav rail — scroll progress dots */}
      <div className="fixed right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2">
        {FEED_POSTS.map((_, i) => (
          <div
            key={i}
            className="rounded"
            style={{
              width: 4,
              height: i === 0 ? 28 : 12,
              background: i === 0 ? "#BFFF00" : "rgba(255,255,255,.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
