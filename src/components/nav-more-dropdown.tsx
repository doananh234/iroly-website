"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavLink {
  id: string;
  href: string;
  label: string;
}

interface NavMoreDropdownProps {
  links: NavLink[];
}

export function NavMoreDropdown({ links }: NavMoreDropdownProps) {
  const t = useTranslations("common");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-[#3a3a3a] transition-colors hover:bg-black/[0.04] hover:text-[#0D1801]">
          {t("nav.more")}
          <ChevronDown size={14} className="opacity-60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[180px]">
        {links.map((link) => (
          <DropdownMenuItem key={link.id} asChild>
            <Link
              href={link.href as any}
              className="cursor-pointer text-sm font-medium"
            >
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
