import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://iroly.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/*/checkout/", "/*/login", "/*/register", "/*/cart", "/*/forgot-password", "/*/reset-password", "/*/feed"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
