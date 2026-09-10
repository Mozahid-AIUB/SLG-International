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
        const text = node.textContent ?? "";
        if (!text.trim()) return;

        node.textContent = "";
        const inners: HTMLElement[] = text
          .split(/\s+/)
          .filter(Boolean)
          .map((word) => {
            const clip = document.createElement("span");
            clip.style.display = "inline-block";
            clip.style.overflow = "hidden";
            clip.style.verticalAlign = "top";
            const inner = document.createElement("span");
            inner.style.display = "inline-block";
            inner.textContent = word;
            clip.appendChild(inner);
            node.appendChild(clip);
            node.appendChild(document.createTextNode(" "));
            return inner;
          });

        gsap.from(inners, {
          yPercent: 110,
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
