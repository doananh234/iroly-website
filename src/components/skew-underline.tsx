import { cn } from "@/lib/utils";

interface SkewUnderlineProps {
  children: React.ReactNode;
  color?: string;
  height?: string;
  className?: string;
}

export function SkewUnderline({ children, color = "#BFFF00", height = "55%", className }: SkewUnderlineProps) {
  return (
    <span className={cn("relative inline-block px-1", className)}>
      <span aria-hidden className="absolute inset-x-0 bottom-[8%] z-0 -skew-x-12 rounded" style={{ height, background: color }} />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
