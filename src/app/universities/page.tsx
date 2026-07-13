import UniversityGrid from "@/components/universities/UniversityGrid";
import CTA from "@/components/common/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Universities - Edumentora",
  description:
    "Discover our partner universities including Glocal University, Arni University, and Maya Devi University. Start your credit transfer journey today.",
};

export default function UniversitiesPage() {
  return (
    <main className="pt-20">
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 to-primary-dark/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-heading mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Partner <span className="gradient-text">Universities</span>
          </h1>
          <p className="text-lg text-paragraph max-w-2xl mx-auto">
            We have partnered with leading UGC-recognized universities across India
            to provide you with the best credit transfer and admission opportunities.
          </p>
        </div>
      </section>
      <UniversityGrid />
      <CTA />
    </main>
  );
}
