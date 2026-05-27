import Image from "next/image";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Account | iRoly",
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — branding (hidden on mobile) */}
      <div className="relative hidden w-[480px] shrink-0 bg-gradient-to-b from-[#BFFF00] via-[#E8FF99] via-50% to-[#FFFDF8] lg:flex lg:flex-col lg:items-center lg:justify-center xl:w-[540px]">
        <Link href="/" className="absolute left-8 top-8">
          <Image
            src="/assets/logos/iRoly-with-mascot.png"
            alt="iRoly"
            width={120}
            height={30}
            className="h-[30px] w-auto"
          />
        </Link>

        {/* Tilted book covers */}
        <div className="relative h-[320px] w-[320px]">
          <div className="absolute left-0 top-4 overflow-hidden rounded-[18px] shadow-[0_8px_24px_rgba(0,0,0,0.08)]" style={{ transform: "rotate(-8deg)" }}>
            <Image src="https://media.southernlotus.com/images/sl.tiny.friends.jpg?w=600" alt="" width={180} height={180} className="object-cover" />
            <div className="pointer-events-none absolute inset-[5px] rounded-[14px] border-[1.5px] border-dashed border-white/90" />
          </div>
          <div className="absolute right-0 top-0 overflow-hidden rounded-[18px] shadow-[0_8px_24px_rgba(0,0,0,0.08)]" style={{ transform: "rotate(6deg)" }}>
            <Image src="https://media.southernlotus.com/images/sl.cutie.patterns.jpg?w=600" alt="" width={160} height={160} className="object-cover" />
            <div className="pointer-events-none absolute inset-[5px] rounded-[14px] border-[1.5px] border-dashed border-white/90" />
          </div>
          <div className="absolute bottom-0 left-[70px] overflow-hidden rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.08)]" style={{ transform: "rotate(-3deg)" }}>
            <Image src="https://media.southernlotus.com/images/sl.merry.friends.jpg?w=600" alt="" width={140} height={140} className="object-cover" />
            <div className="pointer-events-none absolute inset-[5px] rounded-[12px] border-[1.5px] border-dashed border-white/90" />
          </div>
        </div>

        <p className="mt-8 max-w-[280px] text-center text-sm font-semibold leading-relaxed text-[#0D1801]/70">
          Cute, calm, low-pressure coloring books for everyone.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col">
        {/* Mobile logo */}
        <div className="flex items-center justify-center py-6 lg:hidden">
          <Link href="/">
            <Image
              src="/assets/logos/iRoly-with-mascot.png"
              alt="iRoly"
              width={120}
              height={30}
              className="h-[30px] w-auto"
            />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 pb-12 sm:px-8">
          <div className="w-full max-w-[420px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
