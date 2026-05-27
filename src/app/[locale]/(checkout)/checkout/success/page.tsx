import { getTranslations } from "next-intl/server";
import { CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";

export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#BFFF00]">
          <CheckCircle size={32} className="text-[#0D1801]" />
        </div>
        <h1 className="mb-2 text-3xl font-black text-[#0D1801]">Thank you!</h1>
        <p className="mb-6 text-muted-foreground">
          Your books are ready in the iRoly app. Download the app to start coloring.
        </p>
        <div className="flex flex-col gap-3">
          <NextLink href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="block">
            <Button className="w-full gap-2 rounded-full bg-[#0D1801]" size="lg">
              <Download size={18} /> {t("getTheApp")} — App Store
            </Button>
          </NextLink>
          <NextLink href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="block">
            <Button className="w-full gap-2 rounded-full bg-[#0D1801]" size="lg">
              <Download size={18} /> {t("getTheApp")} — Google Play
            </Button>
          </NextLink>
          <Link href="/shop">
            <Button variant="outline" className="w-full rounded-full" size="lg">
              {t("actions.backToShop")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
