import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { locales } from "@/i18n/config";
import { sfProDisplay, sfProText } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Nav } from "@/components/nav";
import { CartProvider } from "@/lib/cart-provider";
import "@/app/globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://iroly.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      template: "%s | iRoly",
      default: "iRoly — Coloring Books for Calm Minds",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        zh: "/zh",
        ja: "/ja",
        "x-default": "/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  // Read theme cookie server-side to prevent flash of wrong theme
  const cookieStore = await cookies();
  const theme = cookieStore.get("iroly-theme")?.value || "light";

  return (
    <html
      lang={locale}
      data-theme={theme}
      className={cn(sfProDisplay.variable, sfProText.variable)}
    >
      <body className="bg-[var(--iroly-bg)] font-sans text-[var(--iroly-fg)] antialiased">
        <CartProvider>
          <NextIntlClientProvider messages={messages}>
            <Nav />
            {children}
          </NextIntlClientProvider>
        </CartProvider>
      </body>
    </html>
  );
}
