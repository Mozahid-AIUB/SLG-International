import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";

const nav = [
  { label: "Engineering", href: "/engineering" as const },
  { label: "Renewables", href: "/renewables" as const },
  { label: "International", href: "/manpower" as const },
  { label: "About", href: "/about" as const },
  { label: "Contact", href: "/contact" as const },
];

export function Header() {
  return (
    <header className="border-b border-rule bg-paper-raised">
      <Container className="flex items-center justify-between gap-6 py-4">
        {/* The whole circular badge, not a crop of it.
            A rectangular crop of the monogram was used here before, and it
            clipped: the badge is a circle, so any rectangle tight enough to
            exclude the gold ring at the corners also cut the top of the S,
            the right of the globe and the tail of the swoosh. Shown whole at
            44-48px the wordmark still reads and nothing is cut. */}
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/brand/group-badge-144.webp"
            alt="Sahara Link Group"
            width={144}
            height={144}
            className="h-11 w-11 sm:h-12 sm:w-12"
            priority
          />
          {/* The name as the brand sets it, not as Archivo sets it. The
              wordmark was being retyped in the site's own face beside a logo
              that already carries it, so the header showed the company name
              in two different typefaces at once. */}
          <Image
            src="/brand/wordmark-540.webp"
            alt=""
            aria-hidden
            width={540}
            height={97}
            className="hidden h-7 w-auto border-l border-rule pl-4 sm:block"
            priority
          />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="type-data text-step--1 text-ink-soft transition-colors hover:text-navy"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Disclosure rather than a scripted drawer: the site is a static
            export, and this needs no JavaScript to work. */}
        <details className="group relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 border border-rule-strong px-3 py-2 type-data text-step--1 text-navy [&::-webkit-details-marker]:hidden">
            <span className="grid gap-[3px]" aria-hidden="true">
              <span className="block h-[1.5px] w-4 bg-current" />
              <span className="block h-[1.5px] w-4 bg-current" />
              <span className="block h-[1.5px] w-4 bg-current" />
            </span>
            Menu
          </summary>
          <ul className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-56 border border-rule-strong bg-paper-raised shadow-lg">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-rule last:border-b-0">
                <Link
                  href={item.href}
                  className="block px-4 py-3 type-data text-step--1 text-navy"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </Container>
    </header>
  );
}
