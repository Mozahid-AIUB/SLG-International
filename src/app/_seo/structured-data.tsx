import { divisions, site } from "@/content/site";

/**
 * Structured data for the group, emitted once from the root layout.
 *
 * Every value here is read from `src/content/site.ts`, which is itself
 * sourced from the client's company profiles. Nothing is asserted that the
 * site does not already say in prose: no rating, no review count, no
 * founding date, no opening hours, no coordinates. A schema that claims
 * something unverifiable is worse than no schema — Google penalises it and
 * an answer engine repeats the lie.
 *
 * The nodes are emitted as one `@graph` so the LocalBusiness can point at
 * the Organization by `@id` rather than repeating it.
 */

const ORGANIZATION_ID = `${site.url}/#organization`;
const BUSINESS_ID = `${site.url}/#localbusiness`;
const WEBSITE_ID = `${site.url}/#website`;

/** ISO 3166-1 alpha-2 for Bangladesh, which is what schema.org expects. */
const COUNTRY_CODE = "BD";

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: `${site.address.line1}, ${site.address.line2}`,
  addressLocality: site.address.city,
  postalCode: site.address.postalCode,
  addressCountry: COUNTRY_CODE,
} as const;

/** The same search string the contact page hands the map embed. */
const mapQuery = encodeURIComponent(
  `${site.address.line2}, ${site.address.city} ${site.address.postalCode}, ${site.address.country}`,
);

const description =
  "Sahara Link Group supplies elevators, diesel generators and complete solar systems across Bangladesh, and places Bangladeshi workforce with employers overseas.";

const organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/brand/group-512.webp`,
    width: 512,
    height: 512,
  },
  image: `${site.url}/brand/group-512.webp`,
  slogan: site.tagline,
  description,
  address: postalAddress,
  telephone: site.phones[0],
  email: site.emails.engineering,
  areaServed: { "@type": "Country", name: "Bangladesh" },
  knowsAbout: [
    "Elevator supply and installation",
    "Diesel generator supply and servicing",
    "Solar power systems",
    "Overseas recruitment",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      name: "SLG Engineering",
      contactType: "sales",
      telephone: site.phones[0],
      email: site.emails.engineering,
    },
    {
      "@type": "ContactPoint",
      name: "SLG Renewables",
      contactType: "sales",
      telephone: site.phones[0],
      email: site.emails.renewables,
    },
    {
      "@type": "ContactPoint",
      name: "Sahara Link International",
      contactType: "sales",
      telephone: site.phones[1],
      email: site.emails.manpower,
    },
  ],
  department: divisions.map((division) => ({
    "@type": "Organization",
    name: division.name,
    // The site serves trailing-slash URLs (`trailingSlash: true`), so the
    // graph should name the URL that actually resolves, not a redirect.
    url: `${site.url}${division.href}/`,
    description: division.summary,
    slogan: division.strapline,
    parentOrganization: { "@id": ORGANIZATION_ID },
  })),
};

const localBusiness = {
  "@type": "LocalBusiness",
  "@id": BUSINESS_ID,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  description,
  image: `${site.url}/brand/group-512.webp`,
  logo: `${site.url}/brand/group-512.webp`,
  address: postalAddress,
  telephone: site.phones[0],
  email: site.emails.engineering,
  areaServed: { "@type": "Country", name: "Bangladesh" },
  hasMap: `https://www.google.com/maps?q=${mapQuery}`,
  parentOrganization: { "@id": ORGANIZATION_ID },
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: site.url,
  name: site.name,
  description,
  inLanguage: "en",
  publisher: { "@id": ORGANIZATION_ID },
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [organization, localBusiness, website],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // `<` is escaped so a stray angle bracket in the content file can
      // never close the script tag early. Recommended by the Next JSON-LD
      // guide (node_modules/next/dist/docs/01-app/02-guides/json-ld.md).
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\u003c"),
      }}
    />
  );
}
