import ApprenticeshipContent from "@/components/apprenticeship/ApprenticeshipContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apprenticeship Program - Edumentora",
  description:
    "Edumentora's Employee Apprenticeship-Based Learning Program (EALP) converts your work experience into academic credits. Earn a recognized UG or PG degree faster while continuing your job.",
};

export default function ApprenticeshipProgramPage() {
  return (
    <main>
      <ApprenticeshipContent />
    </main>
  );
}
