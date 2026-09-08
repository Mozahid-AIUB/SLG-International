import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Reveal } from "@/components/primitives/Reveal";
import { DataPlate } from "@/components/patterns/DataPlate";
import { PageHero } from "@/components/patterns/PageHero";
import { divisions, site } from "@/content/site";
import { leadership, technology } from "@/content/team";

export const metadata: Metadata = {
  title: "About Sahara Link Group",
  description:
    "Fifteen years of equipment supply and overseas workforce placement, from one office in Dhaka.",
};

export default function AboutPage() {
  return (
    <main id="main" className="flex-1">
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
        <Container className="grid gap-10 py-16 md:py-20 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
          <Reveal effect="settle">
            {/*
              Shown whole rather than cropped to a frame: the nameplate above
              him carries the tagline set beside it, so cropping to a portrait
              box would cut away half of what the picture is here to say.
            */}
            <Image
              src="/about/founder-1000.webp"
              alt="The founder of Sahara Link Group, photographed in the company's Dhaka office beneath the group nameplate"
              width={900}
              height={1600}
              className="w-full border border-rule-strong"
              sizes="(min-width: 1024px) 26rem, 100vw"
              priority
            />
          </Reveal>

          <Reveal className="flex flex-col justify-center" delay={120}>
            <p className="type-data text-[0.8125rem] text-ink-faint">
              Founder
            </p>

            {/*
              The tagline is the largest type on the page. It is the client's
              own words, cast in metal on the wall behind him.
            */}
            <blockquote className="mt-5">
              <p className="type-display text-[1.75rem] sm:text-[2.25rem] lg:text-[2.5rem]">
                {site.tagline}
              </p>
            </blockquote>

            <div className="mt-9 border-t border-rule pt-8">
              <p className="type-body text-[1.0625rem]">
                The group began with a single question a Dhaka developer keeps
                asking: who supplies the lift, and who services it in year
                three? Answering that properly meant importing directly rather
                than reselling, and keeping engineers on staff rather than
                subcontracting the maintenance.
              </p>
              <p className="type-body mt-5 text-[1.0625rem]">
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
        Divisions are listed rather than carded: they are three parts of one
        company, not three products competing for a click. The inbound/outbound
        label is the only structure they need, because that distinction is the
        whole organising idea of the group.
      */}
      <section className="border-b border-rule">
        <Container className="py-16 md:py-20">
          <h2 className="type-heading text-[1.75rem]">What the group does</h2>

          <ul className="mt-10 border-t border-rule-strong">
            {divisions.map((division) => (
              <li key={division.id} data-division={division.id}>
                <Link
                  href={division.href}
                  className="group grid items-baseline gap-x-8 gap-y-3 border-b border-rule py-7 md:grid-cols-[minmax(0,15rem)_1fr_auto]"
                >
                  <span className="type-heading text-[1.25rem] transition-colors group-hover:text-accent">
                    {division.name}
                  </span>
                  <span className="type-body text-[1rem]">
                    {division.summary}
                  </span>
                  <span className="type-data text-[0.8125rem] text-ink-faint">
                    {division.direction === "inbound"
                      ? "Into Bangladesh"
                      : "Out to the world"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
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
          <Container className="py-16 md:py-20">
            <h2 className="type-heading text-[1.75rem]">Leadership</h2>

            <ul className="mt-10 border-t border-rule-strong">
              {leadership.map((member) => (
                <li
                  key={member.id}
                  className="grid gap-6 border-b border-rule py-10 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-14"
                >
                  <div>
                    {/*
                      Fixed 4:5 frame. The supplied portraits are all
                      different shapes, and left at their own ratios the
                      names below them would sit on three different lines.
                    */}
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.photoAlt ?? `${member.name}, ${member.role}`}
                        width={800}
                        height={1000}
                        className="mb-5 aspect-4/5 w-full border border-rule-strong object-cover object-top"
                        sizes="(min-width: 1024px) 17rem, 100vw"
                      />
                    ) : null}

                    <h3 className="type-heading text-[1.25rem]">
                      {member.name}
                    </h3>
                    <p className="type-data mt-1.5 text-[0.9375rem] text-accent">
                      {member.role}
                    </p>
                    {member.credential ? (
                      <p className="type-data mt-1 text-[0.8125rem] text-ink-faint">
                        {member.credential}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    {member.bio?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="type-body mt-5 text-[1.0625rem] first:mt-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {member.remit && !member.bio ? (
                      <p className="type-body text-[1.0625rem]">
                        {member.remit}
                      </p>
                    ) : null}

                    {/*
                      Listed, not numbered: these are six things one person
                      does, not six steps in an order.
                    */}
                    {member.specialisms?.length ? (
                      <div className="mt-8">
                        <h4 className="type-data text-[0.8125rem] text-ink-faint">
                          Areas of specialisation
                        </h4>
                        <ul className="mt-3 grid grid-cols-1 gap-x-10 border-t border-rule sm:grid-cols-2">
                          {member.specialisms.map((item) => (
                            <li
                              key={item}
                              className="border-b border-rule py-2.5 type-data text-[0.9375rem] text-ink"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {/*
        The technology contact is a nameplate, not an introduction. A visitor
        reaching this section has a broken site or an expiring domain, and
        wants the address that fixes it — the same job the plates do for a
        generator's service details.
      */}
      {technology.length > 0 ? (
        <section className="border-b border-rule bg-paper-raised">
          <Container className="py-16 md:py-20">
            <h2 className="type-heading text-[1.75rem]">
              Website and systems
            </h2>
            <p className="type-body mt-4 text-[1.0625rem]">
              The group&rsquo;s website, domain and server are administered
              in-house. Reach the person below about anything technical.
            </p>

            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
              {technology.map((person) => (
                <div
                  key={person.id}
                  // Only split into a portrait column when there is a portrait
                  // to put in it; otherwise the plate would be squeezed into
                  // half the width beside an empty gap.
                  className={
                    person.photo
                      ? "grid gap-8 sm:grid-cols-[minmax(0,11rem)_1fr]"
                      : ""
                  }
                >
                  {person.photo ? (
                    <Image
                      src={person.photo}
                      alt={person.photoAlt ?? `${person.name}, ${person.role}`}
                      width={900}
                      height={1200}
                      className="w-full border border-rule-strong"
                      sizes="(min-width: 640px) 11rem, 100vw"
                    />
                  ) : null}

                  <div>
                    <DataPlate
                      title={person.role}
                      rows={[
                        { label: "Name", value: person.name },
                        ...(person.email
                          ? [
                              {
                                label: "Email",
                                value: (
                                  <a
                                    href={`mailto:${person.email}`}
                                    className="transition-colors hover:text-accent"
                                  >
                                    {person.email}
                                  </a>
                                ),
                              },
                            ]
                          : []),
                        ...(person.phone
                          ? [
                              {
                                label: "WhatsApp",
                                value: (
                                  <a
                                    href={`https://wa.me/${person.phone.replace(/\D/g, "")}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="transition-colors hover:text-accent"
                                  >
                                    {person.phone}
                                  </a>
                                ),
                              },
                            ]
                          : []),
                        {
                          label: "Administers",
                          value: person.responsibilities.join(", "),
                        },
                      ]}
                      footnote={person.remit}
                    />

                    {person.links?.length ? (
                      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                        {person.links.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              className="type-data border-b border-rule-strong pb-0.5 text-[0.875rem] text-navy transition-colors hover:border-accent hover:text-accent"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="bg-paper-sunk py-16 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="type-heading text-[1.75rem]">Where to find us</h2>
            <p className="type-body mt-4 text-[1.0625rem]">
              One office handles all divisions. Equipment enquiries and
              recruitment enquiries reach the same desk.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-block border border-navy px-5 py-2.5 type-data text-[0.9375rem] text-navy transition-colors hover:bg-navy hover:text-paper-raised"
            >
              Contact the office
            </Link>
          </div>

          <DataPlate
            title="Head office"
            rows={[
              { label: "Address", value: site.address.line1 },
              { label: "Area", value: site.address.line2 },
              {
                label: "City",
                value: `${site.address.city} ${site.address.postalCode}`,
              },
              { label: "Phone", value: site.phones[0] },
              // Derived from site.emails rather than listed by hand, so a
              // new division's address appears here the moment it is added
              // to the content file.
              ...Object.entries(site.emails).map(([division, address]) => ({
                label: division.charAt(0).toUpperCase() + division.slice(1),
                value: (
                  <a
                    href={`mailto:${address}`}
                    className="transition-colors hover:text-accent"
                  >
                    {address}
                  </a>
                ),
              })),
            ]}
          />
        </Container>
      </section>
    </main>
  );
}
