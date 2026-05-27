import { getDb } from "@/lib/firebase-admin";
import type { AppHome } from "@/types";

export async function getHomeData(): Promise<AppHome | null> {
  const db = getDb();
  const doc = await db.collection("app").doc("home").get();
  if (!doc.exists) return null;
  return doc.data() as AppHome;
}
