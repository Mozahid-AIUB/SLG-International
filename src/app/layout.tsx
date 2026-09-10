import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";
import "./globals.css";
import { SmoothScroll } from "@/components/primitives/SmoothScroll";
import { StructuredData } from "./_seo/structured-data";
import { PageWatermark } from "@/components/patterns/PageWatermark";

/**
 * One family, three widths. Loading the `wdth` axis lets display (125%),
 * body (100%) and spec-plate data (75%) all come from a single variable
 * font, self-hosted at build time.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — elevators, generators, solar and manpower`,
    template: `%s — ${site.shortName}`,
  },
  description:
    "Sahara Link Group supplies elevators, diesel generators and complete solar systems across Bangladesh, and places Bangladeshi workforce with employers overseas.",
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  /*
    `"./"` rather than `"/"`. Next resolves a canonical beginning with `./`
    against the page's own pathname, so every route that does not declare
    its own canonical is self-canonical instead of inheriting the home
    page's. A literal `"/"` here would point all ten routes at the root and
    de-index nine of them. `trailingSlash: true` in next.config.ts means the
    emitted href gets its slash added automatically.
    See node_modules/next/dist/lib/metadata/resolvers/resolve-url.js.
  */
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "./",
    images: [
      {
        url: "/media/hero-elevator-still.webp",
        width: 1600,
        height: 900,
        alt: "Elevator doors in a building lobby",
      },
    ],
  },
  /*
    Card type only. Deliberately no `images` here: a page that sets its own
    `openGraph` replaces the parent's whole `openGraph` object, and Next then
    back-fills `twitter.images` from that page's `openGraph.images` — but
    only if `twitter` has no `images` key of its own. Listing an image here
    would pin every page's Twitter card to the elevator photo while its
    og:image showed something else.
    See node_modules/next/dist/lib/metadata/resolve-metadata.js, postProcessMetadata.
  */
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Lets Google show a full-size image and an unclipped snippet, which
      // is also what the AI answer engines read when they cite a page.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <PageWatermark />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-navy focus:px-4 focus:py-2 focus:text-paper-raised"
        >
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
        <StructuredData />
      </body>
    </html>
  );
}
