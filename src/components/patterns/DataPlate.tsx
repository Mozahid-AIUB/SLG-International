import type { ReactNode } from "react";

export type PlateRow = {
  label: string;
  value: ReactNode;
};

/**
 * The site's signature component.
 *
 * Every generator and lift controller carries an engraved metal nameplate:
 * model, capacity, origin, voltage. Square, dense, undecorated. Brands and
 * products are presented in that form rather than as rounded cards, because
 * it comes from the subject and because it surfaces exactly what a buyer
 * checks first.
 */
export function DataPlate({
  title,
  rows,
  footnote,
  className = "",
}: {
  title: string;
  rows: PlateRow[];
  footnote?: string;
  className?: string;
}) {
  return (
    <div
      className={`border border-rule-strong bg-paper-raised ${className}`}
      // Two hairlines rather than a shadow: plates are stamped, not floated.
      style={{ boxShadow: "inset 0 0 0 1px var(--paper-raised)" }}
    >
      <div className="border-b border-rule-strong bg-paper-sunk px-4 py-2.5">
        <h3 className="type-data text-[0.8125rem] text-navy">{title}</h3>
      </div>

      <dl className="divide-y divide-rule">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[minmax(0,7.5rem)_1fr] gap-4 px-4 py-2.5"
          >
            <dt className="type-data text-[0.8125rem] text-ink-faint">
              {row.label}
            </dt>
            <dd className="type-data text-[0.875rem] text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>

      {footnote ? (
        <p className="border-t border-rule px-4 py-2.5 type-data text-[0.75rem] text-ink-faint">
          {footnote}
        </p>
      ) : null}
    </div>
  );
}
