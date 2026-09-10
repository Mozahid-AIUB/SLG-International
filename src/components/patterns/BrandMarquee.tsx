"use client";

import { useEffect, useRef } from "react";

/**
 * The seven brand names, running as a continuous strip.
 *
 * A ticker is a rhythm, not a reference: names sliding past cannot be
 * scanned for a particular one. So this sits above the brand grid rather
 * than replacing it — the strip says "seven of them, always moving", and the
 * grid below is where a buyer checks whether Perkins is actually on the list.
 *
 * The list is rendered twice and the track translated by exactly half its
 * width, which is what makes the loop seamless: at -50% the second copy is
 * standing where the first one started, so the jump back to 0 is invisible.
 *
 * Stops under prefers-reduced-motion. Perpetual motion at the edge of vision
 * is the clearest case that setting exists for.
 */
export function BrandMarquee({ items }: { items: string[] }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = track.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let revert: (() => void) | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const ctx = gsap.context(() => {
        gsap.fromTo(
          node,
          { xPercent: 0 },
          { xPercent: -50, duration: 34, ease: "none", repeat: -1 },
        );
      }, node);
      revert = () => ctx.revert();
    })();

    return () => revert?.();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Wide fades at both ends, so names enter and leave the strip rather
          than being chopped off against the container edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/5 bg-gradient-to-r from-ink via-ink/85 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/5 bg-gradient-to-l from-ink via-ink/85 to-transparent"
      />

      <div ref={track} className="flex w-max items-center">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center">
            {items.map((name) => (
              <li key={name} className="flex items-center whitespace-nowrap">
                <span className="type-display px-9 text-step-5 text-paper-raised/90">
                  {name}
                </span>
                {/* The group's gold, used as the separator rather than a
                    slash or a bullet. */}
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-mark" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
