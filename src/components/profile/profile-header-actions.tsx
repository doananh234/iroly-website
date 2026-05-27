"use client";

/**
 * Profile interactive action buttons (client islands).
 *
 * ProfileCoverActions — share + settings overlay in cover banner (absolute positioned)
 * ProfileFollowActions — follow + message buttons in profile header row
 */
import { useState } from "react";
import { ShareButton } from "@/components/share-button";
import { Link } from "@/i18n/navigation";

interface ProfileCoverActionsProps {
  shareProfileLabel: string;
}

export function ProfileCoverActions({ shareProfileLabel }: ProfileCoverActionsProps) {
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  return (
    <div className="absolute right-6 top-4 flex gap-2">
      <ShareButton
        title="Mei Yoshida on iRoly"
        variant="pill"
        style={{ background: "rgba(13,24,1,.85)", color: "#BFFF00", borderColor: "transparent" }}
      />
      <div className="relative">
        <button
          onClick={() => showToast("Coming soon")}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-full border-none text-white"
          style={{ background: "rgba(13,24,1,.85)", cursor: "pointer" }}
          aria-label="Settings"
        >
          ⚙
        </button>
        {toast && (
          <span className="absolute -bottom-9 right-0 rounded-full bg-[#0D1801] px-3 py-1 text-[11px] font-bold text-white whitespace-nowrap">
            {toast}
          </span>
        )}
      </div>
    </div>
  );
}

interface ProfileFollowActionsProps {
  followLabel: string;
  messageLabel: string;
}

export function ProfileFollowActions({ followLabel, messageLabel }: ProfileFollowActionsProps) {
  const [following, setFollowing] = useState(false);

  return (
    <div className="flex gap-2 pb-3">
      <button
        onClick={() => setFollowing((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border-none px-5 py-3 text-[13px] font-bold text-white"
        style={{ background: "#0D1801", cursor: "pointer" }}
      >
        {following ? "✓ Following" : `+ ${followLabel}`}
      </button>
      <Link
        href="/community"
        className="inline-flex items-center gap-2 rounded-full border border-black/[.12] bg-white px-4 py-3 text-[13px] font-bold text-[#0D1801] no-underline"
      >
        💬 {messageLabel}
      </Link>
    </div>
  );
}
