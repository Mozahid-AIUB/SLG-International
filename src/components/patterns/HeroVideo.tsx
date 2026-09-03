"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Still first, motion second — and motion only if a clip is supplied.
 *
 * The still is a plain image, so it is what the browser measures for LCP and
 * what a visitor sees immediately. A video file, when there is one, attaches
 * after mount and only when it is worth the bytes: a viewer on a metered or
 * slow connection, or one who asked for reduced motion, keeps the still and
 * downloads nothing.
 *
 * Omit `src` and this is simply a hero image with an overlay. That is the
 * current state: the supplied clip rendered a flat green block during
 * hardware-accelerated playback on the client's machine, so it was pulled.
 * Restoring motion is a matter of passing `src` again.
 */
export function HeroVideo({
  src,
  poster,
  caption,
  children,
  startAt = 0,
  endAt,
  className = "relative h-[300px] w-full overflow-hidden bg-ink md:h-[420px] lg:h-[500px]",
}: {
  /** Omit for a still-only hero. */
  src?: string;
  poster: string;
  caption: string;
  /** Rendered above the footage, over a scrim. */
  children?: React.ReactNode;
  /** Loop only part of the file — seconds from the start. */
  startAt?: number;
  /** Loop only part of the file — seconds; the tail after this never plays. */
  endAt?: number;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!src) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;

    if (connection?.saveData) return;
    if (connection?.effectiveType && /2g/.test(connection.effectiveType)) return;

    setActive(true);
  }, [src]);

  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;

    // Play a window of the file rather than all of it, so an unwanted head or
    // tail never reaches the screen. Cheaper and lossless compared with
    // re-encoding, and the trim points stay editable.
    const seekToStart = () => {
      if (startAt > 0) video.currentTime = startAt;
    };

    const onTimeUpdate = () => {
      if (endAt !== undefined && video.currentTime >= endAt) {
        video.currentTime = startAt;
      }
    };

    video.addEventListener("loadedmetadata", seekToStart);
    video.addEventListener("timeupdate", onTimeUpdate);
    if (video.readyState >= 1) seekToStart();

    // Autoplay can still be refused; the poster stays visible underneath.
    void video.play().catch(() => {});

    return () => {
      video.removeEventListener("loadedmetadata", seekToStart);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [active, startAt, endAt]);

  return (
    <figure className="relative">
      <div className={className}>
        <Image
          src={poster}
          alt={children ? "" : caption}
          width={1280}
          height={720}
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
        {active && src ? (
          <video
            ref={videoRef}
            // Media fragment, so the browser plays the window from the first
            // frame it decodes. Waiting for JS to seek lets the head of the
            // file flash on screen first.
            src={
              endAt !== undefined
                ? `${src}#t=${startAt},${endAt}`
                : startAt > 0
                  ? `${src}#t=${startAt}`
                  : src
            }
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}

        {children ? (
          <>
            {/* The clip is pale grey. Overlaid type needs a real scrim, not a
                token one — heaviest where the text sits, lifting to the right
                so the footage still reads. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-ink/94 via-ink/82 to-ink/45"
            />
            <div className="relative flex h-full items-center">{children}</div>
          </>
        ) : null}
      </div>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
