import { NextRequest, NextResponse } from "next/server";
import { FALLBACK_BOOKS } from "@/data/fallback";

// POST /api/cart — accepts { bookIds: string[] }, returns book details
export async function POST(req: NextRequest) {
  try {
    const { bookIds } = (await req.json()) as { bookIds: string[] };

    if (!Array.isArray(bookIds) || bookIds.length === 0) {
      return NextResponse.json({ books: [] });
    }

    // Try Firestore first, fall back to local data
    let books: Array<Record<string, unknown>> = [];
    try {
      const { getDb } = await import("@/lib/firebase-admin");
      const db = getDb();
      const docs = await Promise.all(
        bookIds.map((id) => db.collection("books").doc(id).get()),
      );
      books = docs
        .filter((doc) => doc.exists)
        .map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch {
      // Firebase not configured — use fallback data
    }

    // If Firestore returned nothing, match from fallback
    if (books.length === 0) {
      books = FALLBACK_BOOKS.filter((b) => bookIds.includes(b.id)).map((b) => ({
        id: b.id,
        title: b.title,
        coverUrl: b.coverUrl,
        price: b.price,
        category: b.category,
        series: b.series,
        specifications: { pages: b.pages },
      }));
    }

    return NextResponse.json({ books });
  } catch (err) {
    console.error("Cart API error:", err);
    return NextResponse.json({ error: "Failed to fetch cart books" }, { status: 500 });
  }
}
