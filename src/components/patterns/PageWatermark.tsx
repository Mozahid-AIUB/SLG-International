import Image from "next/image";

/**
 * The group mark, held still behind every page.
 *
 * Fixed rather than scrolled, so the content travels over it the way print
 * moves over a watermark rather than carrying a picture along with it. It
 * sits in the root layout, behind everything, which is why sections that
 * want it to show through carry their ground at 80% rather than fully
 * opaque.
 *
 * 4.5% opacity and 34rem wide. Both numbers were arrived at by looking:
 * larger crowded the headline it sits behind, and any stronger it stopped
 * being a watermark and started being a second logo competing with the one
 * in the header.
 *
 * Large screens only. On a phone the mark spans most of the viewport and
 * sits directly under the body copy, where even at this opacity it is
 * texture behind text rather than a mark on paper.
 *
 * Purely presentational: hidden from assistive technology, non-interactive,
 * and being a background it simply disappears under forced colours.
 */
export function PageWatermark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 hidden items-center justify-center lg:flex"
    >
      <Image
        src="/brand/group-512.webp"
        alt=""
        width={512}
        height={512}
        priority={false}
        className="w-[34rem] max-w-none opacity-[0.045]"
      />
    </div>
  );
}
