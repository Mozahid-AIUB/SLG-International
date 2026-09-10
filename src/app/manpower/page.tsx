import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { AnimatedText } from "@/components/primitives/AnimatedText";
import { DataPlate } from "@/components/patterns/DataPlate";
import { PageHero } from "@/components/patterns/PageHero";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Sahara Link International",
  description:
    "Bangladeshi workers placed with employers overseas, from the same Dhaka office that handles the group's equipment business.",
  alternates: { canonical: "/manpower/" },
  openGraph: {
    type: "website",
    siteName: "Sahara Link Group",
    locale: "en_US",
    url: "/manpower/",
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
 * The outbound half of the group.
 *
 * Deliberately short on specifics, and it has to stay that way until the
 * client supplies them. Overseas recruitment is licensed work in Bangladesh:
 * naming destination countries, trades or a licence number that has not been
 * confirmed would put a claim on the public record that a worker might rely
 * on. Everything asserted here is either already published elsewhere on the
 * site or true by definition of the business.
 *
 * Waiting on the client: BMET or other licence details, the destination
 * countries actually served, and the trades placed. Each has a section
 * ready for it below.
 */
const commitments = [
  {
    title: "The employer is checked first",
    body: "A placement is only as good as the company at the other end of it. The employer is verified before a worker is put forward, not after a problem appears.",
  },
  {
    title: "One office, both directions",
    body: "The same Dhaka office that imports the group's equipment handles the placements. Equipment comes in, people go out, and neither is subcontracted to somebody else.",
  },
  {
    title: "The paperwork is ours to get right",
    body: "Documentation is where an overseas placement usually fails. It is handled here rather than left to the worker to assemble alone.",
  },
];

export default function ManpowerPage() {
  return (
    <main id="main" className="flex-1" data-division="manpower">
      <PageHero
        title="Bangladeshi skill, placed with employers abroad"
        lead="Sahara Link International is the outbound half of the group. The skills Bangladesh exports are real skills, and they deserve employers who are checked before a worker ever boards a plane."
        aside={
          <DataPlate
            title="Sahara Link International"
            rows={[
              { label: "Division", value: "Overseas workforce placement" },
              { label: "Direction", value: "Out to the world" },
              { label: "Office", value: "Dhaka, Bangladesh" },
              {
                label: "Enquiries",
                value: (
                  <a
                    href={`mailto:${site.emails.manpower}`}
                    className="transition-colors hover:text-accent"
                  >
                    {site.emails.manpower}
                  </a>
                ),
              },
            ]}
          />
        }
      />

      {/*
        Three commitments rather than a service list, because that is what
        the division can honestly put in writing today. A list of countries
        and trades belongs here once the client confirms them.
      */}
      <section className="border-b border-rule bg-paper-raised">
        <Container className="py-20 md:py-24">
          <div>
            <AnimatedText as="h2" className="type-heading text-step-4">
              How we work
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 text-step-0"
            >
              Placement is a long relationship with two parties, and both of
              them have to be able to rely on it.
            </AnimatedText>
          </div>

          <ul className="mt-12 grid gap-px border border-rule bg-rule lg:grid-cols-3">
            {commitments.map((item, index) => (
              <Reveal
                as="li"
                key={item.title}
                effect="settle"
                delay={index * 90}
                className="bg-paper-raised p-7"
              >
                <span aria-hidden className="block h-[3px] w-10 bg-gold-mark" />
                <h3 className="type-heading mt-4 text-step-1">{item.title}</h3>
                <p className="type-body mt-3 text-step--1">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/*
        Two audiences arrive on this page wanting opposite things, and a
        single enquiry route serves neither well. Split, each one reads as
        addressed to them.
      */}
      <section className="border-b border-rule bg-paper-sunk">
        <Container className="grid gap-px border border-rule bg-rule py-0 md:grid-cols-2">
          <div className="bg-paper-raised p-9 md:p-12">
            <AnimatedText as="h2" className="type-heading text-step-2">
              Hiring from Bangladesh
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 text-step-0"
            >
              Tell us the roles, the numbers and where the work is. We will
              come back on what we can supply and on what the process requires
              at both ends.
            </AnimatedText>
            <Link
              href="/enquiry"
              className="mt-7 inline-block border border-navy bg-navy px-6 py-3 type-data text-step--1 text-paper-raised transition-colors hover:bg-ink"
            >
              Talk to us about hiring
            </Link>
          </div>

          <div className="bg-paper-raised p-9 md:p-12">
            <AnimatedText as="h2" className="type-heading text-step-2">
              Looking for work abroad
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 text-step-0"
            >
              Come to the office, or write to us with your trade and your
              experience. Ask us what a placement involves before you commit
              to anything — including what it costs and who pays it.
            </AnimatedText>
            <a
              href={`mailto:${site.emails.manpower}`}
              className="mt-7 inline-block border border-navy px-6 py-3 type-data text-step--1 text-navy transition-colors hover:bg-navy hover:text-paper-raised"
            >
              {site.emails.manpower}
            </a>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <Reveal>
            <p className="type-body text-step-0">
              The office in Rampura handles all three divisions.{" "}
              <Link
                href="/contact"
                className="text-navy underline decoration-rule-strong underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
              >
                Address and numbers
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
