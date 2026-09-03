import type { CSSProperties } from "react";

/**
 * The group in one line: goods arrive from the world's manufacturers, pass
 * through Dhaka, and skilled workers leave for employers overseas.
 *
 * Drawn as a technical schematic rather than an illustration — it belongs to
 * the same vernacular as the data plates, and it explains the business faster
 * than the paragraph above it does. Costs a few kilobytes; a hero video on a
 * Dhaka 4G connection would cost several megabytes.
 */

const nodes = [
  { label: "Global manufacturers", note: "Seven brands" },
  { label: "Dhaka", note: "Sahara Link Group", emphasis: true },
  { label: "Overseas employers", note: "Placement" },
];

const links = [
  { label: "Equipment", division: "engineering", delay: "0s" },
  { label: "Workforce", division: "manpower", delay: "2.75s" },
];

export function FlowSchematic() {
  return (
    <figure className="mt-2 border-t border-rule pt-10">
      {/* Aligned from the top so the connectors sit on the same axis as the
          node markers rather than drifting into the labels below them. */}
      <div className="grid items-start gap-y-1 md:grid-cols-[auto_1fr_auto_1fr_auto]">
        <Node {...nodes[0]} />
        <Link {...links[0]} />
        <Node {...nodes[1]} />
        <Link {...links[1]} />
        <Node {...nodes[2]} />
      </div>

      <figcaption className="sr-only">
        Equipment moves from global manufacturers into Bangladesh through
        Sahara Link Group in Dhaka; skilled workers move from Bangladesh out to
        employers overseas.
      </figcaption>
    </figure>
  );
}

function Node({
  label,
  note,
  emphasis = false,
}: {
  label: string;
  note: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 py-2 md:block md:py-0 md:text-center">
      <span
        aria-hidden="true"
        className={
          emphasis
            ? "block h-3 w-3 shrink-0 bg-navy md:mx-auto md:mb-3"
            : "block h-2 w-2 shrink-0 bg-rule-strong md:mx-auto md:mb-3.5"
        }
      />
      <div>
        <p
          className={
            emphasis
              ? "type-heading text-[1.125rem] text-navy"
              : "type-data text-[0.9375rem] text-ink"
          }
        >
          {label}
        </p>
        <p className="type-data text-[0.8125rem] text-ink-faint">{note}</p>
      </div>
    </div>
  );
}

function Link({
  label,
  division,
  delay,
}: {
  label: string;
  division: string;
  delay: string;
}) {
  return (
    <div data-division={division} className="py-2 md:px-5 md:py-0">
      <div
        className="flow-line ml-[0.1875rem] h-10 w-px bg-rule-strong md:ml-0 md:mt-[5px] md:h-px md:w-full"
        style={{ "--flow-delay": delay } as CSSProperties}
      />
      <p className="type-data ml-[1.375rem] mt-1 text-[0.8125rem] text-ink-faint md:ml-0 md:mt-3 md:text-center">
        {label}
      </p>
    </div>
  );
}
