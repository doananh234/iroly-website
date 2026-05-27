"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { User, Pencil, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

/** Desktop sidebar navigation for account pages. */
export function AccountSidebar() {
  const t = useTranslations("account");
  const pathname = usePathname();

  const links = [
    { href: "/account" as const, label: t("title"), icon: User },
    { href: "/account/edit" as const, label: t("editProfile"), icon: Pencil },
    { href: "/account/settings" as const, label: t("settings"), icon: Settings },
  ];

  return (
    <nav className="flex flex-col gap-1">
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
              isActive
                ? "bg-[#BFFF00] text-[#0D1801]"
                : "text-[var(--iroly-fg-muted)] hover:bg-black/[0.04] hover:text-[var(--iroly-fg)]",
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
