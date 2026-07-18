"use client";

import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Send,
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  Sparkles,
  Clock,
  DollarSign,
  Globe,
  Headset,
  ChevronDown,
} from "lucide-react";

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.04,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: { opacity: 0, y: -60, rotateX: 90, transition: { duration: 0.4 } },
};

/* ─────────────────────────────────────────────
   ANIMATED HEADING TEXT
───────────────────────────────────────────── */
function AnimatedHeading({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden ${className ?? ""}`} style={{ perspective: "800px" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="inline-block"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────
   HERO / INTRO SECTION
───────────────────────────────────────────── */
function KnowMoreIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const stats = [
    { label: "Credits Transferred", value: "10,000+", icon: BookOpen },
    { label: "Partner Universities", value: "50+", icon: Globe },
    { label: "Success Rate", value: "98%", icon: Award },
    { label: "Years of Excellence", value: "8+", icon: Clock },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050D1F 0%, #071330 50%, #0A1A4A 100%)" }}
    >
      {/* Parallax Hero BG Image */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <Image
          src="/credit-transfer-hero.png"
          alt="Credit Transfer Hero"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#071330]/50 to-[#071330]" />
      </motion.div>

      {/* Animated mesh orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(16,45,140,0.5) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, -25, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, rgba(229,57,53,0.4) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5"
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/10"
        />
        {/* Floating dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
            className="absolute rounded-full bg-white/20"
            style={{
              width: 4 + i * 2,
              height: 4 + i * 2,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        <AnimatePresence>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center gap-6"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 bg-white/5 text-white/70 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                Credit Transfer
                <Sparkles className="h-3.5 w-3.5 text-accent" />
              </span>
            </motion.div>

            {/* Main Heading with letter animation */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight text-white"
              style={{ fontFamily: "var(--font-poppins)", perspective: "800px" }}
            >
              Know more on{" "}
              <span className="relative inline-block">
                <AnimatedHeading
                  text="Credit Transfers"
                  className="relative z-10"
                />
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-1 left-0 right-0 h-3 -z-0 origin-left"
                  style={{
                    background: "linear-gradient(90deg, rgba(16,45,140,0.7), rgba(229,57,53,0.6))",
                    borderRadius: "4px",
                  }}
                />
              </span>
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-px w-32 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }}
            />

            {/* Description */}
            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl font-medium"
            >
              Credit transfer is a process that allows students to apply academic credits earned
              from one institution toward a degree at another—reducing time, cost, and repetition.
              Consult with our advisors for a seamless transition.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-4 justify-center">
              <Link
                href="#programs"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: "linear-gradient(135deg, #102D8C, #E53935)" }}
              >
                Explore Programs
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#journey"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                Get Started
              </Link>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-4 flex flex-col items-center gap-1 text-white/30 text-xs"
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stats Strip */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="relative z-10 border-t border-white/10"
        style={{ background: "rgba(7,19,48,0.6)", backdropFilter: "blur(20px)" }}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
                className="flex flex-col items-center py-6 px-4 text-center gap-1"
              >
                <stat.icon className="h-5 w-5 text-accent mb-1" />
                <span className="text-2xl font-extrabold text-white" style={{ fontFamily: "var(--font-poppins)" }}>
                  {stat.value}
                </span>
                <span className="text-xs text-white/50 font-medium uppercase tracking-wide">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BENEFITS STRIP
───────────────────────────────────────────── */
const benefits = [
  { icon: Clock, label: "Save Time", desc: "Skip repeated coursework" },
  { icon: DollarSign, label: "Cut Costs", desc: "Reduce tuition expenses" },
  { icon: Globe, label: "Global Mobility", desc: "Study across borders" },
  { icon: CheckCircle2, label: "Recognized Credits", desc: "Accredited pathways" },
];

function BenefitsStrip() {
  return (
    <section className="py-14 bg-bg-section relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {benefits.map((b, i) => (
            <motion.div
              key={b.label}
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative rounded-2xl p-6 text-center overflow-hidden cursor-default"
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(16,45,140,0.1)",
                boxShadow: "0 4px 24px rgba(16,45,140,0.06)",
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "linear-gradient(135deg, rgba(16,45,140,0.04) 0%, rgba(229,57,53,0.04) 100%)" }}
              />
              <div className="relative z-10">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: "linear-gradient(135deg, #102D8C, #E53935)" }}>
                  <b.icon className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-sm font-extrabold text-heading mb-1" style={{ fontFamily: "var(--font-poppins)" }}>
                  {b.label}
                </h4>
                <p className="text-xs text-paragraph font-medium">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROGRAM CARDS (3D Glassmorphism)
───────────────────────────────────────────── */
const programs = [
  {
    id: "ug",
    icon: BookOpen,
    badge: "Undergraduate",
    title: "UG Credit Transfer Program",
    description:
      "Transfer your earned UG credits to top universities, saving time and costs while completing your degree efficiently. Our advisors match your coursework for maximum credit acceptance.",
    image: "/ug-credit-transfer.png",
    imageAlt: "Student reviewing academic documents for undergraduate credit transfer",
    highlights: ["Save up to 2 Years", "Top Universities", "Expert Guidance"],
    accent: "from-[#102D8C] to-[#0E2A75]",
    gradientBg: "linear-gradient(135deg, #102D8C, #0E2A75)",
    glow: "rgba(16,45,140,0.35)",
    badgeColor: "from-blue-600/20 to-blue-800/20 border-blue-400/30 text-blue-300",
  },
  {
    id: "pg",
    icon: GraduationCap,
    badge: "Postgraduate",
    title: "PG Credit Transfer Program",
    description:
      "Transfer your PG credits to leading universities, saving time and money while completing your postgraduate degree smoothly. Ideal for working professionals seeking advancement.",
    image: "/pg-credit-transfer.png",
    imageAlt: "Student continuing postgraduate studies with laptop and books",
    highlights: ["Flexible Timelines", "Research Credits", "Global Partners"],
    accent: "from-[#E53935] to-[#C62828]",
    gradientBg: "linear-gradient(135deg, #E53935, #C62828)",
    glow: "rgba(229,57,53,0.35)",
    badgeColor: "from-red-600/20 to-red-800/20 border-red-400/30 text-red-300",
  },
  {
    id: "diploma",
    icon: Award,
    badge: "Diploma",
    title: "Diploma Credit Transfer Program",
    description:
      "Transfer your Diploma credits to leading universities and bridge to full degree programs. Recognition of your prior learning opens doors to higher education seamlessly.",
    image: "/diploma-credit-transfer.png",
    imageAlt: "Student with study materials representing diploma credit transfer",
    highlights: ["Bridge to Degree", "Recognized Credits", "Fast Track"],
    accent: "from-[#0E2A75] to-[#E53935]",
    gradientBg: "linear-gradient(135deg, #0E2A75, #E53935)",
    glow: "rgba(14,42,117,0.4)",
    badgeColor: "from-purple-600/20 to-purple-800/20 border-purple-400/30 text-purple-300",
  },
];

function ProgramCard({
  program,
  index,
}: {
  program: (typeof programs)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setRotate({ x: dy * -8, y: dx * 8 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="relative"
      style={{ perspective: "1200px" }}
    >
      {/* 3D black shadow — slightly outside/below the card */}
      <motion.div
        animate={hovered ? { scale: 1.04, opacity: 0.9 } : { scale: 1, opacity: 0.7 }}
        transition={{ duration: 0.3 }}
        className="absolute -bottom-4 left-4 right-4 h-full rounded-[2rem] pointer-events-none"
        style={{
          background: "#000000",
          filter: "blur(24px)",
          zIndex: 0,
        }}
      />

      {/* Card */}
      <motion.div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          y: hovered ? -8 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative rounded-[2rem] overflow-hidden z-10"
        style={{
          transformStyle: "preserve-3d",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: hovered
            ? `0 24px 60px ${program.glow}, 0 0 0 1px rgba(255,255,255,0.1)`
            : `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)`,
        }}
      >
        {/* Top gradient accent */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${program.accent}`}
        />

        {/* Image section */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={program.image}
            alt={program.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.6s ease" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 30%, rgba(7,19,48,0.95) 100%)" }}
          />

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-gradient-to-r ${program.badgeColor} backdrop-blur-sm`}>
              <program.icon className="h-3 w-3" />
              {program.badge}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-7 relative z-10">
          {/* Glow on hover */}
          <motion.div
            animate={hovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${program.glow} 0%, transparent 70%)` }}
          />

          <h3
            className="text-xl font-extrabold text-white mb-3 leading-tight"
            style={{ fontFamily: "var(--font-poppins)", transform: "translateZ(20px)" }}
          >
            {program.title}
          </h3>

          <p className="text-white/60 text-sm leading-relaxed mb-5 font-medium">
            {program.description}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2 mb-6">
            {program.highlights.map((h) => (
              <span
                key={h}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <CheckCircle2 className="h-3 w-3 text-green-400" />
                {h}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: program.gradientBg,
              boxShadow: `0 4px 20px ${program.glow}`,
            }}
          >
            Know More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProgramList() {
  return (
    <section
      id="programs"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #071330 0%, #050D1F 50%, #0A1540 100%)" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Blur orbs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,45,140,0.3) 0%, transparent 70%)" }}
      />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(229,57,53,0.2) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/15 bg-white/5 text-white/60 mb-5"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Program Options
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Choose Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6B9FFF, #E53935)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Transfer Path
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-white/50 text-base max-w-xl mx-auto font-medium">
            Structured pathways for undergraduate, postgraduate, and diploma learners—crafted to
            help students continue their education without repetition.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROCESS STEPS SECTION
───────────────────────────────────────────── */
const steps = [
  { step: "01", title: "Consult Our Advisors", desc: "Share your academic background and goals with our expert counselors." },
  { step: "02", title: "Credit Evaluation", desc: "We review your transcripts and match them with the target institution's curriculum." },
  { step: "03", title: "Application Support", desc: "Our team assists with all paperwork, documentation, and university applications." },
  { step: "04", title: "Seamless Transition", desc: "Complete your degree in less time, with recognized credits fully transferred." },
];

function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-bg-section">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20 bg-primary/5 text-primary mb-5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            How It Works
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-heading leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Your Journey,{" "}
            <span className="gradient-text">Simplified</span>
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6 }}
              className="relative group"
              style={{ perspective: "800px" }}
            >
              {/* 3D shadow */}
              <div
                className="absolute -bottom-3 left-3 right-3 h-full rounded-2xl pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                style={{ background: "#000", filter: "blur(16px)", zIndex: 0 }}
              />

              <div
                className="relative z-10 rounded-2xl p-6 h-full"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(16,45,140,0.1)",
                  boxShadow: "0 8px 32px rgba(16,45,140,0.08)",
                }}
              >
                <div
                  className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, rgba(16,45,140,0.2), rgba(229,57,53,0.2))",
                    fontFamily: "var(--font-poppins)",
                    WebkitTextStroke: "1px rgba(16,45,140,0.25)",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {step.step}
                </div>
                <h4 className="text-sm font-extrabold text-heading mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
                  {step.title}
                </h4>
                <p className="text-xs text-paragraph leading-relaxed font-medium">{step.desc}</p>

                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary/40 to-transparent z-20" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   JOURNEY FORM SECTION
