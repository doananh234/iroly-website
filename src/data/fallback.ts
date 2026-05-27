/**
 * Fallback data for the home page when Firebase is not configured.
 * Mirrors the prototype's BOOKS + CATEGORIES from iroly-web/project/data.js.
 */

const CDN = "https://media.southernlotus.com/images";

export interface FallbackBook {
  id: string;
  title: string;
  series: string;
  category: string;
  price: string;
  oldPrice: string | null;
  pages: number;
  difficulty: string;
  coverUrl: string;
  backgroundColor: string;
  badge: string | null;
  badgeColor: string | null;
  rank: number;
  participantCount: number;
  isNew: boolean;
  dark?: boolean;
  /** Mood / tone tags shown on book detail page */
  tags?: string[];
  /** Short description for the book detail page */
  description?: string;
  /** URL for the "Try First Page Free" button (opens in new tab). Falls back to /free-pages. */
  tryoutPage?: string;
  /** Preview page image URLs (public coloring pages from this book) */
  previewPages?: string[];
}

export interface FallbackCategory {
  id: string;
  name: string;
  backgroundColor: string;
}

export const FALLBACK_BOOKS: FallbackBook[] = [
  {
    id: "tiny-friends",
    title: "Tiny Friends",
    series: "Animal Series",
    category: "animals",
    price: "¥9.9",
    oldPrice: "¥14.9",
    pages: 12,
    difficulty: "Easy",
    coverUrl: CDN + "/sl.tiny.friends.jpg?w=800",
    backgroundColor: "#FFE8C2",
    badge: "Best Seller",
    badgeColor: "#8B5CF6",
    rank: 1,
    participantCount: 8420,
    isNew: false,
    tags: ["Cute", "Cozy", "Stress-free"],
    description:
      "12 pages of cute, easy-to-color animal friends. Perfect for unwinding after a long day — no pressure, just a peaceful coloring session.",
  },
  {
    id: "cutie-patterns",
    title: "Cutie Patterns",
    series: "Mandala Series",
    category: "mandalas",
    price: "¥9.9",
    oldPrice: "¥14.9",
    pages: 16,
    difficulty: "Medium",
    coverUrl: CDN + "/sl.cutie.patterns.jpg?w=800",
    backgroundColor: "#C2E0FF",
    badge: "Editor's Pick",
    badgeColor: "#8B5CF6",
    rank: 2,
    participantCount: 6180,
    isNew: false,
  },
  {
    id: "merry-friends",
    title: "Merry Friends",
    series: "Christmas Series",
    category: "christmas",
    price: "¥6.9",
    oldPrice: "¥9.9",
    pages: 14,
    difficulty: "Easy",
    coverUrl: CDN + "/sl.merry.friends.jpg?w=800",
    backgroundColor: "#FFD6D6",
    badge: "30% Off",
    badgeColor: "#DC2626",
    rank: 3,
    participantCount: 4320,
    isNew: false,
  },
  {
    id: "love-moments",
    title: "Love Moments",
    series: "Romance Series",
    category: "humorous",
    price: "¥9.9",
    oldPrice: null,
    pages: 12,
    difficulty: "Easy",
    coverUrl: CDN + "/sl.love.moments.jpg?w=800",
    backgroundColor: "#FCE7F3",
    badge: "Featured",
    badgeColor: "#6B7280",
    rank: 4,
    participantCount: 3210,
    isNew: true,
  },
  {
    id: "spooky-vibes",
    title: "Spooky Vibes",
    series: "Spooky Series",
    category: "spooky",
    price: "¥9.9",
    oldPrice: null,
    pages: 10,
    difficulty: "Medium",
    coverUrl: CDN + "/sl.tiny.friends.jpg?w=800",
    backgroundColor: "#1f1430",
    badge: "New",
    badgeColor: "#6B7280",
    rank: 5,
    participantCount: 2140,
    isNew: true,
    dark: true,
  },
  {
    id: "fuzzy-buddies",
    title: "Fuzzy Buddies",
    series: "Fuzzy Buddies",
    category: "fuzzy-buddies",
    price: "¥7.9",
    oldPrice: "¥9.9",
    pages: 14,
    difficulty: "Easy",
    coverUrl: CDN + "/sl.tiny.friends.jpg?w=800",
    backgroundColor: "#E8FFD6",
    badge: "Best Seller",
    badgeColor: "#8B5CF6",
    rank: 6,
    participantCount: 5030,
    isNew: false,
  },
  {
    id: "mandala-mornings",
    title: "Mandala Mornings",
    series: "Mandala Series",
    category: "mandalas",
    price: "¥9.9",
    oldPrice: null,
    pages: 18,
    difficulty: "Hard",
    coverUrl: CDN + "/sl.cutie.patterns.jpg?w=800",
    backgroundColor: "#DCEFFF",
    badge: null,
    badgeColor: null,
    rank: 7,
    participantCount: 1890,
    isNew: true,
  },
  {
    id: "bold-easy",
    title: "Bold & Easy",
    series: "Bold & Easy Series",
    category: "bold-easy",
    price: "¥6.9",
    oldPrice: null,
    pages: 10,
    difficulty: "Beginner",
    coverUrl: CDN + "/sl.tiny.friends.jpg?w=800",
    backgroundColor: "#FFEFB8",
    badge: "Featured",
    badgeColor: "#6B7280",
    rank: 8,
    participantCount: 4560,
    isNew: false,
  },
  {
    id: "cozy-cottages",
    title: "Cozy Cottages",
    series: "Cities Series",
    category: "cities",
    price: "¥9.9",
    oldPrice: null,
    pages: 16,
    difficulty: "Medium",
    coverUrl: CDN + "/sl.cutie.patterns.jpg?w=800",
    backgroundColor: "#E9F5E1",
    badge: null,
    badgeColor: null,
    rank: 9,
    participantCount: 920,
    isNew: true,
  },
  {
    id: "festive-florals",
    title: "Festive Florals",
    series: "Flowers Series",
    category: "flowers",
    price: "¥9.9",
    oldPrice: "¥12.9",
    pages: 14,
    difficulty: "Medium",
    coverUrl: CDN + "/sl.merry.friends.jpg?w=800",
    backgroundColor: "#FFE3D6",
    badge: "Editor's Pick",
    badgeColor: "#8B5CF6",
    rank: 10,
    participantCount: 2310,
    isNew: false,
  },
];

