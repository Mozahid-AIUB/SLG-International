import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { DataPlate } from "@/components/patterns/DataPlate";
import { PageHero } from "@/components/patterns/PageHero";
import {
  elevatorBrands,
  generatorBrands,
  engineeringSegments,
} from "@/content/brands";

export const metadata: Metadata = {
  title: "SLG Engineering",
  description:
    "Elevators from Sigma, Sino Hyundai and Fuji. Diesel generators from Perkins, Cummins, Ricardo and EVOL. Supplied, installed and maintained across Bangladesh.",
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
                <h2 className="type-display text-[2rem] sm:text-[2.375rem]">
                  {line.title}
                </h2>
                <p className="type-body mt-5 text-[1.0625rem]">{line.lead}</p>

                <ul className="mt-8 border-t border-rule">
                  {line.brands.map((brand) => (
                    <li
                      key={brand.id}
                      className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-rule py-3"
                    >
                      <Link
                        href={`${line.href}#${brand.id}`}
                        className="type-data text-[1rem] text-navy transition-colors hover:text-accent"
                      >
                        {brand.name}
                      </Link>
                      <span className="type-body text-[0.9375rem]">
                        {brand.headline}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={line.href}
                  className="mt-8 inline-block border border-navy px-5 py-2.5 type-data text-[0.9375rem] text-navy transition-colors hover:bg-navy hover:text-paper-raised"
                >
                  {line.cta}
                </Link>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="border-t border-rule bg-paper-sunk py-16 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="type-heading text-[1.75rem]">Where we work</h2>
            <p className="type-body mt-4 text-[1.0625rem]">
              The same team handles a six-storey apartment block and a hospital
              tower. What changes is the traffic calculation, the load and the
              service schedule.
            </p>
            <Link
              href="/engineering/services"
              className="mt-7 inline-block border border-navy px-5 py-2.5 type-data text-[0.9375rem] text-navy transition-colors hover:bg-navy hover:text-paper-raised"
            >
              What we do around the product
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
            {engineeringSegments.map((segment) => (
              <li
                key={segment}
                className="border-b border-rule py-3 type-data text-[0.9375rem] text-ink"
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
