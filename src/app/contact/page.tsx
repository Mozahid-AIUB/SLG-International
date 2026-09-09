import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { DataPlate } from "@/components/patterns/DataPlate";
import { PageHero } from "@/components/patterns/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Sahara Link Group in Rampura, Dhaka.",
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
            <h2 className="type-heading text-step-4">How to reach us</h2>
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
                  {/* Both numbers ring the same office, so the second is a
                      fallback rather than a different department. Labelling
                      both "Phone" left the reader to guess which to try. */}
                  <dt className="type-data text-step--1 text-ink-faint">
                    {index === 0 ? "Phone" : "Alternate"}
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
    </main>
  );
}
