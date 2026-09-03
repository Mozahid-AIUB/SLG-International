/**
 * Group-level facts. Every value here is confirmed from the client's two
 * company profiles or the workshop signage — nothing is invented.
 *
 * See docs/slg-project-brief.md §1 for provenance.
 */

export const site = {
  name: "Sahara Link Group",
  shortName: "SLG",
  tagline:
    "Together we grow. Together we empower. Together we build a better tomorrow.",
  /** The narrative that binds three otherwise unrelated divisions. */
  positioning:
    "Connecting Bangladesh with the world in both directions — equipment in, workforce out.",
  yearsActive: 15,

  /**
   * Confirmed 2026-09-03 by decoding the "Scan to connect" QR on the back
   * cover of the Renewables profile, which resolves to www.saharalinkgroup.com.
   * The division sites (slgrenewables.com) sit beneath it.
   */
  url: "https://saharalinkgroup.com",

  address: {
    line1: "Tanjima Villa, 31/1, Lift-2, Flat-C2 (2nd Floor)",
    line2: "East Hazipara, Rampura",
    city: "Dhaka",
    postalCode: "1219",
    country: "Bangladesh",
  },

  phones: ["+880 9697 711 115", "+880 1673 757417"],
  whatsapp: "+8801991115505",

  emails: {
    engineering: "saharalinkengineering@gmail.com",
    renewables: "slgrenewables@gmail.com",
  },
} as const;

export type DivisionId = "renewables" | "engineering" | "manpower";

export type Division = {
  id: DivisionId;
  name: string;
  /** The line beneath the name in the division's own logo. */
  strapline: string;
  href: string;
  /** What it sells, in the buyer's words. */
  summary: string;
  /** Which way goods or people move. The group's organising idea. */
  direction: "inbound" | "outbound";
  logo: string;
  /** Product photography, where any exists. Manpower has none yet. */
  photo?: string;
  photoAlt?: string;
};

/**
 * Division names and straplines are taken from the official logos supplied
 * 2026-09-03, which supersede the varying forms used across the two company
 * profiles.
 */
export const divisions: Division[] = [
  {
    id: "engineering",
    name: "SLG Engineering",
    strapline: "Lifts, generators, maintenance",
    href: "/engineering",
    summary:
      "Elevators and diesel generators from seven global brands, supplied, installed and serviced across Bangladesh.",
    direction: "inbound",
    logo: "/brand/engineering-192.webp",
    photo: "/media/sigma.webp",
    photoAlt: "Elevator car with a brushed metal interior",
  },
  {
    id: "renewables",
    name: "SLG Renewables",
    strapline: "Clean energy, sustainable future",
    href: "/renewables",
    summary:
      "Complete solar systems — panels, inverters, storage and protection — sized and installed for homes, businesses and industry.",
    direction: "inbound",
    logo: "/brand/renewables-192.webp",
    photo: "/media/solar-roof.webp",
    photoAlt: "Rooftop solar array on an industrial building",
  },
  {
    id: "manpower",
    name: "Sahara Link International",
    strapline: "Connecting talent, building futures",
    href: "/manpower",
    summary:
      "Bangladeshi workforce placed with employers overseas.",
    direction: "outbound",
    logo: "/brand/international-192.webp",
  },
];

export type SocialId = "facebook" | "instagram" | "linkedin" | "youtube" | "whatsapp";

export type SocialLink = {
  id: SocialId;
  label: string;
  href: string;
};

/**
 * Social profiles for the footer icon row.
 *
 * Empty on purpose. Nothing in the company profiles, the logos, or the parked
 * saharalinkgroup.com page names a Facebook, Instagram, LinkedIn or YouTube
 * account, and a search turned up no profile that can be verified as this
 * company rather than a similarly named one. An icon that leads somewhere
 * wrong costs more trust than a missing icon does.
 *
 * WhatsApp is deliberately excluded even though the number is known: it
 * already has its own button in the footer, and listing it twice is noise.
 *
 * To switch the row on, add entries here — the component renders whatever is
 * in this array and nothing at all when it is empty:
 *
 *   { id: "facebook", label: "Facebook", href: "https://facebook.com/…" },
 */
export const socials: SocialLink[] = [];
