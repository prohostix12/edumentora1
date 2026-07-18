"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { fadeUp, viewportOnce } from "@/components/common/showcaseMotion";

interface University {
  logo: string | null;
  name: string;
}

const universities: University[] = [
  { logo: "/images/manipur_university.png", name: "Manipur International University (MIU)" },
  { logo: "/images/global_university.png", name: "Glocal University" },
  { logo: "/images/maya_devi_university.png", name: "Maya Devi University" },
  { logo: "/images/arni_university.png", name: "Arni University" },
];

// Repeat the base sequence so a small logo set still reads as a full marquee track.
const track = [...universities, ...universities, ...universities];

function LogoBadge({ src, name }: { src: string | null; name: string }) {
  if (!src) {
    const initials =
      name
        .split(" ")
        .filter((w) => /^[A-Z]/.test(w))
        .slice(0, 2)
        .map((w) => w[0])
        .join("") || name.slice(0, 2).toUpperCase();
    return (
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-nv-700 to-nv-600 text-lg font-extrabold text-white">
        {initials}
      </div>
    );
  }

  return (
    <div className="relative h-20 w-36">
      <Image src={src} alt={`${name} logo`} fill sizes="144px" className="object-contain" />
    </div>
  );
}

function MarqueeCard({ uni }: { uni: University }) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { id, x: event.clientX - rect.left, y: event.clientY - rect.top },
    ]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 800);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative mx-3 flex h-28 w-48 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-cloud bg-white px-5 py-4 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-ruby/30 hover:shadow-hover"
    >
      {/* Glow border on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 [box-shadow:inset_0_0_0_1.5px_var(--color-ruby),0_0_20px_-6px_var(--color-ruby)]" />

      {/* Click ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="animate-ripple pointer-events-none absolute h-12 w-12 rounded-full bg-ruby/25"
          style={{ left: r.x - 24, top: r.y - 24 }}
        />
      ))}

      <div className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
        <LogoBadge src={uni.logo} name={uni.name} />
      </div>
    </div>
  );
}

export default function TrustedUniversities() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20 lg:py-24">
      {/* Moving grid background */}
      <div
        aria-hidden="true"
        className="animate-gradient-shift pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-cloud) 1px, transparent 1px), linear-gradient(90deg, var(--color-cloud) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute top-[20%] left-[8%] h-80 w-80 rounded-full bg-ruby/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[10%] right-[8%] h-72 w-72 rounded-full bg-nv-700/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-nv-800/10 bg-nv-800/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-nv-800 shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-ruby" />
            Trusted Partners
          </span>
          <h2
            className="mx-auto max-w-lg text-3xl font-extrabold leading-tight text-nv-900 sm:text-4xl lg:text-[40px]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Our Most Trusted Universities
          </h2>
        </motion.div>
      </div>

      {/* Infinite marquee — glass rail, edge fade */}
      <div className="glass relative mx-auto max-w-[100vw] overflow-hidden border-y border-cloud/70 py-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-mist to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-mist to-transparent"
        />
        <div className="animate-marquee flex w-max [animation-play-state:running] hover:[animation-play-state:paused]">
          {[...track, ...track].map((uni, index) => (
            <MarqueeCard key={`${uni.name}-${index}`} uni={uni} />
          ))}
        </div>
      </div>
    </section>
  );
}
