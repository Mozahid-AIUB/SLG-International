import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { AnimatedText } from "@/components/primitives/AnimatedText";
import { DataPlate } from "@/components/patterns/DataPlate";
import { PageHero } from "@/components/patterns/PageHero";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import {
  elevatorBrands,
  generatorBrands,
  engineeringSegments,
} from "@/content/brands";

export const metadata: Metadata = {
  title: "SLG Engineering",
  description:
    "Elevators from Sigma, Sino Hyundai and Fuji. Diesel generators from Perkins, Cummins, Ricardo and EVOL. Supplied, installed and maintained across Bangladesh.",
  alternates: { canonical: "/engineering/" },
  openGraph: {
    type: "website",
    siteName: "Sahara Link Group",
    locale: "en_US",
    url: "/engineering/",
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

const lines = [
  {
    href: "/engineering/elevators",
    title: "Elevators",
    lead: "Passenger, hospital, freight, panoramic and home lifts for buildings from villas to high-rise towers.",
    brands: elevatorBrands,
    image: "/media/sigma.webp",
    alt: "Elevator car with brushed metal interior",
    cta: "See the elevator range",
  },
  {
    href: "/engineering/generators",
    title: "Generators",
    lead: "Standby and prime diesel gensets for commercial buildings, factories, hospitals and data centres.",
    brands: generatorBrands,
    image: "/media/cummins.webp",
    alt: "Diesel generator set in an equipment hall",
    cta: "See the generator range",
  },
];

export default function EngineeringPage() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        title="Vertical mobility and dependable power"
        lead="SLG Engineering imports, supplies, installs and maintains elevators and diesel generators across Bangladesh. Seven global brands, one engineering partner, fifteen years of projects."
        aside={
          <DataPlate
            title="SLG Engineering"
            rows={[
              { label: "Product lines", value: "Elevators, diesel generators" },
              { label: "Brands", value: "Seven" },
              { label: "Role", value: "Import, supply, install, maintain" },
              { label: "Coverage", value: "Bangladesh" },
              { label: "Experience", value: "15 years" },
            ]}
          />
        }
      />

      <section>
        <Container className="divide-y divide-rule">
          {lines.map((line) => (
            <div
              key={line.href}
              className="grid gap-8 py-16 md:py-20 lg:grid-cols-2 lg:gap-16"
            >
              <Image
                src={line.image}
                alt={line.alt}
                width={1200}
                height={900}
                className="w-full border border-rule object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div>
                <AnimatedText as="h2" className="type-display text-step-4">
                  {line.title}
                </AnimatedText>
                <AnimatedText
                  as="p"
                  delay={0.15}
                  className="type-body mt-5 text-step-0"
                >
                  {line.lead}
                </AnimatedText>

                <ul className="mt-8 border-t border-rule">
                  {line.brands.map((brand) => (
                    <li
                      key={brand.id}
                      className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-rule py-3"
                    >
                      <Link
                        href={`${line.href}#${brand.id}`}
                        className="type-data text-step-0 text-navy transition-colors hover:text-accent"
                      >
                        {brand.name}
                      </Link>
                      <span className="type-body text-step--1">
                        {brand.headline}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={line.href}
                  className="mt-8 inline-block border border-navy px-5 py-2.5 type-data text-step--1 text-navy transition-colors hover:bg-navy hover:text-paper-raised"
                >
                  {line.cta}
                </Link>
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/*
        Substations. The division's own mark reads "lifts, generators,
        substations, sales", and the first two had pages while the third
        appeared nowhere on the site.

        Set as a single block rather than a product line like the two above,
        because there is no brand list, no capacity range and no equipment
        schedule to publish yet — substation work is a scope of work, not a
        catalogue. What is described here is the shape of that work. Ratings,
        configurations and the utility approvals each installation needs are
        left to the enquiry, where they are answered against a real site.
      */}
      <section className="border-t border-rule py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading>Substations</SectionHeading>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 text-step-0"
            >
              The third line the division runs. A building that has a lift and
              a generator still needs the supply between them to be right, and
              that is where a substation sits.
            </AnimatedText>

            <Link
              href="/enquiry"
              className="mt-7 inline-block border border-navy bg-navy px-6 py-3 type-data text-step--1 text-paper-raised transition-colors hover:bg-ink"
            >
              Discuss a substation
            </Link>
          </div>

          <ul className="grid gap-px self-start border border-rule bg-rule sm:grid-cols-2">
            {[
              {
                title: "Supply and installation",
                body: "Transformers, switchgear and protection, supplied and installed as one scope rather than assembled from separate orders.",
              },
              {
                title: "Load and layout",
                body: "What the building actually draws, and where the equipment can go, worked out before anything is ordered.",
              },
              {
                title: "Testing and handover",
                body: "Commissioned, tested and handed over to the people who will operate it, with the protection settings explained.",
              },
              {
                title: "Maintenance",
                body: "Servicing and call-out from the same office, for substations we supplied and for ones we did not.",
              },
            ].map((item, index) => (
              <Reveal
                as="li"
                key={item.title}
                effect="settle"
                delay={index * 80}
                className="bg-paper-raised p-7"
              >
                <h3 className="type-heading text-step-1">{item.title}</h3>
                <p className="type-body mt-3 text-step--1">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-rule bg-paper-sunk/80 py-16 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading>Where we work</SectionHeading>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 text-step-0"
            >
              The same team handles a six-storey apartment block and a hospital
              tower. What changes is the traffic calculation, the load and the
              service schedule.
            </AnimatedText>
            <Link
              href="/engineering/services"
              className="mt-7 inline-block border border-navy px-5 py-2.5 type-data text-step--1 text-navy transition-colors hover:bg-navy hover:text-paper-raised"
            >
              What we do around the product
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {engineeringSegments.map((segment) => (
              <li
                key={segment}
                className="border-b border-rule py-3 type-data text-step--1 text-ink"
              >
                {segment}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
