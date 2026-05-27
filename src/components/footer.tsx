"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FooterNewsletter } from "./footer-newsletter";

// Inline SVG social icons matching prototype (instagram, tiktok, facebook, x-icon)
const SocialIcon = ({ name }: { name: "instagram" | "tiktok" | "facebook" | "x" }) => {
  const paths: Record<string, string[]> = {
    instagram: [
      "M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z",
      "M16 11.5a4 4 0 1 1-8 0 4 4 0 0 1 8 0z",
      "M17.5 6.5h.01",
    ],
    tiktok: ["M9 12a4 4 0 1 0 4 4V4c1 3 3 4 6 4"],
    facebook: [
      "M14 22V12h3l1-4h-4V6a2 2 0 0 1 2-2h2V0h-3a5 5 0 0 0-5 5v3H7v4h3v10z",
    ],
    x: ["M4 4l16 16", "M20 4 4 20"],
  };
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name].map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
};

/** Footer link columns with real internal routes. */
export function Footer() {
  const t = useTranslations("common.footer");

  // Shop column links: point to specific category routes
  const shopLinks = [
    { label: "New Arrivals", href: "/shop?sort=newest" as any },
    { label: "Best Sellers", href: "/shop" as const },
    { label: "Mandalas",     href: "/categories/mandalas" as any },
    { label: "Spooky",       href: "/categories/spooky" as any },
    { label: "Christmas",    href: "/categories/christmas" as any },
    { label: "Bold & Easy",  href: "/categories/bold-easy" as any },
  ];

  // Learn column links
  const learnLinks = [
    { label: "How iRoly Works", href: "/about" as const },
    { label: "Free Pages",      href: "/free-pages" as const },
    { label: "Difficulty Guide", href: "/about" as const },
    { label: "For Parents",     href: "/about" as const },
    { label: "For Schools",     href: "/about" as const },
  ];

  // Help column links
  const helpLinks = [
    { label: "Contact",     href: "/about" as const },
    { label: "Refunds",     href: "/pricing" as const },
    { label: "Credits FAQ", href: "/pricing" as const },
    { label: "Account",     href: "/login" as const },
    { label: "Status",      href: "/about" as const },
  ];

  const sections = [
    { title: t("shopSection"),  links: shopLinks },
    { title: t("learnSection"), links: learnLinks },
    { title: t("helpSection"),  links: helpLinks },
  ];

  return (
    <footer className="bg-[#0D1801] px-4 pb-9 pt-16 text-[#E4E9DA] sm:px-8">
      <div className="mx-auto max-w-[1320px]">
        {/* Main grid: brand + 3 link columns + newsletter = 5 cols */}
        <div className="grid grid-cols-2 gap-8 pb-10 sm:gap-12 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3.5 flex items-center gap-2.5">
              <Image
                src="/assets/logos/app-icon-foreground.png"
                alt=""
                width={44}
                height={44}
                className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
              />
              <span className="font-display text-2xl font-black tracking-[-0.01em]">
                iRoly
              </span>
            </div>
            <p className="mb-4.5 max-w-[280px] text-sm leading-[1.55] text-[#A8B099]">
              {t("tagline")}
            </p>
            {/* Social icons — keep as <a> since no real URLs yet */}
            <div className="flex gap-2">
              {(["instagram", "tiktok", "facebook", "x"] as const).map((name) => (
                <a
                  key={name}
                  href="#"
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/[0.06] text-[#E4E9DA] no-underline hover:bg-white/[0.12]"
                >
                  <SocialIcon name={name} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — Shop, Learn, Help */}
          {sections.map((section) => (
            <div key={section.title}>
              <div className="mb-3.5 text-[13px] font-bold uppercase tracking-[.06em] text-[#BFFF00]">
                {section.title}
              </div>
              <ul className="flex flex-col gap-2 list-none p-0 m-0">
                {section.links.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#E4E9DA] no-underline hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Color With Us — newsletter column */}
          <FooterNewsletter />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-2 border-t border-white/[0.08] pt-6 text-xs text-[#6F7864] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 iRoly Studio · Made warmly in Tokyo &amp; Lisbon.</span>
          <div className="flex gap-4.5">
            <Link href="/about" className="text-inherit no-underline hover:text-white">
              Terms
            </Link>
            <Link href="/about" className="text-inherit no-underline hover:text-white">
              Privacy
            </Link>
            <Link href="/about" className="text-inherit no-underline hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
