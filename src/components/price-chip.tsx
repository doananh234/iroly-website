import { cn } from "@/lib/utils";

interface PriceChipProps {
  price: string;
  oldPrice?: string | null;
  className?: string;
}

/**
 * Price chip matching prototype ui.jsx PriceChip.
 * bg: #E5B100, color: #0D1801, padding: 3px 10px,
 * border-radius: 8px 8px 8px 0 (asymmetric tab shape), font: 14px weight 800.
 */
export function PriceChip({ price, oldPrice, className }: PriceChipProps) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        style={{
          background: "#E5B100",
          color: "#0D1801",
          padding: "3px 10px",
          borderRadius: "8px 8px 8px 0",
          fontSize: 14,
          fontWeight: 800,
          display: "inline-block",
          lineHeight: 1.2,
        }}
      >
        {price}
      </span>
      {oldPrice && (
        <span className="text-xs text-muted-foreground line-through">{oldPrice}</span>
      )}
    </div>
  );
}
