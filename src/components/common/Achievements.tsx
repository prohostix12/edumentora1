"use client";

import { useEffect, useState } from "react";
import { motion, useTime, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Repeat, Briefcase, Trophy, GraduationCap } from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { EASE, staggerContainer, fadeUp, scaleBlur, viewportOnce } from "@/components/common/showcaseMotion";

interface Achievement {
  icon: LucideIcon;
  end: number;
  suffix: string;
  label: string;
}

const achievements: Achievement[] = [
  {
    icon: Repeat,
    end: 800,
    suffix: "+",
    label: "Successful Credit Transfers",
  },
  {
    icon: Briefcase,
    end: 16,
    suffix: "",
    label: "Years of Expertise in Industry",
  },
  {
    icon: Trophy,
    end: 163,
    suffix: "",
    label: "Awards and Recognition",
  },
  {
    icon: GraduationCap,
    end: 3000,
    suffix: "+",
    label: "Graduates With Certified Degrees",
  },
];

const ORBIT_DURATION = 22;

function useOrbitRadius() {
  const [radius, setRadius] = useState(135);

  useEffect(() => {
    const mqTablet = window.matchMedia("(min-width: 640px)");
    const mqDesktop = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (mqDesktop.matches) setRadius(220);
      else if (mqTablet.matches) setRadius(160);
      else setRadius(95);
    };

    update();
    mqTablet.addEventListener("change", update);
    mqDesktop.addEventListener("change", update);
    return () => {
      mqTablet.removeEventListener("change", update);
      mqDesktop.removeEventListener("change", update);
    };
  }, []);

  return radius;
}

function StatCard({ item }: { item: Achievement }) {
  return (
    <div className="animate-breathe group relative w-24 overflow-hidden rounded-[1.25rem] border border-primary/10 bg-white p-3 text-center shadow-[0_4px_24px_rgba(16,45,140,0.08)] transition-all duration-500 hover:border-accent/30 hover:shadow-[0_8px_36px_rgba(229,57,53,0.12)] hover:-translate-y-1 sm:w-40 sm:rounded-[1.75rem] sm:p-5 lg:w-48 lg:p-6">
      {/* Shine sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-tr from-transparent via-primary/5 to-transparent transition-transform duration-[1200ms] ease-out group-hover:translate-x-full"
      />

      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark shadow-lg shadow-accent/25 ring-1 ring-accent/20 sm:mb-4 sm:h-12 sm:w-12 sm:rounded-2xl lg:h-14 lg:w-14"
      >
        <item.icon className="h-4 w-4 text-white sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
      </motion.div>
      <div
        className="relative text-lg font-extrabold sm:text-2xl lg:text-4xl"
        style={{ fontFamily: "var(--font-poppins)", color: "var(--color-heading)" }}
      >
        <AnimatedCounter value={item.end} suffix={item.suffix} />
      </div>
      <p className="relative mt-1.5 text-[9px] font-medium leading-snug text-paragraph sm:mt-2 sm:text-[11px] lg:text-sm">
        {item.label}
      </p>
    </div>
  );
}

function OrbitCard({
  item,
  index,
  total,
  radius,
  delay,
}: {
  item: Achievement;
  index: number;
  total: number;
  radius: number;
  delay: number;
}) {
  const time = useTime();
  const baseAngle = (360 / total) * index;
  const angle = useTransform(
    time,
    (t) => baseAngle + ((t / (ORBIT_DURATION * 1000)) * 360) % 360,
  );
  const x = useTransform(angle, (a) => radius * Math.cos(((a - 90) * Math.PI) / 180));
  const y = useTransform(angle, (a) => radius * Math.sin(((a - 90) * Math.PI) / 180));

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportOnce}
      transition={{ delay, duration: 0.6, ease: EASE }}
      className="absolute left-1/2 top-1/2 z-20 -ml-12 -mt-12 sm:-ml-20 sm:-mt-20 lg:-ml-24 lg:-mt-24"
    >
      <StatCard item={item} />
    </motion.div>
  );
}

export default function Achievements() {
  const radius = useOrbitRadius();

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* ── Layered background matching BTechInstitute style ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Red glow — top right (mirrors BTechInstitute) */}
        <div className="animate-mesh absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/12 blur-3xl" />
        {/* Dark navy glow — bottom left (mirrors BTechInstitute) */}
        <div className="animate-mesh-slow absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#0B1440]/15 blur-3xl" />
        {/* Extra soft red accent — bottom right */}
        <div className="animate-mesh absolute bottom-20 right-10 h-72 w-72 rounded-full bg-accent/8 blur-2xl" />
        {/* Extra navy — top left */}
        <div className="animate-mesh-slow absolute -top-20 left-10 h-64 w-64 rounded-full bg-primary/10 blur-2xl" />

        {/* Subtle dot grid (dark navy dots on light bg) */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #0B1440 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Drifting particles — red tint, low opacity for light bg */}
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="animate-particle absolute h-1 w-1 rounded-full bg-accent/40"
            style={
              {
                left: `${(i * 7) % 100}%`,
                top: `${90 - ((i * 6) % 80)}%`,
                animationDuration: `${6 + (i % 5)}s`,
                animationDelay: `${i * 0.4}s`,
                "--drift-x": `${(i % 2 ? 1 : -1) * (20 + i * 3)}px`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Floating navy micro-orbs */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.span
            key={`orb-${i}`}
            aria-hidden="true"
            animate={{ y: [0, i % 2 === 0 ? -14 : 14, 0], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.9 }}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: `${10 + i * 4}px`,
              height: `${10 + i * 4}px`,
              left: `${10 + i * 14}%`,
              top: `${20 + ((i * 13) % 55)}%`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-16 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent backdrop-blur-md"
          >
            <Trophy className="h-3.5 w-3.5 text-accent" />
            Achievements
          </motion.span>
          <motion.h2
            variants={scaleBlur}
            className="text-3xl font-extrabold sm:text-4xl lg:text-[40px]"
            style={{ fontFamily: "var(--font-poppins)", color: "var(--color-heading)" }}
          >
            Our Great Achievements
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-paragraph sm:text-base"
          >
            A decade of trusted academic credit transfer support, reflected in
            every student we&apos;ve guided and every degree we&apos;ve helped complete.
          </motion.p>
        </motion.div>

        {/* Orbital achievement showcase */}
        <div className="relative mx-auto h-[320px] w-[320px] sm:h-[520px] sm:w-[520px] lg:h-[700px] lg:w-[700px]">
          {/* Central core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="animate-spin-slow pointer-events-none absolute -inset-6 rounded-full border border-dashed border-primary/15 sm:-inset-8" />
            <div className="animate-spin-slow-reverse pointer-events-none absolute -inset-12 rounded-full border border-primary/8 sm:-inset-16" />
            <div className="animate-glow-pulse relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary shadow-[0_0_60px_-5px_rgba(229,57,53,0.35)] sm:h-24 sm:w-24 lg:h-32 lg:w-32">
              <GraduationCap className="h-8 w-8 text-white sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
            </div>
          </motion.div>

          {achievements.map((item, index) => (
            <OrbitCard
              key={item.label}
              item={item}
              index={index}
              total={achievements.length}
              radius={radius}
              delay={0.6 + index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
