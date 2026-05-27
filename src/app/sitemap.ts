import type { MetadataRoute } from "next";
import { getPublicBooks } from "@/data/books";
import { getPublicCategories } from "@/data/categories";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://iroly.com";
const locales = ["en", "zh", "ja"];

function buildEntry(path: string, lastModified?: Date): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${BASE_URL}/${locale}${path}`;
  }
  languages["x-default"] = `${BASE_URL}/en${path}`;
  return {
    url: `${BASE_URL}/en${path}`,
    lastModified: lastModified || new Date(),
    alternates: { languages },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [books, categories] = await Promise.all([
    getPublicBooks(),
    getPublicCategories(),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = ["", "/shop", "/free-pages", "/pricing", "/about", "/journal", "/community", "/paint", "/feed"];
  for (const page of staticPages) {
    entries.push(buildEntry(page));
  }

  // Category pages (from Firestore)
  for (const cat of categories) {
    entries.push(buildEntry(`/categories/${cat.id}`));
  }

  // Book detail pages (from Firestore)
  for (const book of books) {
    const lastMod = book.updatedAt?.toDate?.() || new Date();
    entries.push(buildEntry(`/shop/${book.id}`, lastMod));
  }

  // Blog post pages
  const blogSlugs = ["how-we-draw-a-tiny-friend"];
  for (const slug of blogSlugs) {
    entries.push(buildEntry(`/journal/${slug}`));
  }

  return entries;
}
