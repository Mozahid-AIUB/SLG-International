"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The home page's opening sequence.
 *
 * One orchestrated arrival rather than four independent fades. Everything is
 * on a single timeline so the parts land in a deliberate order — mark, then
 * headline by line, then the sentence under it, then the two buttons — and
 * the whole thing is over inside 1.6s.
 *
 * The headline is split into lines and each is wiped up from behind a
 * clipping edge, the way type is revealed in a title sequence. It is split on
 * word boundaries at run time from the text already in the DOM, so the markup
 * stays one readable heading for search engines and screen readers.
 *
 * Under prefers-reduced-motion nothing runs and nothing is hidden: the hero
 * is simply there, which is the correct result rather than a degraded one.
 */
export function HeroReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let revert: (() => void) | undefined;

    (async () => {
      const { gsap } = await import("gsap");

      const ctx = gsap.context(() => {
        const heading = node.querySelector<HTMLElement>("[data-hero-heading]");
        const items = gsap.utils.toArray<HTMLElement>("[data-hero-item]");

        // Wrap each word so it can be lifted from behind its own edge.
        let words: HTMLElement[] = [];
        if (heading) {
          const text = heading.textContent ?? "";
          heading.textContent = "";
          words = text.split(/\s+/).filter(Boolean).map((word) => {
            const clip = document.createElement("span");
            clip.style.display = "inline-block";
            clip.style.overflow = "hidden";
            clip.style.verticalAlign = "top";
            const inner = document.createElement("span");
            inner.style.display = "inline-block";
            inner.textContent = word;
            clip.appendChild(inner);
            heading.appendChild(clip);
            heading.appendChild(document.createTextNode(" "));
            return inner;
          });
        }

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from("[data-hero-mark]", { opacity: 0, x: -18, duration: 0.7 }, 0);

        if (words.length) {
          tl.from(
            words,
            { yPercent: 108, duration: 0.85, stagger: 0.045 },
            0.15,
          );
        }

        if (items.length) {
          tl.from(
            items,
            { opacity: 0, y: 26, duration: 0.8, stagger: 0.12 },
            0.6,
          );
        }
      }, node);

      revert = () => ctx.revert();
    })();

    return () => revert?.();
  }, []);

  return <div ref={root}>{children}</div>;
}
