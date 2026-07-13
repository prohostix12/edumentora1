import AboutPageContent from "@/components/about/AboutPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Edumentora",
  description:
    "Transform past efforts into future success with Edumentora. Learn about our academic credit transfer services, mission, vision, TIMS partnership, and frequently asked questions.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
