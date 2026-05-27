"use client";

import { useTranslations } from "next-intl";
import { BookCover } from "@/components/book-cover";
import { Button } from "@/components/ui/button";
import { FALLBACK_BOOKS } from "@/data/fallback";

/** Grid of purchased books shown on account dashboard. */
export function AccountBooksGrid() {
  const t = useTranslations("account");
  // Use first 6 fallback books as placeholder for owned books
  const books = FALLBACK_BOOKS.slice(0, 6);

  return (
    <section>
      <h2 className="mb-4 text-lg font-black text-[#0D1801] dark:text-white">{t("myBooks")}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <div key={book.id} className="flex flex-col gap-2">
            <BookCover
              src={book.coverUrl}
              alt={book.title}
              backgroundColor={book.backgroundColor}
              className="w-full"
              radius={12}
            />
            <div>
              <p className="line-clamp-1 text-[13px] font-bold text-[#0D1801] dark:text-white">
                {book.title}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-1.5 h-7 w-full rounded-full border-black/[0.1] text-[11px] font-semibold hover:bg-black/[0.04]"
              >
                {t("openInApp")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
