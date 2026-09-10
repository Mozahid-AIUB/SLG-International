import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { AnimatedText } from "@/components/primitives/AnimatedText";
import { ScrollScene } from "@/components/primitives/ScrollScene";
import { DataPlate } from "@/components/patterns/DataPlate";
import { PageHero } from "@/components/patterns/PageHero";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/primitives/SectionHeading";

export const metadata: Metadata = {
  title: "SLG Renewables",
  description:
    "On-grid, off-grid and hybrid solar systems for homes, businesses and industry in Bangladesh. Panels, inverters, charge controllers, batteries, mounting and protection, supplied and installed as one system.",
  alternates: { canonical: "/renewables/" },
  openGraph: {
    type: "website",
    siteName: "Sahara Link Group",
    locale: "en_US",
    url: "/renewables/",
    images: [
      {
        url: "/media/solar/array-sky-1800.webp",
        width: 1800,
        height: 1200,
        alt: "Solar array seen from below against a clear sky",
      },
    ],
  },
};

/**
 * Written from the client's own Renewables profile.
 *
 * That document names no manufacturer and cites no standard, so neither does
 * this page. The only figures it contains are the charge controller ranges
 * below. An inverter appears in one of its photographs carrying a Victron
 * model number, but the brand is not claimed anywhere in its text and is not
 * claimed here either.
 *
 * Photography is open-licence stock from Pexels, chosen for shots with no
 * visible company branding — several otherwise good frames were rejected
 * because the crew were wearing another firm's uniform, and a photograph of
 * someone else's staff on this page would be a claim about who did the work.
 */
const systems = [
  {
    name: "On-grid",
    lead: "Tied to the mains, no batteries",
    body: "Generates alongside the grid and offsets what the building draws during daylight. With no storage to buy or replace, it is the shortest payback of the three, and the simplest to keep running.",
    fit: "Buildings with reliable mains that want a lower bill",
    image: "/media/solar/commercial-aerial-1400.webp",
    alt: "Aerial view of a commercial rooftop covered in solar panels",
  },
  {
    name: "Off-grid",
    lead: "Stands alone on battery storage",
    body: "The array charges a battery bank and the building runs from it. Sized around what has to keep running overnight rather than around roof area, because the storage is what sets the limit.",
    fit: "Sites the grid does not reach, or cannot be relied on",
    image: "/media/solar/residential-roof-1400.webp",
    alt: "Solar panels installed across a pitched residential roof",
  },
  {
    name: "Hybrid",
    lead: "Grid-connected, with storage behind it",
    body: "Solar through the day, battery through an outage, grid when neither is enough. It costs more than on-grid and it delivers what on-grid cannot: the lights stay on when the area goes dark.",
    fit: "Buildings that need both a lower bill and continuity",
    image: "/media/solar/underside-1400.webp",
    alt: "Sunlight through the underside of a solar panel array",
  },
];

/**
 * The government incentive package, from the client's own Renewables flyer.
 *
 * Every figure here is theirs and is reproduced exactly. The flyer carries
 * its own provenance line — "based on government incentive announcements
 * reported on 9 September 2026" — and that line is carried onto the page
 * rather than dropped, because a tariff and two deadlines are the kind of
 * thing a reader will act on and they need to know how fresh it is.
 */
const incentive = [
  {
    figure: "Tk 10.50",
    unit: "per unit",
    label: "Grid-feed tariff",
    body: "The fixed purchase tariff for surplus electricity sent to the grid under the new incentive package.",
  },
  {
    figure: "28 Feb 2027",
    unit: "",
    label: "Installation deadline",
    body: "A system has to be installed within this period to qualify for the package at all.",
  },
  {
    figure: "28 Feb 2030",
    unit: "",
    label: "Benefit runs until",
    body: "Three years of the incentive for installations that qualify before the deadline above.",
  },
  {
    figure: "180 days",
    unit: "",
    label: "Duty and tax relief",
    body: "Most duties and taxes on imported solar machinery and spare parts are waived for this window.",
  },
];

const components = [
  {
    title: "Panels",
    body: "The array, sized to the roof, its orientation and what the building actually consumes rather than what fits.",
  },
  {
    title: "Inverters",
    body: "DC from the array into AC the building can use. Which inverter the design needs follows from the system type, not the other way round.",
  },
  {
    title: "Charge controllers",
    body: "Regulates what reaches the battery bank and holds it inside the charge profile its chemistry requires.",
  },
  {
    title: "Batteries",
    body: "Lead-acid, lithium or commercial banks, matched to the inverter and to the backup duration the building actually needs.",
  },
  {
    title: "Mounting",
    body: "Structures for pitched roofs, flat roofs and ground arrays, set out for the dead load and the wind load.",
  },
  {
    title: "Protection",
    body: "DC and AC protection, isolation and earthing, so a fault stops at the equipment rather than travelling into the building.",
  },
];

