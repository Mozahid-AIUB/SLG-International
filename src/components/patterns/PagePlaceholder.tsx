import { Container } from "@/components/primitives/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { DivisionId } from "@/content/site";

/**
 * Temporary shell for routes that exist in the information architecture but
 * have not been built yet. Keeps navigation honest — a link never leads
 * nowhere — and gets replaced page by page.
 */
export function PagePlaceholder({
  title,
  intro,
  division,
}: {
  title: string;
  intro: string;
  division?: DivisionId;
}) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1" data-division={division}>
        <section className="blueprint border-b border-rule">
          <Container className="py-20 md:py-28">
            <h1 className="type-display text-[2.25rem] sm:text-[2.75rem]">
              {title}
            </h1>
            <p className="type-body mt-6 text-[1.0625rem]">{intro}</p>
            <p className="type-data mt-10 border-l-2 border-accent pl-5 text-[0.9375rem] text-ink-faint">
              This page is still being written.
            </p>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
