import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { DataPlate } from "@/components/patterns/DataPlate";
import { OfficeMap } from "@/components/patterns/OfficeMap";
import { PageHero } from "@/components/patterns/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Sahara Link Group in Rampura, Dhaka.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    type: "website",
    siteName: "Sahara Link Group",
    locale: "en_US",
    url: "/contact/",
    images: [
      {
        url: "/media/hero-elevator-still.webp",
        width: 1600,
        height: 900,
        alt: "Elevator doors in a building lobby",
      },
    ],
  },
};

/**
 * The office details used to sit at the foot of the About page, under
 * "Where to find us", with a button pointing here at a placeholder. The
 * details are the contact page; keeping a copy on About meant maintaining
 * the same address in two places and sending anyone who followed the button
 * to less than they had just been shown.
 */
export default function Page() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        title="One office, all three divisions"
        lead="Equipment enquiries and recruitment enquiries reach the same desk in Rampura, Dhaka. Write to the division you need and the address below reaches it directly."
        aside={
          <DataPlate
            title="Head office"
            rows={[
              { label: "Address", value: site.address.line1 },
              { label: "Area", value: site.address.line2 },
              {
                label: "City",
                value: `${site.address.city} ${site.address.postalCode}`,
              },
              { label: "Country", value: site.address.country },
            ]}
          />
        }
      />

      {/*
        Phones and addresses are set as their own plate rather than folded
        into the one above: the block above is where the office is, this is
        how to reach it, and someone arriving with a question wants the
        second without reading the first.
      */}
      <section className="py-24 md:py-36">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading>How to reach us</SectionHeading>
            <p className="type-body mt-4 text-step-0">
              Each division keeps its own address. Anything sent to one of
              them reaches the same office.
            </p>

            <dl className="mt-8 border-t border-rule-strong">
              {site.phones.map((phone, index) => (
                <div
                  key={phone}
                  className="flex items-baseline justify-between gap-6 border-b border-rule py-3"
                >
                  {/* All three ring the same office; the second and third
                      are fallbacks rather than different departments.
                      Labelling them all "Phone" left the reader to guess
                      which to try. */}
                  <dt className="type-data text-step--1 text-ink-faint">
                    {index === 0 ? "Phone" : "Also"}
                  </dt>
                  <dd className="type-data text-step-0 text-navy">
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="transition-colors hover:text-accent"
                    >
                      {phone}
                    </a>
                  </dd>
                </div>
              ))}

              {/* The number the client actually answers fastest, and the
                  only one here that opens a conversation rather than a
                  call. Same wa.me form the footer uses. */}
              <div className="flex items-baseline justify-between gap-6 border-b border-rule py-3">
                <dt className="type-data text-step--1 text-ink-faint">
                  WhatsApp
                </dt>
                <dd className="type-data text-step-0 text-navy">
                  <a
                    href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    {site.whatsapp}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <DataPlate
            title="By division"
            rows={Object.entries(site.emails).map(([division, address]) => ({
              label: division.charAt(0).toUpperCase() + division.slice(1),
              value: (
                <a
                  href={`mailto:${address}`}
                  className="transition-colors hover:text-accent"
                >
                  {address}
                </a>
              ),
            }))}
          />
        </Container>
      </section>

      {/*
        The map closes the page rather than opening it. Someone arriving here
        wants a number or an address first; the map matters once they have
        decided to visit, which is after they have read the rest.
      */}
      <section className="border-t border-rule bg-paper-sunk py-16 md:py-20">
        <Container>
          <SectionHeading>Find the office</SectionHeading>
          <p className="type-body mt-4 text-step-0">
            {site.address.line1}, {site.address.line2}, {site.address.city}{" "}
            {site.address.postalCode}.
          </p>
          <div className="mt-8">
            <OfficeMap
              /*
                Area and city, not the full street line. Searching the flat
                number ("Lift-2, Flat-C2") sends Google looking for a
                building it does not index and it drops the pin somewhere
                unhelpful or nowhere at all; the area name resolves reliably
                and is what a visitor navigates by anyway. The exact address
                is printed above the map for the last hundred metres.
              */
              query={`${site.address.line2}, ${site.address.city} ${site.address.postalCode}, ${site.address.country}`}
              label={`${site.address.line2}, ${site.address.city}`}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}
