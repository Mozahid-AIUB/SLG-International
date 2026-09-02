import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";

const nav = [
  { label: "Engineering", href: "/engineering" },
  { label: "Renewables", href: "/renewables" },
  { label: "International", href: "/manpower" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="border-b border-rule bg-paper-raised">
      <Container className="flex items-center justify-between gap-8 py-4">
        {/* The supplied logo is a circular badge carrying four lines of type.
            At header scale that type is unreadable, so the badge's own SLG
            monogram is used as the mark and the name is set beside it. */}
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/brand/group-mark-400.webp"
            alt="Sahara Link Group"
            width={400}
            height={197}
            className="h-12 w-auto"
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
      </Container>
    </header>
  );
}
