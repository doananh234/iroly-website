import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { locales } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : "en";

  // Merge all namespace files for the locale
  const common = (await import(`./messages/${locale}/common.json`)).default;
  const home = (await import(`./messages/${locale}/home.json`)).default;
  const errors = (await import(`./messages/${locale}/errors.json`)).default;
  const shop = (await import(`./messages/${locale}/shop.json`)).default;
  const book = (await import(`./messages/${locale}/book.json`)).default;
  const pricing = (await import(`./messages/${locale}/pricing.json`)).default;
  const freePages = (await import(`./messages/${locale}/free-pages.json`)).default;
  const about = (await import(`./messages/${locale}/about.json`)).default;
  const journal = (await import(`./messages/${locale}/journal.json`)).default;
  const cart = (await import(`./messages/${locale}/cart.json`)).default;
  const auth = (await import(`./messages/${locale}/auth.json`)).default;
  const blogDetail = (await import(`./messages/${locale}/blog-detail.json`)).default;
  const paint = (await import(`./messages/${locale}/paint.json`)).default;
  const community = (await import(`./messages/${locale}/community.json`)).default;
  const profile = (await import(`./messages/${locale}/profile.json`)).default;
  const feed = (await import(`./messages/${locale}/feed.json`)).default;
  const account = (await import(`./messages/${locale}/account.json`)).default;

  return {
    locale,
    messages: { common, home, errors, shop, book, pricing, "free-pages": freePages, about, journal, cart, auth, "blog-detail": blogDetail, paint, community, profile, feed, account },
  };
});
