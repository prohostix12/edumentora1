import CreditTransferContent from "@/components/credit-transfer/CreditTransferContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credit Transfer - Edumentora",
  description:
    "Know more on Credit Transfers. Explore UG, PG, and Diploma Credit Transfer Programs with Edumentora and start your journey today.",
};

export default function CreditTransferPage() {
  return (
    <main>
      <CreditTransferContent />
    </main>
  );
}
