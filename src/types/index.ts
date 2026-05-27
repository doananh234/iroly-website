import type { Timestamp } from "firebase-admin/firestore";

export interface BookColoringPage {
  id: string;
  url: string;
  isPublic?: boolean;
}

export interface BookSpecifications {
  pages: number;
  dimensions?: string;
  ageRange?: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  category?: string;
  categoryId?: string;
  badge?: string;
  backgroundColor?: string;
  tryoutPage?: string;
  coverUrl: string;
  pdfUrl?: string;
  squareThumbnailUrl?: string;
  thumbnailUrl?: string;
  summaryPages?: BookColoringPage[];
  coloringPages: BookColoringPage[];
  specifications: BookSpecifications;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CategoryBookSummary {
  id: string;
  title: string;
  coverUrl: string;
  price?: string;
  badge?: string;
  order?: number;
}

export interface Category {
  id: string;
  name: string;
  displayName: string;
  description: string;
  iconUrl: string;
  iconPrompt: string;
  isPublic?: boolean;
  index?: number;
  books: CategoryBookSummary[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface AppHomeTrendingBook {
  id: string;
  rank: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  participantCount?: string;
}

export interface AppHomeNewArrivalBook {
  id: string;
  title: string;
  coverUrl: string;
  price?: string;
  subtitle?: string;
  order?: number;
}

export interface AppHomeCategory {
  id: string;
  name: string;
  displayName: string;
  description: string;
  iconUrl: string;
  isPublic: boolean;
  order: number;
}

export interface AppHomeFreeColoringPage {
  id: string;
  bookId: string;
  bookTitle: string;
  series: string;
  imageUrl: string;
  backgroundColor: string;
}

export interface AppHome {
  newArrivalBooks: AppHomeNewArrivalBook[];
  trendingBooks: AppHomeTrendingBook[];
  categories: AppHomeCategory[];
  freeColoringPages?: AppHomeFreeColoringPage[];
}

export interface CartItem {
  bookId: string;
  quantity: number;
}
