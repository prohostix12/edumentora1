import WILPContent from "@/components/wilp/WILPContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work Integrated Learning Program - Edumentora",
  description:
    "Edumentora's WILP credit transfer helps working professionals continue their education without losing progress. Carry your credits forward and keep growing on the job and in the classroom.",
};

export default function WorkIntegratedLearningProgramPage() {
  return (
    <main>
      <WILPContent />
    </main>
  );
}
