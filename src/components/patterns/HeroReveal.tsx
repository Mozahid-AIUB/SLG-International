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

        // Split to letters, but wrap by word.
        //
        // Each word is still one inline-block, so the line breaks where it
        // always did — splitting to bare letters lets a line wrap mid-word,
        // which is how per-letter animation usually ruins a headline. The
        // letters inside each word then lift individually.
        //
        // The stagger is 0.022s. Per-letter reads as premium only while it
        // stays quick: this headline is 44 characters, so at that rate the
        // last one lands under a second after the first, and nobody is left
        // waiting to read the one sentence the page has to say. Letters
        // inside a word overlap heavily, which is what makes it look like
        // type being set rather than characters being dealt out.
        let letters: HTMLElement[] = [];
        if (heading) {
          const text = heading.textContent ?? "";
          heading.textContent = "";
          text.split(/\s+/).filter(Boolean).forEach((word) => {
            const wordBox = document.createElement("span");
            wordBox.style.display = "inline-block";
            wordBox.style.whiteSpace = "nowrap";

            for (const ch of Array.from(word)) {
              const clip = document.createElement("span");
              clip.style.display = "inline-block";
            // The clip box is the line box, and both display and heading
            // roles run line-heights below 1.15 — shorter than Archivo's
            // glyph box. A plain overflow:hidden therefore shears the tails
            // off g, j, p, q and y and never restores them, because the clip
            // stays after the animation ends. Padding the box down and
            // pulling it back with a negative margin gives the descenders
            // room without moving the baseline or opening a gap the word can
            // be seen through before it arrives.
              clip.style.overflow = "hidden";
              clip.style.paddingBottom = "0.18em";
              clip.style.marginBottom = "-0.18em";
              clip.style.verticalAlign = "top";

              const inner = document.createElement("span");
              inner.style.display = "inline-block";
              inner.textContent = ch;
              clip.appendChild(inner);
              wordBox.appendChild(clip);
              letters.push(inner);
            }

            heading.appendChild(wordBox);
            heading.appendChild(document.createTextNode(" "));
          });
        }

        // fromTo, never from. React runs effects twice in development, and
        // gsap.from() reads the element's current value as its destination —
        // so a second run that starts while the first is still at opacity 0
        // animates 0 to 0 and the block never appears. It did exactly that
        // here. Explicit destinations make the timeline idempotent however
        // many times it is built.
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          "[data-hero-mark]",
          { opacity: 0, x: -18 },
          { opacity: 1, x: 0, duration: 0.7 },
          0,
        );

        if (letters.length) {
          tl.fromTo(
            letters,
            { yPercent: 112 },
            { yPercent: 0, duration: 0.62, stagger: 0.022 },
            0.15,
          );
        }

        if (items.length) {
          tl.fromTo(
            items,
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
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
