import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/patterns/PagePlaceholder";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach Sahara Link Group in Rampura, Dhaka.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="Contact"
      intro="One office in Rampura, Dhaka, handling all three divisions."
    />
  );
}
