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
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 to-primary-dark/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-heading mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-lg text-paragraph max-w-2xl mx-auto">
            Find answers to common questions about our credit transfer process,
            university partnerships, and student services.
          </p>
        </div>
      </section>
      <FAQ />
      <CTA />
    </main>
  );
}
