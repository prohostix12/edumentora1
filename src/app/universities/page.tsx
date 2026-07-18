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
      <UniversityGrid />
      <CTA />
    </main>
  );
}
