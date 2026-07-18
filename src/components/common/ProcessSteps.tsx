"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, FileText, Video, Armchair, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { EASE, fadeUp, staggerContainer, viewportOnce } from "@/components/common/showcaseMotion";

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  { number: "01", icon: FileText, title: "Start Application", description: "Start your Application" },
  { number: "02", icon: Video, title: "Video Verification", description: "Complete Your Video Verification" },
  { number: "03", icon: Armchair, title: "Seat Reservation", description: "Reserve Your Seat" },
];

const CURVE_PATH = "M 20 40 C 260 180, 260 180, 500 100 C 740 20, 740 20, 980 160";

function RippleButton() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { id, x: event.clientX - rect.left, y: event.clientY - rect.top },
    ]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 800);
  };

  return (
    <Link
      href="/credit-transfer"
      onClick={handleClick}
      className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-ruby to-ruby-light px-8 py-4 text-sm font-bold text-white shadow-[0_10px_40px_-8px_rgba(229,57,53,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_50px_-8px_rgba(229,57,53,0.75)] cursor-pointer"
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="animate-ripple pointer-events-none absolute h-4 w-4 rounded-full bg-white/50"
          style={{ left: r.x - 8, top: r.y - 8 }}
        />
      ))}
      Start Learning
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
    </Link>
  );
}

function TimelineCurve({ progress }: { progress: import("framer-motion").MotionValue<number> }) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-1/2 z-0 hidden h-[220px] w-full -translate-y-1/2 lg:block"
      viewBox="0 0 1000 200"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="processLineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-ruby)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-ruby-light)" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="processGlowDot">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--color-ruby-light)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* base track */}
      <path d={CURVE_PATH} stroke="rgba(255,255,255,0.08)" strokeWidth="2" />

      {/* scroll-drawn progress */}
      <motion.path
        id="processCurvePath"
        d={CURVE_PATH}
        stroke="url(#processLineGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />

      {/* traveling glow, flows continuously once visible */}
      <circle r="6" fill="url(#processGlowDot)">
        <animateMotion dur="3.5s" repeatCount="indefinite" rotate="auto">
          <mpath href="#processCurvePath" />
        </animateMotion>
      </circle>
    </svg>
  );
}

