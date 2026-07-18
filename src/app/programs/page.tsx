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
    <main>
      <Programs />
      <CTA />
    </main>
  );
}
