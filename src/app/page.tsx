import Hero from "@/components/hero/Hero";
import AboutIntro from "@/components/about/AboutIntro";
import ReadyToGrow from "@/components/common/ReadyToGrow";
import MissionVision from "@/components/about/MissionVision";
import TrustedUniversities from "@/components/universities/TrustedUniversities";
import Achievements from "@/components/common/Achievements";
import ProcessSteps from "@/components/common/ProcessSteps";
import CreditPrograms from "@/components/programs/CreditPrograms";
import BTechInstitute from "@/components/about/BTechInstitute";
import WhyRightChoice from "@/components/common/WhyRightChoice";
import UniversityGrid from "@/components/universities/UniversityGrid";
import TestimonialSlider from "@/components/testimonials/TestimonialSlider";
import FAQ from "@/components/faq/FAQ";
import ContactSection from "@/components/contact/ContactSection";
import CTA from "@/components/common/CTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutIntro />
      <ReadyToGrow />
      <MissionVision />
      <TrustedUniversities />
      <Achievements />
      <ProcessSteps />
      <CreditPrograms />
      <BTechInstitute />
      <WhyRightChoice />
      <UniversityGrid />
      <TestimonialSlider />
      <FAQ />
      <CTA />
      <ContactSection />
    </main>
  );
}
