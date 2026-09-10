"use client";

import { useEffect } from "react";

/**
 * Momentum scrolling, and the clock every scroll animation runs on.
 *
 * Native scroll on Windows moves in hard steps, and scrub-linked animations
 * inherit that stutter no matter how well they are written. Lenis smooths
 * the position and, once ScrollTrigger is driven from the same ticker, every
 * scroll-linked scene on the page moves on one clock instead of two.
 *
 * Off under prefers-reduced-motion — momentum is exactly the kind of motion
 * that setting is asking not to have — and off on coarse pointers, where the
 * platform's own scrolling is already smooth and hijacking it makes a phone
 * feel broken.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let stop: (() => void) | undefined;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.05,
        // Long, shallow ease: the page keeps travelling after the wheel
        // stops without feeling like it is sliding on ice.
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      stop = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => stop?.();
  }, []);

  return null;
}
