import type { ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/primitives/Container";

export function PageHero({
  title,
  lead,
  aside,
}: {
  title: string;
  lead: string;
  aside?: ReactNode;
}) {
  return (
    <section className="blueprint relative isolate overflow-hidden border-b border-rule">
      {/*
        The group mark, set very large and very faint behind the heading.

        Two jobs. It puts the brand on the page rather than leaving it to the
        header image, and it gives the glass data plate something to refract:
        the drafting grid alone is regular enough that a blur over it barely
        registers, while a curved edge passing under the panel is visible as
        refraction and is what makes the glass read as glass.

        4% opacity. At anything higher it competes with the headline it sits
        behind, and the point is a watermark, not a second logo. Hidden from
        assistive technology and non-interactive.
      */}
      <Image
        src="/brand/group-512.webp"
        alt=""
        aria-hidden
        width={512}
        height={512}
        priority={false}
        className="pointer-events-none absolute -left-16 -top-24 -z-10 hidden w-[34rem] max-w-none opacity-[0.04] lg:block"
      />
      <Container
        className={
          aside
            ? // Tops aligned, not bottoms. Aligned to the bottom the plate
              // floated with its head in open space while the heading sat
              // under it; from the top both columns start on one line and
              // the plate reads as part of the same block.
              "grid gap-12 py-16 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-16"
            : "py-16 md:py-20"
        }
      >
        <div>
          {/* The same gold mark the section headings carry, so a page opens
              the way its sections do. */}
          <span aria-hidden className="block h-[3px] w-12 bg-gold-mark" />
          <h1 className="type-display mt-6 text-step-5">{title}</h1>
          <p className="type-body mt-6 text-step-0">{lead}</p>
        </div>
        {aside}
      </Container>
    </section>
  );
}
