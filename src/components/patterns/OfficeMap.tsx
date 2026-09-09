"use client";

import { useState } from "react";

/**
 * The office location, loaded only when someone asks for it.
 *
 * A Google Maps iframe is roughly 900KB and opens a connection to Google for
 * every visitor who lands on the page, whether or not they care where the
 * office is. Almost nobody on a contact page needs the map — they need the
 * phone number. So the frame stays a static panel until it is clicked, and
 * the request is made by the reader rather than on their behalf.
 *
 * The panel is not a fake map. Drawing a grey grid to imply a map that is
 * not loaded reads as a broken embed; this says plainly what it is and what
 * clicking will do.
 */
export function OfficeMap({
  query,
  label,
}: {
  /** Address as it should be searched, not as it is displayed. */
  query: string;
  /** Shown on the closed panel — where this is, in the reader's terms. */
  label: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const search = encodeURIComponent(query);

  if (loaded) {
    return (
      <div className="overflow-hidden rounded-[10px] border border-rule-strong">
        <iframe
          src={`https://www.google.com/maps?q=${search}&output=embed`}
          title={`Map showing ${label}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[380px] w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group flex h-[380px] w-full flex-col items-center justify-center gap-4 rounded-[10px] border border-rule-strong bg-paper-sunk transition-colors hover:bg-paper"
    >
      <span aria-hidden className="block h-[3px] w-12 bg-gold-mark" />
      <span className="type-heading text-step-1 text-navy">{label}</span>
      <span className="type-data text-step--1 text-ink-faint">
        Load the map
      </span>
      {/* Said once, quietly, because it is the honest reason the map is not
          already here. */}
      <span className="type-data text-step--2 text-ink-faint">
        Opens a connection to Google Maps
      </span>
    </button>
  );
}
