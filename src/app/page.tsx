import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { DataPlate } from "@/components/patterns/DataPlate";
import { divisions, site } from "@/content/site";
import { brands } from "@/content/brands";

const flowLabel: Record<string, string> = {
  inbound: "Equipment into Bangladesh",
  outbound: "Workforce to overseas employers",
};

export default function Home() {
  return (
    <main id="main" className="flex-1">
      {/* One orchestrated entrance on load, rather than motion scattered
          through the page. Everything below reveals once, on scroll. */}
      <section className="blueprint border-b border-rule">
        <Container className="grid gap-14 py-20 md:py-28 lg:grid-cols-[1.45fr_1fr] lg:items-end">
          <div>
            <Reveal as="h1" immediate className="type-display text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem]">
              Equipment into Bangladesh.
              <br />
              Workforce out to the world.
            </Reveal>
            <Reveal as="p" immediate delay={140} className="type-body mt-7 text-[1.0625rem]">
              Sahara Link Group supplies elevators, diesel generators and
              complete solar systems from seven global brands, and places
              Bangladeshi workers with employers overseas. Fifteen years, one
              head office in Dhaka.
            </Reveal>
          </div>

          <Reveal immediate delay={280}>
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
          </Reveal>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container>
          <Reveal>
            <h2 className="type-heading text-[1.75rem] sm:text-[2rem]">
              Three divisions
            </h2>
            <p className="type-body mt-4 text-[1.0625rem]">
              Two bring equipment in. One sends workforce out. All three run
              from the same office, under the same fifteen-year track record.
            </p>
          </Reveal>

          <div className="mt-14 space-y-16 md:space-y-20">
            {divisions.map((division, index) => (
              <Reveal
                key={division.id}
                as="article"
                delay={index * 90}
                className="block"
              >
                <div
                  data-division={division.id}
                  className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14"
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    {division.photo ? (
                      <Image
                        src={division.photo}
                        alt={division.photoAlt ?? ""}
                        width={1200}
                        height={900}
                        className="h-64 w-full border border-rule object-cover sm:h-80"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                    ) : (
                      // No photography exists for this division yet. Its mark
                      // on a deep ground reads as a decision rather than a
                      // gap, and swaps out the day photographs arrive.
                      <div className="relative flex h-64 w-full items-center justify-center border border-rule bg-ink sm:h-80">
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 top-0 h-1 bg-accent"
                        />
                        <Image
                          src={division.logo}
                          alt=""
                          width={192}
                          height={192}
                          className="h-28 w-28"
                        />
                      </div>
                    )}
                  </div>

                  <div className="border-l-2 border-accent pl-6 md:pl-8">
                    <h3 className="type-display text-[1.75rem] sm:text-[2rem]">
                      <Link
                        href={division.href}
                        className="text-navy transition-colors hover:text-accent"
                      >
                        {division.name}
                      </Link>
                    </h3>
                    <p className="type-data mt-1.5 text-[0.9375rem] text-ink-faint">
                      {division.strapline}
                    </p>
                    <p className="type-body mt-5 text-[1.0625rem]">
                      {division.summary}
                    </p>

                    <dl className="mt-6 flex gap-3">
                      <dt className="type-data text-[0.875rem] text-ink-faint">
                        Flow
                      </dt>
                      <dd className="type-data text-[0.875rem] text-ink">
                        {flowLabel[division.direction]}
                      </dd>
                    </dl>

                    <Link
                      href={division.href}
                      className="mt-7 inline-block border border-navy px-5 py-2.5 type-data text-[0.9375rem] text-navy transition-colors hover:bg-navy hover:text-paper-raised"
                    >
                      Go to {division.name}
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-rule bg-ink py-20 text-paper-raised md:py-24">
        <Container>
          <Reveal>
            <h2 className="type-heading text-[1.75rem] sm:text-[2rem] text-paper-raised">
              Seven brands, represented in Bangladesh
            </h2>
            <p className="type-body mt-4 max-w-[62ch] text-[1.0625rem] text-paper-sunk/70">
              SLG does not manufacture. It imports, supplies, installs and
              services equipment made by these seven, and answers the phone
              afterwards.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {brands.map((brand, index) => (
              <Reveal
                key={brand.id}
                as="li"
                effect="settle"
                delay={index * 60}
                className="bg-ink p-6"
              >
                <p className="type-display text-[1.375rem] text-paper-raised">
                  {brand.name}
                </p>
                <p className="type-data mt-1.5 text-[0.8125rem] text-paper-sunk/55">
                  {brand.category === "elevator" ? "Elevators" : "Generators"}
                </p>
                <p className="type-body mt-3 text-[0.9375rem] text-paper-sunk/70">
                  {brand.headline}
                </p>
              </Reveal>
            ))}

            {/* Seven brands leave one cell over in a four-column grid. It
                carries the next step rather than sitting empty. */}
            <Reveal
              as="li"
              effect="settle"
              delay={brands.length * 60}
              className="bg-ink"
            >
              <Link
                href="/engineering"
                className="flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-white/[0.04]"
              >
                <p className="type-body text-[0.9375rem] text-paper-sunk/70">
                  Specifications, safety systems and applications for all seven.
                </p>
                <span className="type-data text-[0.9375rem] text-paper-raised underline decoration-white/30 underline-offset-4">
                  See the full range
                </span>
              </Link>
            </Reveal>
          </ul>
        </Container>
      </section>

      <section className="bg-paper-sunk py-16">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <Reveal>
            <h2 className="type-heading text-[1.375rem]">
              Tell us what the project needs
            </h2>
            <p className="type-body mt-2 text-[1rem]">
              Send the load, the building and the timeline. We will come back
              with the specification and a price.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/enquiry"
              className="inline-block border border-navy bg-navy px-6 py-3 type-data text-[0.9375rem] text-paper-raised transition-colors hover:bg-ink"
            >
              Start an enquiry
            </Link>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