export interface FallbackTestimonial {
  name: string;
  quote: string;
  tag: string;
}

export const FALLBACK_TESTIMONIALS: FallbackTestimonial[] = [
  {
    name: "Amelia R.",
    quote: "Twenty quiet minutes a night. Best habit I picked up this year.",
    tag: "Daily colorist",
  },
  {
    name: "Kenta H.",
    quote: "The free page each week is genuinely the highlight of my Mondays.",
    tag: "Mandala fan",
  },
  {
    name: "Priya S.",
    quote: "Bought it for my kid. We both color now. The bold pages are perfect.",
    tag: "Parent + kid",
  },
  {
    name: "Dani L.",
    quote: "No streaks, no achievements. It just lets me color. Refreshing.",
    tag: "App user since '24",
  },
];

// 7 categories for the rail (skip "all")
export const FALLBACK_CATEGORIES: FallbackCategory[] = [
  { id: "animals", name: "Animals", backgroundColor: "#FFE8C2" },
  { id: "mandalas", name: "Mandalas", backgroundColor: "#C2E0FF" },
  { id: "fantasy-scifi", name: "Fantasy & SciFi", backgroundColor: "#DDD6FE" },
  { id: "spooky", name: "Spooky", backgroundColor: "#1F1233" },
  { id: "christmas", name: "Christmas", backgroundColor: "#FFD6D6" },
  { id: "flowers", name: "Flowers", backgroundColor: "#DDF4D2" },
  { id: "cities", name: "Cities", backgroundColor: "#CFE3F0" },
];

