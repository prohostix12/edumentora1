import type { Metadata } from "next";
import { Camera } from "lucide-react";
import GalleryShowcase from "@/components/gallery/GalleryShowcase";

export const metadata: Metadata = {
  title: "Gallery - Edumentora",
  description:
    "Explore the Edumentora gallery and highlights from our student success journey.",
};

export default function GalleryPage() {
  return (
    <main className="pt-20">
      <section className="relative overflow-hidden gradient-bg-hero py-20 lg:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-white border border-primary/20 px-4 py-2 text-sm font-semibold text-primary shadow-soft">
            <Camera className="h-4 w-4" />
            Gallery
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-heading mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Explore Our <span className="gradient-text">Gallery</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-paragraph leading-relaxed">
            Discover snapshots of academic guidance, student support, partner
            universities, and the success journey that defines Edumentora.
          </p>
        </div>
      </section>

      <GalleryShowcase />
    </main>
  );
}
