"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, UserCheck, Route, HeartHandshake, Zap, ShieldCheck, PiggyBank, GraduationCap, Award, BookOpen } from "lucide-react";

const programs = [
  {
    title: "Credit Transfer Program",
    description: "Transfer your past credits to complete your degree faster with Edumentora.",
    href: "/credit-transfer",
    icon: GraduationCap,
    glow: "rgba(16,45,140,0.15)",
  },
  {
    title: "Apprenticeship Program",
    description: "Study while gaining real work experience through industry training.",
    href: "/apprenticeship-program",
    icon: Award,
    glow: "rgba(229,57,53,0.15)",
  },
  {
    title: "Work Integrated Learning Program",
    description: "Learn theory and apply it practically for a career-ready education.",
    href: "/work-integrated-learning-program",
    icon: BookOpen,
    glow: "rgba(16,45,140,0.15)",
  },
];

const reasons = [
  {
    icon: UserCheck,
    title: "Expert Guidance",
    description: "Our dedicated team offers tailored guidance, ensuring a seamless and successful academic credit transfer experience for each student.",
    color: "text-primary bg-primary/5 border-primary/10",
  },
  {
    icon: Route,
    title: "Flexible Learning Paths",
    description: "We offer tailored programs that allow you to balance education with personal and professional commitments effectively.",
    color: "text-accent bg-accent/5 border-accent/10",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Support",
    description: "Our experienced team offers personalized support, guaranteeing a seamless and hassle-free academic credit transfer experience.",
    color: "text-indigo-600 bg-indigo-50 border-indigo-100",
  },
  {
    icon: Zap,
    title: "Effortless Credit Transfer",
    description: "Seamlessly transfer your earned credits to resume your education without losing progress or starting from scratch.",
    color: "text-sky-600 bg-sky-50 border-sky-100",
  },
  {
    icon: ShieldCheck,
    title: "Trusted University Partners",
    description: "Collaborations with Glocal University, Radha Govind University, and Arni University ensure globally recognized credentials.",
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  {
    icon: PiggyBank,
    title: "Save Time & Money",
    description: "Resume your education from where you paused, saving valuable time and reducing overall financial burden significantly.",
    color: "text-amber-600 bg-amber-50 border-amber-100",
  },
];

export default function CreditPrograms() {
  const [hoveredReason, setHoveredReason] = useState<number | null>(null);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center bg-section-white overflow-hidden py-24 px-[6vw] snap-section">
      
      {/* Background decorations */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #0B1440 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative max-w-[1440px] w-full mx-auto z-10 flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-soft">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Our Programs & Specialties
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-heading mt-3 leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Specialized Credit Programs & Why Choose Us
          </h2>
        </div>

        {/* Main Grid: Connected Timeline (Left) & Why Choose Us Grid (Right) */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Programs Timeline Flow (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center relative">
            <h3 className="text-xl font-extrabold text-heading mb-6" style={{ fontFamily: "var(--font-poppins)" }}>
              Featured Programs
            </h3>

            {/* Glowing vertical connector line */}
            <div className="absolute left-8 top-16 bottom-8 w-0.5 bg-slate-100 z-0">
              <div className="w-full h-1/2 bg-gradient-to-b from-primary via-accent to-primary animate-shimmer" />
            </div>

            <div className="flex flex-col gap-6 relative z-10">
              {programs.map((program, index) => {
                const ProgramIcon = program.icon;
                return (
                  <motion.div
                    key={program.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    whileHover={{ x: 6 }}
                    className="flex gap-4 items-start p-4 rounded-2xl border border-slate-100 bg-white/80 shadow-sm hover:shadow-md hover:border-primary/10 transition-all duration-300"
                  >
                    {/* Glowing Icon */}
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200 text-primary transition-all duration-300"
                      style={{
                        boxShadow: hoveredReason === null ? `0 0 16px ${program.glow}` : undefined,
                      }}
                    >
                      <ProgramIcon className="h-5 w-5 text-accent" />
                    </div>

                    <div className="flex-1">
                      <h4 className="text-base font-extrabold text-heading mb-1" style={{ fontFamily: "var(--font-poppins)" }}>
                        {program.title}
                      </h4>
                      <p className="text-xs text-paragraph mb-3 leading-relaxed font-medium">
                        {program.description}
                      </p>
                      <Link
                        href={program.href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors"
                      >
                        Know more
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Why Choose Us Interactive Grid (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h3 className="text-xl font-extrabold text-heading mb-6" style={{ fontFamily: "var(--font-poppins)" }}>
              Why We Are The Right Choice
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {reasons.map((reason, idx) => {
                const ReasonIcon = reason.icon;
                return (
                  <div
                    key={reason.title}
                    onMouseEnter={() => setHoveredReason(idx)}
                    onMouseLeave={() => setHoveredReason(null)}
                    className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border text-center cursor-default transition-all duration-300 select-none ${
                      hoveredReason === idx 
                        ? "bg-primary border-primary text-white shadow-md -translate-y-1" 
                        : "bg-slate-50/50 border-slate-100 text-paragraph hover:border-primary/20"
                    }`}
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl border mb-3 transition-colors ${
                      hoveredReason === idx 
                        ? "bg-white/20 border-white/25 text-white" 
                        : reason.color
                    }`}>
                      <ReasonIcon size={18} />
                    </div>
                    <span className={`text-xs font-bold ${hoveredReason === idx ? "text-white" : "text-heading"}`} style={{ fontFamily: "var(--font-poppins)" }}>
                      {reason.title}
                    </span>

                    {/* Numeric indicator */}
                    <span className={`absolute top-2 right-3 text-[10px] font-black opacity-20 ${hoveredReason === idx ? "text-white" : "text-slate-400"}`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Interactive description drawer to save vertical space while preserving descriptions */}
            <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-100 min-h-[100px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {hoveredReason !== null ? (
                  <motion.div
                    key={`desc-${hoveredReason}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <h4 className="text-sm font-extrabold text-primary mb-1.5" style={{ fontFamily: "var(--font-poppins)" }}>
                      {reasons[hoveredReason].title}
                    </h4>
                    <p className="text-xs text-paragraph leading-relaxed font-semibold max-w-md mx-auto">
                      {reasons[hoveredReason].description}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="desc-default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-xs text-slate-450 font-bold uppercase tracking-wider flex items-center gap-1.5"
                  >
                    <Sparkles size={14} className="text-accent" />
                    Hover over any reason above to read more
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
