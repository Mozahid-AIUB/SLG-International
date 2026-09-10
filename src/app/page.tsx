import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { DataPlate } from "@/components/patterns/DataPlate";
import { FlowSchematic } from "@/components/patterns/FlowSchematic";
import { HeroSlides } from "@/components/patterns/HeroSlides";
import { HeroReveal } from "@/components/patterns/HeroReveal";
import { AnimatedText } from "@/components/primitives/AnimatedText";
import { BrandMarquee } from "@/components/patterns/BrandMarquee";
import { ScrollScene } from "@/components/primitives/ScrollScene";
import { divisions, site } from "@/content/site";
import { brands } from "@/content/brands";
import { services } from "@/content/services";
import { SectionHeading } from "@/components/primitives/SectionHeading";

const flowLabel: Record<string, string> = {
  inbound: "Equipment into Bangladesh",
  outbound: "Workforce to overseas employers",
};

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <section className="border-b border-rule">
        <HeroSlides
          slides={[
            {
              // The only one of the three with motion, and deliberately so.
              // Stock footage of a foreign refinery or a snowy power station
              // was the alternative for the other two: handsome, and silent
              // about a company that puts lifts in Dhaka apartment blocks.
              // The photographs of the actual products say more.
              src: "/media/video/solar-poster.webp",
              video: "/media/video/solar-1280.mp4",
              alt: "Aerial view of a rooftop solar array",
              label: "Solar systems",
            },
            {
              // High-rise towers going up, which is where a lift goes in.
              // Footage of a lift car itself is all interiors shot from
              // inside one, and at hero scale that reads as a corridor
              // rather than as the business.
              src: "/media/video/towers-poster.webp",
              video: "/media/video/towers-1280.mp4",
              alt: "High-rise towers under construction with tower cranes",
              label: "Elevators",
            },
            {
              src: "/media/hero-generator.webp",
              alt: "Diesel generator in a soundproof canopy",
              label: "Generators",
            },
          ]}
          className="relative min-h-[600px] w-full overflow-hidden bg-ink md:min-h-[660px] lg:min-h-[720px]"
        >
          <Container className="py-16 pb-28 md:py-20 md:pb-32">
           <HeroReveal>
            <div data-hero-mark className="flex items-center gap-4">
              <Image
                src="/brand/group-192.webp"
                alt=""
                width={192}
                height={192}
                className="h-14 w-14"
              />
              {/* The wordmark, not the name retyped in Archivo. This is the
                  light cut: the brand sets the letters in navy, which
                  disappears against the hero photograph, so the letterforms
                  are lifted to paper and the gold rules and triangles are
                  kept as they are. */}
              <Image
                src="/brand/wordmark-light-540.webp"
                alt="Sahara Link Group"
                width={540}
                height={97}
                className="h-8 w-auto"
                priority
              />
            </div>

            <h1
              data-hero-heading
              className="mt-8 max-w-[18ch] type-display text-step-6 text-paper-raised"
            >
              Equipment into Bangladesh. Workforce out to the world.
            </h1>

            <p
              data-hero-item
              className="type-body mt-6 max-w-[54ch] text-step-0 text-paper-sunk/80"
            >
              Elevators, diesel generators and complete solar systems from seven
              global brands — supplied, installed and serviced. And Bangladeshi
              workers placed with employers overseas.
            </p>

            <div data-hero-item className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/engineering"
                className="border border-paper-raised bg-paper-raised px-6 py-3 type-data text-step--1 text-navy transition-colors hover:bg-white"
              >
                See what we supply
              </Link>
              <Link
                href="/enquiry"
                className="border border-white/35 px-6 py-3 type-data text-step--1 text-paper-raised transition-colors hover:border-white/70"
              >
                Start an enquiry
              </Link>
            </div>
           </HeroReveal>
          </Container>
        </HeroSlides>
      </section>

      <section className="border-b border-rule">
        <Container className="grid gap-12 py-20 md:py-24 lg:grid-cols-[1.45fr_1fr] lg:items-start">
          {/*
            No Reveal around these. A block fade and a word-lift animate the
            same element from two directions: the wrapper sets opacity on the
            parent while the split spans are still travelling inside it, and
            the words arrive already faded up. Each part now carries its own
            entrance.
          */}
          <div>
            <SectionHeading>One group, both directions</SectionHeading>
            <AnimatedText as="p" delay={0.15} className="type-body mt-4 text-step-0">
              Sahara Link Group has spent fifteen years bringing equipment into
              Bangladesh and sending skilled workers out of it. Two divisions
              import, one places workforce, and all three run from one office in
              Dhaka.
            </AnimatedText>
          </div>

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
          <div>
            <SectionHeading>Three divisions</SectionHeading>
            <AnimatedText as="p" delay={0.15} className="type-body mt-4 text-step-0">
              Two bring equipment in. One sends workforce out.
            </AnimatedText>
          </div>

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
                    <h3 className="type-display text-step-2 sm:text-step-3">
                      <Link
                        href={division.href}
                        className="text-navy transition-colors hover:text-accent"
                      >
                        {division.name}
                      </Link>
                    </h3>
                    <p className="type-data mt-1 text-step--1 text-ink-faint">
                      {division.strapline}
                    </p>
                    <p className="type-body mt-4 text-step-0">
                      {division.summary}
                    </p>
                    <dl className="mt-5 flex gap-3">
                      <dt className="type-data text-step--1 text-ink-faint">
                        Flow
                      </dt>
                      <dd className="type-data text-step--1 text-ink">
                        {flowLabel[division.direction]}
                      </dd>
                    </dl>
                  </div>

                  <Link
                    href={division.href}
                    className="self-center whitespace-nowrap border border-navy px-5 py-2.5 type-data text-step--1 text-navy transition-colors hover:bg-navy hover:text-paper-raised"
                  >
                    Go to {division.name}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-rule bg-paper-sunk/80 py-20 md:py-24">
        <Container>
          <div>
            <SectionHeading>What we do</SectionHeading>
            <AnimatedText as="p" delay={0.15} className="type-body mt-4 text-step-0">
              Everything the group offers, across three divisions. Each one ends
              with somebody in Dhaka answering the phone.
            </AnimatedText>
          </div>

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
                  <h3 className="type-heading text-step-1 text-navy transition-colors group-hover:text-accent">
                    {service.title}
                  </h3>
                  <p className="type-body mt-3 text-step--1">
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
          <div>
            <SectionHeading tone="ink">Seven brands, represented in Bangladesh</SectionHeading>
            <AnimatedText as="p" delay={0.15} className="type-body mt-4 max-w-[62ch] text-step-0 text-paper-sunk/70">
              SLG does not manufacture. It imports, supplies, installs and
              services equipment made by these seven, and answers the phone
              afterwards.
            </AnimatedText>
          </div>
        </Container>

        {/*
          The names as a moving strip, full-bleed so it runs edge to edge and
          reads as a ticker rather than a widget parked in the column. It is
          the rhythm; the grid under it is the reference. Aria-hidden because
          the same seven names are listed properly below and announcing them
          twice helps nobody.
        */}
        <div aria-hidden className="mt-12 border-y border-white/12 py-8">
          <BrandMarquee items={brands.map((b) => b.name)} />
        </div>

        <Container>
          <ul className="mt-12 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {brands.map((brand, index) => (
              <Reveal
                key={brand.id}
                as="li"
                effect="settle"
                delay={index * 60}
                className="group bg-ink"
              >
                {/*
                  A fixed 16:10 frame with object-cover. The supplied shots
                  run from 0.59 to 2.30 in aspect — lifts are tall, gensets
                  are wide — and at their own ratios the seven cells ended on
                  seven different lines.
                */}
                <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                  <Image
                    src={brand.image}
                    alt={brand.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                {/* The brand names are what a buyer scans this grid for, so
                    they arrive the way the headings do rather than fading in
                    with the cell around them. A step up in size too — at
                    1.375rem they sat level with the body copy under them and
                    the grid read as seven paragraphs. */}
                <AnimatedText
                  as="p"
                  delay={index * 0.05}
                  className="type-display text-step-2 text-paper-raised"
                >
                  {brand.name}
                </AnimatedText>
                <p className="type-data mt-1.5 text-step--1 text-paper-sunk/55">
                  {brand.category === "elevator" ? "Elevators" : "Generators"}
                </p>
                <p className="type-body mt-3 text-step--1 text-paper-sunk/70">
                  {brand.headline}
                </p>
                </div>
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
                <p className="type-body text-step--1 text-paper-sunk/70">
                  Specifications, safety systems and applications for all seven.
                </p>
                <span className="type-data text-step--1 text-paper-raised underline decoration-white/30 underline-offset-4">
                  See the full range
                </span>
              </Link>
            </Reveal>
          </ul>
        </Container>
      </section>

      {/*
        The solar side, stated in the terms a buyer chooses by: which of the
        three system types they need. The voltage and current ranges are the
        only hard figures either client deck contains — everything else that
        looks like a specification in those PDFs is stock artwork on a mock
        controller screen, including two panels that contradict each other on
        frequency. Those are not repeated here.
      */}
      <section className="border-t border-rule bg-paper-sunk/80 py-20 md:py-24">
        <Container>
          <div>
            <SectionHeading>Solar, three ways</SectionHeading>
            <AnimatedText as="p" delay={0.15} className="type-body mt-4 text-step-0">
              Panels, inverters, charge controllers, batteries and mounting —
              sized as one system rather than sold as parts.
            </AnimatedText>
          </div>

          {/*
            A photograph of the thing being described, held on a parallax so
            it drifts against the scroll. Static it was a stock roof; moving
            at a different rate from the text beside it, it reads as depth.
          */}
          <ScrollScene scene="parallax" className="mt-10 overflow-hidden">
            <Image
              src="/media/solar-roof.webp"
              alt="Solar array installed across a pitched roof"
              width={1200}
              height={936}
              sizes="(min-width: 1024px) 68rem, 100vw"
              className="aspect-[21/9] w-full scale-110 border border-rule object-cover"
            />
          </ScrollScene>

          <div className="mt-12 grid gap-px border border-rule bg-rule lg:grid-cols-3">
            {[
              {
                title: "On-grid",
                body: "Runs alongside the mains and offsets what the building draws. No batteries, so the shortest payback of the three.",
              },
              {
                title: "Off-grid",
                body: "Stands alone with battery storage, for sites the grid does not reach or cannot be relied on.",
              },
              {
                title: "Hybrid",
                body: "Grid-connected with storage behind it. Solar by day, battery through an outage.",
              },
            ].map((item, index) => (
              <Reveal
                as="article"
                key={item.title}
                effect="settle"
                delay={index * 90}
                className="bg-paper-raised p-7"
              >
                <span aria-hidden className="block h-[3px] w-10 bg-gold-mark" />
                <h3 className="type-heading mt-4 text-step-2">{item.title}</h3>
                <p className="type-body mt-3 text-step--1">{item.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-10">
            <DataPlate
              title="Charge controllers"
              rows={[
                { label: "System voltage", value: "12V / 24V / 48V" },
                { label: "Current range", value: "10A – 60A" },
              ]}
              footnote="Sizing depends on array and battery bank. Confirmed per project."
              className="max-w-md"
            />
          </Reveal>
        </Container>
      </section>

      {/*
        What actually happens between an enquiry and a working machine. The
        page said what the group sells and who it represents but never what
        the buyer is signing up for, which is the question behind most first
        enquiries.

        Numbered because this genuinely is a sequence — the one case where
        numbered markers describe the content rather than decorate it.

        Every step is drawn from what the client's own decks describe. No
        durations are given: the decks state none, and a timeline invented
        here would be quoted back at the company by a customer.
      */}
      <section className="border-t border-rule py-20 md:py-24">
        <Container>
          <div>
            <SectionHeading>From enquiry to running equipment</SectionHeading>
            <AnimatedText as="p" delay={0.15} className="type-body mt-4 text-step-0">
              The same office handles the specification, the import, the
              installation and the service visit three years later.
            </AnimatedText>
          </div>

          <ol className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Specification",
                body: "The building, the load and the traffic decide the machine. We size it against what the site actually needs rather than a catalogue page.",
              },
              {
                step: "02",
                title: "Supply",
                body: "Imported directly from the manufacturer, not bought from a local reseller. One less party between the factory and the site.",
              },
              {
                step: "03",
                title: "Installation",
                body: "Installed and commissioned by engineers on staff, then tested against the specification it was sold on.",
              },
              {
                step: "04",
                title: "Service",
                body: "Maintenance and parts from the same office that supplied it. The people who installed it are the people who return to it.",
              },
            ].map((item, index) => (
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

      <section className="border-t border-rule bg-paper-sunk/80 py-16">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <AnimatedText as="h2" className="type-heading text-step-2">
              Tell us what the project needs
            </AnimatedText>
            <AnimatedText as="p" delay={0.15} className="type-body mt-2 text-step-0">
              Send the load, the building and the timeline. We will come back
              with the specification and a price.
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
