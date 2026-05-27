import { cn } from "@/lib/utils";

/** Palette of bg colors for initials avatar — cycles by index. */
const BG_COLORS = [
  "#BFFF00",
  "#C2E0FF",
  "#FFE8C2",
  "#DDF4D2",
  "#FCE7F3",
  "#F3E5FC",
];

interface AccountAvatarProps {
  name?: string | null;
  size?: number;
  className?: string;
}

/** Displays user initials in a colored circle. */
export function AccountAvatar({ name, size = 80, className }: AccountAvatarProps) {
  const initials = getInitials(name ?? "?");
  const bg = BG_COLORS[(initials.charCodeAt(0) ?? 0) % BG_COLORS.length];
  const fontSize = Math.round(size * 0.38);

  return (
    <div
      className={cn(
        "flex shrink-0 select-none items-center justify-center rounded-full font-black",
        className,
      )}
      style={{ width: size, height: size, background: bg, fontSize, color: "#0D1801" }}
      aria-hidden
    >
      {initials}
    </div>
  );
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (parts[0]?.[0] ?? "?").toUpperCase();
}
