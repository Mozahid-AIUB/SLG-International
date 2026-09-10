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
  title: "Sahara Link International",
  description:
    "Bangladeshi workers placed with employers overseas, from the same Dhaka office that handles the group's equipment business. The employer is checked before a worker is put forward, and the documentation is handled here.",
  alternates: { canonical: "/manpower/" },
  openGraph: {
    type: "website",
    siteName: "Sahara Link Group",
    locale: "en_US",
    url: "/manpower/",
    images: [
      {
        url: "/media/manpower/terminal-wait-1800.webp",
        width: 1800,
        height: 771,
        alt: "Travellers waiting with luggage in silhouette at an airport departure gate",
      },
    ],
  },
};

/**
 * The outbound half of the group.
 *
 * This page is long and photographed, and it is still deliberately short on
 * specifics — that is not an oversight and it must stay that way until the
 * client supplies them.
 *
 * Overseas recruitment is licensed work in Bangladesh. Naming a licence
 * number, a destination country, a trade, a fee or a placement count that
 * has not been confirmed would put a claim on the public record that a
 * worker might act on: give notice, borrow money, leave a job. Everything
 * asserted below is either already published elsewhere on this site or true
 * by definition of the business. Where a fact is missing, the gap is marked
 * in the markup as a comment rather than dressed up as a "coming soon"
 * panel, because an empty panel is an announcement and a comment is a note
 * to whoever fills it in.
 *
 * Waiting on the client, each with a marked slot below:
 *   1. Licence details — BMET or other, and the issuing authority.
 *   2. The destination countries actually served.
 *   3. The trades actually placed.
 *
 * Photography is open-licence stock from Pexels. Every frame was rendered
 * and looked at before it was used, and several otherwise good ones were
 * dropped: an airline livery, a food-court sign in Chinese, a departure
 * board legible enough to read destinations off, and a site worker with a
 * company logo on his back. On this page a readable destination is a claim
 * about where we place people, and another firm's uniform is a claim about
 * who did the work. Neither is ours to make.
 *
 * The one image that survived a crop is the hero band: the original frame
 * carried an airline tail and a catering contractor's sign along its left
 * edge, and it is cropped off rather than blurred.
 */

/**
 * What the division can put in writing today.
 *
 * Set as alternating spreads rather than three cards, for the same reason
 * the Renewables systems are: each one is a paragraph of reasoning and a
 * photograph, not a row in a table. Three cards would also make these read
 * as a service list, which is exactly what this page cannot yet publish.
 */
const commitments = [
  {
    title: "The employer is checked first",
    lead: "Before a worker is put forward",
    body: "A placement is only as good as the company at the other end of it. The employer is verified before a worker is put forward, not after a problem appears — because by the time a problem appears, the worker is already in another country and the leverage has gone with him.",
    note: "Checked before, not after.",
    image: "/media/manpower/welder-1400.webp",
    alt: "A welder at work in a workshop, sparks rising from the joint",
  },
  {
    title: "One office, both directions",
    lead: "Dhaka, for equipment and for people",
    body: "The same Dhaka office that imports the group's equipment handles the placements. Equipment comes in, people go out, and neither is subcontracted to somebody else. A worker who comes back with a question comes back to the same room.",
    note: "One address for both halves of the group.",
    // A control panel under this heading is not decoration. The group's
    // other two divisions import lifts, generators and solar equipment, and
    // this is the inside of the sort of thing they install — the inbound
    // half of the same office, in one picture.
    image: "/media/manpower/panel-wiring-1200.webp",
    alt: "Hands wiring the inside of an electrical control panel",
  },
  {
    title: "The paperwork is ours to get right",
    lead: "Handled here, not left to the worker",
    body: "Documentation is where an overseas placement usually fails, and it is handled here rather than left to the worker to assemble alone. A file that is one document short does not fail politely. It fails late, at a counter, with the worker standing in front of it.",
    note: "Assembled by the office, checked by the office.",
    image: "/media/manpower/documents-1200.webp",
    alt: "A document passed across a desk between two people, with papers and a passport on the table",
  },
];

/**
 * The group's organising idea, in three cells.
 *
 * Taken from site.positioning, which is confirmed from the client's own
 * profiles. Nothing here is new — it is the one distinctive true thing this
 * division has, and it belongs high on the page.
 */
const directions = [
  {
    label: "Inbound",
    figure: "Equipment",
    body: "Lifts, generators and complete solar systems, imported and installed by the group's other two divisions.",
  },
  {
    label: "Dhaka",
    figure: "One office",
    body: "Rampura. Both directions are run from the same address, and neither is handed to an outside agent.",
  },
  {
    label: "Outbound",
    figure: "People",
    body: "Bangladeshi workers placed with employers abroad, once the employer has been checked.",
  },
];

