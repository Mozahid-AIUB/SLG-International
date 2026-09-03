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
        {/* The supplied logo is a circular badge carrying four lines of type.
            At header scale that type is unreadable, so the badge's own SLG
            monogram is used as the mark and the name is set beside it. */}
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/brand/group-mark-400.webp"
            alt="Sahara Link Group"
            width={400}
            height={197}
            className="h-11 w-auto sm:h-12"
            priority
          />
          <span className="hidden border-l border-rule pl-4 type-heading text-[1.0625rem] leading-tight text-navy sm:block">
            Sahara Link Group
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="type-data text-[0.9375rem] text-ink-soft transition-colors hover:text-navy"
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
          <summary className="flex cursor-pointer list-none items-center gap-2 border border-rule-strong px-3 py-2 type-data text-[0.875rem] text-navy [&::-webkit-details-marker]:hidden">
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
                  className="block px-4 py-3 type-data text-[0.9375rem] text-navy"
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
