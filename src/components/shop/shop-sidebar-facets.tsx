"use client";
/**
 * Shop sidebar facet filters.
 * Difficulty filter uses URL params for server-side filtering.
 * Other facets (Series, Pages, Mood) are UI-only stubs for v1.
 */
import { useRouter } from "@/i18n/navigation";

const STATIC_FACETS: [string, string[]][] = [
  [
    "Series",
    ["Animal", "Mandala", "Christmas", "Spooky", "Romance", "Bold & Easy", "Fuzzy Buddies"],
  ],
  ["Pages", ["Under 12", "12–16", "16+"]],
  ["Mood", ["Cozy", "Cute", "Mindful", "Festive", "Spooky", "Magical"]],
];

const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];

interface ShopSidebarFacetsProps {
  activeDifficulty?: string;
  currentCategory?: string;
  currentSort?: string;
  currentQ?: string;
}

export function ShopSidebarFacets({
  activeDifficulty,
  currentCategory,
  currentSort,
  currentQ,
}: ShopSidebarFacetsProps) {
  const router = useRouter();

  function handleDifficultyChange(difficulty: string, checked: boolean) {
    const params = new URLSearchParams();
    if (currentCategory) params.set("category", currentCategory);
    if (currentSort) params.set("sort", currentSort);
    if (currentQ) params.set("q", currentQ);
    if (checked) {
      params.set("difficulty", difficulty);
    } else {
      params.delete("difficulty");
    }
    const query = params.toString();
    router.push(query ? `/shop?${query}` : "/shop");
  }

  return (
    <aside className="flex flex-col gap-7">
      {/* Difficulty — functional filter */}
      <div>
        <div
          className="mb-2.5 text-[13px] font-black tracking-[.02em]"
          style={{ color: "var(--iroly-fg)", fontFamily: "var(--font-display)" }}
        >
          Difficulty
        </div>
        <div className="flex flex-col gap-2">
          {DIFFICULTY_OPTIONS.map((difficulty) => (
            <label
              key={difficulty}
              className="flex cursor-pointer items-center gap-2 text-[13px]"
              style={{ color: "var(--iroly-fg-2)" }}
            >
              <input
                type="checkbox"
                checked={activeDifficulty?.toLowerCase() === difficulty.toLowerCase()}
                onChange={(e) => handleDifficultyChange(difficulty, e.target.checked)}
                style={{ accentColor: "#0D1801" }}
              />
              {difficulty}
            </label>
          ))}
        </div>
      </div>

      {/* Static facets — UI stubs for v1 */}
      {STATIC_FACETS.map(([title, items]) => (
        <div key={title}>
          <div
            className="mb-2.5 text-[13px] font-black tracking-[.02em]"
            style={{ color: "var(--iroly-fg)", fontFamily: "var(--font-display)" }}
          >
            {title}
          </div>
          <div className="flex flex-col gap-2">
            {items.map((it, i) => (
              <label
                key={it}
                className="flex cursor-pointer items-center gap-2 text-[13px]"
                style={{ color: "var(--iroly-fg-2)" }}
              >
                <input
                  type="checkbox"
                  defaultChecked={i === 0}
                  style={{ accentColor: "#0D1801" }}
                />
                {it}
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Bundle upsell */}
      <div
        className="rounded-[14px] p-3.5"
        style={{ background: "#BFFF00" }}
      >
        <div
          className="text-[12px] font-bold uppercase tracking-[.04em]"
          style={{ color: "#0D1801" }}
        >
          Bundle &amp; Save
        </div>
        <div
          className="my-1 text-[16px] font-black"
          style={{ fontFamily: "var(--font-display)", color: "#0D1801" }}
        >
          3 books = ¥24.9
        </div>
        <a
          href="#"
          className="text-[12px] font-bold"
          style={{ color: "#0D1801" }}
        >
          Build a Bundle →
        </a>
      </div>
    </aside>
  );
}