function StepBadge({ icon: Icon, active }: { icon: LucideIcon; active: boolean }) {
  return (
    <motion.div
      animate={{
        scale: active ? 1.12 : 1,
        boxShadow: active
          ? "0 0 0 8px rgba(229,57,53,0.15), 0 0 34px rgba(229,57,53,0.55)"
          : "0 0 0 0px rgba(229,57,53,0)",
      }}
      whileHover={{ rotate: 10 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors duration-500 ${
        active ? "bg-gradient-to-br from-ruby to-ruby-light" : "bg-white/10 border border-white/10"
      }`}
    >
      <Icon className="h-6 w-6 text-white" />
    </motion.div>
  );
}

function GlassCard({
  step,
  index,
  active,
  reduceMotion,
}: {
  step: Step;
  index: number;
  active: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -8, 0, 8, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
      whileHover={{ y: -10, rotate: 2, scale: 1.04 }}
      className="group relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-md transition-shadow duration-500 hover:border-ruby/30 hover:bg-white/10 backdrop-blur-md"
    >
      <span className="absolute left-6 top-0 h-1 w-10 rounded-full bg-gradient-to-r from-ruby to-ruby-light" />
      <div className="mb-5">
        <StepBadge icon={step.icon} active={active} />
      </div>
      <span
        className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-ruby"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Step {step.number}
      </span>
      <h3
        className="mb-2 text-lg font-bold text-white"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {step.title}
      </h3>
      <p className="text-sm leading-relaxed text-slate-300 font-medium">{step.description}</p>
    </motion.div>
  );
}

function DesktopStep({
  step,
  index,
  reduceMotion,
}: {
  step: Step;
  index: number;
  reduceMotion: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const lift = index % 2 === 0 ? "lg:-translate-y-8" : "lg:translate-y-8";

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className={`relative z-10 w-full max-w-[280px] ${lift}`}
    >
      <GlassCard step={step} index={index} active={active} reduceMotion={reduceMotion} />
    </motion.div>
  );
}

function VerticalStep({
  step,
  index,
  reduceMotion,
}: {
  step: Step;
  index: number;
  reduceMotion: boolean | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { margin: "-42% 0px -42% 0px" });

  return (
    <div
      ref={ref}
      className={`relative flex gap-6 pb-14 last:pb-0 sm:gap-8 ${
        index % 2 === 1 ? "sm:ml-10 md:ml-16" : ""
      }`}
    >
      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center">
        <StepBadge icon={step.icon} active={active} />
      </div>

      <motion.div
        animate={{ scale: active ? 1.02 : 1 }}
        transition={{ duration: 0.5 }}
        className={`flex-1 rounded-[1.5rem] border bg-white/5 backdrop-blur-md p-6 shadow-soft transition-colors duration-500 sm:p-7 ${
          active ? "border-ruby/30" : "border-white/10"
        }`}
        style={{ transformOrigin: "left center" }}
      >
        <span
          className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-ruby"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Step {step.number}
        </span>
        <h3
          className="mb-2 text-lg font-bold text-white"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-300 font-medium">{step.description}</p>
      </motion.div>
    </div>
  );
}

export default function ProcessSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const drawProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const mobileLineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Subtle mouse parallax (desktop only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const blobX = useTransform(springX, [-0.5, 0.5], [-16, 16]);
  const blobY = useTransform(springY, [-0.5, 0.5], [-16, 16]);
  const cardsX = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex flex-col justify-center bg-section-dark-navy overflow-hidden py-24 px-[6vw] snap-section"
    >
      {/* Decorative gradient blur */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          style={{ x: blobX, y: blobY }}
          className="absolute -top-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-ruby/8 blur-3xl"
        />
        <motion.div
          style={{ x: blobX, y: blobY }}
          className="absolute -bottom-32 -left-24 h-[26rem] w-[26rem] rounded-full bg-primary/20 blur-3xl"
        />
        <div className="animate-spin-slow pointer-events-none absolute right-[8%] top-[12%] h-16 w-16 rounded-full border border-dashed border-white/10" />
        <div className="animate-spin-slow-reverse pointer-events-none absolute bottom-[15%] left-[6%] h-24 w-24 rounded-full border border-white/5" />
        
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #FFFFFF 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-[1440px] w-full mx-auto z-10 flex flex-col gap-10">
        
        {/* Header */}
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center flex flex-col items-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-350 shadow-soft"
          >
            How It Works
          </motion.span>
          
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl font-extrabold leading-tight text-white"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Know About <span className="text-ruby">Our Process</span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-ruby to-ruby-light"
          />

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-slate-300 font-medium"
          >
            A simple, guided path from application to your reserved seat —
            every step tracked and supported by our team.
          </motion.p>
        </motion.div>

        {/* Desktop — horizontal curved timeline */}
        <div ref={containerRef} className="relative hidden lg:block my-4">
          <TimelineCurve progress={drawProgress} />
          <motion.div
            variants={staggerContainer(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            style={{ x: cardsX }}
            className="relative z-10 flex items-start justify-between gap-8 pt-4"
          >
            {steps.map((step, index) => (
              <DesktopStep key={step.number} step={step} index={index} reduceMotion={reduceMotion} />
            ))}
          </motion.div>
        </div>

        {/* Tablet / mobile — vertical timeline with diagonal stagger */}
        <div className="relative lg:hidden my-4 max-w-lg mx-auto w-full">
          <div className="absolute left-7 top-2 bottom-2 w-0.5 bg-white/10" />
          <motion.div
            style={{ height: mobileLineHeight }}
            className="absolute left-7 top-2 w-0.5 bg-gradient-to-b from-ruby to-ruby-light shadow-[0_0_12px_rgba(229,57,53,0.6)]"
          />
          {steps.map((step, index) => (
            <VerticalStep key={step.number} step={step} index={index} reduceMotion={reduceMotion} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <h3
            className="text-xl sm:text-2xl font-bold text-white"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Ready to Begin Your Learning Journey?
          </h3>
          <RippleButton />
        </motion.div>

      </div>
    </section>
  );
}
