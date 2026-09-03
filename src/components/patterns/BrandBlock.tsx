import Image from "next/image";
import { DataPlate, type PlateRow } from "@/components/patterns/DataPlate";
import type { Brand } from "@/content/brands";

/**
 * One represented brand: what it is, where it is used, and what protects it.
 *
 * The plate carries the facts a buyer checks first. The protection set is a
 * definition list rather than a row of cards — it is reference material, and
 * reads better as one.
 */
export function BrandBlock({ brand, index }: { brand: Brand; index: number }) {
  const imageFirst = index % 2 === 0;

  const rows: PlateRow[] = [
    {
      label: "Type",
      value: brand.category === "elevator" ? "Elevator" : "Diesel generator",
    },
    { label: "Applications", value: brand.applications.join(", ") },
    ...(brand.origin ? [{ label: "Origin", value: brand.origin }] : []),
    { label: "Supplied by", value: "SLG Engineering" },
  ];

  return (
    <article id={brand.id} className="scroll-mt-24 py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className={imageFirst ? "" : "lg:order-2"}>
          <Image
            src={brand.image}
            alt={brand.imageAlt}
            width={1200}
            height={900}
            className="w-full border border-rule object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>

        <div className={imageFirst ? "" : "lg:order-1"}>
          <h3 className="type-display text-[2rem] sm:text-[2.375rem]">
            {brand.name}
          </h3>
          <p className="type-heading mt-2 text-[1.125rem] text-accent">
            {brand.headline}
          </p>
          <p className="type-body mt-5 text-[1.0625rem]">{brand.positioning}</p>

          <DataPlate title={`${brand.name} — supply summary`} rows={rows} className="mt-8" />
        </div>
      </div>

      <div className="mt-12 border-t border-rule pt-10">
        <h4 className="type-heading text-[1.125rem]">{brand.featuresTitle}</h4>
        <dl className="mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {brand.features.map((feature) => (
            <div key={feature.title} className="border-t border-rule pt-4">
              <dt className="type-data text-[0.9375rem] text-navy">
                {feature.title}
              </dt>
              <dd className="type-body mt-1.5 text-[0.9375rem]">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
        <p className="type-data mt-8 text-[0.8125rem] text-ink-faint">
          {brand.disclaimer}
        </p>
      </div>
    </article>
  );
}
