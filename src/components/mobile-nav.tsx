"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileNavProps {
  links: { id: string; href: string; label: string }[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-6">
        <SheetHeader className="p-0 mb-6">
          <SheetTitle className="text-left text-lg font-black text-[#0D1801]">
            Menu
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-[#0D1801]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
