"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/queries/use-cart";
import { BookCover } from "@/components/book-cover";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import type { Book } from "@/types";

// Fetch book details for items in cart
async function fetchCartBooks(bookIds: string[]): Promise<Book[]> {
  if (bookIds.length === 0) return [];
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookIds }),
  });
  const data = await res.json();
  return data.books ?? [];
}

export function CartSheet() {
  const t = useTranslations("cart");
  const { items, count, remove } = useCart();
  const [open, setOpen] = useState(false);

  const bookIds = items.map((i) => i.bookId);

  const { data: books = [] } = useQuery<Book[]>({
    queryKey: ["cart-books", bookIds],
    queryFn: () => fetchCartBooks(bookIds),
    enabled: open && bookIds.length > 0,
    staleTime: 60 * 1000,
  });

  // Map bookId -> Book for quick lookup
  const bookMap = new Map(books.map((b) => [b.id, b]));

  // Compute subtotal from cart items
  const subtotal = items.reduce((sum, item) => {
    const book = bookMap.get(item.bookId);
    if (!book?.price) return sum;
    const price = parseFloat(book.price.replace(/[^0-9.]/g, ""));
    return sum + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <ShoppingBag size={18} />
          {count > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-[#BFFF00] px-1 text-[11px] font-extrabold text-[#0D1801]">
              {count}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-lg font-extrabold">{t("title")}</SheetTitle>
        </SheetHeader>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <p className="mt-8 text-center text-sm text-gray-500">{t("empty")}</p>
          ) : (
            <ul className="flex flex-col gap-4 py-2">
              {items.map((item) => {
                const book = bookMap.get(item.bookId);
                return (
                  <li key={item.bookId} className="flex items-center gap-3">
                    {book ? (
                      <BookCover
                        src={book.coverUrl}
                        alt={book.title}
                        size={64}
                        radius={8}
                        className="flex-shrink-0"
                      />
                    ) : (
                      <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gray-100" />
                    )}
                    <div className="flex flex-1 flex-col gap-0.5">
                      <span className="text-sm font-semibold leading-tight text-[#0D1801]">
                        {book?.title ?? item.bookId}
                      </span>
                      <span className="text-xs text-gray-500">
                        {book?.price ?? "—"} &times; {item.quantity}
                      </span>
                    </div>
                    <button
                      onClick={() => remove(item.bookId)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                      aria-label={t("remove")}
                    >
                      <X size={14} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer with subtotal and actions */}
        {items.length > 0 && (
          <SheetFooter className="border-t border-black/[0.06] px-4 pt-3">
            <div className="mb-3 flex w-full items-center justify-between text-sm font-semibold">
              <span>{t("subtotal")}</span>
              <span>¥{subtotal.toFixed(1)}</span>
            </div>
            <Link
              href="/cart"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              <Button className="w-full rounded-full bg-[#0D1801] text-white hover:bg-[#0D1801]/90">
                {t("checkout")}
              </Button>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="mt-1 w-full py-2 text-center text-sm text-gray-500 underline-offset-2 hover:underline"
            >
              {t("continueShopping")}
            </button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
