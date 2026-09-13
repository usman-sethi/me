import type { Metadata } from "next";

import { SITE_CONFIG } from "@/lib/constants";

interface BuildMetadataOptions {
  title: string;
  description: string;
  /** Path starting with "/", e.g. "/about" or "/projects/my-app". */
  path: string;
  /** Defaults to the site-wide OG image at /opengraph-image. */
  imagePath?: string;
  keywords?: string[];
  author?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  imagePath,
  keywords,
  author,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;

  return {
    title,
    description,
    keywords,
    authors: author ? [{ name: author }] : [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      type: "website",
      locale: "en_US",
      ...(imagePath ? { images: [{ url: imagePath, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@usmansethi",
      ...(imagePath ? { images: [imagePath] } : {}),
    },
  };
}
