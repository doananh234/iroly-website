import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed | iRoly",
};

export default function FullscreenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
