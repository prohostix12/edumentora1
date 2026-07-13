import ContactSection from "@/components/contact/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Edumentora",
  description:
    "Get in touch with Edumentora for expert guidance on credit transfer, university admissions, and career counseling. Visit our offices in Calicut and Kochi.",
};

export default function ContactPage() {
  return (
    <main className="pt-20">
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary/5 to-primary-dark/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-heading mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-lg text-paragraph max-w-2xl mx-auto">
            Start Your Journey with Edumentora. Reach out to our team for expert
            guidance on credit transfer and admissions.
          </p>
        </div>
      </section>
      <ContactSection />
    </main>
  );
}
