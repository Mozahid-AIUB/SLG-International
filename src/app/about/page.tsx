import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { DataPlate } from "@/components/patterns/DataPlate";
import { PageHero } from "@/components/patterns/PageHero";
import { StackingCards } from "@/components/patterns/StackingCards";
import { site } from "@/content/site";
import { leadership, technology } from "@/content/team";

export const metadata: Metadata = {
  title: "About Sahara Link Group",
  description:
    "Fifteen years of equipment supply and overseas workforce placement, from one office in Dhaka.",
  alternates: { canonical: "/about/" },
  openGraph: {
    type: "website",
    siteName: "Sahara Link Group",
    locale: "en_US",
    url: "/about/",
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

export default function AboutPage() {
  return (
    <main id="main" className="relative isolate flex-1">
      {/*
        The group mark, held still behind the whole page while the content
        travels over it — a watermark on the paper rather than a picture in
        the column.

        This only works if the sections stop fighting it. Tried first with
        each section keeping its own ground and its own hard border: the mark
        stayed put correctly, but the borders swept across it and cut it into
        pieces at every scroll position, and the two different grounds showed
        it at two different strengths. It read as a poster taped behind a
        blind. So the sections that pass over it now share one ground and
        drop their rules; the only division left between them is the space
        around them.
      */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 hidden items-center justify-center lg:flex"
      >
        <Image
          src="/brand/group-512.webp"
          alt=""
          width={512}
          height={512}
          className="w-[46rem] max-w-none opacity-[0.045]"
        />
      </div>
      <PageHero
        title="Fifteen years, one office, two directions of trade"
        lead="Sahara Link Group imports the equipment that keeps Bangladeshi buildings running, and places Bangladeshi workers with employers abroad. Three divisions, one company, one address in Dhaka."
        aside={
          <DataPlate
            title="Sahara Link Group"
            rows={[
              { label: "Founded", value: `${site.yearsActive} years ago` },
              { label: "Divisions", value: "Three" },
              { label: "Head office", value: `${site.address.city}, ${site.address.country}` },
              { label: "Inbound", value: "Elevators, generators, solar" },
              { label: "Outbound", value: "Skilled workforce" },
            ]}
          />
        }
      />

      {/*
        The founder section is the page's one loud moment. The photograph was
        taken in front of the company's own backlit sign, and the sign carries
        the group tagline — so the portrait and the words are the same claim.
        Setting the tagline beside the photo at display size lets each finish
        the other, instead of shrinking the picture into a bio avatar.
      */}
      <section className="border-b border-rule bg-paper-raised">
        <Container className="grid gap-10 py-24 md:py-36 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
          <Reveal effect="wipe">
            {/*
              Shown whole rather than cropped to a frame: the nameplate above
              him carries the tagline set beside it, so cropping to a portrait
              box would cut away half of what the picture is here to say.
            */}
            <Image
              src="/about/founder-1000.webp"
              alt="Kamal Monsur, founder of Sahara Link Group, photographed in the company's Dhaka office beneath the group nameplate"
              width={900}
              height={1600}
              className="w-full border border-rule-strong"
              sizes="(min-width: 1024px) 26rem, 100vw"
              priority
            />
          </Reveal>

          <Reveal className="flex flex-col justify-center" delay={120}>
            {/*
              Name first, titles under it — the order a person is introduced
              in. Set in the display width, not the listing one: on this page
              --accent resolves to the same navy as the headings, so the name
              cannot be separated from the tagline beneath it by colour. Width
              and size do that work instead, and the titles drop to faint ink
              so the eye lands on the man before his roles.
            */}
            <p className="type-display text-step-3">
              Kamal Monsur
            </p>
            <p className="type-data mt-2.5 text-step--1 text-ink-faint">
              Founder · Corporate Investor
            </p>

            {/*
              The tagline is the largest type on the page. It is the client's
              own words, cast in metal on the wall behind him.
            */}
            <blockquote className="mt-7">
              <p className="type-display text-step-5">
                {site.tagline}
              </p>
            </blockquote>

            <div className="mt-9 border-t border-rule pt-8">
              <p className="type-body text-step-0">
                The group began with a single question a Dhaka developer keeps
                asking: who supplies the lift, and who services it in year
                three? Answering that properly meant importing directly rather
                than reselling, and keeping engineers on staff rather than
                subcontracting the maintenance.
              </p>
              <p className="type-body mt-5 text-step-0">
                The same reasoning built the second half of the business. The
                skills Bangladesh exports are real skills, and they deserve
                employers who are checked before a worker ever boards a plane.
                Equipment comes in, people go out, and both sides are handled by
                the same office.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/*
        Leadership is set as a masthead rather than a row of cards: these are
        two people with real backgrounds to read, not a wall of headshots.
        The name column stays fixed so each entry starts on the same line,
        the way a listing of officers does.
      */}
      {leadership.length > 0 ? (
        <section className="border-b border-rule bg-paper-raised">
          <Container className="py-24 md:py-36">
            <SectionHeading>Leadership</SectionHeading>

            {/*
              One card per person, pinned and piled on scroll. The list was
              a plain stack of rows before; at four people it read as a table
              of staff, and the point of this section is that each of them is
              worth stopping on.

              The Reveal is gone from the entries: a fade-in and a pin fight
              each other, because the reveal animates the same element
              ScrollTrigger is pinning.
            */}
            <StackingCards className="mt-10 lg:space-y-8">
              {leadership.map((member, index) => (
                <article
                  data-stack-card
                  key={member.id}
                  className="grid gap-6 border border-rule bg-paper-raised px-8 py-14 shadow-[0_-18px_50px_-30px_rgba(10,18,40,0.35)] lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-0 lg:px-12 lg:sticky"
                  /*
                    Each card sticks 22px lower than the one before it, so the
                    pile leaves a visible edge of every card underneath rather
                    than burying them. z-index follows document order so a
                    later card lands on top.
                  */
                  style={{
                    zIndex: index + 1,
                    top: `calc(88px + ${index * 22}px)`,
                  }}
                >
                  {/*
                    Deliberately not sticky. Pinning the identity column was
                    tried and measured: at these proportions the portrait and
                    name are already as tall as the biography beside them, so
                    a sticky column has nothing to travel through. Shrinking
                    the portraits to create that travel would be designing for
                    the technique rather than for the people on the page.
                  */}
                  <div className="relative z-10 lg:w-[calc(100%+3.5rem)]">
                    {/*
                      Name above the portrait, not below it. A pinned card can
                      be taller than the window it is pinned in — at a browser
                      height of 740px, which is what a maximised window with a
                      bookmarks bar actually gives, the tallest card overran by
                      29px and the identity was the part that fell off the
                      bottom. Whoever is on screen is now named first, and it
                      is the biography that runs on.
                    */}
                    <h3 className="type-heading text-step-1">
                      {member.name}
                    </h3>
                    <p className="type-data mt-1.5 text-step--1 text-accent">
                      {member.role}
                    </p>
                    {member.credential ? (
                      <p className="type-data mt-1 text-step--1 text-ink-faint">
                        {member.credential}
                      </p>
                    ) : null}

                    {/*
                      Fixed 4:5 frame. The supplied portraits are all
                      different shapes, and left at their own ratios the
                      cards beside them would end on different lines.
                    */}
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.photoAlt ?? `${member.name}, ${member.role}`}
                        width={800}
                        height={1000}
                        className="mt-5 aspect-4/5 w-full border border-rule-strong object-cover object-top lg:shadow-[0_18px_50px_-24px_rgba(10,18,40,0.45)]"
                        sizes="(min-width: 1024px) 17rem, 100vw"
                      />
                    ) : null}
                  </div>

                  {/*
                    The text column starts under the portrait and is padded
                    clear of it, so the photograph sits on the writing rather
                    than beside it. Two columns with a gap read as a table of
                    people; overlapped they read as one entry about a person.

                    The numbers are tied: the portrait is 3.5rem wider than
                    its 17rem column, so it crosses 56px into this one, and
                    the 6rem left padding clears that by 40px. Padding equal
                    to the overhang was tried and the text sat flush on the
                    photograph's edge, which reads as a collision rather than
                    a layer.

                    lg only: stacked, there is no column to slide under.
                  */}
                  <div className="lg:pl-24">
                    {member.bio?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="type-body mt-5 text-step-0 first:mt-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {member.remit && !member.bio ? (
                      <p className="type-body text-step-0">
                        {member.remit}
                      </p>
                    ) : null}

                    {/*
                      Listed, not numbered: these are six things one person
                      does, not six steps in an order.
                    */}
                    {member.specialisms?.length ? (
                      <div className="mt-8">
                        <h4 className="type-data text-step--1 text-ink-faint">
                          Areas of specialisation
                        </h4>
                        <ul className="mt-3 grid grid-cols-1 gap-x-10 border-t border-rule sm:grid-cols-2">
                          {member.specialisms.map((item) => (
                            <li
                              key={item}
                              className="border-b border-rule py-2.5 type-data text-step--1 text-ink"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </StackingCards>
          </Container>
        </section>
      ) : null}


      {/*
        A colophon, not a specification. The plates elsewhere on the site
        describe equipment — model, capacity, service contact — and a person
        put into that form reads as a filled-in enquiry sheet. Here the name
        carries the block, the four things administered are the structure,
        and the addresses are links rather than table cells.
      */}
      {technology.length > 0 ? (
        <section className="border-t border-rule bg-paper-sunk">
          <Container className="py-20 md:py-24">
            {/* Now that this section carries a card like Leadership does,
                it takes the same heading treatment. A centred grey label
                over a bordered card read as a caption that had drifted. */}
            <SectionHeading>Website and systems</SectionHeading>

            {technology.map((person) => (
              <div key={person.id} className="mt-10">
                {/*
                  A byline portrait, not a leadership one: square and small,
                  set beside the name rather than above it. The section above
                  already uses a tall 4:5 frame, and repeating it here would
                  make the two read as one long list of people.
                */}
                {/*
                  Set as a card, matching the leadership entries above. This
                  block was a byline: a small square portrait beside a name,
                  on the reasoning that a service contact is not an
                  introduction. But the person heading IT is on the staff
                  like everyone else on this page, and the byline treatment
                  read as a footer credit rather than a colleague.
                */}
                <Reveal className="grid gap-6 border border-rule bg-paper-raised px-8 py-12 shadow-[0_-18px_50px_-30px_rgba(10,18,40,0.35)] lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-0 lg:px-12">
                  <div className="relative z-10 lg:w-[calc(100%+3.5rem)]">
                    <h2 className="type-heading text-step-1">{person.name}</h2>
                    <p className="type-data mt-1.5 text-step--1 text-accent">
                      {person.role}
                    </p>
                    {person.credential ? (
                      <p className="type-data mt-1 text-step--1 text-ink-faint">
                        {person.credential}
                      </p>
                    ) : null}

                    {person.photo ? (
                      <Image
                        src={person.photo}
                        alt={person.photoAlt ?? `${person.name}, ${person.role}`}
                        width={600}
                        height={750}
                        className="mt-5 aspect-4/5 w-full border border-rule-strong object-cover object-top lg:shadow-[0_18px_50px_-24px_rgba(10,18,40,0.45)]"
                        sizes="(min-width: 1024px) 17rem, 100vw"
                      />
                    ) : null}
                  </div>

                  <div className="lg:pl-24">
                    {person.bio?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="type-body mt-5 text-step-0 first:mt-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {person.remit && !person.bio ? (
                      <p className="type-body text-step-0">{person.remit}</p>
                    ) : null}
                  </div>
                </Reveal>

                {/*
                  The four things administered, given the width of the page.
                  This is the part a reader actually needs — it says what
                  falls to this person and what does not.
                */}
                <Reveal delay={90}>
                  <ul className="mt-9 grid grid-cols-2 border-t border-rule-strong sm:grid-cols-4">
                    {person.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="border-b border-rule py-3 pr-6 type-data text-step--1 text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={150}>
                  <dl className="mt-9 grid gap-x-10 gap-y-6 sm:grid-cols-3">
                    {person.email ? (
                      <div>
                        <dt className="type-data text-step--2 text-ink-faint">
                          Email
                        </dt>
                        <dd className="mt-1.5">
                          <a
                            href={`mailto:${person.email}`}
                            className="type-data text-step--1 text-navy underline decoration-rule-strong underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
                          >
                            {person.email}
                          </a>
                        </dd>
                      </div>
                    ) : null}

                    {person.phone ? (
                      <div>
                        <dt className="type-data text-step--2 text-ink-faint">
                          WhatsApp
                        </dt>
                        <dd className="mt-1.5">
                          <a
                            href={`https://wa.me/${person.phone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="type-data text-step--1 text-navy underline decoration-rule-strong underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
                          >
                            {person.phone}
                          </a>
                        </dd>
                      </div>
                    ) : null}

                    {person.links?.map((link) => (
                      <div key={link.href}>
                        <dt className="type-data text-step--2 text-ink-faint">
                          {link.label}
                        </dt>
                        <dd className="mt-1.5">
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="type-data text-step--1 text-navy underline decoration-rule-strong underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent"
                          >
                            {link.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                          </a>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>
            ))}
          </Container>
        </section>
      ) : null}
    </main>
  );
}
