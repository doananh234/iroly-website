/**
 * Related posts grid — 3-column grid matching prototype lines 872-890.
 */
import { Link } from "@/i18n/navigation";

const RELATED = [
  { bg: "#C2E0FF", cat: "Process",    title: "On the dashed border (and why every cover has one)", mins: "4 min", slug: "dashed-border" },
  { bg: "#FCE7F3", cat: "Interview",  title: "A coffee with Aiko, our newest editorial lead",      mins: "7 min", slug: "aiko-interview" },
  { bg: "#DDF4D2", cat: "New Books",  title: "Bold Garden is the book I wish I had at age 6",       mins: "3 min", slug: "bold-garden" },
];

interface BlogRelatedPostsProps {
  title: string;
}

export function BlogRelatedPosts({ title }: BlogRelatedPostsProps) {
  return (
    <section className="mx-auto max-w-[1320px] px-4 pb-20 sm:px-6 md:px-8">
      <h2
        className="mb-8 text-[28px] text-[#0D1801] md:text-[44px]"
        style={{ fontWeight: 900, fontFamily: "var(--font-display)", letterSpacing: "-.02em" }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {RELATED.map(({ bg, cat, title: t, mins, slug }) => (
          <article key={slug} className="cursor-pointer">
            <Link href={`/journal/${slug}`} className="block">
              <div
                className="flex items-center justify-center rounded-[20px] p-7"
                style={{ background: bg, aspectRatio: "4/3" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/coloring-pages/free-coloring-page.svg"
                  alt=""
                  style={{ width: "70%", opacity: 0.85 }}
                />
              </div>
              <div className="mt-3.5 flex items-center gap-2 text-[12px] text-[#666]">
                <span
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[.04em]"
                  style={{ background: "#0D1801", color: "#BFFF00" }}
                >
                  {cat}
                </span>
                <span>· {mins}</span>
              </div>
              <h3
                className="mt-2.5 leading-[1.2] text-[#0D1801]"
                style={{ fontSize: 20, fontWeight: 800, fontFamily: "var(--font-display)" }}
              >
                {t}
              </h3>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
