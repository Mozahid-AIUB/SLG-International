import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { divisions, site } from "@/content/site";

const pages = [
  { label: "About", href: "/about" as const },
  { label: "Start an enquiry", href: "/enquiry" as const },
  { label: "Contact", href: "/contact" as const },
];

/**
 * Two bands, after the pattern used by the large lift manufacturers: a dark
 * contact band where the phone number is the largest thing on it, then a
 * light band carrying the mark, the address and the link rows.
 *
 * The number is set large on purpose. In this market buyers call; they do not
 * fill in forms and wait.
 */
export function Footer() {
  const { address } = site;
  const whatsappDigits = site.whatsapp.replace(/\D/g, "");

  return (
    <footer className="border-t border-rule">
      <div className="bg-ink text-paper-raised">
        <Container className="py-14 md:py-16">
          <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-start">
            <div>
              <p className="type-data text-[0.875rem] text-paper-sunk/55">
                Speak to the team
              </p>
              <ul className="mt-4 space-y-2">
                {site.phones.map((phone, index) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className={
                        index === 0
                          ? "type-display block text-[1.875rem] text-paper-raised transition-colors hover:text-white sm:text-[2.25rem]"
                          : "type-data block text-[1.125rem] text-paper-sunk/80 transition-colors hover:text-white"
                      }
                    >
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/${whatsappDigits}`}
                className="mt-6 inline-flex items-center gap-3 border border-white/25 px-5 py-3 type-data text-[0.9375rem] text-paper-raised transition-colors hover:border-white/60 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.33A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3 .79.8-2.93-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.14c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.56.13-.16.25-.63.8-.78.96-.14.17-.29.19-.53.07a6.7 6.7 0 0 1-3.36-2.94c-.25-.44.25-.4.72-1.35.08-.17.04-.31-.02-.44-.07-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.76 2.76 0 0 0-.86 2.05c0 1.2.88 2.37 1 2.53.12.17 1.72 2.63 4.17 3.69 1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29Z" />
                </svg>
                Message on WhatsApp
              </a>
            </div>

            <div className="md:justify-self-end">
              <p className="type-data text-[0.875rem] text-paper-sunk/55">
                Head office
              </p>
              <address className="type-data mt-4 space-y-1 text-[0.9375rem] not-italic text-paper-raised">
                <p>{address.line1}</p>
                <p>{address.line2}</p>
                <p>
                  {address.city} {address.postalCode}, {address.country}
                </p>
              </address>
              <ul className="mt-4 space-y-1">
                {Object.values(site.emails).map((email) => (
                  <li key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="type-data text-[0.9375rem] text-paper-sunk/80 transition-colors hover:text-white"
                    >
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-paper-sunk">
        <Container className="py-12 md:py-14">
          <Link href="/" className="inline-block">
            <Image
              src="/brand/group-mark-400.webp"
              alt="Sahara Link Group"
              width={400}
              height={197}
              className="h-14 w-auto"
            />
          </Link>
          <p className="type-body mt-5 max-w-[42ch] text-[0.9375rem]">
            {site.tagline}
          </p>

          <nav className="mt-10 border-t border-rule-strong pt-6">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {divisions.map((division) => (
                <li key={division.id}>
                  <Link
                    href={division.href}
                    className="type-data text-[0.9375rem] text-navy transition-colors hover:text-accent"
                  >
                    {division.name}
                  </Link>
                </li>
              ))}
              {pages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="type-data text-[0.9375rem] text-ink-soft transition-colors hover:text-navy"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="type-data mt-8 text-[0.8125rem] text-ink-faint">
            © {new Date().getFullYear()} {site.name}. Registered in Bangladesh.
          </p>
        </Container>
      </div>
    </footer>
  );
}
