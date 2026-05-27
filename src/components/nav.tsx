import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { User } from "lucide-react";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { CartSheet } from "@/components/cart-sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { NavMoreDropdown } from "@/components/nav-more-dropdown";
import { NavSearchInput } from "@/components/nav-search-input";

export function Nav() {
  const t = useTranslations("common");

  // Primary links — always visible in desktop nav
  const primaryLinks = [
    { id: "shop", href: "/shop" as const, label: t("nav.shop") },
    { id: "free", href: "/free-pages" as const, label: t("nav.freePages") },
    { id: "credits", href: "/pricing" as const, label: t("nav.credits") },
    { id: "journal", href: "/journal" as const, label: t("nav.journal") },
  ];

  // Secondary links — inside "More" dropdown on desktop
  const moreLinks = [
    { id: "community", href: "/community" as const, label: t("nav.community") },
    { id: "paint", href: "/paint" as const, label: t("nav.paint") },
    { id: "about", href: "/about" as const, label: t("nav.about") },
    { id: "feed", href: "/feed" as const, label: t("nav.feed") },
  ];

  // All links for mobile hamburger menu
  const allLinks = [
    { id: "home", href: "/" as const, label: t("nav.home") },
    ...primaryLinks,
    ...moreLinks,
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--iroly-border)] bg-[var(--iroly-nav-bg)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1320px] items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6 md:px-8 md:py-4">
        {/* Hamburger — mobile only */}
        <MobileNav links={allLinks} />

        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/assets/logos/iRoly-with-mascot.png"
            alt="iRoly"
            width={152}
            height={38}
            className="h-[32px] w-auto md:h-[38px]"
            priority
          />
        </Link>

        {/* Desktop nav — primary links + "More" dropdown */}
        <nav className="ml-3 hidden items-center gap-0.5 md:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-[var(--iroly-fg-muted)] transition-colors hover:bg-black/[0.04] hover:text-[var(--iroly-fg)]"
            >
              {link.label}
            </Link>
          ))}
          <NavMoreDropdown links={moreLinks} />
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          {/* Search input — hidden below xl */}
          <NavSearchInput placeholder={t("search.placeholder")} />

          <LocaleSwitcher />
          <ThemeToggle />

          <Link
            href="/account"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--iroly-fg)] transition-colors hover:bg-black/[0.04]"
            title="My Account"
          >
            <User size={18} />
          </Link>

          <CartSheet />
        </div>
      </div>
    </header>
  );
}
