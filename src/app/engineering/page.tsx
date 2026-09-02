import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/patterns/PagePlaceholder";

export const metadata: Metadata = {
  title: "Sahara Link Engineering",
  description: "Elevators and diesel generators supplied, installed and maintained across Bangladesh.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="Sahara Link Engineering"
      intro="Elevators from Sigma, Sino Hyundai and Fuji. Diesel generators from Perkins, Cummins, Ricardo and EVOL. Supplied, installed and maintained across Bangladesh."
      division="engineering"
    />
  );
}
