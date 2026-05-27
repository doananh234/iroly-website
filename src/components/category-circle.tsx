import Image from "next/image";
import { cn } from "@/lib/utils";

interface CategoryCircleProps {
  id: string;
  name: string;
  size?: number;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryCircle({ id, name, size = 76, active, onClick }: CategoryCircleProps) {
  return (
    <button onClick={onClick} className="flex shrink-0 cursor-pointer flex-col items-center gap-2 border-none bg-transparent p-0" style={{ width: size + 6 }}>
      <div className={cn("rounded-full p-0.5 transition-transform", active ? "bg-[#BFFF00]" : "bg-transparent")} style={{ width: size, height: size }}>
        <Image src={`/assets/categories/${id}.png`} alt={name} width={size} height={size} className="rounded-full object-cover" />
      </div>
      <div className={cn("text-center text-sm leading-tight", active ? "font-bold" : "font-medium")} style={{ maxWidth: size + 14 }}>
        {name}
      </div>
    </button>
  );
}
