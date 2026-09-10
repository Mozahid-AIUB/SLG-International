import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { AnimatedText } from "@/components/primitives/AnimatedText";
import { BrandBlock } from "@/components/patterns/BrandBlock";
import { PageHero } from "@/components/patterns/PageHero";
import { DataPlate } from "@/components/patterns/DataPlate";
import { generatorBrands } from "@/content/brands";
import { SectionHeading } from "@/components/primitives/SectionHeading";

export const metadata: Metadata = {
  title: "Diesel generators",
  description:
    "Perkins, Cummins, Ricardo and EVOL diesel generators supplied and serviced by SLG Engineering — standby and prime power for commercial and industrial sites.",
  alternates: { canonical: "/engineering/generators/" },
  openGraph: {
    type: "website",
    siteName: "Sahara Link Group",
    locale: "en_US",
    url: "/engineering/generators/",
    images: [
      {
        url: "/media/hero-generator.webp",
        width: 1600,
        height: 696,
        alt: "Diesel generator in a soundproof canopy",
      },
    ],
  },
};

const duties = [
  {
    name: "Standby",
    note: "Sits idle and takes the load when the grid drops. The common case in Bangladesh.",
  },
  {
    name: "Prime",
    note: "Runs as the main supply for long periods where grid power is absent or unreliable.",
  },
  {
    name: "Commercial",
    note: "Offices, malls, hotels and mixed-use buildings, usually with an automatic transfer switch.",
  },
  {
    name: "Industrial",
    note: "Factories and plants where a stopped line costs more than the genset.",
  },
];

const options = [
  {
    name: "Soundproof canopy",
    note: "Low-noise enclosure for rooftops and built-up sites.",
  },
  {
    name: "Open-type set",
    note: "For plant rooms where noise is already contained.",
  },
  {
    name: "Automatic transfer switch",
    note: "Hands the load over without anyone present.",
  },
  {
    name: "Capacity sizing",
    note: "Matched to connected load, starting current and future headroom.",
  },
];

export default function GeneratorsPage() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        title="Diesel generators"
        lead="Four brands covering home backup through industrial prime power. SLG Engineering sizes the set to the load, supplies it, and stays on the phone after commissioning."
        aside={
          <DataPlate
            title="Generator supply"
            rows={[
              { label: "Brands", value: "Perkins, Cummins, Ricardo, EVOL" },
              { label: "Duty", value: "Standby and prime" },
              { label: "Enclosure", value: "Soundproof canopy or open-type" },
              { label: "Scope", value: "Supply, installation, maintenance" },
            ]}
          />
        }
      />

      <section className="border-b border-rule py-16 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading>Duty</SectionHeading>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 text-step-0"
            >
              How often the set runs decides the engine, the cooling and the
              service interval.
            </AnimatedText>
            <dl className="mt-8">
              {duties.map((duty) => (
                <div key={duty.name} className="border-t border-rule py-4">
                  <dt className="type-data text-step-0 text-navy">
                    {duty.name}
                  </dt>
                  <dd className="type-body mt-1.5 text-step--1">
                    {duty.note}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <SectionHeading>Configuration</SectionHeading>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 text-step-0"
            >
              Decided at quotation, not after delivery. Getting these wrong is
              the usual reason a genset disappoints.
            </AnimatedText>
            <dl className="mt-8">
              {options.map((option) => (
                <div key={option.name} className="border-t border-rule py-4">
                  <dt className="type-data text-step-0 text-navy">
                    {option.name}
                  </dt>
                  <dd className="type-body mt-1.5 text-step--1">
                    {option.note}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section>
        <Container className="divide-y divide-rule">
          {generatorBrands.map((brand, index) => (
            <BrandBlock key={brand.id} brand={brand} index={index} />
          ))}
        </Container>
      </section>

      <section className="border-t border-rule bg-paper-sunk py-16">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <AnimatedText as="h2" className="type-heading text-step-2">
              Tell us the load, we will size the set
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-2 text-step-0"
            >
              Connected load, starting current, run hours and site conditions
              are enough to come back with a specification.
            </AnimatedText>
          </div>
          <Link
            href="/enquiry"
            className="border border-navy bg-navy px-6 py-3 type-data text-step--1 text-paper-raised transition-colors hover:bg-ink"
          >
            Start an enquiry
          </Link>
        </Container>
      </section>
    </main>
  );
}
