"use client";
/**
 * Search input in the nav bar.
 * On Enter, navigates to /shop?q={query}.
 */
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

interface NavSearchInputProps {
  placeholder: string;
}

export function NavSearchInput({ placeholder }: NavSearchInputProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <div className="relative hidden xl:flex">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888]"
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 3a8 8 0 1 0 5 14.32L21 22" />
        <path d="M11 19a8 8 0 1 1 8-8" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-[220px] rounded-full border border-transparent bg-black/[0.04] py-2 pl-9 pr-3.5 text-[13px] outline-none placeholder:text-[#888] focus:border-black/10"
      />
    </div>
  );
}
