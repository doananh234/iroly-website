import { Link } from "@/i18n/navigation";

/**
 * Re-export next-intl's locale-aware Link.
 *
 * Usage: <LocaleLink href="/shop">Shop</LocaleLink>
 * Renders: <a href="/en/shop">Shop</a> (auto-prefixes current locale)
 *
 * No need to manually pass locale or build `/${locale}/path` strings.
 */
export { Link as LocaleLink };
