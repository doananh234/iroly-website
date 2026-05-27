"use client";
/**
 * Individual feed post card — full-viewport height, scroll-snap aligned.
 * Matches prototype FeedPost component (lines 2296-2393).
 */
import { useState } from "react";
import type { FeedPost } from "@/data/fallback";
import { useShare } from "@/hooks/use-share";
import { Link } from "@/i18n/navigation";

interface FeedPostCardProps {
  post: FeedPost;
}

export function FeedPostCard({ post }: FeedPostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(parseInt(post.likes, 10));
  const [following, setFollowing] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const { share } = useShare();

  function handleLike() {
    setLiked((v) => {
      setLikeCount((c) => (v ? c - 1 : c + 1));
      return !v;
    });
  }

  function handleFollow() {
    setFollowing((v) => !v);
  }

  async function handleShare() {
    await share({ title: post.title, text: post.body });
  }

  return (
    <section
      className="relative flex flex-col md:grid"
      style={{
        scrollSnapAlign: "start",
        height: "100vh",
        minHeight: 600,
        gridTemplateColumns: "1fr 480px",
        background: "#F5F2EA",
      }}
    >
      {/* Left — artwork */}
      <div className="relative overflow-hidden" style={{ background: post.bg }}>
        {/* Texture overlays */}
        <div
          className="pointer-events-none absolute inset-0 opacity-35"
          style={{ background: "radial-gradient(circle at 30% 40%, rgba(255,255,255,.18) 0, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,255,255,.12) 0, transparent 50%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{ mixBlendMode: "screen", backgroundImage: "radial-gradient(rgba(255,255,255,.25) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />

        {/* Artwork */}
        <div className="absolute inset-[8%_10%]" style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,.4))" }}>
          <div className="relative h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/coloring-pages/free-coloring-page.svg" alt="" className="h-full w-full" />
            <div
              className="absolute inset-0 rounded-xl"
              style={{ background: post.tint, mixBlendMode: "multiply", opacity: 0.55 }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(circle at 70% 30%, rgba(255,255,255,.4) 0, transparent 40%)", mixBlendMode: "overlay" }}
            />
          </div>
        </div>

      </div>

      {/* Right — info panel */}
      <div className="flex flex-col bg-[#FFFDF8] px-4 py-5 md:px-8 md:py-7">
        {/* Author row */}
        <div className="flex items-center gap-3.5 border-b border-black/[.08] pb-5">
          <Link href={`/community/${post.user}`} className="flex items-center gap-3.5 no-underline min-w-0 flex-1">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[18px] font-black text-[#0D1801]"
              style={{ background: post.avatar, fontFamily: "var(--font-display)" }}
            >
              {post.handle[0]}
            </div>
            <div className="min-w-0">
              <div className="text-[15px] font-extrabold text-[#0D1801]">@{post.handle}</div>
              <div className="text-[12px] text-[#888]">{post.date}</div>
            </div>
          </Link>
          <button
            onClick={handleFollow}
            className="rounded-full border-none px-5 py-2.5 text-[14px] font-extrabold text-[#0D1801]"
            style={{ background: following ? "#E8FF99" : "#BFFF00", cursor: "pointer" }}
          >
            {following ? "Following" : "Follow"}
          </button>
        </div>

        {/* Title + body */}
        <div className="py-6">
          <h2
            className="m-0 text-[#0D1801]"
            style={{ fontSize: 30, fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-.015em" }}
          >
            {post.title}
          </h2>
          <p className="mt-3.5 text-[15px] leading-[1.55] text-[#1d2a14]">{post.body}</p>
        </div>

        {/* Used collection card */}
        <div
          className="grid items-center gap-3.5 rounded-2xl border border-[#BFFF00] p-3.5"
          style={{ gridTemplateColumns: "auto 1fr auto", background: "#F0FCE0" }}
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-xl text-[22px]"
            style={{ background: "linear-gradient(135deg, #FFE38A, #FFB68A 50%, #C7558B)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)" }}
          >
            📚
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-extrabold uppercase tracking-[.08em] text-[#5C9148]">Used collection</div>
            <div className="mt-0.5 text-[16px] font-extrabold text-[#0D1801]" style={{ fontFamily: "var(--font-display)" }}>
              {post.book}
            </div>
            <Link href="/shop" className="text-[12px] font-bold text-[#5C9148] no-underline">View product →</Link>
          </div>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border-none text-[18px] text-[#BFFF00]"
            style={{ background: "#0D1801", cursor: "pointer" }}
          >
            🛒
          </button>
        </div>
        {/* Color swatches */}
        <div className="mt-2.5 flex gap-1">
          {post.bookSwatches.map((c, i) => (
            <div key={i} className="h-2 flex-1 rounded-sm" style={{ background: c }} />
          ))}
        </div>

        {/* Engagement */}
        <div className="mt-7">
          <div className="mb-3 text-[11px] font-extrabold uppercase tracking-[.1em] text-[#888]">Engagement</div>
          <div className="grid grid-cols-3 gap-2.5">
            {/* Like */}
            <button
              onClick={handleLike}
              className="flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl bg-white py-[18px] text-[13px] font-bold text-[#0D1801]"
              style={{ border: liked ? "1.5px solid #E85E5E" : "1px solid rgba(0,0,0,.08)", padding: "18px 12px", color: liked ? "#E85E5E" : "#0D1801" }}
            >
              <span className="text-[20px]">{liked ? "♥" : "♡"}</span>
              {likeCount} Likes
            </button>
            {/* Comment */}
            <button
              onClick={() => setShowComment((v) => !v)}
              className="flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl bg-white py-[18px] text-[13px] font-bold text-[#0D1801]"
              style={{ border: showComment ? "1.5px solid #5588D9" : "1px solid rgba(0,0,0,.08)", padding: "18px 12px" }}
            >
              <span className="text-[20px]">💬</span>
              Comment
            </button>
            {/* Share */}
            <button
              onClick={handleShare}
              className="flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl bg-white py-[18px] text-[13px] font-bold text-[#0D1801]"
              style={{ border: "1px solid rgba(0,0,0,.08)", padding: "18px 12px" }}
            >
              <span className="text-[20px]">↑</span>
              Share
            </button>
          </div>

          {/* Comment input (shown when comment toggled) */}
          {showComment && (
            <div className="mt-2.5 flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 rounded-full border border-black/[.12] bg-white px-4 py-2.5 text-[13px] outline-none"
              />
              <button
                className="rounded-full border-none bg-[#0D1801] px-4 py-2.5 text-[13px] font-bold text-white"
                style={{ cursor: "pointer" }}
              >
                Post
              </button>
            </div>
          )}
        </div>

        <div className="flex-1" />

        {/* Music bar */}
        <div className="flex items-center gap-3 border-t border-black/[.08] pt-[18px]">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D1801] text-[#BFFF00]">♪</div>
          <div className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#1d2a14]">
            {post.music}
          </div>
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#5EBFAE" }} />
        </div>
      </div>
    </section>
  );
}
