import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { DataPlate } from "@/components/patterns/DataPlate";
import { divisions, site } from "@/content/site";

const flowLabel: Record<string, string> = {
  inbound: "Equipment into Bangladesh",
  outbound: "Workforce to overseas employers",
};

export default function Home() {
  return (
      <main id="main" className="flex-1">
        {/* Hero. No photography exists yet, so the page opens on the
            proposition itself, set in expanded Archivo over drafting grid. */}
        <section className="blueprint border-b border-rule">
          <Container className="grid gap-14 py-20 md:py-28 lg:grid-cols-[1.45fr_1fr] lg:items-end">
            <div>
              <h1 className="type-display text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem]">
                Equipment into Bangladesh.
                <br />
                Workforce out to the world.
              </h1>
              <p className="type-body mt-7 text-[1.0625rem]">
                Sahara Link Group supplies elevators, diesel generators and
                complete solar systems from seven global brands, and places
                Bangladeshi workers with employers overseas. Fifteen years, one
                head office in Dhaka.
              </p>
            </div>

            {/* The group's own nameplate, in the same form as the plates
                that appear on every machine it sells. */}
            <DataPlate
              title="Sahara Link Group"
              rows={[
                { label: "In operation", value: `${site.yearsActive} years` },
                { label: "Divisions", value: "Three" },
                { label: "Brands represented", value: "Seven" },
                { label: "Head office", value: "Dhaka, Bangladesh" },
                { label: "Role", value: "Importer and distributor" },
              ]}
            />
          </Container>
        </section>

        <section className="py-20 md:py-24">
          <Container>
            <h2 className="type-heading text-[1.75rem] sm:text-[2rem]">
              Three divisions
            </h2>
            <p className="type-body mt-4 text-[1.0625rem]">
              Two bring equipment in. One sends workforce out. All three run
              from the same office, under the same fifteen-year track record.
            </p>

            <div className="mt-14 divide-y divide-rule border-y border-rule">
              {divisions.map((division) => (
                <article
                  key={division.id}
                  data-division={division.id}
                  className="grid gap-8 py-10 sm:grid-cols-[auto_1fr] md:gap-12"
                >
                  <Image
                    src={division.logo}
                    alt=""
                    width={192}
                    height={192}
                    className="h-20 w-20 sm:h-24 sm:w-24"
                  />

                  <div className="border-l-2 border-accent pl-6 md:pl-8">
                    <h3 className="type-heading text-[1.375rem]">
                      <Link
                        href={division.href}
                        className="text-navy transition-colors hover:text-accent"
                      >
                        {division.name}
                      </Link>
                    </h3>
                    <p className="type-data mt-1 text-[0.9375rem] text-ink-faint">
                      {division.strapline}
                    </p>
                    <p className="type-body mt-4 text-[1rem]">
                      {division.summary}
                    </p>

                    <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-2">
                      <div className="flex gap-3">
                        <dt className="type-data text-[0.875rem] text-ink-faint">
                          Flow
                        </dt>
                        <dd className="type-data text-[0.875rem] text-ink">
                          {flowLabel[division.direction]}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-t border-rule bg-paper-sunk py-16">
          <Container className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="type-heading text-[1.375rem]">
                Tell us what the project needs
              </h2>
              <p className="type-body mt-2 text-[1rem]">
                Send the load, the building and the timeline. We will come back
                with the specification and a price.
              </p>
            </div>
            <Link
              href="/enquiry"
              className="border border-navy bg-navy px-6 py-3 type-data text-[0.9375rem] text-paper-raised transition-colors hover:bg-ink"
            >
              Start an enquiry
            </Link>
          </Container>
        </section>
      </main>

  );
}
