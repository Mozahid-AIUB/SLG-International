"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Poster first, video second.
 *
 * The poster is a plain image, so it is what the browser measures for LCP and
 * what a visitor sees immediately. The video file is only attached after mount,
 * and only when it is worth the bytes: a viewer on a metered or slow connection,
 * or one who has asked for reduced motion, keeps the still and downloads
 * nothing. On a Dhaka mobile connection that is the difference between a page
 * that loads and one that does not.
 */
export function HeroVideo({
  src,
  poster,
  caption,
}: {
  src: string;
  poster: string;
  caption: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;

    if (connection?.saveData) return;
    if (connection?.effectiveType && /2g/.test(connection.effectiveType)) return;

    setActive(true);
  }, []);

  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;
    // Autoplay can still be refused; the poster stays visible underneath.
    void video.play().catch(() => {});
  }, [active]);

  return (
    <figure className="relative">
      {/* A band, not a full 16:9 block. The clip pushes in slowly, and at full
          height the frame lands so close that it reads as a grey wall rather
          than an elevator. */}
      <div className="relative h-[300px] w-full overflow-hidden bg-ink md:h-[420px] lg:h-[500px]">
        <Image
          src={poster}
          alt={caption}
          width={1280}
          height={720}
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
        {active ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
      </div>
      <figcaption className="sr-only">{caption}</figcaption>
    </figure>
  );
}
