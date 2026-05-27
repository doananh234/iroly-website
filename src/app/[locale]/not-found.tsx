import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 text-[80px] font-black text-[#BFFF00]" style={{ fontFamily: "var(--font-display)" }}>404</div>
      <h1 className="mb-2 text-2xl font-black" style={{ color: "var(--iroly-fg)" }}>Page not found</h1>
      <p className="mb-8 text-sm" style={{ color: "var(--iroly-fg-muted)" }}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <div className="flex gap-3">
        <Link href="/" className="rounded-full bg-[#0D1801] px-6 py-3 text-sm font-bold text-white no-underline">Go Home</Link>
        <Link href="/shop" className="rounded-full border border-black/10 px-6 py-3 text-sm font-bold no-underline" style={{ color: "var(--iroly-fg)" }}>Browse Shop</Link>
      </div>
    </div>
  );
}
