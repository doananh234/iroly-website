"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { flushSync } from "react-dom";
import { setCookie, getCookie } from "cookies-next/client";
import { cn } from "@/lib/utils";

/**
 * Animated theme toggler based on MagicUI AnimatedThemeToggler.
 * Uses View Transitions API for a circle-reveal animation.
 * Persists preference in iroly-theme cookie + data-theme attribute.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const theme = getCookie("iroly-theme");
    const dark = theme === "dark";
    setIsDark(dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const applyTheme = () => {
      const next = !isDark;
      setIsDark(next);
      setCookie("iroly-theme", next ? "dark" : "light", { maxAge: 60 * 60 * 24 * 365 });
      document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark");
    };

    // Fallback for browsers without View Transitions API
    if (typeof document.startViewTransition !== "function") {
      applyTheme();
      return;
    }

    // Calculate circle origin from button center
    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      flushSync(applyTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }, [isDark]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
        "hover:bg-black/[0.04] dark:hover:bg-white/[0.08]",
        "text-[#0D1801] dark:text-white",
      )}
      title="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
