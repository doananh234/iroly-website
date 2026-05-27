import { cn } from "@/lib/utils";

interface BookCoverProps {
  src: string;
  alt?: string;
  size?: number;
  radius?: number;
  className?: string;
  style?: React.CSSProperties;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export function BookCover({ src, alt = "", size, radius = 12, className, style, backgroundColor, children }: BookCoverProps) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ borderRadius: radius, aspectRatio: size ? undefined : "1", width: size, height: size, background: backgroundColor, ...style }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div
        className="pointer-events-none absolute inset-[5px] border-[1.5px] border-dashed border-white/95"
        style={{ borderRadius: Math.max(radius - 4, 4) }}
      />
      {children}
    </div>
  );
}
