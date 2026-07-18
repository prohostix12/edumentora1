import Hero from "@/components/hero/Hero";
import HeroStats from "@/components/hero/HeroStats";
import AboutIntro from "@/components/about/AboutIntro";
import Achievements from "@/components/common/Achievements";
import UniversityGrid from "@/components/universities/UniversityGrid";
import CreditPrograms from "@/components/programs/CreditPrograms";
import ProcessSteps from "@/components/common/ProcessSteps";
import TestimonialSlider from "@/components/testimonials/TestimonialSlider";

export default function HomePage() {
  return (
    <main className="w-full relative bg-white">
      {/* Chapter 1: Hero Segment (White) */}
      <Hero />
      <HeroStats />

      {/* Chapter 2: About Edumentora, B.Tech and Mission/Vision (Light Navy) */}
      <AboutIntro />

      {/* Chapter 3: Achievements & Student Pain Points (White) */}
      <Achievements />

      {/* Chapter 4: Universities Carousel & Partner Marquee (Light Red) */}
      <UniversityGrid />

      {/* Chapter 5: Credit Programs Timeline & Why Right Choice (White) */}
      <CreditPrograms />

      {/* Chapter 6: How It Works Journey (Dark Navy) */}
      <ProcessSteps />

      {/* Chapter 7: Student Reviews, Free Call Inquiry Form & Offices (White) */}
      <TestimonialSlider />
    </main>
  );
}
