import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SkewUnderline } from "@/components/skew-underline";
import { AccountAvatar } from "@/components/account/account-avatar";
import { AccountStats } from "@/components/account/account-stats";
import { AccountBooksGrid } from "@/components/account/account-books-grid";
import { AccountRecentActivity } from "@/components/account/account-recent-activity";
import { Button } from "@/components/ui/button";
import { Pencil, Settings } from "lucide-react";

export default async function AccountPage() {
  const t = await getTranslations("account");

  // Placeholder user data — real data comes from auth session in future
  const user = {
    name: "Colorist User",
    email: "user@example.com",
    booksOwned: 8,
    pagesColored: 142,
    credits: 60,
    memberSince: "May 2024",
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-5 rounded-2xl border border-black/[0.07] bg-white p-6 dark:border-white/[0.08] dark:bg-white/[0.04] sm:flex-row sm:items-center sm:gap-6">
        <AccountAvatar name={user.name} size={96} />
        <div className="flex flex-1 flex-col gap-1">
          <h1 className="font-display text-2xl font-black leading-tight tracking-tight text-[#0D1801] dark:text-white">
            <SkewUnderline color="#BFFF00" height="40%">
              {user.name}
            </SkewUnderline>
          </h1>
          <p className="text-sm text-[var(--iroly-fg-muted)]">{user.email}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              asChild
              size="sm"
              className="h-8 rounded-full bg-[#0D1801] px-4 text-xs font-bold text-white hover:bg-[#0D1801]/90 dark:bg-white dark:text-[#0D1801]"
            >
              <Link href="/account/edit">
                <Pencil size={13} className="mr-1.5" />
                {t("editProfile")}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-8 rounded-full border-black/[0.1] px-4 text-xs font-bold hover:bg-black/[0.04]"
            >
              <Link href="/account/settings">
                <Settings size={13} className="mr-1.5" />
                {t("settings")}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <AccountStats
        booksOwned={user.booksOwned}
        pagesColored={user.pagesColored}
        credits={user.credits}
        memberSince={user.memberSince}
      />

      {/* My Books */}
      <AccountBooksGrid />

      {/* Recent Activity */}
      <AccountRecentActivity />
    </div>
  );
}
