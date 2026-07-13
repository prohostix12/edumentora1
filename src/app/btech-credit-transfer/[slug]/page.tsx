import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, GraduationCap, MapPin, ShieldCheck, Clock3 } from "lucide-react";
import { btechLocations, getBTechLocationBySlug } from "@/lib/btech-locations";

interface BTechLocationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return btechLocations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: BTechLocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getBTechLocationBySlug(slug);

  if (!location) {
    return {
      title: "Location Not Found - Edumentora",
    };
  }

  return {
    title: `${location.label} - Edumentora`,
    description: `Explore ${location.label} with Edumentora. Resume your engineering education through trusted academic credit transfer support in ${location.place}.`,
  };
}

export default async function BTechLocationPage({ params }: BTechLocationPageProps) {
  const { slug } = await params;
  const location = getBTechLocationBySlug(slug);

  if (!location) notFound();

  return (
    <main className="pt-20 bg-bg-section">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider">
              <MapPin className="h-3.5 w-3.5" />
              {location.place}
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-heading mb-6 leading-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {location.label}
            </h1>
            <p className="mx-auto max-w-3xl text-base sm:text-lg text-paragraph leading-relaxed font-medium">
              Continue your engineering journey in {location.place} through a structured academic credit transfer path with Edumentora. We help students preserve previously earned credits, reduce delays, and move toward a recognized B.Tech qualification with confidence.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 h-12 px-7 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Enquire Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/btech-credit-transfer"
                className="inline-flex items-center justify-center gap-1.5 h-12 px-7 rounded-full text-xs font-bold text-primary border border-primary/20 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                View Main B.Tech Page
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of features */}
      <section className="py-20 lg:py-28 bg-bg-section relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Academic Restart Support",
                text: `Students in ${location.place} can continue from where they left off instead of restarting their degree from the beginning.`
              },
              {
                icon: ShieldCheck,
                title: "Recognized Pathway",
                text: `Edumentora supports transfers into UGC-recognized institutions so your prior academic effort continues to matter.`
              },
              {
                icon: Clock3,
                title: "Time & Cost Efficiency",
                text: `A well-guided transfer process can reduce repetition, save semesters, and make degree completion more affordable.`
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="group relative rounded-[2.5rem] bg-white border border-border/80 p-8 shadow-soft hover:shadow-hover hover:-translate-y-2 hover:border-primary/20 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 h-28 w-28 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-dark shadow-md shadow-accent/20">
                    <item.icon className="h-5.5 w-5.5 text-white" />
                  </div>
                  <h2
                    className="text-lg font-extrabold text-heading mb-3 group-hover:text-primary transition-colors duration-300"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {item.title}
                  </h2>
                  <p className="text-sm text-paragraph leading-relaxed font-medium">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[2.5rem] border border-border/80 bg-white p-8 lg:p-10 shadow-soft">
            <p className="text-sm sm:text-base text-paragraph leading-relaxed font-medium">
              If you are searching for <span className="font-extrabold text-heading">{location.label}</span>, Edumentora can help you evaluate completed semesters, understand eligibility, organize academic documents, and identify the best continuation pathway for your B.Tech studies. Whether your education was interrupted by academic, financial, personal, or institutional reasons, our goal is to make sure your earlier effort still counts toward a successful future.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
