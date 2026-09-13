import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/api", "/_next"],
        crawlDelay: 1,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin", "/api", "/_next"],
        crawlDelay: 1,
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/_next", "/api/admin"],
        crawlDelay: 2,
      },
    ],
    sitemap: [
      `${SITE_CONFIG.url}/sitemap.xml`,
    ],
    host: SITE_CONFIG.url,
  };
}
