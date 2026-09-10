import type { ReactNode } from "react";
import { HeroWatermark } from "@/components/patterns/HeroWatermark";
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
    <section className="relative isolate overflow-hidden border-b border-rule">
      <HeroWatermark />

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
