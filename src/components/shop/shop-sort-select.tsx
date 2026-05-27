"use client";
/**
 * Sort dropdown for the shop page.
 * Navigates via URL params, preserving the current category filter.
 */
import { useRouter } from "@/i18n/navigation";

const SORT_OPTIONS = [
  { value: "popular", label: "Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
];

interface ShopSortSelectProps {
  currentSort?: string;
  currentCategory?: string;
}

export function ShopSortSelect({ currentSort = "popular", currentCategory }: ShopSortSelectProps) {
  const router = useRouter();

  function handleChange(value: string) {
    const params = new URLSearchParams();
    if (currentCategory) params.set("category", currentCategory);
    if (value && value !== "popular") params.set("sort", value);
    const query = params.toString();
    router.push(query ? `/shop?${query}` : "/shop");
  }

  return (
    <select
      value={currentSort}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-full border border-black/[.08] bg-white px-[14px] py-[10px] text-[13px] font-semibold"
      style={{ cursor: "pointer", fontFamily: "inherit" }}
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