// Credit / pricing tiers
export interface CreditTier {
  id: string;
  label: string;
  credits: number | string;
  price: string;
  per: string;
  popular: boolean;
  includes: string;
  perks: string[];
  dark?: boolean;
}

export const FALLBACK_CREDIT_TIERS: CreditTier[] = [
  {
    id: "sampler",
    label: "Sampler",
    credits: 30,
    price: "¥4.9",
    per: "¥0.16/credit",
    popular: false,
    includes: "~2 books",
    perks: ["Unlock 1 short book", "Or 3 single pages", "Credits never expire", "Works on all devices"],
  },
  {
    id: "library",
    label: "Library",
    credits: 180,
    price: "¥19.9",
    per: "¥0.11/credit",
    popular: true,
    includes: "~6 books",
    perks: ["Unlock 3 books", "+30 bonus credits", "Free Friday pages", "Priority new releases", "Save 17%"],
  },
  {
    id: "studio",
    label: "Studio",
    credits: 420,
    price: "¥39.9",
    per: "¥0.09/credit",
    popular: false,
    includes: "~15 books",
    perks: ["Unlock ~7 books", "+90 bonus credits", "Cloud backup", "Exhibition profile", "Save 25%"],
    dark: true,
  },
];

// FAQ items
export interface FaqItem {
  q: string;
  a: string;
}

export const FALLBACK_FAQ: FaqItem[] = [
  { q: "Do credits expire?", a: "Never. Spend them when you feel like coloring." },
  { q: "Can I use credits on print pages too?", a: "Yes — credits unlock the full book in the app, and you can print any page from there." },
  { q: "Do I need a subscription?", a: "No. iRoly has never had subscriptions. Buy what you want, when you want." },
  { q: "Will my books sync between devices?", a: "Yes, with a free iRoly account. Library plans and above include cloud backup of your art." },
  { q: "What if I don't love a book?", a: "Refunds within 7 days, no questions. We'll return the credits to your wallet." },
  { q: "Family / classroom plans?", a: "In beta. Email us at hello@iroly.studio." },
];

// Free coloring pages
export interface FreeColoringPage {
  id: string;
  title: string;
  series: string;
  bg: string;
  imageUrl?: string;
  expires: string;
  week: number;
}

export const FALLBACK_FREE_PAGES: FreeColoringPage[] = [
  { id: "fp1", title: "Sleepy Fox",       series: "Tiny Friends",    bg: "#FFE8C2", expires: "3 Days Left", week: 19 },
  { id: "fp2", title: "Sunburst Mandala", series: "Cutie Patterns",  bg: "#C2E0FF", expires: "3 Days Left", week: 18 },
  { id: "fp3", title: "Holiday Owl",      series: "Merry Friends",   bg: "#FFD6D6", expires: "3 Days Left", week: 17 },
  { id: "fp4", title: "Two Hearts",       series: "Love Moments",    bg: "#FCE7F3", expires: "3 Days Left", week: 16 },
  { id: "fp5", title: "Tiny Folks",       series: "Tiny Friends",    bg: "#DDF4D2", expires: "1 Day Left",  week: 15 },
  { id: "fp6", title: "Lotus 02",         series: "Mandala Series",  bg: "#E8DFFF", expires: "Expired",     week: 14 },
  { id: "fp7", title: "Ghost Picnic",     series: "Spooky Series",   bg: "#1f1430", expires: "Expired",     week: 13 },
  { id: "fp8", title: "Festive Wreath",   series: "Christmas Series",bg: "#FFD6D6", expires: "Expired",     week: 12 },
  { id: "fp9", title: "Mantra 04",        series: "Cutie Patterns",  bg: "#C2E0FF", expires: "Expired",     week: 11 },
  { id: "fp10", title: "Mushroom Town",   series: "Fantasy Series",  bg: "#EEDCFF", expires: "Expired",     week: 10 },
  { id: "fp11", title: "Cozy Bear",       series: "Tiny Friends",    bg: "#FFE8C2", expires: "Expired",     week: 9  },
  { id: "fp12", title: "Star Mandala",    series: "Mandala Series",  bg: "#C2E0FF", expires: "Expired",     week: 8  },
];

