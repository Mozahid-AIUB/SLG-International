"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * The group mark behind a page hero, drifting.
 *
 * It was static and read as a printed watermark. Given a very slow rotation
 * and a shallow breath of scale it reads as alive instead — and, because the
 * data plate beside it is glass, an edge that moves under the panel is what
 * makes the blur visibly refract rather than sit there.
 *
 * Deliberately slower than anything else on the site: a 90-second turn is
 * under a quarter of a degree per second, which is felt rather than watched.
 * Anything quicker and a mark at 4% opacity starts pulling the eye off the
 * headline it sits behind, which is the one thing a watermark must not do.
 *
 * Off under prefers-reduced-motion, and off below lg where the hero has no
 * room for it. The mark stays visible in both cases; only the motion goes.
 */
export function HeroWatermark() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    let revert: (() => void) | undefined;

    (async () => {
      const { gsap } = await import("gsap");
      const ctx = gsap.context(() => {
        // Rotation and scale on separate timelines with different periods, so
        // the two never resolve to the same loop and the drift does not read
        // as a repeating cycle.
        gsap.to(node, {
          rotation: 360,
          duration: 90,
          ease: "none",
          repeat: -1,
        });
        gsap.to(node, {
          scale: 1.08,
          duration: 14,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, node);
      revert = () => ctx.revert();
    })();

    return () => revert?.();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute -left-16 -top-24 -z-10 hidden lg:block"
    >
      <Image
        src="/brand/group-512.webp"
        alt=""
        width={512}
        height={512}
        priority={false}
        className="w-[34rem] max-w-none opacity-[0.04]"
      />
    </div>
  );
}
