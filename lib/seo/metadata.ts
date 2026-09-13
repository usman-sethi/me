import type { Metadata } from "next";

import { SITE_CONFIG } from "@/lib/constants";

interface BuildMetadataOptions {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/about" or "/projects/my-app". */
  path: string;
  /** Defaults to the site-wide OG image at /opengraph-image. */
  imagePath?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  imagePath,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      type: "website",
      ...(imagePath ? { images: [{ url: imagePath }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imagePath ? { images: [imagePath] } : {}),
    },
  };
}
