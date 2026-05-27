import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: string | undefined): string {
  if (!price) return "";
  return price;
}

export function formatCurrency(amount: number, locale: string, currency: string = "JPY"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "JPY" ? 0 : 2,
  }).format(amount);
}