───────────────────────────────────────────── */
function JourneyForm() {
  return (
    <section
      id="journey"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #071330 0%, #050D1F 100%)" }}
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,45,140,0.25) 0%, transparent 70%)" }}
      />
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(229,57,53,0.18) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image + Trust Badges */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* 3D image frame */}
            <div className="relative" style={{ perspective: "1000px" }}>
              <motion.div
                whileHover={{ rotateY: -5, rotateX: 3 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative aspect-[4/3] overflow-hidden rounded-[2rem]"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: "0 0 0 4px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.5)",
                }}
              >
                <Image
                  src="https://images.pexels.com/photos/8866802/pexels-photo-8866802.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Edumentora support team assisting students"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(7,19,48,0.3), transparent)" }}
                />
              </motion.div>

              {/* 3D shadow */}
              <div
                className="absolute -bottom-4 left-6 right-6 h-full rounded-[2rem] pointer-events-none"
                style={{ background: "#000", filter: "blur(32px)", opacity: 0.6, zIndex: -1 }}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-2 sm:right-6 rounded-2xl p-4"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "linear-gradient(135deg, #E53935, #C62828)" }}>
                  <Headset className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Expert Support</p>
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-wide mt-0.5">Always Here to Help</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div
              className="relative rounded-[2rem] p-8 lg:p-10 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(32px)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
              }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(16,45,140,0.8), rgba(229,57,53,0.8), transparent)" }}
              />

              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(16,45,140,0.15) 0%, transparent 70%)" }}
              />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/15 bg-white/5 text-white/60 mb-5">
                  <Sparkles className="h-3 w-3 text-accent" />
                  Get Started
                </span>

                <h2
                  className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Start Your Journey with
                </h2>
                <h2
                  className="text-2xl sm:text-3xl font-extrabold mb-7 leading-tight"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    background: "linear-gradient(135deg, #6B9FFF, #E53935)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Edumentora
                </h2>

                <form className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {["Name", "Your Email"].map((placeholder) => (
                      <input
                        key={placeholder}
                        type={placeholder.includes("Email") ? "email" : "text"}
                        placeholder={placeholder}
                        className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-300"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "rgba(255,255,255,0.85)",
                        }}
                        onFocus={(e) => {
                          e.target.style.border = "1px solid rgba(107,159,255,0.5)";
                          e.target.style.background = "rgba(255,255,255,0.09)";
                          e.target.style.boxShadow = "0 0 0 3px rgba(107,159,255,0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.border = "1px solid rgba(255,255,255,0.12)";
                          e.target.style.background = "rgba(255,255,255,0.06)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    ))}
                  </div>
                  <input
                    type="tel"
                    placeholder="Your Phone Number"
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.85)",
                    }}
                    onFocus={(e) => {
                      e.target.style.border = "1px solid rgba(107,159,255,0.5)";
                      e.target.style.background = "rgba(255,255,255,0.09)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(107,159,255,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border = "1px solid rgba(255,255,255,0.12)";
                      e.target.style.background = "rgba(255,255,255,0.06)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-300 resize-none"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.85)",
                    }}
                    onFocus={(e) => {
                      e.target.style.border = "1px solid rgba(107,159,255,0.5)";
                      e.target.style.background = "rgba(255,255,255,0.09)";
                      e.target.style.boxShadow = "0 0 0 3px rgba(107,159,255,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.border = "1px solid rgba(255,255,255,0.12)";
                      e.target.style.background = "rgba(255,255,255,0.06)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white w-full transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #102D8C, #E53935)",
                      boxShadow: "0 8px 32px rgba(16,45,140,0.4)",
                    }}
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────── */
export default function CreditTransferContent() {
  return (
    <>
      <KnowMoreIntro />
      <BenefitsStrip />
      <ProgramList />
      <HowItWorks />
      <JourneyForm />
    </>
  );
}
