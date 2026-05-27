import type { Metadata } from "next";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Checkout | iRoly",
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
