import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AccountSidebar } from "@/components/account/account-sidebar";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("account");
  return {
    title: `${t("title")} | iRoly`,
    robots: { index: false, follow: false },
  };
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--iroly-bg)]">
      <div className="mx-auto max-w-[1120px] px-4 py-8 sm:px-6 md:px-8 md:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Sidebar — desktop only */}
          <aside className="hidden shrink-0 lg:block lg:w-[220px]">
            <AccountSidebar />
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
