import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

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
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

/** Tells search engines the group is one organisation with one address. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  slogan: site.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    postalCode: site.address.postalCode,
    addressCountry: "BD",
  },
  telephone: site.phones[0],
  email: site.emails.engineering,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-navy focus:px-4 focus:py-2 focus:text-paper-raised"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </body>
    </html>
  );
}
