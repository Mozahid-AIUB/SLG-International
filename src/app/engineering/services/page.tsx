import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { AnimatedText } from "@/components/primitives/AnimatedText";
import { PageHero } from "@/components/patterns/PageHero";
import { DataPlate } from "@/components/patterns/DataPlate";
import { engineeringServices, engineeringSegments } from "@/content/brands";

export const metadata: Metadata = {
  title: "Engineering services",
  description:
    "Consultation, project planning, supply, technical coordination and maintenance from SLG Engineering.",
  alternates: { canonical: "/engineering/services/" },
  openGraph: {
    type: "website",
    siteName: "Sahara Link Group",
    locale: "en_US",
    url: "/engineering/services/",
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

export default function ServicesPage() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        title="What we do around the product"
        lead="Anyone can quote a price on a lift. The part that decides whether it still runs well in year seven is the planning before it arrives and the servicing after it is installed."
        aside={
          <DataPlate
            title="Service scope"
            rows={[
              { label: "Before", value: "Consultation, project planning" },
              { label: "During", value: "Supply, technical coordination" },
              { label: "After", value: "Maintenance and call-out support" },
              { label: "Experience", value: "15 years" },
            ]}
          />
        }
      />

      <section className="border-b border-rule py-16 md:py-20">
        <Container>
          <ol className="grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {engineeringServices.map((service, index) => (
              <li key={service.title} className="border-t border-rule pt-5">
                <p className="type-data text-[0.8125rem] text-accent">
                  Step {index + 1}
                </p>
                <AnimatedText
                  as="h2"
                  delay={index * 0.05}
                  className="type-heading mt-2 text-step-1"
                >
                  {service.title}
                </AnimatedText>
                <AnimatedText
                  as="p"
                  delay={index * 0.05 + 0.15}
                  className="type-body mt-2 text-step--1"
                >
                  {service.description}
                </AnimatedText>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <AnimatedText as="h2" className="type-heading text-step-4">
              Buildings we serve
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 text-step-0"
            >
              A hospital lift and an office lift are not the same machine, even
              when the brand on the door matches. Car size, door timing and
              service priority all change with the building.
            </AnimatedText>
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

      <section className="border-t border-rule bg-paper-sunk py-16">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <AnimatedText as="h2" className="type-heading text-step-2">
              Already have equipment installed?
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-2 text-[1rem]"
            >
              We service what we supply, and we will look at what someone else
              supplied. Tell us the brand and the age.
            </AnimatedText>
          </div>
          <Link
            href="/contact"
            className="border border-navy bg-navy px-6 py-3 type-data text-[0.9375rem] text-paper-raised transition-colors hover:bg-ink"
          >
            Contact the team
          </Link>
        </Container>
      </section>
    </main>
  );
}
