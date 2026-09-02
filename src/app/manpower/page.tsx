import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/patterns/PagePlaceholder";

export const metadata: Metadata = {
  title: "Sahara Link International",
  description: "Bangladeshi workforce placed with employers overseas.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="Sahara Link International"
      intro="Connecting talent, building futures. Bangladeshi workforce placed with employers overseas."
      division="manpower"
    />
  );
}
