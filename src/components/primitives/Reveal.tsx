"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealEffect = "rise" | "settle";

/**
 * Reveals its children when they scroll into view.
 *
 * The reference site does this with AOS, which drags in jQuery, Waypoints and
 * Bootstrap behind it. One IntersectionObserver and a CSS transition give the
 * same result at no dependency cost, and the site is a static export where
 * every kilobyte of script is a kilobyte the buyer waits for.
 *
 * Reveals once and then stops observing. Elements that re-animate every time
 * you scroll past them draw attention to the animation rather than the content.
 */
export function Reveal({
  children,
  as: Tag = "div",
  effect = "rise",
  delay = 0,
  immediate = false,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  effect?: RevealEffect;
  /** Milliseconds. Used to stagger siblings. */
  delay?: number;
  /** For above-the-fold content: play on mount rather than on scroll. */
  immediate?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (immediate) {
      // Next frame, so the transition has an initial state to move from.
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      // Fire a little before the element reaches the fold, so it has finished
      // arriving by the time it is properly in view.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <Tag
      ref={ref}
      data-reveal={effect}
      data-shown={shown ? "true" : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
