import TestimonialSlider from "@/components/testimonials/TestimonialSlider";
import CTA from "@/components/common/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials - Edumentora",
  description:
    "Read what our students say about their experience with Edumentora. Trusted by thousands for credit transfer and university admissions.",
};

export default function TestimonialsPage() {
  return (
    <main className="pt-20">
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 to-primary-dark/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-heading mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Student <span className="gradient-text">Testimonials</span>
          </h1>
          <p className="text-lg text-paragraph max-w-2xl mx-auto">
            Your trusted partner in education, offering expert guidance and
            innovative learning resources to empower students and professionals for
            academic and career success.
          </p>
        </div>
      </section>
      <TestimonialSlider />
      <CTA />
    </main>
  );
}
