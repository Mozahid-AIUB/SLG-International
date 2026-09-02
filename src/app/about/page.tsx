import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/patterns/PagePlaceholder";

export const metadata: Metadata = {
  title: "About Sahara Link Group",
  description: "Fifteen years of equipment supply and overseas workforce placement, from one office in Dhaka.",
};

export default function Page() {
  return (
    <PagePlaceholder
      title="About Sahara Link Group"
      intro="Fifteen years bringing equipment into Bangladesh and sending skilled workers out to employers overseas."
    />
  );
}
