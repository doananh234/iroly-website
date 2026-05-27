"use client";

/**
 * Blog article like + share actions (client island for the server-rendered article header).
 */
import { useState } from "react";
import { ShareButton } from "@/components/share-button";

export function BlogArticleActions() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLiked((v) => !v)}
        className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white text-[16px]"
        style={{ color: liked ? "#E85E5E" : "#0D1801" }}
        aria-label={liked ? "Unlike" : "Like"}
      >
        {liked ? "♥" : "♡"}
      </button>
      <ShareButton
        title="How we draw a Tiny Friend from sketch to finished page."
        text="An 8-step look at Mei's process — from gestural pencil thumbnails to the final dashed-bordered cover."
        size="md"
      />
    </div>
  );
}
