import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { divisions, site } from "@/content/site";

export function Footer() {
  const { address } = site;

  return (
    <footer className="border-t border-rule bg-ink text-paper-sunk">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="type-heading text-[1.125rem] text-paper-raised">
            {site.name}
          </p>
          <p className="type-body mt-3 max-w-[36ch] text-[0.9375rem] text-paper-sunk/70">
            {site.tagline}
          </p>
        </div>

        <div>
          <h2 className="type-data text-[0.875rem] text-paper-sunk/60">
            Divisions
          </h2>
          <ul className="mt-4 space-y-2.5">
            {divisions.map((division) => (
              <li key={division.id}>
                <Link
                  href={division.href}
                  className="type-data text-[0.9375rem] text-paper-raised transition-colors hover:text-white"
                >
                  {division.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="type-data text-[0.875rem] text-paper-sunk/60">
            Head office
          </h2>
          <address className="type-data mt-4 space-y-1 text-[0.9375rem] not-italic text-paper-raised">
            <p>{address.line1}</p>
            <p>{address.line2}</p>
            <p>
              {address.city} {address.postalCode}, {address.country}
            </p>
          </address>
          <ul className="mt-5 space-y-1.5">
            {site.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="type-data text-[0.9375rem] text-paper-raised transition-colors hover:text-white"
                >
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                className="type-data text-[0.9375rem] text-paper-raised transition-colors hover:text-white"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="py-5">
          <p className="type-data text-[0.8125rem] text-paper-sunk/50">
            © {new Date().getFullYear()} {site.name}. Registered in Bangladesh.
          </p>
        </Container>
      </div>
    </footer>
  );
}
