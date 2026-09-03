import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { DataPlate } from "@/components/patterns/DataPlate";
import { FlowSchematic } from "@/components/patterns/FlowSchematic";
import { HeroVideo } from "@/components/patterns/HeroVideo";
import { divisions, site } from "@/content/site";
import { brands } from "@/content/brands";
import { services } from "@/content/services";

const flowLabel: Record<string, string> = {
  inbound: "Equipment into Bangladesh",
  outbound: "Workforce to overseas employers",
};

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <section className="border-b border-rule">
        {/* Still only. The supplied clip rendered a flat green block during
            hardware-accelerated playback, so it was pulled; pass `src` again
            when a replacement arrives. */}
        <HeroVideo
          poster="/media/hero-still.webp"
          caption="Rooftop solar array on a house at sunset"
          className="relative min-h-[560px] w-full overflow-hidden bg-ink md:min-h-[620px] lg:min-h-[680px]"
        >
          <Container className="py-16 md:py-20">
            <Reveal immediate className="flex items-center gap-4">
              <Image
                src="/brand/group-192.webp"
                alt=""
                width={192}
                height={192}
                className="h-14 w-14"
              />
              <span className="type-heading text-[1.0625rem] leading-tight text-paper-raised">
                {site.name}
              </span>
            </Reveal>

            <Reveal
              as="h1"
              immediate
              delay={140}
              className="mt-8 max-w-[18ch] type-display text-[2.25rem] text-paper-raised sm:text-[3rem] lg:text-[3.75rem]"
            >
              Equipment into Bangladesh. Workforce out to the world.
            </Reveal>

            <Reveal
              as="p"
              immediate
              delay={280}
              className="type-body mt-6 max-w-[54ch] text-[1.0625rem] text-paper-sunk/80"
            >
              Elevators, diesel generators and complete solar systems from seven
              global brands — supplied, installed and serviced. And Bangladeshi
              workers placed with employers overseas.
            </Reveal>

            <Reveal immediate delay={400} className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/engineering"
                className="border border-paper-raised bg-paper-raised px-6 py-3 type-data text-[0.9375rem] text-navy transition-colors hover:bg-white"
              >
                See what we supply
              </Link>
              <Link
                href="/enquiry"
                className="border border-white/35 px-6 py-3 type-data text-[0.9375rem] text-paper-raised transition-colors hover:border-white/70"
              >
                Start an enquiry
              </Link>
            </Reveal>
          </Container>
        </HeroVideo>
      </section>

      <section className="blueprint border-b border-rule">
        <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-[1.45fr_1fr] lg:items-start">
          <Reveal>
            <h2 className="type-heading text-[1.75rem] sm:text-[2rem]">
              One group, both directions
            </h2>
            <p className="type-body mt-4 text-[1.0625rem]">
              Sahara Link Group has spent fifteen years bringing equipment into
              Bangladesh and sending skilled workers out of it. Two divisions
              import, one places workforce, and all three run from one office in
              Dhaka.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <DataPlate
              title={site.name}
              rows={[
                { label: "In operation", value: `${site.yearsActive} years` },
                { label: "Divisions", value: "Three" },
                { label: "Brands represented", value: "Seven" },
                { label: "Head office", value: "Dhaka, Bangladesh" },
                { label: "Role", value: "Importer and distributor" },
              ]}
            />
          </Reveal>

          <Reveal delay={80} className="lg:col-span-2">
            <FlowSchematic />
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
              Two bring equipment in. One sends workforce out.
            </p>
          </Reveal>

          <div className="mt-12 border-t border-rule">
            {divisions.map((division, index) => (
              <Reveal
                key={division.id}
                as="article"
                delay={index * 90}
                className="block border-b border-rule"
              >
                <div
                  data-division={division.id}
                  className="grid items-start gap-6 border-l-2 border-accent py-10 pl-6 md:grid-cols-[auto_1fr_auto] md:gap-10 md:pl-8"
                >
                  <Image
                    src={division.logo}
                    alt=""
                    width={192}
                    height={192}
                    className="h-16 w-16 md:h-20 md:w-20"
                  />

                  <div>
                    <h3 className="type-display text-[1.625rem] sm:text-[1.875rem]">
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
                    <p className="type-body mt-4 text-[1.0625rem]">
                      {division.summary}
                    </p>
                    <dl className="mt-5 flex gap-3">
                      <dt className="type-data text-[0.875rem] text-ink-faint">
                        Flow
                      </dt>
                      <dd className="type-data text-[0.875rem] text-ink">
                        {flowLabel[division.direction]}
                      </dd>
                    </dl>
                  </div>

                  <Link
                    href={division.href}
                    className="self-center whitespace-nowrap border border-navy px-5 py-2.5 type-data text-[0.9375rem] text-navy transition-colors hover:bg-navy hover:text-paper-raised"
                  >
                    Go to {division.name}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-rule bg-paper-sunk py-20 md:py-24">
        <Container>
          <Reveal>
            <h2 className="type-heading text-[1.75rem] sm:text-[2rem]">
              What we do
            </h2>
            <p className="type-body mt-4 text-[1.0625rem]">
              Everything the group offers, across three divisions. Each one ends
              with somebody in Dhaka answering the phone.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal
                key={service.title}
                as="li"
                delay={index * 70}
                className="block"
              >
                <Link
                  href={service.href}
                  data-division={
                    service.division === "group" ? undefined : service.division
                  }
                  className="group flex h-full flex-col border-t-2 border-accent py-6"
                >
                  <h3 className="type-heading text-[1.1875rem] text-navy transition-colors group-hover:text-accent">
                    {service.title}
                  </h3>
                  <p className="type-body mt-3 text-[0.9375rem]">
                    {service.description}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-ink py-20 text-paper-raised md:py-24">
        <Container>
          <Reveal>
            <h2 className="type-heading text-[1.75rem] text-paper-raised sm:text-[2rem]">
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

      <section className="border-t border-rule bg-paper-sunk py-16">
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