/**
 * Four stages, and deliberately no durations.
 *
 * The client has stated none, and a timeline is the single most dangerous
 * thing to invent here: a worker reading "six weeks" gives notice, turns
 * down other work, or borrows against it. Same reason there is no fee
 * figure anywhere on this page — see the worker section, which says instead
 * that the cost is a question the worker is entitled to ask.
 */
const sequence = [
  {
    step: "01",
    title: "The employer",
    body: "Who the company is and what the job actually involves, established before a worker ever hears the role described.",
  },
  {
    step: "02",
    title: "The offer",
    body: "The employer, the role and the terms put to the worker in plain language, with time to ask about them before anything is agreed.",
  },
  {
    step: "03",
    title: "The documentation",
    body: "Assembled and checked by the office. The worker is told what each document is for, rather than handed a stack and asked to sign.",
  },
  {
    step: "04",
    title: "Departure",
    body: "A placement does not change hands at the airport. The office that put it together is the office to come back to.",
  },
];

/**
 * The questions block is the most important thing on the page.
 *
 * The previous version of this page already told workers to ask what a
 * placement involves, including what it costs and who pays. That line is
 * kept and given its own panel, because it is advice rather than a claim:
 * every item below is a question, so nothing here asserts a fee, a country,
 * a wage or a trade. It is also the part a worker can use at any other
 * agency, which is the point.
 */
const questions = [
  "Who the employer is, and what the job actually involves.",
  "What it costs, what each part of that cost is for, and who pays it.",
  "What the pay is, and what comes out of it before it reaches you.",
  "What happens if the job is not there when you arrive.",
  "What you are being asked to sign, in a language you read.",
];

