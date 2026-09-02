import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/patterns/PagePlaceholder";

export const metadata: Metadata = {
  title: "SLG Renewables",
  description: "Complete solar power systems supplied and installed across Bangladesh.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="SLG Renewables"
      intro="Complete solar systems — panels, inverters, storage, charge controllers and protection — sized for homes, businesses and industry."
      division="renewables"
    />
  );
}
