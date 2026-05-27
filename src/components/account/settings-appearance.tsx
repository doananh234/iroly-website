"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { usePathname as useNextPathname } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { setCookie, getCookie } from "cookies-next/client";
import { locales } from "@/i18n/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const localeLabels: Record<string, string> = { en: "English", zh: "中文", ja: "日本語" };

/** Appearance settings section (theme + language). */
export function SettingsAppearance() {
  const t = useTranslations("account.settings");
  const locale = useLocale();
  const fullPathname = useNextPathname();
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const theme = getCookie("iroly-theme");
    setIsDark(theme === "dark");
  }, []);

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;
    const applyTheme = () => {
      const next = !isDark;
      setIsDark(next);
      setCookie("iroly-theme", next ? "dark" : "light", { maxAge: 60 * 60 * 24 * 365 });
      document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark");
    };
    if (typeof document.startViewTransition !== "function") { applyTheme(); return; }
    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(() => { flushSync(applyTheme); });
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`] },
        { duration: 500, easing: "ease-in-out", fill: "forwards", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }, [isDark]);

  function switchLocale(newLocale: string) {
    let path = fullPathname;
    for (const loc of locales) {
      if (path === `/${loc}`) { path = "/"; break; }
      if (path.startsWith(`/${loc}/`)) { path = path.slice(loc.length + 1); break; }
    }
    router.replace(path as any, { locale: newLocale as any });
  }

  return (
    <section className="rounded-2xl border border-black/[0.07] bg-white p-5 dark:border-white/[0.08] dark:bg-white/[0.04]">
      <h2 className="mb-4 text-base font-black text-[#0D1801] dark:text-white">{t("appearance")}</h2>
      <div className="flex flex-col gap-4">
        {/* Theme */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[var(--iroly-fg-muted)]">{t("theme")}</span>
          <button
            ref={buttonRef}
            type="button"
            onClick={toggleTheme}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
              "hover:bg-black/[0.06] dark:hover:bg-white/[0.1]",
              "text-[#0D1801] dark:text-white",
            )}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[var(--iroly-fg-muted)]">{t("language")}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-2 rounded-full border-black/[0.1] text-xs font-semibold">
                <Globe size={13} />
                {localeLabels[locale] ?? locale}
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
        </div>
      </div>
    </section>
  );
}
