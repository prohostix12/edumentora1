import Programs from "@/components/programs/Programs";
import CTA from "@/components/common/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs - Edumentora",
  description:
    "Explore our comprehensive range of educational programs including Credit Transfer, University Admissions, Study Abroad, Career Counseling, and more.",
};

export default function ProgramsPage() {
  return (
    <main className="pt-20">
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 to-primary-dark/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-heading mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Our <span className="gradient-text">Programs</span>
          </h1>
          <p className="text-lg text-paragraph max-w-2xl mx-auto">
            We offer a comprehensive range of educational programs tailored to meet
            the diverse needs of students seeking academic growth and career
            advancement.
          </p>
        </div>
      </section>
      <Programs />
      <CTA />
    </main>
  );
}