export default function ManpowerPage() {
  return (
    <main id="main" className="flex-1" data-division="manpower">
      <PageHero
        title="Bangladeshi skill, placed with employers abroad"
        lead="Sahara Link International is the outbound half of the group. The skills Bangladesh exports are real skills, and they deserve employers who are checked before a worker ever boards a plane."
        aside={
          /*
            GAP 1 — LICENCE.
            When the client supplies the recruitment licence (BMET or other)
            and the authority that issued it, it belongs as a fourth row on
            this plate, above "Enquiries", and repeated in the footer of the
            closing section. A licence number is the one fact on this page a
            worker can independently check, which is exactly why a guessed
            one would be worse than none at all. Until it arrives, the plate
            states only what the division is, where it is, and how to reach
            it.
          */
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
            footnote="Ask us what a placement involves before committing to anything."
          />
        }
      />

      {/*
        A full-bleed departure gate on a parallax, in the same position the
        Renewables page puts its array. That page can show the product; this
        one cannot show a placement, so it shows the moment every placement
        ends up at — people, luggage, an empty apron — with nobody
        identifiable and no airline in frame.

        Scaled past its own frame so the parallax has travel without ever
        exposing an edge. `preload` rather than `priority`: priority is
        deprecated as of Next 16 in favour of the clearer name, and this is
        the first large image on the route.
      */}
      <section className="relative border-b border-rule">
        <ScrollScene scene="parallax" className="overflow-hidden">
          <Image
            src="/media/manpower/terminal-wait-1800.webp"
            alt="Travellers waiting with luggage in silhouette at an airport departure gate"
            width={1800}
            height={771}
            preload
            sizes="100vw"
            className="aspect-[21/9] w-full scale-110 object-cover"
          />
        </ScrollScene>
      </section>

      {/*
        The direction idea, on the dark ground, directly under the opening
        photograph — the position Renewables gives its incentive package,
        because it is the strongest thing that page has to say early. Here
        the strongest early thing is not an offer, it is the reason this
        division is not a broker with a rented desk: it shares an office and
        a phone with two equipment businesses that have been running for
        years.
      */}
      <section className="border-b border-rule bg-ink py-20 text-paper-raised md:py-24">
        <Container>
          <div>
            <SectionHeading tone="ink">
              Equipment comes in, people go out
            </SectionHeading>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 max-w-[64ch] text-step-0 text-paper-sunk/75"
            >
              Sahara Link Group runs in both directions from one address in
              Dhaka. Two of its divisions bring machinery into Bangladesh. This
              one takes Bangladeshi workers out to employers abroad, and the
              same office answers for both.
            </AnimatedText>
          </div>

          <ul className="mt-12 grid gap-px border border-white/12 bg-white/12 md:grid-cols-3">
            {directions.map((item, index) => (
              <Reveal
                as="li"
                key={item.label}
                effect="settle"
                delay={index * 80}
                className="bg-ink p-7"
              >
                <p className="type-data text-step--1 text-gold-mark">
                  {item.label}
                </p>
                <p className="type-display mt-3 text-step-3 text-paper-raised">
                  {item.figure}
                </p>
                <p className="type-body mt-3 text-step--1 text-paper-sunk/70">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/*
        Three commitments rather than a service list, because that is what
        the division can honestly put in writing today, and the difference
        matters: a service list would need countries and trades in it.
      */}
      <section className="border-b border-rule bg-paper-raised">
        <Container className="py-20 md:py-28">
          <div>
            <SectionHeading>How we work</SectionHeading>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 text-step-0"
            >
              A placement is a long relationship with two parties in it, and
              both of them have to be able to rely on it.
            </AnimatedText>
          </div>

          <div className="mt-14 space-y-16 md:space-y-24">
            {commitments.map((item, index) => (
              <article
                key={item.title}
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
                    src={item.image}
                    alt={item.alt}
                    width={1400}
                    height={933}
                    sizes="(min-width: 1024px) 34rem, 100vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </ScrollScene>

                <div>
                  <span aria-hidden className="block h-[3px] w-12 bg-gold-mark" />
                  <AnimatedText as="h3" className="type-display mt-5 text-step-3">
                    {item.title}
                  </AnimatedText>
                  {/* mt-3, not the mt-2 the Renewables spreads use. Those
                      headings are single words and never wrap; these run to
                      two lines, and at mt-2 the second line sat almost on
                      top of this one. */}
                  <p className="type-data mt-3 text-step--1 text-accent">
                    {item.lead}
                  </p>
                  <AnimatedText
                    as="p"
                    delay={0.15}
                    className="type-body mt-6 text-step-0"
                  >
                    {item.body}
                  </AnimatedText>
                  <p className="type-data mt-6 border-t border-rule pt-4 text-step--1 text-ink-faint">
                    {item.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/*
        GAP 2 — DESTINATION COUNTRIES.
        A band of the countries actually served goes here, between the
        commitments and the sequence: it is the first question an employer
        and a worker both ask, and it reads best as a plain grid in the shape
        of the sequence grid below.

        Nothing on this page may name a country until the client confirms the
        list — that includes alt text and image choice, which is why the
        photographs here are of work and of a departure gate rather than of
        any recognisable skyline.
      */}

      <section className="border-b border-rule bg-paper-sunk">
        <Container className="py-20 md:py-28">
          <div>
            <SectionHeading>How a placement goes</SectionHeading>
            <AnimatedText
              as="p"
              delay={0.15}
              className="type-body mt-4 text-step-0"
            >
              Four stages, in order. A worker should recognise which one they
              are standing in at any point, and should be able to ask what
              happens in the next.
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

      {/* A site, wide. Scale rather than parallax: the frame is already
          horizontal and drifting it as well would fight the scroll.

          overflow-x-clip on the section, not on the ScrollScene — the scale
          is applied to the ScrollScene's own wrapper, so a full-bleed one
          grows past the viewport and its inner overflow-hidden clips the
          child rather than itself. That put a horizontal scrollbar on the
          Renewables page at every width before it was caught. */}
      <section className="overflow-x-clip border-b border-rule">
        <ScrollScene scene="scale" className="overflow-hidden">
          <Image
            src="/media/manpower/site-workers-1800.webp"
            alt="Two construction workers in hard hats carrying coils of cable across a building site"
            width={1800}
            height={686}
            sizes="100vw"
            className="aspect-[21/8] w-full object-cover"
          />
        </ScrollScene>
      </section>

      {/*
        GAP 3 — TRADES.
        The list of trades actually placed goes here, directly under the
        photograph of work, as a grid in the shape of the sequence above.

        A note for whoever fills it in: the photographs on this page show
        welding, construction and panel wiring. They were chosen as pictures
        of skilled work in general, not as a claim that those are the trades
        this division places. When the real list arrives, check the images
        against it and change any that no longer tell the truth.
      */}

      {/*
        Two audiences arrive on this page wanting opposite things, and one
        merged enquiry route serves neither. Split into two full sections
        rather than two boxes: an employer needs to know what to send, and a
        worker needs to know what to ask, and those are not the same length.
      */}
      <section className="border-b border-rule">
        <Container className="py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <SectionHeading>Hiring from Bangladesh</SectionHeading>
              <AnimatedText
                as="p"
                delay={0.15}
                className="type-body mt-4 text-step-0"
              >
                Tell us the roles, the numbers and where the work is. We will
                come back on what we can supply, and on what the process
                requires at both ends. The more specific the requirement, the
                shorter that conversation is.
              </AnimatedText>

              <Reveal delay={140}>
                <Link
                  href="/enquiry"
                  className="mt-8 inline-block border border-navy bg-navy px-6 py-3 type-data text-step--1 text-paper-raised transition-colors hover:bg-ink"
                >
                  Talk to us about hiring
                </Link>
              </Reveal>
            </div>

            {/* A list of what to send, not a list of what we place. Asking
                an employer for the shape of their requirement claims
                nothing about ours. */}
            <ul className="grid gap-px self-start border border-rule bg-rule sm:grid-cols-2">
              {[
                {
                  title: "The role, and how many",
                  body: "What the work is on the ground, and the number of people you expect to take.",
                },
                {
                  title: "Where the work is",
                  body: "The country, the site and the employer of record, so the checks can start at the right end.",
                },
                {
                  title: "When you need them",
                  body: "The date people have to be in place, and whether it moves.",
                },
                {
                  title: "What is provided",
                  body: "What the employer covers on arrival, and what it does not. This decides more placements than pay does.",
                },
              ].map((item, index) => (
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

      <section className="border-b border-rule bg-paper-raised">
        <Container className="py-20 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <ScrollScene
              scene="mask"
              className="overflow-hidden border border-rule"
            >
              <Image
                src="/media/manpower/gate-wait-1400.webp"
                alt="Two travellers waiting in silhouette against the windows of an airport terminal"
                width={1400}
                height={933}
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="aspect-[3/2] w-full object-cover"
              />
            </ScrollScene>

            <div>
              <SectionHeading>Looking for work abroad</SectionHeading>
              <AnimatedText
                as="p"
                delay={0.15}
                className="type-body mt-5 text-step-0"
              >
                Come to the office, or write to us with your trade and your
                experience. Then ask what the placement involves before you
                commit to anything — including what it costs and who pays it.
              </AnimatedText>

              <Reveal delay={140}>
                <a
                  href={`mailto:${site.emails.manpower}`}
                  className="mt-8 inline-block border border-navy px-6 py-3 type-data text-step--1 text-navy transition-colors hover:bg-navy hover:text-paper-raised"
                >
                  {site.emails.manpower}
                </a>
              </Reveal>
            </div>
          </div>

          {/* The questions, set apart on the sunk ground with a gold rule so
              they read as a notice rather than as another block of copy. */}
          <Reveal delay={80} className="mt-14 border border-rule bg-paper-sunk p-8 md:p-12">
            <span aria-hidden className="block h-[3px] w-12 bg-gold-mark" />
            <h3 className="type-heading mt-5 text-step-2">
              Questions you are entitled to ask
            </h3>
            <p className="type-body mt-3 text-step--1">
              Before you agree to anything, and before you pay anyone anything.
            </p>

            <ul className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
              {questions.map((question, index) => (
                <Reveal
                  as="li"
                  key={question}
                  effect="settle"
                  delay={index * 70}
                  className="bg-paper-raised p-6"
                >
                  <span className="type-data text-step--1 text-gold-mark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="type-body mt-3 text-step--1">{question}</p>
                </Reveal>
              ))}

              {/* Sits in the last cell of the grid so the row closes square,
                  and carries the sentence the rest of the panel exists for. */}
              <Reveal
                as="li"
                effect="settle"
                delay={questions.length * 70}
                className="bg-navy p-6"
              >
                <p className="type-body text-step--1 text-paper-raised/85">
                  Ask them here. Ask them of anyone else who offers you work
                  abroad. A recruiter who will not answer them has already told
                  you something.
                </p>
              </Reveal>
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper-sunk py-16">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <AnimatedText as="h2" className="type-heading text-step-2">
              Start the conversation
            </AnimatedText>
            {/* Reveal, not AnimatedText. AnimatedText rebuilds the block
                from its own textContent to animate it word by word, which
                would throw away the anchor inside and leave the link as
                plain text — it did exactly that on the first pass. Anything
                with a child element gets the plain reveal. */}
            <Reveal delay={80}>
              <p className="type-body mt-2 text-step-0">
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
          </div>

          <Reveal delay={120} className="flex flex-wrap gap-3">
            <Link
              href="/enquiry"
              className="inline-block border border-navy bg-navy px-6 py-3 type-data text-step--1 text-paper-raised transition-colors hover:bg-ink"
            >
              Start an enquiry
            </Link>
            <a
              href={`mailto:${site.emails.manpower}`}
              className="inline-block border border-navy px-6 py-3 type-data text-step--1 text-navy transition-colors hover:bg-navy hover:text-paper-raised"
            >
              {site.emails.manpower}
            </a>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
