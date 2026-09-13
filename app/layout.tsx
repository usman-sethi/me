import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { CustomCursor } from "@/components/cursor/custom-cursor";
import { NavBar } from "@/components/navigation/nav-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { Footer } from "@/components/shared/footer";
import { MotionProvider } from "@/components/shared/motion-provider";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SITE_CONFIG } from "@/lib/constants";
import { personSchema, websiteSchema } from "@/lib/seo/schema";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.shortBio,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    description: SITE_CONFIG.shortBio,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.role}`,
    description: SITE_CONFIG.shortBio,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}
    >
      <body className="antialiased">
        <JsonLd data={personSchema()} />
        <JsonLd data={websiteSchema()} />

        <a
          href="#main-content"
          className="sr-only-focusable fixed left-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
        >
          Skip to content
        </a>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MotionProvider>
            <CustomCursor />
            <NavBar />
            <main id="main-content">{children}</main>
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
