"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Scene = "rise" | "parallax" | "scale" | "mask" | "stagger" | "counter";

/**
 * Scroll-driven motion, tied continuously to position rather than fired once.
 *
 * Reveal handles the site's one-shot entrances and still does. This is for
 * the heavier work the home page asks for: an element that keeps moving as
 * you scroll through it, so the page feels built rather than assembled.
 *
 * Every scene is transform and opacity only. Animating layout properties
 * would relayout the page on every frame of every scroll, which is how a
 * heavy animation turns into a slow one.
 *
 * GSAP is imported inside the effect so it stays out of the server bundle,
 * and the whole thing is skipped under prefers-reduced-motion: the content
 * is then exactly what it would have been with no script at all.
 */
export function ScrollScene({
  children,
  scene = "rise",
  delay = 0,
  className,
}: {
  children: ReactNode;
  scene?: Scene;
  /** Seconds. Staggers siblings that share a trigger. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

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
        if (scene === "parallax") {
          gsap.fromTo(
            node,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: node,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
          return;
        }

        if (scene === "scale") {
          gsap.fromTo(
            node,
            { scale: 1.12 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: node,
                start: "top bottom",
                end: "top 40%",
                scrub: true,
              },
            },
          );
          return;
        }

        if (scene === "mask") {
          // A wipe, not a fade: the block arrives edge-first, the way a
          // printed sheet is drawn out rather than faded up.
          gsap.fromTo(
            node,
            { clipPath: "inset(0 100% 0 0)", opacity: 1 },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 1.1,
              delay,
              ease: "power3.inOut",
              scrollTrigger: { trigger: node, start: "top 85%" },
            },
          );
          return;
        }

        if (scene === "stagger") {
          const kids = Array.from(node.children) as HTMLElement[];
          gsap.fromTo(
            kids,
            { y: 34, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              delay,
              stagger: 0.09,
              ease: "power3.out",
              scrollTrigger: { trigger: node, start: "top 82%" },
            },
          );
          return;
        }

        if (scene === "counter") {
          // Counts whatever integer the element already contains, so the
          // markup stays correct with no script and needs no data attribute.
          const target = parseInt(node.textContent?.replace(/\D/g, "") ?? "0", 10);
          if (!target) return;
          const obj = { v: 0 };
          const suffix = node.textContent?.replace(/[\d\s]/g, "") ?? "";
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            delay,
            ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 85%" },
            onUpdate: () => {
              node.textContent = `${Math.round(obj.v)}${suffix}`;
            },
          });
          return;
        }

        gsap.fromTo(
          node,
          { y: 46, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: node, start: "top 85%" },
          },
        );
      }, node);

      revert = () => ctx.revert();
    })();

    return () => revert?.();
  }, [scene, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
