"use client";

import { useLocale } from "next-intl";
import { usePathname as useNextPathname } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { locales } from "@/i18n/config";

const localeLabels: Record<string, string> = {
  en: "English",
  zh: "中文",
  ja: "日本語",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const fullPathname = useNextPathname(); // e.g. "/zh/login" or "/en/shop"
  const router = useRouter();

  function switchLocale(newLocale: string) {
    // Strip the current locale prefix to get the bare path
    let path = fullPathname;
    for (const loc of locales) {
      if (path === `/${loc}`) {
        path = "/";
        break;
      }
      if (path.startsWith(`/${loc}/`)) {
        path = path.slice(loc.length + 1); // "/zh/login" → "/login"
        break;
      }
    }
    router.replace(path as any, { locale: newLocale as any });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Globe size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            className={loc === locale ? "font-bold" : ""}
          >
            {localeLabels[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
