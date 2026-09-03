import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { BrandBlock } from "@/components/patterns/BrandBlock";
import { PageHero } from "@/components/patterns/PageHero";
import { DataPlate } from "@/components/patterns/DataPlate";
import { elevatorBrands } from "@/content/brands";

export const metadata: Metadata = {
  title: "Elevators",
  description:
    "Sigma, Sino Hyundai and Fuji elevators supplied and installed by SLG Engineering — passenger, hospital, freight, panoramic and home lifts.",
};

const types = [
  {
    name: "Passenger",
    note: "Apartments, offices, hotels and commercial buildings.",
  },
  {
    name: "Hospital",
    note: "Spacious cars sized for beds, trolleys and attending staff.",
  },
  {
    name: "Freight",
    note: "Heavy-duty cars for goods, equipment and service traffic.",
  },
  {
    name: "Panoramic",
    note: "Glass cars where the ride is part of the architecture.",
  },
  {
    name: "High-rise",
    note: "Traffic handling and control for tall buildings.",
  },
  {
    name: "Home and villa",
    note: "Compact, space-saving lifts for houses and low-rise buildings.",
  },
];

export default function ElevatorsPage() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        title="Elevators"
        lead="Three brands, six configurations, one supplier. SLG Engineering matches the car, the capacity and the control system to the building, then installs and maintains it."
        aside={
          <DataPlate
            title="Elevator supply"
            rows={[
              { label: "Brands", value: "Sigma, Sino Hyundai, Fuji" },
              { label: "Configurations", value: "Six" },
              { label: "Scope", value: "Supply, installation, maintenance" },
              { label: "Coverage", value: "Bangladesh" },
            ]}
          />
        }
      />

      <section className="border-b border-rule py-16 md:py-20">
        <Container>
          <h2 className="type-heading text-[1.75rem]">Configurations</h2>
          <p className="type-body mt-4 text-[1.0625rem]">
            Which one fits depends on the building, the traffic it carries and
            the shaft available. Send the drawings and we will tell you.
          </p>
          <dl className="mt-10 grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {types.map((type) => (
              <div key={type.name} className="border-t border-rule pt-4">
                <dt className="type-data text-[1rem] text-navy">{type.name}</dt>
                <dd className="type-body mt-1.5 text-[0.9375rem]">
                  {type.note}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section>
        <Container className="divide-y divide-rule">
          {elevatorBrands.map((brand, index) => (
            <BrandBlock key={brand.id} brand={brand} index={index} />
          ))}
        </Container>
      </section>

      <section className="border-t border-rule bg-paper-sunk py-16">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="type-heading text-[1.375rem]">
              Not sure which brand suits the building?
            </h2>
            <p className="type-body mt-2 text-[1rem]">
              Send the floor count, the shaft dimensions and the expected
              traffic. We will come back with options and a price.
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
