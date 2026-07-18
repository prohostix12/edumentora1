import FAQ from "@/components/faq/FAQ";
import CTA from "@/components/common/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Edumentora",
  description:
    "Find answers to frequently asked questions about credit transfer, university admissions, and our student services at Edumentora.",
};

export default function FAQPage() {
  return (
    <main className="pt-20">
      <FAQ />
      <CTA />
    </main>
  );
}
