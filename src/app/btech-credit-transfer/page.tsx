import BTechContent from "@/components/btech/BTechContent";
import CTA from "@/components/common/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B.Tech Credit Transfer - Edumentora",
  description:
    "Take the next step in your engineering career with Edumentora's B.Tech Credit Transfer Program. Resume your studies, complete your degree, and build a successful future.",
};

export default function BTechCreditTransferPage() {
  return (
    <main>
      <BTechContent />
      <CTA />
    </main>
  );
}