// ─── Community Art ─────────────────────────────────────────────────────────────
export interface CommunityArtItem {
  bg: string;
  accent: string;
  handle: string;
  name: string;
  outline: "fox" | "garden" | "mug";
  book: string;
  likes: number;
  comments: number;
  when: string;
}

export const COMMUNITY_ART: CommunityArtItem[] = [
  { bg: "#FFE8C2", accent: "#FFB68A", handle: "sleepyfox22",         name: "Mei Y.",  outline: "fox",    book: "Tiny Friends",  likes: 142, comments: 18, when: "2h" },
  { bg: "#FFD6E5", accent: "#C7558B", handle: "melisa.colors",       name: "Melisa A.", outline: "garden", book: "Bold Garden",   likes: 98,  comments: 12, when: "5h" },
  { bg: "#C2E0FF", accent: "#5588D9", handle: "blue_hours",          name: "Toma R.", outline: "mug",    book: "Cozy Sundays",  likes: 201, comments: 34, when: "8h" },
  { bg: "#DDF4D2", accent: "#5C9148", handle: "garden.daze",         name: "Aiko T.", outline: "garden", book: "Bold Garden",   likes: 77,  comments: 9,  when: "12h" },
  { bg: "#FFF1D0", accent: "#FFC747", handle: "sun_seeker",          name: "Sara K.", outline: "fox",    book: "Tiny Friends",  likes: 65,  comments: 6,  when: "1d" },
  { bg: "#F3E5FC", accent: "#8E5AA8", handle: "plum.skies",          name: "Ren W.",  outline: "mug",    book: "Cozy Sundays",  likes: 184, comments: 21, when: "1d" },
  { bg: "#FFE8C2", accent: "#E2553A", handle: "tomato.house",        name: "Yuki H.", outline: "garden", book: "Bold Garden",   likes: 45,  comments: 4,  when: "1d" },
  { bg: "#C2F4E8", accent: "#5EBFAE", handle: "seafoam.afternoons",  name: "Nina P.", outline: "fox",    book: "Tiny Friends",  likes: 233, comments: 42, when: "2d" },
  { bg: "#FCE7F3", accent: "#FF9DC0", handle: "rose.window",         name: "Eli M.",  outline: "mug",    book: "Cozy Sundays",  likes: 88,  comments: 7,  when: "2d" },
  { bg: "#DDF4D2", accent: "#A8BD8F", handle: "quiet.leaves",        name: "Otis B.", outline: "garden", book: "Bold Garden",   likes: 56,  comments: 3,  when: "3d" },
  { bg: "#C2E0FF", accent: "#9EC9F0", handle: "sky.archive",         name: "Cam D.", outline: "fox",    book: "Tiny Friends",  likes: 312, comments: 58, when: "3d" },
  { bg: "#FFE38A", accent: "#FFC747", handle: "butter.daze",         name: "Pip S.",  outline: "mug",    book: "Cozy Sundays",  likes: 120, comments: 11, when: "4d" },
];

// ─── Profile Data ─────────────────────────────────────────────────────────────
export interface ProfileBook {
  title: string;
  bg: string;
  accent: string;
  status: "owned" | "wishlist";
}

