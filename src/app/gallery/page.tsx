import type { Metadata } from "next";
import GalleryCarousel from "@/components/gallery/GalleryCarousel";
import GalleryShowcase from "@/components/gallery/GalleryShowcase";

export const metadata: Metadata = {
  title: "Gallery - Edumentora",
  description:
    "Explore the Edumentora gallery and highlights from our student success journey.",
};

export default function GalleryPage() {
  return (
    <main className="pt-20">
      <GalleryCarousel />
      <GalleryShowcase />
    </main>
  );
}
