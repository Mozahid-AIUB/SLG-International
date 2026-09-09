import type { ReactNode } from "react";

export type PlateRow = {
  label: string;
  value: ReactNode;
};

/**
 * The site's signature component.
 *
 * Every generator and lift controller carries an engraved nameplate: model,
 * capacity, origin, voltage. That is still the structure here — a titled
 * header over label/value pairs, surfacing what a buyer checks first.
 *
 * The surface is now glass rather than stamped steel: a translucent ground
 * over a backdrop blur, a hairline highlight along the top edge, and a soft
 * cast shadow. The previous treatment was flat white with grey rules and
 * read as a spreadsheet rather than as a plate.
 *
 * The gold seam under the header is the one brand mark on the component.
 * It uses --gold-mark, the hue-matched darkening of the logo gold that
 * clears 3:1 on every ground including --paper-sunk.
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
      className={`relative overflow-hidden rounded-[10px] border border-white/70 bg-white/55 shadow-[0_18px_44px_-24px_rgba(10,18,40,0.45)] backdrop-blur-md ${className}`}
      // The highlight along the top edge is what sells glass: real glass
      // catches the light on its top lip, and without it the panel reads as
      // flat translucent plastic.
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85), 0 18px 44px -24px rgba(10,18,40,0.45)" }}
    >
      <div className="border-b border-gold-mark/45 bg-white/45 px-4 py-3">
        <h3 className="type-data text-[0.8125rem] text-navy">{title}</h3>
      </div>

      <dl className="divide-y divide-white/60">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[minmax(0,7.5rem)_1fr] gap-4 px-4 py-3"
          >
            <dt className="type-data text-[0.8125rem] text-ink-faint">
              {row.label}
            </dt>
            <dd className="type-data text-[0.875rem] text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>

      {footnote ? (
        <p className="border-t border-white/60 px-4 py-2.5 type-data text-[0.75rem] text-ink-faint">
          {footnote}
        </p>
      ) : null}
    </div>
  );
}
