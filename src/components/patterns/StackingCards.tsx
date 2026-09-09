"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Stacks its children as cards that pin and pile up on scroll.
 *
 * Each card sticks at the top of the viewport while the next one rides up
 * over it, so the pile grows as you read down. The card underneath shrinks
 * and dims slightly, which is what keeps the stack legible — without it the
 * top edges line up and the pile reads as one tall card.
 *
 * GSAP drives it rather than IntersectionObserver: this needs a value tied
 * continuously to scroll position, not a one-shot trigger, and ScrollTrigger's
 * scrub is exactly that. The library is imported inside the effect so it stays
 * out of the server bundle and off the critical path.
 *
 * Respects prefers-reduced-motion by leaving the cards as an ordinary
 * stacked list: no pinning, no transforms, nothing that moves under a reader
 * who asked for less of it.
 */
export function StackingCards({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Below lg the cards are full-bleed and there is no room to show a pile;
    // the same match the layout uses.
    const wide = window.matchMedia("(min-width: 1024px)");

    let cleanup: (() => void) | undefined;

    async function build() {
      cleanup?.();
      cleanup = undefined;
      if (reduced.matches || !wide.matches || !node) return;

      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");

        // Each card is stacked in the same place by CSS (sticky top), and
        // GSAP only animates what the pile does to the cards underneath.
        // Pinning each card with ScrollTrigger was tried first and the cards
        // collapsed into each other: with pinSpacing off nothing reserved the
        // scroll distance the pile needs, so four cards landed on the same
        // 700px of page and the text of one printed over the next.
        cards.forEach((card, index) => {
          if (index === cards.length - 1) return;

          // Scale only, never opacity. Fading a card that is still sitting
          // on the pile makes it translucent, and the card below prints
          // straight through its text — two people's biographies in the same
          // paragraph. Depth here comes from size and from the shadow the
          // arriving card casts.
          gsap.to(card, {
            scale: 0.94,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              // Starts as the next card's top edge enters the lower third,
              // finishes when it has settled onto the pile.
              start: "top bottom",
              end: "top 120px",
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          });
        });
      }, node);

      cleanup = () => ctx.revert();
    }

    build();

    const rebuild = () => void build();
    reduced.addEventListener("change", rebuild);
    wide.addEventListener("change", rebuild);

    return () => {
      reduced.removeEventListener("change", rebuild);
      wide.removeEventListener("change", rebuild);
      cleanup?.();
    };
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
