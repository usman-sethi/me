import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    short_name: SITE_CONFIG.name,
    description: SITE_CONFIG.shortBio,
    start_url: "/",
    display: "standalone",
    background_color: "#0A0B0E",
    theme_color: "#2451F2",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
