"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

export type Slide = {
  src: string;
  alt: string;
  /** Shown in the indicator row, so a viewer knows what they are looking at. */
  label: string;
  /** Optional motion for this slide. `src` stays the poster and the fallback,
   *  so a slide with no video, or a viewer who should not be sent one, gets
   *  exactly the photograph it had before. */
  video?: string;
};

const INTERVAL = 6000;

/** Pixels the backdrop shifts against the cursor, at the very edge of the
 *  hero. Small on purpose — see the note where it is applied. */
const MAX_TILT = 14;

/**
 * Hero slides.
 *
 * The images move; the wordmark, proposition and calls to action stay put.
 * Sliding the text with them would make the one thing a visitor must read
 * into a moving target.
 *
 * Auto-advance stops on hover and on keyboard focus, and never starts at all
 * under reduced motion — where the indicators still work, so the other slides
 * remain reachable by choice.
 */
export function HeroSlides({
  slides,
  className,
  children,
}: {
  slides: Slide[];
  className?: string;
  children?: ReactNode;
}) {
  const [index, setIndex] = useState(0);
  /** Whether advancing on a timer is allowed at all. */
  const [auto, setAuto] = useState(false);
  /** Temporarily held, while a pointer or keyboard focus is inside. */
  const [paused, setPaused] = useState(false);
  /** Whether this viewer should be sent video at all. Decided once, on the
   *  client, and false until then so the server and the first paint agree. */
  const [motionOk, setMotionOk] = useState(false);
  /** Cursor position as -1..1 on each axis, 0,0 when the pointer is away. */
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Next frame rather than straight away. Setting state synchronously in an
    // effect body cascades a second render before the first has painted, and
    // the React Compiler flags it. Same pattern Reveal uses.
    const id = requestAnimationFrame(() =>
      setAuto(!window.matchMedia("(prefers-reduced-motion: reduce)").matches),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    // Three ways to say no, and any of them settles it. Reduced motion is a
    // stated preference. Save-Data is a stated preference too — the browser
    // is telling us the viewer pays for this. And a 2G connection will not
    // finish the file before the slide has moved on anyway, so it would cost
    // the data and show nothing.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const cheap =
      conn?.saveData === true ||
      (typeof conn?.effectiveType === "string" && /2g/.test(conn.effectiveType));

    const id = requestAnimationFrame(() => setMotionOk(!reduced && !cheap));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!auto || paused || slides.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      INTERVAL,
    );
    return () => clearInterval(id);
  }, [auto, paused, slides.length]);

  return (
    <div
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setTilt({ x: 0, y: 0 });
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onMouseMove={(e) => {
        if (!motionOk) return;
        // Where the cursor is inside the hero, as -1..1 on each axis.
        const b = e.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((e.clientX - b.left) / b.width - 0.5) * 2,
          y: ((e.clientY - b.top) / b.height - 0.5) * 2,
        });
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 flex h-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={{
          width: `${slides.length * 100}%`,
          // The slide track carries the slide change; the parallax rides on
          // top of it as a translate of a few pixels against the cursor.
          // MAX_TILT is 14px deliberately: enough that the picture feels like
          // it sits behind the glass, small enough that nobody notices it as
          // an effect. The media inside is scaled 105% so the shift never
          // drags an edge into view.
          transform: `translateX(-${index * (100 / slides.length)}%) translate3d(${-tilt.x * MAX_TILT}px, ${-tilt.y * MAX_TILT}px, 0)`,
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="relative h-full"
            style={{ width: `${100 / slides.length}%` }}
          >
            {slide.video && motionOk ? (
              // Poster is the photograph, so the slide looks right from the
              // first frame and identical to the no-video case if the file
              // never arrives. Only the slide on screen plays: the others
              // would burn a decoder each for something nobody is watching.
              <video
                key={slide.video}
                src={slide.video}
                poster={slide.src}
                autoPlay={i === index}
                muted
                loop
                playsInline
                // metadata, not auto. The poster is already the photograph,
                // so the hero is complete before a byte of video arrives;
                // autoplay then pulls what it needs on its own. With "auto"
                // the first clip put 1.2MB in front of the load event, which
                // on the connection most of this audience is using is the
                // whole hero paid for twice.
                preload={i === 0 ? "metadata" : "none"}
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-105 object-cover"
                ref={(el) => {
                  if (!el) return;
                  if (i === index) void el.play().catch(() => {});
                  else el.pause();
                }}
              />
            ) : (
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1600}
                height={900}
                priority={i === 0}
                sizes="100vw"
                className="absolute inset-0 h-full w-full scale-105 object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Heaviest where the text sits, lifting to the right so the photograph
          still reads. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/94 via-ink/82 to-ink/45"
      />

      <div className="relative flex h-full flex-col justify-center">
        {children}

        <div className="absolute bottom-8 left-0 w-full">
          <div className="mx-auto flex w-full max-w-[1140px] gap-3 px-6 md:px-10">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => {
                  // Choosing a slide hands control over for good; the carousel
                  // should not yank it back a few seconds later.
                  setAuto(false);
                  setIndex(i);
                }}
                aria-current={i === index}
                className="group flex flex-col gap-2 py-2"
              >
                <span
                  className={`block h-[3px] w-16 transition-colors ${
                    i === index ? "bg-paper-raised" : "bg-white/30 group-hover:bg-white/60"
                  }`}
                />
                <span
                  className={`type-data text-step--1 transition-colors ${
                    i === index ? "text-paper-raised" : "text-paper-sunk/55"
                  }`}
                >
                  {slide.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
