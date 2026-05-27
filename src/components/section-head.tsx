import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionHeadProps {
  title: ReactNode;
  kicker?: string;
  subtitle?: string;
  action?: ReactNode;
  /** @deprecated use kicker instead */
  eyebrow?: string;
  /** @deprecated use action (ReactNode) instead */
  onAction?: () => void;
  className?: string;
}

/**
 * Section header matching prototype ui.jsx `Section` component.
 * Kicker: lime pill (#BFFF00 bg, #0D1801 text), radius 4px, uppercase, tracking .04em.
 * Title: 44px weight-900 display font, tracking -.02em, line-height 1.05.
 * Subtitle: 17px, #555, max-width 560px.
 */
export function SectionHead({
  title,
  kicker,
  eyebrow,
  subtitle,
  action,
  className,
}: SectionHeadProps) {
  const kickerText = kicker ?? eyebrow;

  return (
    <div className={cn("mb-8 flex items-end justify-between gap-6", className)}>
      <div>
        {kickerText && (
          <div className="mb-3.5 inline-block rounded bg-[#BFFF00] px-[10px] py-1 text-xs font-bold uppercase tracking-[.04em] text-[#0D1801]">
            {kickerText}
          </div>
        )}
        <h2 className="m-0 text-[28px] font-black leading-[1.05] tracking-[-0.02em] text-[var(--iroly-fg)] sm:text-[36px] md:text-[44px]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 max-w-[560px] text-[17px] text-[#555]">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
