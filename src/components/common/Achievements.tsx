"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useTime, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Repeat, Briefcase, Trophy, GraduationCap, Sparkles, HelpCircle, ArrowRight, ShieldCheck } from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { EASE, staggerContainer, fadeUp, scaleBlur, viewportOnce } from "@/components/common/showcaseMotion";

interface Achievement {
  icon: LucideIcon;
  end: number;
  suffix: string;
  label: string;
}

const achievements: Achievement[] = [
  { icon: Repeat, end: 800, suffix: "+", label: "Successful Credit Transfers" },
  { icon: Briefcase, end: 16, suffix: "", label: "Years of Expertise in Industry" },
  { icon: Trophy, end: 163, suffix: "", label: "Awards and Recognition" },
  { icon: GraduationCap, end: 3000, suffix: "+", label: "Graduates With Certified Degrees" },
];

const painPoints = [
  {
    image: "https://images.pexels.com/photos/20640156/pexels-photo-20640156.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Worried student looking through library bookshelf",
    title: "Repeating Semesters",
    tag: "The Challenge",
    text: "Worried about repeating semesters you have already completed and passed.",
    solution: "We recognize your completed semesters — no repeats, no wasted time.",
  },
  {
    image: "https://images.pexels.com/photos/8199252/pexels-photo-8199252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Student researching universities on laptop",
    title: "Relocating Cities",
    tag: "The Challenge",
    text: "Moving to a new city and afraid of losing the credits you have already earned.",
    solution: "Your earned credits move with you, anywhere across India.",
  },
  {
    image: "https://images.pexels.com/photos/8199622/pexels-photo-8199622.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Students discussing with a mentor in library",
    title: "University Uncertainty",
    tag: "The Challenge",
    text: "Confused about which universities will accept your previous subjects and syllabus.",
    solution: "We match your syllabus to accredited universities that accept it.",
  },
];

const ORBIT_DURATION = 22;

