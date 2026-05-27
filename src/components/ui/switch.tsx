"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

/** Simple accessible toggle switch. */
export function Switch({ checked, onCheckedChange, className, disabled }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BFFF00] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-[#0D1801] dark:bg-white" : "bg-black/[0.15] dark:bg-white/[0.2]",
        className,
      )}
    >
      <span
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full shadow-lg transition-transform",
          checked
            ? "translate-x-5 bg-white dark:bg-[#0D1801]"
            : "translate-x-0 bg-white dark:bg-white/80",
        )}
      />
    </button>
  );
}
