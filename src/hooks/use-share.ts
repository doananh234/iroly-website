"use client";

/**
 * useShare — Web Share API with clipboard fallback.
 * Returns { share, copied } where copied is true briefly after clipboard fallback.
 */
export function useShare() {
  async function share(data: { title: string; text?: string; url?: string }) {
    const shareUrl = data.url ?? (typeof window !== "undefined" ? window.location.href : "");
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: data.title, text: data.text, url: shareUrl });
      } catch {
        // user cancelled — do nothing
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }
  }
  return { share };
}
