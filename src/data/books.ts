import { getDb } from "@/lib/firebase-admin";
import { FALLBACK_BOOKS } from "@/data/fallback";
import type { FallbackBook } from "@/data/fallback";
import type { Book } from "@/types";

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL || "https://image.lagroups.org";

/** Resolve image URL — skip broken localhost URLs, resolve relative R2 paths */
function resolveImageUrl(url: string | undefined): string {
  if (!url) return "/assets/logos/app-icon.png";
  if (url.startsWith("http://localhost")) return "/assets/logos/app-icon.png";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // Relative R2 path like /assets/books/...
  return `${R2_BASE.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
}

/** Map a Firestore Book document to the FallbackBook shape used by components. */
function mapBookToFallback(b: Book): FallbackBook {
  // Extract public coloring page URLs for preview thumbnails
  const previewPages = (b.coloringPages || [])
    .filter((p) => p.isPublic && p.url)
    .map((p) => resolveImageUrl(p.url));

  return {
    id: b.id,
    title: b.title,
    series: b.category ?? b.subtitle ?? "",
    category: b.category ?? b.categoryId ?? "",
    price: b.price ?? "0",
    oldPrice: b.originalPrice ?? null,
    pages: b.specifications?.pages ?? 0,
    difficulty: "medium",
    coverUrl: resolveImageUrl(b.coverUrl),
    backgroundColor: b.backgroundColor ?? "#F5F0EB",
    badge: b.badge ?? null,
    badgeColor: null,
    rank: 0,
    participantCount: 0,
    isNew: b.badge === "NEW",
    description: b.description,
    tryoutPage: b.tryoutPage,
    previewPages,
  };
}

// ---------------------------------------------------------------------------
// Raw Firestore queries (return Book type)
// ---------------------------------------------------------------------------

export async function getBooks(): Promise<Book[]> {
  try {
    const db = getDb();
    const snapshot = await db.collection("books").orderBy("title").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Book);
  } catch {
    return FALLBACK_BOOKS as unknown as Book[];
  }
}

export async function getPublicBooks(): Promise<Book[]> {
  try {
    const db = getDb();
    const snapshot = await db
      .collection("books")
      .where("isPublic", "==", true)
      .orderBy("title")
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Book);
  } catch {
    return FALLBACK_BOOKS as unknown as Book[];
  }
}

export async function getBookById(bookId: string): Promise<Book | null> {
  try {
    const db = getDb();
    const doc = await db.collection("books").doc(bookId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Book;
  } catch {
    const fallback = FALLBACK_BOOKS.find((b) => b.id === bookId);
    return (fallback as unknown as Book) || null;
  }
}

export async function getBooksByCategory(categoryId: string): Promise<Book[]> {
  try {
    const db = getDb();
    // Fetch by categoryId, filter isPublic in code to avoid composite index
    const snapshot = await db
      .collection("books")
      .where("categoryId", "==", categoryId)
      .get();
    return snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }) as Book & { isPublic?: boolean })
      .filter((b) => b.isPublic === true);
  } catch {
    return (FALLBACK_BOOKS.filter((b) => b.category === categoryId) as unknown as Book[]);
  }
}

// ---------------------------------------------------------------------------
// Shop-oriented helpers (return FallbackBook for direct component use)
// ---------------------------------------------------------------------------

/** Fetch all public books mapped to FallbackBook shape. Falls back to FALLBACK_BOOKS. */
export async function getPublicBooksForShop(): Promise<FallbackBook[]> {
  try {
    const db = getDb();
    // Fetch all, filter in code — avoids needing a composite index
    const snapshot = await db.collection("books").orderBy("title").get();
    const all = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Book,
    );
    const books = all.filter((b) => (b as Book & { isPublic?: boolean }).isPublic === true);
    console.log(`[books] Firestore returned ${books.length} public books (of ${all.length} total)`);
    if (books.length > 0) return books.map(mapBookToFallback);
  } catch (err) {
    console.error("[books] Firestore query failed, using fallback:", err);
  }
  console.log(`[books] Using ${FALLBACK_BOOKS.length} fallback books`);
  return FALLBACK_BOOKS;
}

/** Fetch a single book mapped to FallbackBook shape. Falls back to FALLBACK_BOOKS entry. */
export async function getBookForShop(
  bookId: string,
): Promise<FallbackBook | null> {
  try {
    const db = getDb();
    const doc = await db.collection("books").doc(bookId).get();
    if (!doc.exists) {
      return FALLBACK_BOOKS.find((b) => b.id === bookId) ?? null;
    }
    return mapBookToFallback({ id: doc.id, ...doc.data() } as Book);
  } catch {
    return FALLBACK_BOOKS.find((b) => b.id === bookId) ?? null;
  }
}
