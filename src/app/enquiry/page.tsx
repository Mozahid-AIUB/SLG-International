import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/patterns/PagePlaceholder";

export const metadata: Metadata = {
  title: "Start an enquiry",
  description: "Send project requirements to Sahara Link Group.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="Start an enquiry"
      intro="Tell us the load, the building and the timeline. We will come back with a specification and a price."
    />
  );
}
