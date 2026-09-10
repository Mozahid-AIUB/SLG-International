import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { AnimatedText } from "@/components/primitives/AnimatedText";
import { ScrollScene } from "@/components/primitives/ScrollScene";
import { DataPlate } from "@/components/patterns/DataPlate";
import { PageHero } from "@/components/patterns/PageHero";

export const metadata: Metadata = {
  title: "SLG Renewables",
  description:
    "On-grid, off-grid and hybrid solar systems for homes, businesses and industry in Bangladesh. Panels, inverters, charge controllers, batteries and mounting, supplied and installed as one system.",
};

/**
 * Written from the client's own Renewables profile.
 *
 * That document names no manufacturer and cites no standard, so neither does
 * this page. The only figures it contains are the charge controller ranges
 * below. An inverter appears in one photograph with a Victron model number
 * on it, but the brand is not claimed anywhere in the text and is not
 * claimed here either.
 */
const systems = [
  {
    name: "On-grid",
    lead: "Tied to the mains, no batteries",
    body: "Generates alongside the grid and offsets what the building draws during daylight. With no storage to buy or replace, it is the shortest payback of the three, and the simplest to maintain.",
    fit: "Buildings with reliable mains that want a lower bill",
  },
  {
    name: "Off-grid",
    lead: "Stands alone on battery storage",
    body: "The array charges a battery bank and the building runs from it. Sized around what has to keep running overnight rather than around roof area, because the storage is what sets the limit.",
    fit: "Sites the grid does not reach, or cannot be relied on",
  },
  {
    name: "Hybrid",
    lead: "Grid-connected, with storage behind it",
    body: "Solar through the day, battery through an outage, grid when neither is enough. It costs more than on-grid and delivers what on-grid cannot: the lights stay on when the area goes dark.",
    fit: "Buildings that need both a lower bill and continuity",
  },
];

const components = [
  {
    title: "Panels",
    body: "The array, sized to the roof, its orientation and what the building actually consumes.",
  },
  {
    title: "Inverters",
    body: "DC from the array into AC the building can use. The system type decides which inverter the design needs.",
  },
  {
    title: "Charge controllers",
    body: "Regulates what reaches the battery bank, and keeps it inside the charge profile its chemistry needs.",
  },
  {
    title: "Batteries",
    body: "Lead-acid, lithium or commercial banks, matched to the inverter and to the backup duration required.",
  },
  {
    title: "Mounting",
    body: "Structures for pitched roofs, flat roofs and ground arrays, set out for the load and the wind.",
  },
  {
    title: "Protection",
    body: "DC and AC protection, isolation and earthing, so a fault stops at the equipment rather than the building.",
  },
];

export default function RenewablesPage() {
  return (
    <main id="main" className="flex-1" data-division="renewables">
      <PageHero
        title="Solar, sized as a system"
        lead="SLG Renewables supplies and installs complete solar power systems across Bangladesh — on-grid, off-grid and hybrid. Panels, inverters, storage, controllers and protection are specified together, because a system is only as good as the part that was guessed."
        aside={
          <DataPlate
            title="Charge controllers"
            rows={[
              { label: "System voltage", value: "12V / 24V / 48V" },
              { label: "Current range", value: "10A – 60A" },
              { label: "Sizing", value: "Per array and battery bank" },
            ]}
            footnote="Confirmed against the design before anything is ordered."
          />
        }
      />

      {/*
        The photograph is the argument for the whole division, so it runs
        wide and drifts against the scroll. A picture of an installed array
        does more to answer "can you actually do this" than a paragraph.
      */}
      <section className="border-b border-rule">
        <ScrollScene scene="parallax" className="overflow-hidden">
          <Image
            src="/media/solar-roof.webp"
            alt="Solar array installed across a pitched roof"
            width={1200}
            height={936}
            priority
            sizes="100vw"
            className="aspect-[21/8] w-full scale-110 object-cover"
          />
        </ScrollScene>
      </section>

      {/*
        Three systems, and the choice between them is the first real decision
        a buyer makes. Set as full entries rather than cards: the difference
        is a paragraph of reasoning, not a feature list.
      */}
      <section className="border-b border-rule bg-paper-raised">
        <Container className="py-20 md:py-24">
          <div>
            <AnimatedText as="h2" className="type-heading text-step-4">
              Three systems, one decision
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 text-step-0"
            >
              Which one a building needs comes down to what the grid does
              there, and what has to keep running when it stops.
            </AnimatedText>
          </div>

          <ul className="mt-12 border-t border-rule-strong">
            {systems.map((system, index) => (
              <Reveal
                as="li"
                key={system.name}
                delay={index * 100}
                className="grid gap-6 border-b border-rule py-10 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-12"
              >
                <div>
                  <span
                    aria-hidden
                    className="block h-[3px] w-10 bg-gold-mark"
                  />
                  <h3 className="type-heading mt-4 text-step-2">
                    {system.name}
                  </h3>
                  <p className="type-data mt-1.5 text-step--1 text-accent">
                    {system.lead}
                  </p>
                </div>

                <div>
                  <p className="type-body text-step-0">{system.body}</p>
                  <p className="type-data mt-4 text-step--1 text-ink-faint">
                    Suits: {system.fit}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-rule bg-paper-sunk">
        <Container className="py-20 md:py-24">
          <div>
            <AnimatedText as="h2" className="type-heading text-step-4">
              What goes into one
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 text-step-0"
            >
              Supplied together and commissioned together, so there is one
              party responsible when something needs looking at.
            </AnimatedText>
          </div>

          <ul className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
            {components.map((item, index) => (
              <Reveal
                as="li"
                key={item.title}
                effect="settle"
                delay={index * 70}
                className="bg-paper-raised p-7"
              >
                <h3 className="type-heading text-step-1">{item.title}</h3>
                <p className="type-body mt-3 text-step--1">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <AnimatedText as="h2" className="type-heading text-step-2">
              Tell us what the building uses
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-2 text-step-0"
            >
              Send the monthly consumption, the roof and what has to stay on
              during an outage. We will come back with a system and a price.
            </AnimatedText>
          </div>

          <Reveal delay={120}>
            <Link
              href="/enquiry"
              className="inline-block border border-navy bg-navy px-6 py-3 type-data text-step--1 text-paper-raised transition-colors hover:bg-ink"
            >
              Start an enquiry
            </Link>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
