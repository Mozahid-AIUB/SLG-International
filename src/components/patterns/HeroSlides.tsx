"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";

export type Slide = {
  src: string;
  alt: string;
  /** Shown in the indicator row, so a viewer knows what they are looking at. */
  label: string;
};

const INTERVAL = 6000;

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

  useEffect(() => {
    setAuto(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
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
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 flex h-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${index * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="relative h-full"
            style={{ width: `${100 / slides.length}%` }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={1600}
              height={900}
              priority={i === 0}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
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
                  className={`type-data text-[0.8125rem] transition-colors ${
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
