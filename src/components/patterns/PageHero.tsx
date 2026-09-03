import type { ReactNode } from "react";
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
    <section className="blueprint border-b border-rule">
      <Container
        className={
          aside
            ? "grid gap-12 py-16 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-end"
            : "py-16 md:py-20"
        }
      >
        <div>
          <h1 className="type-display text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem]">
            {title}
          </h1>
          <p className="type-body mt-6 text-[1.0625rem]">{lead}</p>
        </div>
        {aside}
      </Container>
    </section>
  );
}