const sequence = [
  {
    step: "01",
    title: "Site and consumption",
    body: "The bill, the roof and the shading decide the array. A system sized from roof area alone is either short of what the building uses or paying for output it will never take.",
  },
  {
    step: "02",
    title: "System design",
    body: "Array, inverter, controller and storage specified together. Each one constrains the others, so specifying them separately is how a system ends up with a bottleneck nobody planned.",
  },
  {
    step: "03",
    title: "Installation",
    body: "Mounted, wired, protected and earthed by the same office that supplied the equipment. No handover to a subcontractor in the middle.",
  },
  {
    step: "04",
    title: "Commissioning and after",
    body: "Tested against the design it was sold on, then maintained by the people who installed it. Parts come from the same place they originally did.",
  },
];

export default function RenewablesPage() {
  return (
    <main id="main" className="flex-1" data-division="renewables">
      <PageHero
        title="Solar, sized as a system"
        lead="SLG Renewables supplies and installs complete solar power systems across Bangladesh — on-grid, off-grid and hybrid. Panels, inverters, storage, controllers and protection are specified together, because a system is only ever as good as the part that was guessed."
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
        A full-bleed opening photograph on a parallax. The division sells
        something that is visibly installed on a building, so a picture of
        one answers "can you actually do this" faster than a paragraph can.
        Scaled past its frame so the parallax has travel without ever
        exposing an edge.
      */}
      <section className="relative border-b border-rule">
        <ScrollScene scene="parallax" className="overflow-hidden">
          <Image
            src="/media/solar/array-sky-1800.webp"
            alt="Solar array seen from below against a clear sky"
            width={1800}
            height={1200}
            priority
            sizes="100vw"
            className="aspect-[21/9] w-full scale-110 object-cover"
          />
        </ScrollScene>
      </section>

      {/*
        The incentive package, placed directly under the opening photograph
        because it is the strongest reason on the page to act now rather than
        next year — and because two of its four figures are deadlines.

        Set on the dark ground so it reads as a notice rather than another
        product section, and dated in plain sight: a tariff a reader might
        commit money against has to say how current it is.
      */}
      <section className="border-b border-rule bg-ink py-20 text-paper-raised md:py-24">
        <Container>
          <div>
            <span aria-hidden className="block h-[3px] w-12 bg-gold-mark" />
            <AnimatedText
              as="h2"
              className="type-heading mt-5 text-step-4 text-paper-raised"
            >
              Rooftop solar now earns a tariff
            </AnimatedText>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 max-w-[64ch] text-step-0 text-paper-sunk/75"
            >
              Bangladesh has introduced an incentive package for rooftop solar
              with battery storage. Surplus electricity sent to the grid is
              measured and paid for by the distribution company, and the
              benchmark generation cost is set at Tk 8 per unit — if a system
              runs below that, the difference stays with the owner.
            </AnimatedText>
          </div>

          <ul className="mt-12 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {incentive.map((item, index) => (
              <Reveal
                as="li"
                key={item.label}
                effect="settle"
                delay={index * 80}
                className="bg-ink p-7"
              >
                {/* A step down from the headings, and held on one line. At
                    step-4 the dates broke across two lines inside a quarter
                    column and a wrapped date reads as two facts. */}
                <p className="type-display whitespace-nowrap text-step-3 text-paper-raised">
                  {item.figure}
                  {item.unit ? (
                    <span className="type-data ml-2 text-step--1 text-paper-sunk/60">
                      {item.unit}
                    </span>
                  ) : null}
                </p>
                <p className="type-data mt-3 text-step--1 text-gold-mark">
                  {item.label}
                </p>
                <p className="type-body mt-3 text-step--1 text-paper-sunk/70">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={340}>
            <p className="type-data mt-8 text-step--2 text-paper-sunk/55">
              Equipment must meet BSTI and SREDA technical standards. Figures
              from government incentive announcements reported on 9 September
              2026 — confirm current terms with us before committing to a
              system.
            </p>
          </Reveal>
        </Container>
      </section>

      {/*
        Three systems, and choosing between them is the first real decision a
        buyer makes. Set as alternating full-width entries rather than three
        cards: the difference between them is a paragraph of reasoning and a
        photograph, not a row in a comparison table.
      */}
      <section className="border-b border-rule bg-paper-raised">
        <Container className="py-20 md:py-28">
          <div>
            <SectionHeading>Three systems, one decision</SectionHeading>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 text-step-0"
            >
              Which one a building needs comes down to what the grid does
              there, and what has to keep running when it stops.
            </AnimatedText>
          </div>

          <div className="mt-14 space-y-16 md:space-y-24">
            {systems.map((system, index) => (
              <article
                key={system.name}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                {/* Alternating sides. Three identical rows read as a table;
                    alternating, each one reads as its own spread. */}
                <ScrollScene
                  scene="scale"
                  className={`overflow-hidden border border-rule ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={system.image}
                    alt={system.alt}
                    width={1400}
                    height={933}
                    sizes="(min-width: 1024px) 34rem, 100vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </ScrollScene>

                <div>
                  <span
                    aria-hidden
                    className="block h-[3px] w-12 bg-gold-mark"
                  />
                  <AnimatedText
                    as="h3"
                    className="type-display mt-5 text-step-3"
                  >
                    {system.name}
                  </AnimatedText>
                  <p className="type-data mt-2 text-step--1 text-accent">
                    {system.lead}
                  </p>
                  <AnimatedText
                    as="p"
                    delay={0.15}
                    className="type-body mt-6 text-step-0"
                  >
                    {system.body}
                  </AnimatedText>
                  <p className="type-data mt-6 border-t border-rule pt-4 text-step--1 text-ink-faint">
                    Suits: {system.fit}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-rule bg-paper-sunk">
        <Container className="py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <SectionHeading>What goes into one</SectionHeading>
              <AnimatedText
                as="p"
                delay={0.15}
                className="type-body mt-4 text-step-0"
              >
                Supplied together and commissioned together, so there is one
                party responsible when something needs looking at.
              </AnimatedText>

              <ScrollScene
                scene="mask"
                delay={0.2}
                className="mt-8 overflow-hidden border border-rule"
              >
                <Image
                  src="/media/solar/inverter-detail-1200.webp"
                  alt="Close-up of solar inverter internals and terminals"
                  width={1200}
                  height={800}
                  sizes="(min-width: 1024px) 26rem, 100vw"
                  className="aspect-[3/2] w-full object-cover"
                />
              </ScrollScene>
            </div>

            <ul className="grid gap-px self-start border border-rule bg-rule sm:grid-cols-2">
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
          </div>
        </Container>
      </section>

      {/*
        Numbered because this is genuinely a sequence. No durations: the
        client's deck states none, and an invented timeline is the kind of
        thing a customer quotes back at the company.
      */}
      <section className="border-b border-rule">
        <Container className="py-20 md:py-28">
          <div>
            <SectionHeading>How a system gets built</SectionHeading>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 text-step-0"
            >
              Four stages, one office. The people who size it are the people
              who come back to it.
            </AnimatedText>
          </div>

          <ol className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {sequence.map((item, index) => (
              <Reveal
                as="li"
                key={item.step}
                effect="settle"
                delay={index * 90}
                className="bg-paper-raised p-7"
              >
                <span className="type-data text-step--1 text-gold-mark">
                  {item.step}
                </span>
                <h3 className="type-heading mt-4 text-step-1">{item.title}</h3>
                <p className="type-body mt-3 text-step--1">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* An industrial array, wide. Scale rather than parallax here — the
          shot is already aerial, and drifting it as well would fight the
          scroll rather than follow it. */}
      {/* overflow-x-clip on the section, not the ScrollScene: the scale is
          applied to the ScrollScene's own wrapper, so a full-bleed one grows
          to 112% of the viewport and its inner overflow-hidden clips the
          child rather than itself. That was putting a horizontal scrollbar on
          this page at every width. */}
      <section className="overflow-x-clip border-b border-rule">
        <ScrollScene scene="scale" className="overflow-hidden">
          <Image
            src="/media/solar/industrial-aerial-1800.webp"
            alt="Large solar array across an industrial rooftop, seen from above"
            width={1800}
            height={1200}
            sizes="100vw"
            className="aspect-[21/8] w-full object-cover"
          />
        </ScrollScene>
      </section>

      <section className="border-b border-rule bg-paper-raised">
        <Container className="grid items-center gap-10 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <ScrollScene scene="mask" className="overflow-hidden border border-rule">
            <Image
              src="/media/solar/install-crew-1400.webp"
              alt="Installation crew fitting solar panels on a metal roof"
              width={1400}
              height={933}
              sizes="(min-width: 1024px) 32rem, 100vw"
              className="aspect-[3/2] w-full object-cover"
            />
          </ScrollScene>

          <div>
            <SectionHeading>Installed and kept running</SectionHeading>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-5 text-step-0"
            >
              Equipment is only half of it. The array is mounted, wired,
              protected and earthed by the same office that supplied it, and
              maintained by the same people afterwards — which is the part
              that decides whether a system is still producing in year five.
            </AnimatedText>
          </div>
        </Container>
      </section>

      <section className="bg-paper-sunk py-16">
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

          <Reveal delay={120} className="flex flex-wrap gap-3">
            <Link
              href="/enquiry"
              className="inline-block border border-navy bg-navy px-6 py-3 type-data text-step--1 text-paper-raised transition-colors hover:bg-ink"
            >
              Start an enquiry
            </Link>
            <a
              href={`mailto:${site.emails.renewables}`}
              className="inline-block border border-navy px-6 py-3 type-data text-step--1 text-navy transition-colors hover:bg-navy hover:text-paper-raised"
            >
              {site.emails.renewables}
            </a>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