function useOrbitRadius() {
  const [radius, setRadius] = useState(135);

  useEffect(() => {
    const mqTablet = window.matchMedia("(min-width: 640px)");
    const mqDesktop = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      if (mqDesktop.matches) setRadius(190);
      else if (mqTablet.matches) setRadius(140);
      else setRadius(90);
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
    <div className="group relative w-24 overflow-hidden rounded-[1.25rem] border border-primary/10 bg-white p-3 text-center shadow-[0_4px_24px_rgba(16,45,140,0.08)] transition-all duration-500 hover:border-accent/30 hover:shadow-[0_8px_36px_rgba(229,57,53,0.12)] hover:-translate-y-1 sm:w-36 sm:rounded-[1.5rem] sm:p-4 lg:w-40 lg:p-5">
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-tr from-transparent via-primary/5 to-transparent transition-transform duration-[1200ms] ease-out group-hover:translate-x-full" />
      <motion.div
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-dark shadow-md"
      >
        <item.icon className="h-4 w-4 text-white" />
      </motion.div>
      <div
        className="relative text-lg font-extrabold sm:text-xl lg:text-2xl"
        style={{ fontFamily: "var(--font-poppins)", color: "var(--color-heading)" }}
      >
        <AnimatedCounter value={item.end} suffix={item.suffix} />
      </div>
      <p className="relative mt-1 text-[8px] font-bold leading-snug text-paragraph sm:text-[10px] lg:text-xs">
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
      className="absolute left-1/2 top-1/2 z-20 -ml-12 -mt-12 sm:-ml-18 sm:-mt-18 lg:-ml-20 lg:-mt-20"
    >
      <StatCard item={item} />
    </motion.div>
  );
}

export default function Achievements() {
  const radius = useOrbitRadius();
  const [activeTab, setActiveTab] = useState<"achievements" | "challenges">("achievements");

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center bg-section-white overflow-hidden py-24 px-[6vw] snap-section">
      
      {/* Background visual components */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl animate-mesh" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-mesh-slow" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #071330 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative max-w-[1440px] w-full mx-auto z-10 flex flex-col gap-8">
        
        {/* Toggle Selector */}
        <div className="flex flex-col items-center mb-2">
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 border border-slate-200/50 rounded-full shadow-sm">
            <button
              onClick={() => setActiveTab("achievements")}
              className={`relative px-6 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-colors cursor-pointer ${
                activeTab === "achievements" ? "text-white" : "text-paragraph hover:text-heading"
              }`}
            >
              {activeTab === "achievements" && (
                <motion.div
                  layoutId="activeAchieveTab"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Our Milestones</span>
            </button>
            <button
              onClick={() => setActiveTab("challenges")}
              className={`relative px-6 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-colors cursor-pointer ${
                activeTab === "challenges" ? "text-white" : "text-paragraph hover:text-heading"
              }`}
            >
              {activeTab === "challenges" && (
                <motion.div
                  layoutId="activeAchieveTab"
                  className="absolute inset-0 bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Student Challenges</span>
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="min-h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeTab === "achievements" ? (
              <motion.div
                key="achievements-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-10 items-center w-full"
              >
                {/* Left side — Typo & Descriptions */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-soft">
                    <Trophy size={14} className="text-accent" />
                    Our Milestones
                  </span>
                  
                  <h2
                    className="text-3xl sm:text-4xl font-extrabold leading-tight text-heading"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Decades of Trust & Academic Completion
                  </h2>

                  <p className="text-base leading-relaxed text-paragraph font-medium">
                    A decade of trusted academic credit transfer support, reflected in
                    every student we&apos;ve guided and every degree we&apos;ve helped complete.
                    We save valuable semesters and ensure credits transfer efficiently.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/40">
                      <h4 className="text-sm font-extrabold text-heading mb-1" style={{ fontFamily: "var(--font-poppins)" }}>
                        UGC Approved
                      </h4>
                      <p className="text-xs text-paragraph">All credit transfers align with recognized UGC instructions.</p>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/40">
                      <h4 className="text-sm font-extrabold text-heading mb-1" style={{ fontFamily: "var(--font-poppins)" }}>
                        100% Secure
                      </h4>
                      <p className="text-xs text-paragraph">Verified verification and reservation processes.</p>
                    </div>
                  </div>
                </div>

                {/* Right side — Orbital ring visual */}
                <div className="lg:col-span-6 flex justify-center items-center">
                  <div className="relative h-[260px] w-[260px] min-[360px]:h-[300px] min-[360px]:w-[300px] sm:h-[420px] sm:w-[420px] lg:h-[500px] lg:w-[500px]">
                    {/* Central core */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={viewportOnce}
                      transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
                      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="animate-spin-slow pointer-events-none absolute -inset-6 rounded-full border border-dashed border-primary/15 sm:-inset-8" />
                      <div className="animate-spin-slow-reverse pointer-events-none absolute -inset-12 rounded-full border border-primary/8 sm:-inset-12" />
                      <div className="animate-glow-pulse relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary shadow-md sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                        <GraduationCap className="h-6 w-6 text-white sm:h-8 sm:w-8 lg:h-10 lg:w-10" />
                      </div>
                    </motion.div>

                    {achievements.map((item, index) => (
                      <OrbitCard
                        key={item.label}
                        item={item}
                        index={index}
                        total={achievements.length}
                        radius={radius}
                        delay={0.4 + index * 0.1}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="challenges-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-10 items-center w-full"
              >
                {/* Left side — Typo & description */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/10 bg-accent/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-accent shadow-soft">
                    <HelpCircle size={14} />
                    We Get It
                  </span>

                  <h2
                    className="text-3xl sm:text-4xl font-extrabold leading-tight text-heading"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Ready to Grow? We Understand Your Pain Points
                  </h2>

                  <p className="text-base leading-relaxed text-paragraph font-medium">
                    Every student deserves a fresh start without losing what they
                    have already achieved. We solve the real roadblocks students face when continuing their studies.
                  </p>

                  <div className="flex flex-col gap-3 mt-2">
                    {painPoints.map((point) => (
                      <div key={point.title} className="flex gap-3 items-start border-l-2 border-accent pl-4 py-1">
                        <div>
                          <h4 className="text-sm font-extrabold text-heading" style={{ fontFamily: "var(--font-poppins)" }}>
                            {point.title}
                          </h4>
                          <p className="text-xs text-paragraph mt-0.5">{point.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side — Pain point cards showcase */}
                <div className="lg:col-span-7 flex justify-center items-center">
                  <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center">
                    {painPoints.map((point, index) => (
                      <motion.div
                        key={point.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        whileHover={{ y: -8 }}
                        className="flex-1 rounded-[2rem] border border-slate-100 bg-white p-6 shadow-md relative overflow-hidden group hover:border-accent/20 transition-all duration-300"
                      >
                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 border border-slate-150">
                          <img
                            src={point.image}
                            alt={point.alt}
                            className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[9px] font-bold text-accent px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {point.tag}
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold text-heading mb-1.5" style={{ fontFamily: "var(--font-poppins)" }}>
                          {point.title}
                        </h3>
                        <p className="text-xs text-paragraph mb-4 leading-relaxed font-medium">
                          {point.text}
                        </p>
                        <div className="mt-auto pt-3 border-t border-slate-50 flex items-start gap-2 text-xs font-bold text-accent">
                          <ShieldCheck size={14} className="shrink-0 text-emerald-500 mt-0.5" />
                          <span>{point.solution}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
