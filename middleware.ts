import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./src/i18n/config";
import { type NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect checkout and account routes — check for session cookie existence only
  const isProtectedRoute =
    /^\/\w{2}\/checkout/.test(pathname) ||
    /^\/\w{2}\/account/.test(pathname);
  if (isProtectedRoute) {
    const sessionCookie = request.cookies.get("better-auth.session_token");
    if (!sessionCookie) {
      const locale = pathname.split("/")[1] || "en";
      return Response.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/((?!api|_next|_vercel|assets|fonts|og|favicon.ico).*)"],
};
