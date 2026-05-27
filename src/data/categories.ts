import { getDb } from "@/lib/firebase-admin";
import { FALLBACK_CATEGORIES } from "@/data/fallback";
import type { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  try {
    const db = getDb();
    const snapshot = await db.collection("categories").orderBy("index").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Category);
  } catch {
    return FALLBACK_CATEGORIES as unknown as Category[];
  }
}

export async function getPublicCategories(): Promise<Category[]> {
  try {
    const db = getDb();
    // Fetch all, filter in code — avoids needing a composite index
    const snapshot = await db.collection("categories").orderBy("index").get();
    const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Category);
    return all.filter((c) => c.isPublic !== false);
  } catch {
    return FALLBACK_CATEGORIES as unknown as Category[];
  }
}

export async function getCategoryById(categoryId: string): Promise<Category | null> {
  try {
    const db = getDb();
    const doc = await db.collection("categories").doc(categoryId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Category;
  } catch {
    const fallback = FALLBACK_CATEGORIES.find((c) => c.id === categoryId);
    return (fallback as unknown as Category) || null;
  }
}
