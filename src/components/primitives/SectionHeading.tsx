import type { ReactNode } from "react";
import { AnimatedText } from "@/components/primitives/AnimatedText";

/**
 * A section heading with the group's gold rule above it.
 *
 * The mark is the point. Gold is half the identity in the SLG logo and was
 * defined as a token but used nowhere on the site, so every page read as
 * navy-on-paper and the brand arrived only in the header image. A short rule
 * is where it belongs: the file's own note says gold is a mark, never a
 * fill, and a 3px rule is a mark that never competes with the type under it.
 *
 * The heading assembles word by word like every other heading on the site;
 * the gold rule is already in place when it starts, so the mark reads as the
 * thing the words arrive under.
 *
 * Uses --gold-mark rather than --gold. The brand value measures 2.99:1 on
 * --paper-sunk, just under the 3:1 a graphical element needs; the mark token
 * is the same hue darkened until it clears on every ground.
 */
export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <span
        aria-hidden
        className="block h-[3px] w-12 bg-gold-mark"
      />
      <AnimatedText as="h2" delay={0.1} className="type-heading mt-5 text-step-4">
        {children}
      </AnimatedText>
    </div>
  );
}
