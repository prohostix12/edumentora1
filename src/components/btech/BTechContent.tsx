"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  ChevronRight,
  Rewind,
  PiggyBank,
  ShieldCheck,
  Briefcase,
  Route,
  UserCheck,
} from "lucide-react";

/* ---------------------------- 3D Tilt Image Frame -------------------------- */
/** Wraps an image frame in a real 3D card stack: two receding backdrop layers
 * (offset via translateZ) sit behind the photo, and the whole stack tilts
 * toward the cursor — the depth is visible at rest, not just on hover. */
function TiltImageFrame({
  children,
  className = "",
  frameRadius = "rounded-[2.5rem]",
}: {
  children: React.ReactNode;
  className?: string;
  frameRadius?: string;
}) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springConfig = { stiffness: 150, damping: 18, mass: 0.4 };
  const sx = useSpring(px, springConfig);
  const sy = useSpring(py, springConfig);
  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const rotateY = useTransform(sx, [0, 1], [-10, 10]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative"
      >
        {/* Receding backdrop layers — give the stack depth even at rest */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 bg-gradient-to-br from-primary/30 via-primary/15 to-accent/30 ${frameRadius}`}
          style={{ transform: "translate3d(20px, 20px, -70px) rotate(4deg)" }}
        />
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 border border-white bg-white shadow-card ${frameRadius}`}
          style={{ transform: "translate3d(10px, 10px, -35px) rotate(-2deg)" }}
        />
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------ Hero Section ------------------------------ */
function BTechHero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-24 lg:pb-32 overflow-hidden bg-white">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-[16%] h-14 w-14 rounded-2xl bg-primary/10 rotate-12"
        />
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-[40%] h-10 w-10 rounded-full bg-accent/15"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image with arch shape */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              <TiltImageFrame frameRadius="rounded-t-[999px] rounded-b-[3rem]">
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[3rem] shadow-hover border-4 border-white/90">
                  <Image
                    src="/images/Best Study Abroad Consultants In Kerala.jpg"
                    alt="Smiling engineering student holding books on campus"
                    fill
                    sizes="(max-width: 1024px) 90vw, 440px"
                    className="object-cover"
                    priority
                  />
                </div>
              </TiltImageFrame>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -right-3 sm:right-0 glass rounded-2xl p-4.5 shadow-hover border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark shadow-md shadow-accent/20">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-heading">B.Tech Degree</p>
                    <p className="text-[10px] font-bold text-paragraph/70 mt-0.5">UGC Recognized</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex flex-col gap-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider">
              B.Tech Credit Transfer Program
            </span>

            <h1
              className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-tight text-heading"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Take the Next Step in your <span className="gradient-text">Engineering Career</span>
            </h1>

            <div className="h-px w-20 bg-gradient-to-r from-primary to-accent" />

            <p className="text-base sm:text-lg text-paragraph leading-relaxed max-w-xl font-medium">
              Don&apos;t let an incomplete B.Tech stop you from achieving your
              dreams. With Edumentora&apos;s B.Tech Credit Transfer Program, you
              can resume your studies, complete your degree, and build a
              successful future.
            </p>

            <div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 h-12 px-7 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Know more
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Program Overview ---------------------------- */
function ProgramOverview() {
  const paragraphs = [
    <>
      At Edumentora, our{" "}
      <span className="font-extrabold text-primary">
        B.Tech Credit Transfer Program
      </span>{" "}
      is designed to help engineering students who have discontinued their
      studies due to academic, personal, or financial challenges. This program
      allows you to transfer your previously earned credits to our partner
      universities and continue your B.Tech degree without starting over.
    </>,
    <>
      We collaborate with reputed institutions like{" "}
      <span className="font-extrabold text-heading">Glocal University</span>,{" "}
      <span className="font-extrabold text-heading">
        Radha Govind University
      </span>
      , and Arni University, ensuring that your academic efforts are recognized
      and credited toward your degree. Our expert team evaluates your existing
      credits and facilitates a smooth transfer process, helping you save time
      and reduce financial burdens.
    </>,
    <>
      With Edumentora&apos;s B.Tech Credit Transfer Program, you can complete
      your degree efficiently and confidently, setting the foundation for a
      successful engineering career.
    </>,
  ];

  return (
    <section className="py-24 lg:py-28 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Left accent line */}
          <div className="absolute left-0 top-2 bottom-2 w-1.5 rounded-full bg-gradient-to-b from-primary via-accent to-primary hidden sm:block" />
          <div className="sm:pl-10 flex flex-col gap-7">
            {paragraphs.map((content, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-base sm:text-lg text-paragraph leading-relaxed font-medium"
              >
                {content}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Complete Without Starting Over ------------------ */
function CompleteBTech() {
  return (
    <section className="py-24 lg:py-32 bg-bg-section overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <TiltImageFrame>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-hover border-4 border-white/90">
                <Image
                  src="/images/Degrees in hand, happiness in heart!.jpg"
                  alt="Happy student giving thumbs up with laptop"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
              </div>
            </TiltImageFrame>
            {/* Decorative dots */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-5 -left-5 h-14 w-14 rounded-2xl bg-primary/20 rotate-12 pointer-events-none"
            />
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 right-10 h-10 w-10 rounded-full bg-accent/25 pointer-events-none"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-5 animate-fade-in"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider">
              Second Chance
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight text-heading"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Complete your B.Tech Without Starting Over!
            </h2>
            <p className="text-sm sm:text-base text-paragraph leading-relaxed font-medium">
              Edumentora&apos;s B.Tech Credit Transfer Program offers a second
              chance to students who had to discontinue their engineering
              studies due to academic, financial, or personal challenges.
              Instead of starting from the first year, eligible students who
              have completed at least 50% of their B.Tech coursework can
              transfer their existing credits to a UGC-approved and
              AICTE-recognized university. This allows them to pick up their
              studies from where they left off and complete their degree
              faster. The program is completely legal and ensures the final
              degree is valid for both government and private sector jobs, as
              well as further education. It&apos;s a smart, efficient way to
              get back on track and achieve your engineering goals without
              losing the progress you&apos;ve already made.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Eligibility Criteria -------------------------- */

/** Circular badge whose checkmark draws itself in when scrolled into view. */
function AnimatedCheckBadge({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0.4, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="animate-glow-pulse relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/25 ring-4 ring-primary/10"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 overflow-visible" fill="none">
        <motion.path
          d="M5 13l4 4L19 7"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.35, duration: 0.5, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
}

function Eligibility() {
  const conditions = [
    "Completed at least 50% of your B.Tech degree (2+ years).",
    "Your previous university must be UGC-approved.",
    "You must provide official mark sheets and academic transcripts.",
    "You must complete failed subjects in offline mode at the university (no online exams allowed).",
  ];

  return (
    <section className="relative py-12 lg:py-16 bg-white overflow-hidden">
      {/* Decorative — dot grid + soft orbs, matching the rest of the page */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-mesh absolute -top-32 -left-24 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
        <div className="animate-mesh-slow absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-accent/8 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #0B1440 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Ambient drifting particles — continuous, no scroll trigger needed */}
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="animate-particle absolute h-1 w-1 rounded-full bg-primary/30"
            style={
              {
                left: `${(i * 11) % 100}%`,
                top: `${85 - ((i * 8) % 70)}%`,
                animationDuration: `${6 + (i % 5)}s`,
                animationDelay: `${i * 0.5}s`,
                "--drift-x": `${(i % 2 ? 1 : -1) * (18 + i * 3)}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-xs font-bold text-primary shadow-soft mb-4 uppercase tracking-wider">
            Requirements
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight text-heading mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Eligibility Criteria for B.Tech Credit Transfer
          </h2>
          <p className="text-paragraph text-sm sm:text-base leading-relaxed font-medium">
            To qualify for B.Tech Credit Transfer, you must meet these
            conditions. If you meet these conditions, you can resume your
            studies and complete your degree faster.
          </p>
        </motion.div>

        {/* Checklist grid */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {conditions.map((text, index) => {
            const delay = index * 0.15;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay, duration: 0.55 }}
                className="group relative flex items-start gap-5 overflow-hidden rounded-[1.75rem] border border-border/80 bg-white p-6 shadow-soft transition-all duration-500 hover:border-primary/20 hover:shadow-card hover:-translate-y-1"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-5 text-5xl font-black text-slate-50 select-none leading-none group-hover:text-slate-100 transition-colors duration-300"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <AnimatedCheckBadge delay={delay + 0.1} />
                <p className="relative z-10 pt-2.5 text-sm sm:text-base leading-relaxed font-medium text-paragraph">
                  {text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Top Universities ----------------------------- */
function TopUniversities() {
  const universities = [
    "Glocal University",
    "Radha Govind University",
    "IEC University",
    "Arni University",
  ];

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider mb-5">
              Partner Universities
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight text-heading mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Top Universities Accepting B.Tech Credit Transfers
            </h2>
            <p className="text-paragraph text-sm sm:text-base leading-relaxed mb-8 font-medium">
              Edumentora collaborates with top UGC-approved universities in
              India that allow B.Tech credit transfers. These universities
              provide valid, recognized degrees:
            </p>

            <div className="flex flex-col gap-3 mb-8">
              {universities.map((uni, index) => (
                <motion.div
                  key={uni}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="group flex items-center gap-3 rounded-2xl bg-bg-section border border-border/80 px-5 py-4 hover:border-primary/20 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary transition-colors duration-300">
                    <ChevronRight className="h-4 w-4 text-primary group-hover:text-white transition-colors duration-300" />
                  </span>
                  <span
                    className="text-sm font-extrabold text-heading"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {uni}
                  </span>
                </motion.div>
              ))}
            </div>

            <p className="text-paragraph text-sm sm:text-base leading-relaxed font-medium">
              These universities issue recognized B.Tech degrees, making you
              eligible for private and government jobs, as well as higher
              studies.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <TiltImageFrame>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-hover border-4 border-white/90">
                <Image
                  src="https://images.pexels.com/photos/35487178/pexels-photo-35487178.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Group of graduates in gowns holding diplomas"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </TiltImageFrame>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-4 glass rounded-2xl p-4.5 shadow-hover border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-heading">Valid Degrees</p>
                  <p className="text-[10px] font-bold text-paragraph/70 uppercase tracking-wide mt-0.5">Govt & Private Jobs</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Benefits Section ---------------------------- */
function Benefits() {
  const benefits = [
    {
      icon: Rewind,
      title: "No Need to Start Over",
      text: "Continue from your last completed semester.",
    },
    {
      icon: PiggyBank,
      title: "Save Time & Money",
      text: "No need to repeat previous subjects.",
    },
    {
      icon: ShieldCheck,
      title: "100% Legal & Approved",
      text: "Get a UGC-recognized degree.",
    },
    {
      icon: Briefcase,
      title: "Valid for Government & Private Jobs",
      text: "Eligible for all employment opportunities.",
    },
    {
      icon: Route,
      title: "Flexible Study Options",
      text: "Choose the best university that fits your needs.",
    },
    {
      icon: UserCheck,
      title: "Expert Guidance",
      text: "Our team manages everything from documentation to admission.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-bg-section overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Heading + supporting image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider mb-5">
              Why It Matters
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight text-heading mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Benefits of B.Tech Credit Transfer with Edumentora
            </h2>
            <p className="text-paragraph text-sm sm:text-base leading-relaxed mb-8 font-medium max-w-md">
              Resuming your engineering degree through Edumentora comes with
              real, practical advantages designed to get you back on track
              faster and with complete confidence.
            </p>

            <div className="relative max-w-md">
              <TiltImageFrame>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-hover border-4 border-white/90">
                  <Image
                    src="https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                    alt="Engineering student smiling with laptop and notes"
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                </div>
              </TiltImageFrame>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-4 h-14 w-14 rounded-2xl bg-accent/20 rotate-12 pointer-events-none"
              />
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 h-10 w-10 rounded-full bg-primary/20 pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Right - Benefit rows */}
          <div className="flex flex-col gap-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group flex items-start gap-4 rounded-2xl bg-white border border-border/80 px-5 py-4 hover:border-primary/20 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                  <benefit.icon className="h-4.5 w-4.5 text-white" />
                </span>
                <p className="text-sm sm:text-base leading-relaxed">
                  <span
                    className="font-extrabold text-heading"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {benefit.title}
                  </span>{" "}
                  <span className="text-paragraph font-medium">— {benefit.text}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Specializations Section ----------------------- */
function Specializations() {
  const specializations = [
    "B.Tech in Civil Engineering",
    "B.Tech in Mechanical Engineering",
    "B.Tech in Computer Science & Engineering (CSE)",
    "B.Tech in Electronics & Communication Engineering (ECE)",
    "B.Tech in Electrical Engineering",
    "B.Tech in Information Technology (IT)",
    "B.Tech in Automobile Engineering",
    "B.Tech in Chemical Engineering",
  ];

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative order-2"
          >
            <div className="relative max-w-lg mx-auto lg:mx-0 lg:ml-auto">
              <TiltImageFrame>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-hover border-4 border-white/90">
                  <Image
                    src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1350"
                    alt="Engineering students collaborating on a laptop project outdoors"
                    fill
                    sizes="(max-width: 1024px) 90vw, 500px"
                    className="object-cover"
                  />
                </div>
              </TiltImageFrame>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 h-14 w-14 rounded-2xl bg-primary/20 rotate-12 pointer-events-none"
              />
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 h-10 w-10 rounded-full bg-accent/25 pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="order-1"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider mb-5">
              Engineering Fields
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight text-heading mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              B.Tech Specializations Available for Credit Transfer
            </h2>
            <p className="text-paragraph text-sm sm:text-base leading-relaxed mb-6 font-medium">
              We offer B.Tech credit transfers in multiple engineering fields,
              including:
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              {specializations.map((spec, index) => (
                <motion.span
                  key={spec}
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-bg-section px-4 py-2.5 text-sm font-bold text-heading shadow-soft transition-colors duration-300 hover:border-primary/30 hover:bg-primary/5 hover:shadow-card cursor-default"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
                  {spec}
                </motion.span>
              ))}
            </div>

            <p className="text-paragraph text-sm sm:text-base leading-relaxed font-medium">
              No matter which specialization you studied before, we will help
              you transfer your credits and complete your degree smoothly.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function BTechContent() {
  return (
    <>
      <BTechHero />
      <ProgramOverview />
      <CompleteBTech />
      <Eligibility />
      <TopUniversities />
      <Benefits />
      <Specializations />
    </>
  );
}
