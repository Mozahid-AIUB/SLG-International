import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { AnimatedText } from "@/components/primitives/AnimatedText";
import { DataPlate } from "@/components/patterns/DataPlate";
import { EnquiryForm } from "@/components/patterns/EnquiryForm";
import { PageHero } from "@/components/patterns/PageHero";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/primitives/SectionHeading";

export const metadata: Metadata = {
  title: "Start an enquiry",
  description:
    "Send project requirements to Sahara Link Group — elevators, generators, solar systems or overseas workforce. One office in Dhaka answers all three.",
  alternates: { canonical: "/enquiry/" },
  openGraph: {
    type: "website",
    siteName: "Sahara Link Group",
    locale: "en_US",
    url: "/enquiry/",
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
 * The enquiry route.
 *
 * There is no server behind this site, so the form composes a structured
 * message and hands it to WhatsApp or to email rather than posting it
 * somewhere. See EnquiryForm for why that is the honest choice here and not
 * a limitation being papered over.
 */
const expectations = [
  {
    title: "You get a person, not a ticket",
    body: "The enquiry reaches the office that would handle the work, not a queue in front of it.",
  },
  {
    title: "A specification, then a price",
    body: "We come back with what the building or the role actually needs first. A number without a specification behind it is a guess.",
  },
  {
    title: "No obligation in either direction",
    body: "Ask what a project involves before committing to it. That includes what it costs and what it does not cover.",
  },
];

export default function EnquiryPage() {
  return (
    <main id="main" className="flex-1">
      <PageHero
        title="Tell us what the project needs"
        lead="Elevators, generators, solar systems or overseas workforce — the same Dhaka office answers all three. Send what you have and we will come back with a specification and a price."
        aside={
          <DataPlate
            title="Or reach us directly"
            rows={[
              {
                label: "Phone",
                value: (
                  <a
                    href={`tel:${site.phones[0].replace(/\s/g, "")}`}
                    className="transition-colors hover:text-accent"
                  >
                    {site.phones[0]}
                  </a>
                ),
              },
              {
                label: "WhatsApp",
                value: (
                  <a
                    href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    {site.whatsapp}
                  </a>
                ),
              },
              { label: "Office", value: `${site.address.city}, ${site.address.country}` },
            ]}
            footnote="One office handles all three divisions."
          />
        }
      />

      <section className="border-b border-rule bg-paper-raised/80">
        <Container className="grid gap-12 py-20 md:py-24 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <div>
            <SectionHeading>Send the details</SectionHeading>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 text-step-0"
            >
              The more specific the requirement, the more useful the answer.
              Rough figures are fine — we will come back with what else is
              needed.
            </AnimatedText>

            <div className="mt-10">
              <EnquiryForm />
            </div>
          </div>

          <div className="lg:pt-4">
            <span aria-hidden className="block h-[3px] w-12 bg-gold-mark" />
            <AnimatedText as="h2" className="type-heading mt-5 text-step-2">
              What happens next
            </AnimatedText>

            <ul className="mt-8 border-t border-rule-strong">
              {expectations.map((item, index) => (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={index * 90}
                  className="border-b border-rule py-6"
                >
                  <h3 className="type-heading text-step-1">{item.title}</h3>
                  <p className="type-body mt-2 text-step--1">{item.body}</p>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={300}>
              <p className="type-body mt-8 text-step--1">
                Prefer to come in?{" "}
                <Link
                  href="/contact"
                  className="text-navy underline decoration-rule-strong underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
                >
                  The office address is here
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
