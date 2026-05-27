"use client";

/**
 * Book cover gallery shown on the book detail page.
 * Displays the main cover with badge overlay + thumbnail strip of this book's public pages.
 * Click a thumbnail to swap the main image.
 */
import { useState } from "react";
import type { FallbackBook } from "@/data/fallback";

interface BookCoverGalleryProps {
  book: FallbackBook;
}

export function BookCoverGallery({ book }: BookCoverGalleryProps) {
  const allImages = [book.coverUrl, ...(book.previewPages || [])].filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = allImages[activeIndex] || book.coverUrl;

  return (
    <div>
      {/* Main image */}
      <div
        className="relative flex items-center justify-center rounded-[28px] p-6 sm:p-12"
        style={{ background: book.backgroundColor }}
      >
        <div
          className="relative aspect-square w-full max-w-[420px] overflow-hidden rounded-[20px]"
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,.08)" }}
        >
          {activeImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={activeImage}
              alt={book.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center"
              style={{ background: book.backgroundColor }}
            >
              <div className="text-[13px] font-bold uppercase opacity-60">
                {book.series}
              </div>
              <div className="text-[28px] font-black leading-tight">{book.title}</div>
            </div>
          )}
          <div className="pointer-events-none absolute inset-2 rounded-[16px] border-[1.5px] border-dashed border-white/90" />
        </div>

        {/* Badge overlay */}
        {book.badge && (
          <div className="absolute left-[18px] top-[18px]">
            <span
              className="rounded-full px-3 py-1 text-[12px] font-bold"
              style={{ background: book.badgeColor ?? "#8B5CF6", color: "#fff" }}
            >
              {book.badge}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail strip — cover + public coloring pages */}
      {allImages.length > 1 && (
        <div className="mt-3.5 grid grid-cols-4 gap-2.5">
          {allImages.slice(0, 4).map((url, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="relative aspect-square overflow-hidden rounded-[12px] bg-muted transition-all"
              style={{
                border: i === activeIndex ? "2px solid #0D1801" : "2px solid transparent",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`${book.title} ${i === 0 ? "cover" : `page ${i}`}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
