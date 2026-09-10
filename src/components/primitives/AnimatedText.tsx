"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Type that arrives word by word as it reaches the fold.
 *
 * The site's headings previously faded in as whole blocks, which reads as a
 * slide rather than a page. Splitting on words and lifting each from behind
 * its own edge makes the line assemble itself, and that small difference is
 * most of what separates a site that feels built from one that feels laid
 * out.
 *
 * Split at run time from the text already in the DOM, so the markup stays a
 * single readable heading: search engines and screen readers see one
 * sentence, not a pile of spans.
 *
 * Words, not letters. Per-letter animation is the tell of a template — it
 * takes far longer to resolve, and on a heading of any length the reader is
 * left waiting for their own content.
 */
export function AnimatedText({
  children,
  as: Tag = "div",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  /** Seconds. Offsets this block against others sharing the viewport. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let revert: (() => void) | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Anything but plain text is left alone. The split rebuilds the
        // element from its textContent, so a link, a <strong> or any other
        // child inside would be silently destroyed — which is exactly what
        // happened to a /contact link on the manpower page. Falling back to
        // a plain fade keeps the markup intact and still animates.
        if (node.children.length > 0) {
          gsap.fromTo(
            node,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay,
              ease: "power3.out",
              scrollTrigger: { trigger: node, start: "top 88%" },
            },
          );
          return;
        }

        const text = node.textContent ?? "";
        if (!text.trim()) return;

        node.textContent = "";
        const inners: HTMLElement[] = text
          .split(/\s+/)
          .filter(Boolean)
          .map((word) => {
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
            inner.textContent = word;
            clip.appendChild(inner);
            node.appendChild(clip);
            node.appendChild(document.createTextNode(" "));
            return inner;
          });

        // fromTo rather than from, for the same reason as HeroReveal: a
        // second effect run in development would otherwise read the current
        // position as the destination and animate to nowhere.
        gsap.fromTo(inners, { yPercent: 110 }, {
          yPercent: 0,
          duration: 0.8,
          delay,
          stagger: 0.038,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 88%" },
        });
      }, node);

      revert = () => ctx.revert();
    })();

    return () => revert?.();
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