export const PROFILE_BOOKS: ProfileBook[] = [
  { title: "Tiny Friends",  bg: "#FFE8C2", accent: "#FFB68A", status: "owned" },
  { title: "Bold Garden",   bg: "#DDF4D2", accent: "#5C9148", status: "owned" },
  { title: "Cozy Sundays",  bg: "#FCE7F3", accent: "#C7558B", status: "owned" },
  { title: "Mandala Slow",  bg: "#C2E0FF", accent: "#5588D9", status: "wishlist" },
];

export interface ProfileArtItem {
  bg: string;
  accent: string;
  outline: "fox" | "garden" | "mug";
  book: string;
  likes: string;
  when: string;
}

export const PROFILE_ART: ProfileArtItem[] = [
  { bg: "#FFE8C2", accent: "#FFB68A", outline: "fox",    book: "Tiny Friends",  likes: "142", when: "2h" },
  { bg: "#DDF4D2", accent: "#5C9148", outline: "garden", book: "Bold Garden",   likes: "77",  when: "1d" },
  { bg: "#FCE7F3", accent: "#C7558B", outline: "mug",    book: "Cozy Sundays",  likes: "88",  when: "2d" },
  { bg: "#C2E0FF", accent: "#5588D9", outline: "fox",    book: "Tiny Friends",  likes: "201", when: "4d" },
  { bg: "#FFE38A", accent: "#FFC747", outline: "mug",    book: "Cozy Sundays",  likes: "65",  when: "1w" },
  { bg: "#F3E5FC", accent: "#8E5AA8", outline: "garden", book: "Bold Garden",   likes: "184", when: "2w" },
];

// ─── Feed Posts ────────────────────────────────────────────────────────────────
export interface FeedPost {
  handle: string;
  user: string;
  date: string;
  avatar: string;
  title: string;
  body: string;
  outline: "fox" | "garden" | "mug";
  tint: string;
  bg: string;
  book: string;
  bookSwatches: string[];
  likes: string;
  comments: string;
  music: string;
}

export const FEED_POSTS: FeedPost[] = [
  {
    handle: "Xiao Fang", user: "xiaofang", date: "2026-05-09", avatar: "#FFB68A",
    title: "Paper-cutting study, No. 04",
    body: "Tested the Imperial palette on Tiny Friends today — the gold cloud accents really pop against the cream paper. Slept on it. Still love it.",
    outline: "fox", tint: "#C7558B",
    bg: "linear-gradient(135deg, #2E0F4A 0%, #5B1C5C 35%, #8E2660 70%, #C7558B 100%)",
    book: "Tiny Friends", bookSwatches: ["#FFE38A","#FFB68A","#FF8A6B","#C7558B","#5588D9"],
    likes: "56", comments: "12", music: "Heritage Whispers · Artisan Soul",
  },
  {
    handle: "Mei Yoshida", user: "meiyoshida", date: "2026-05-08", avatar: "#BFFF00",
    title: "Bold Garden, sage edit",
    body: "Three colors only. Sage, butter, ink. The trick is to leave one petal empty — let the paper breathe.",
    outline: "garden", tint: "#5C9148",
    bg: "linear-gradient(160deg, #0D2A12 0%, #1F5A22 50%, #5C9148 100%)",
    book: "Bold Garden", bookSwatches: ["#DDF4D2","#A8BD8F","#5C9148","#FFC747","#0D1801"],
    likes: "142", comments: "34", music: "Garden Hour · Sara Ko",
  },
  {
    handle: "Toma R.", user: "blue_hours", date: "2026-05-07", avatar: "#5588D9",
    title: "Cozy Sundays, 7am",
    body: "First coffee, first page, first slow Sunday in weeks. The Tokyo Rooftop palette on a mug feels right.",
    outline: "mug", tint: "#5588D9",
    bg: "linear-gradient(165deg, #0A1530 0%, #1E3A7A 40%, #5588D9 100%)",
    book: "Cozy Sundays", bookSwatches: ["#FFE8C2","#9EC9F0","#5588D9","#A87E5B","#0D1801"],
    likes: "201", comments: "58", music: "Slow Light · Otis B.",
  },
];
