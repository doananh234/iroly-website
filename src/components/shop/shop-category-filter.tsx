/**
 * Shop category filter pills — links to /categories/{slug} for SEO.
 * "All" links back to /shop.
 * Categories are passed as props from the parent server component.
 */
import { Link } from "@/i18n/navigation";

interface CategoryItem {
  id: string;
  name: string;
}

interface ShopCategoryFilterProps {
  activeCategory?: string;
  categories?: CategoryItem[];
}

export function ShopCategoryFilter({ activeCategory = "", categories = [] }: ShopCategoryFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2"
      style={{ scrollbarWidth: "none" }}
    >
      <Link
        href="/shop"
        className="shrink-0 rounded-full px-[18px] py-[10px] text-[13px] font-bold no-underline transition-colors"
        style={{
          background: !activeCategory ? "var(--iroly-fg)" : "rgba(0,0,0,.04)",
          color: !activeCategory ? "var(--iroly-accent)" : "var(--iroly-fg)",
          whiteSpace: "nowrap",
        }}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/categories/${cat.id}` as any}
          className="shrink-0 rounded-full px-[18px] py-[10px] text-[13px] font-bold no-underline transition-colors"
          style={{
            background: cat.id === activeCategory ? "var(--iroly-fg)" : "rgba(0,0,0,.04)",
            color: cat.id === activeCategory ? "var(--iroly-accent)" : "var(--iroly-fg)",
            whiteSpace: "nowrap",
          }}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
