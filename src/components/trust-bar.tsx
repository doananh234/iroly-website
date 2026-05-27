import { cn } from "@/lib/utils";

interface TrustItem {
  icon?: React.ReactNode;
  label: string;
}

interface TrustBarProps {
  items: TrustItem[];
  dark?: boolean;
  className?: string;
}

export function TrustBar({ items, dark, className }: TrustBarProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-8 px-6 py-4.5 text-sm font-semibold", dark ? "text-white/70" : "text-muted-foreground", className)}>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          {item.icon}
          {item.label}
          {i < items.length - 1 && <span className={cn("ml-8 h-1 w-1 rounded-full", dark ? "bg-white/20" : "bg-gray-300")} />}
        </div>
      ))}
    </div>
  );
}
