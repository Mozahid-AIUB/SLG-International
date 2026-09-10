"use client";

import { useMemo, useState } from "react";
import { site } from "@/content/site";

/**
 * Composes an enquiry and hands it to WhatsApp or email.
 *
 * The site is a static export with no server behind it, so there is nothing
 * to POST to. Rather than pretend — a form that appears to submit and
 * silently loses the enquiry is worse than no form — this builds a properly
 * structured message from the fields and opens it in whichever channel the
 * sender prefers.
 *
 * WhatsApp leads because that is the number the client actually answers, and
 * because a mailto: link is dead weight for anyone without a mail client
 * configured on the device. Email stays as the second route for procurement
 * teams who need a paper trail.
 *
 * Nothing is transmitted from this page. The message is assembled in the
 * browser and handed to an app the sender chooses, which also means no
 * contact details pass through a third-party form service.
 */
const divisions = [
  { id: "engineering", label: "Elevators or generators" },
  { id: "renewables", label: "Solar systems" },
  { id: "manpower", label: "Overseas workforce" },
] as const;

type DivisionId = (typeof divisions)[number]["id"];

export function EnquiryForm() {
  const [division, setDivision] = useState<DivisionId>("engineering");
  const [name, setName] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [contact, setContact] = useState("");
  const [detail, setDetail] = useState("");

  /** The prompt changes with the division, because what we need to quote a
   *  lift is not what we need to size an array or to place a crew. */
  const prompt: Record<DivisionId, string> = {
    engineering:
      "Building type and number of floors, passenger or load capacity, and when it is needed. For a generator: the connected load and whether it is standby or prime.",
    // The client's own quotation checklist, from their Renewables flyer.
    // Asking for exactly what they ask for means the first reply can be a
    // quotation rather than a request for more information.
    renewables:
      "Your latest electricity bill and monthly consumption, roof size or a rooftop photo, the site address, the building type (home, office, commercial, factory), your backup requirement, and a preferred system size or budget if you have one.",
    manpower:
      "The roles, how many people, where the work is, and when you need them on site.",
  };

  const message = useMemo(() => {
    const divisionLabel =
      divisions.find((d) => d.id === division)?.label ?? division;
    return [
      `Enquiry: ${divisionLabel}`,
      "",
      `Name: ${name || "—"}`,
      `Organisation: ${organisation || "—"}`,
      `Contact: ${contact || "—"}`,
      "",
      "Requirement:",
      detail || "—",
    ].join("\n");
  }, [division, name, organisation, contact, detail]);

  const ready = name.trim() !== "" && contact.trim() !== "" && detail.trim() !== "";

  const whatsappHref = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  const emailHref = `mailto:${site.emails[division]}?subject=${encodeURIComponent(
    `Enquiry: ${divisions.find((d) => d.id === division)?.label ?? ""}`,
  )}&body=${encodeURIComponent(message)}`;

  const field =
    "w-full border border-rule-strong bg-paper-raised px-4 py-3 type-data text-step-0 text-ink transition-colors focus:border-accent focus:outline-none";
  const label = "type-data text-step--1 text-ink-faint";

  return (
    <form
      className="grid gap-6"
      // Nothing to submit to. Enter should not reload the page and lose
      // everything the sender has typed.
      onSubmit={(event) => event.preventDefault()}
    >
      <fieldset>
        <legend className={label}>What is it about</legend>
        <div className="mt-3 grid gap-px border border-rule-strong bg-rule-strong sm:grid-cols-3">
          {divisions.map((item) => {
            const active = division === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setDivision(item.id)}
                aria-pressed={active}
                className={`px-4 py-3.5 type-data text-step--1 transition-colors ${
                  active
                    ? "bg-navy text-paper-raised"
                    : "bg-paper-raised text-ink hover:bg-paper-sunk"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className={label}>Your name</span>
          <input
            className={field}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </label>

        <label className="grid gap-2">
          <span className={label}>Organisation</span>
          <input
            className={field}
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
            autoComplete="organization"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className={label}>Phone or email to reach you</span>
        <input
          className={field}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          autoComplete="tel"
          required
        />
      </label>

      <label className="grid gap-2">
        <span className={label}>What the project needs</span>
        <span className="type-body text-step--1 text-ink-faint">
          {prompt[division]}
        </span>
        <textarea
          className={`${field} min-h-[9rem] resize-y`}
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          required
        />
      </label>

      <div className="border-t border-rule pt-6">
        <p className="type-data text-step--1 text-ink-faint">
          Send it however suits you. Both routes carry the same message.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={ready ? whatsappHref : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!ready}
            className={`inline-block border px-6 py-3 type-data text-step--1 transition-colors ${
              ready
                ? "border-navy bg-navy text-paper-raised hover:bg-ink"
                : "pointer-events-none border-rule-strong bg-paper-sunk text-ink-faint"
            }`}
          >
            Send on WhatsApp
          </a>

          <a
            href={ready ? emailHref : undefined}
            aria-disabled={!ready}
            className={`inline-block border px-6 py-3 type-data text-step--1 transition-colors ${
              ready
                ? "border-navy text-navy hover:bg-navy hover:text-paper-raised"
                : "pointer-events-none border-rule-strong text-ink-faint"
            }`}
          >
            Send by email
          </a>
        </div>

        {/* Said once, plainly. Someone filling in a form is entitled to know
            where it goes, and "nowhere until you press send" is the honest
            answer here. */}
        <p className="type-data mt-4 text-step--2 text-ink-faint">
          {ready
            ? "Nothing is sent until you choose a route above."
            : "Fill in your name, a way to reach you, and what the project needs."}
        </p>
      </div>
    </form>
  );
}
