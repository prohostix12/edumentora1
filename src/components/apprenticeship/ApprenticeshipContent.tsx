"use client";

import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Clock3,
  MonitorSmartphone,
  ChevronRight,
  GraduationCap,
  Users,
  Award,
  Send,
  Headset,
  Sparkles,
  ChevronDown,
  CheckCircle2,
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
function ApprenticeshipHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const stats = [
    { label: "Apprentices Enrolled", value: "1,500+", icon: Users },
    { label: "Partner Companies", value: "80+", icon: Briefcase },
    { label: "Success Rate", value: "99%", icon: Award },
    { label: "Flexible Options", value: "3+", icon: MonitorSmartphone },
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
          src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1920&h=1080"
          alt="Apprenticeship Program Hero"
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
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-32 text-center font-medium">
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
                Apprenticeship Program
                <Sparkles className="h-3.5 w-3.5 text-accent" />
              </span>
            </motion.div>

            {/* Main Heading with letter animation */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight text-white animate-fade-in"
              style={{ fontFamily: "var(--font-poppins)", perspective: "800px" }}
            >
              Apprenticeship program at{" "}
              <span className="relative inline-block">
                <AnimatedHeading
                  text="Edumentora"
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
              className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-8"
            >
              Edumentora&apos;s apprenticeship credit transfer lets you carry your
              earned experience to new opportunities. Stay on track, keep learning,
              and grow without interruption.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-bounce-subtle"
                style={{ background: "linear-gradient(135deg, #102D8C, #E53935)" }}
              >
                Know More
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#process"
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
                <stat.icon className="h-5 w-5 text-accent mb-1 animate-pulse-slow" />
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
   EALP INTRO SECTION
───────────────────────────────────────────── */
function EALPIntro() {
  return (
    <section className="py-20 lg:py-28 bg-bg-section relative overflow-hidden">
      {/* Decorative blurred glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20 bg-primary/5 text-primary mb-5"
        >
          <Sparkles className="h-3.5 w-3.5" />
          EALP Program
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-extrabold leading-tight text-heading mb-4"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Employee Apprenticeship- Learning Program <span className="gradient-text">(EALP)</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg sm:text-xl font-bold text-primary mb-8"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Earn a Recognized Degree Faster by Converting Your Work Experience
          into Academic Credits
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base sm:text-lg text-paragraph leading-relaxed font-medium"
        >
          The Employee Apprenticeship-Based Learning Program (EALP) is a unique
          opportunity for working professionals to complete their degree
          without restarting from the beginning. This program recognizes your
          work experience and converts it into academic credits, allowing you
          to earn a UG or PG degree in a shorter time while continuing your
          job.
        </motion.p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROCESS STEPS SECTION (How It Works)
───────────────────────────────────────────── */
const steps = [
  {
    icon: Briefcase,
    number: "01",
    title: "Work Experience as Academic Credits",
    points: [
      "If you have 2+ years of work experience, it will be evaluated and counted as part of your degree.",
      "You don't need to study subjects where you already have practical knowledge.",
    ],
  },
  {
    icon: Clock3,
    number: "02",
    title: "Reduced Study Duration",
    points: [
      "Instead of the traditional 3–4-year degree, your work experience helps you complete the course faster.",
      "The exact duration depends on your experience and the course requirements.",
    ],
  },
  {
    icon: MonitorSmartphone,
    number: "03",
    title: "Flexible Learning Options",
    points: [
      "Study through online classes, weekend sessions, or a hybrid model while continuing your job.",
      "Course content is industry-relevant, ensuring practical learning.",
    ],
  },
];

function HowItWorks() {
  return (
    <section id="process" className="py-20 lg:py-28 relative overflow-hidden bg-bg-section">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20 bg-primary/5 text-primary mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            The Process
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-heading leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            How it <span className="gradient-text">Works</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="relative group h-full"
              style={{ perspective: "800px" }}
            >
              {/* 3D shadow */}
              <div
                className="absolute -bottom-3 left-3 right-3 h-full rounded-[2rem] pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                style={{ background: "#000", filter: "blur(16px)", zIndex: 0 }}
              />

              <div
                className="relative z-10 rounded-[2rem] p-8 h-full flex flex-col justify-between"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(16,45,140,0.1)",
                  boxShadow: "0 8px 32px rgba(16,45,140,0.08)",
                }}
              >
                <div>
                  <div
                    className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(135deg, rgba(16,45,140,0.2), rgba(229,57,53,0.2))",
                      fontFamily: "var(--font-poppins)",
                      WebkitTextStroke: "1px rgba(16,45,140,0.25)",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {step.number}
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark shadow-md shadow-accent/25 mb-6">
                    <step.icon className="h-5 w-5 text-white" />
                  </div>

                  <h3
                    className="text-lg font-extrabold text-heading mb-4 group-hover:text-primary transition-colors duration-300"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {step.title}
                  </h3>

                  <ul className="flex flex-col gap-3 font-medium">
                    {step.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-paragraph leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connector line (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-primary/40 to-transparent z-20" />
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
   DEGREE PROGRAMS SECTION
───────────────────────────────────────────── */
const ugPrograms = [
  "BBA (Bachelor of Business Administration) – Ideal for business professionals",
  "B.Com (Bachelor of Commerce) – Perfect for accountants and finance experts",
  "BCA (Bachelor of Computer Applications) – Best for IT professionals",
  "B.Sc IT (Bachelor of Science in Information Technology) – For software and tech experts",
  "B.Tech (Bachelor of Technology) – Suitable for engineering professionals in various fields",
  "BA (Bachelor of Arts) – Various specializations in humanities and social sciences",
];

const pgPrograms = [
  "MBA (Master of Business Administration) – For career growth in management",
  "M.Com (Master of Commerce) – Advanced knowledge for commerce and finance professionals",
  "MCA (Master of Computer Applications) – Higher studies in IT and computer applications",
  "M.Tech (Master of Technology) – For engineers looking for specialization and advanced knowledge",
];

function DegreeProgramCard({
  title,
  programsList,
  image,
  imageAlt,
  accent,
  glow,
  badge,
  icon: Icon,
  badgeColor,
  index,
}: {
  title: string;
  programsList: string[];
  image: string;
  imageAlt: string;
  accent: string;
  glow: string;
  badge: string;
  icon: any;
  badgeColor: string;
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      className="relative"
      style={{ perspective: "1200px" }}
    >
      {/* 3D black shadow */}
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
        className="relative rounded-[2rem] overflow-hidden z-10 flex flex-col h-full"
        style={{
          transformStyle: "preserve-3d",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: hovered
            ? `0 24px 60px ${glow}, 0 0 0 1px rgba(255,255,255,0.1)`
            : `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)`,
        }}
      >
        {/* Top gradient accent */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent}`} />

        {/* Image section */}
        <div className="relative h-64 overflow-hidden shrink-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)", transition: "transform 0.6s ease" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 30%, rgba(7,19,48,0.95) 100%)" }}
          />

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-gradient-to-r ${badgeColor} backdrop-blur-sm`}>
              <Icon className="h-3.5 w-3.5" />
              {badge}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10 relative z-10 flex-grow flex flex-col justify-between">
          <div>
            {/* Glow on hover */}
            <motion.div
              animate={hovered ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }}
            />

            <h3
              className="text-2xl font-extrabold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-poppins)", transform: "translateZ(20px)" }}
            >
              {title}
            </h3>

            <ul className="flex flex-col gap-4 mb-8">
              {programsList.map((program, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  </span>
                  <span className="text-sm text-white/70 leading-relaxed font-medium">
                    {program}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 mt-auto"
            style={{
              background: `linear-gradient(135deg, ${accent.split(" ")[0].replace("from-[", "").replace("]", "")}, ${accent.split(" ")[1].replace("to-[", "").replace("]", "")})`,
              boxShadow: `0 4px 20px ${glow}`,
            }}
          >
            Apply Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DegreePrograms() {
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
            Degree Options
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Available{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6B9FFF, #E53935)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Degree Programs
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-white/50 text-base max-w-xl mx-auto font-medium">
            You can complete your degree in various fields through our structured pathways, including:
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <DegreeProgramCard
            title="Undergraduate Programs"
            programsList={ugPrograms}
            image="https://images.pexels.com/photos/3182760/pexels-photo-3182760.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=627"
            imageAlt="Apprentices collaborating on digital learning projects during workshop"
            accent="from-[#102D8C] to-[#0E2A75]"
            glow="rgba(16,45,140,0.35)"
            badge="Undergraduate"
            icon={GraduationCap}
            badgeColor="from-blue-600/20 to-blue-800/20 border-blue-400/30 text-blue-300"
            index={0}
          />
          <DegreeProgramCard
            title="Postgraduate Programs"
            programsList={pgPrograms}
            image="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=627"
            imageAlt="Apprenticeship Graduation – Certification Ceremony at Edu Mentora"
            accent="from-[#E53935] to-[#C62828]"
            glow="rgba(229,57,53,0.35)"
            badge="Postgraduate"
            icon={Award}
            badgeColor="from-red-600/20 to-red-800/20 border-red-400/30 text-red-300"
            index={1}
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   WHO CAN APPLY / WHY CHOOSE SECTION
───────────────────────────────────────────── */
const whoCanApply = [
  "Working professionals who discontinued their studies and want to complete their degree.",
  "Employees with 2+ years of industry experience who want an academic qualification.",
  "People seeking career growth and better job opportunities.",
  "Corporate professionals who want to upskill and move up the career ladder.",
];

const whyChoose = [
  "Complete Your Degree Faster – Work experience reduces study time.",
  "Work & Study Together – No need to quit your job.",
  "Flexible Learning – Online, weekend, or hybrid classes available.",
  "Recognized Degree – Accepted for jobs, promotions, and further studies.",
  "Industry-Relevant Curriculum – Courses designed to match your field of work.",
];

function WhoAndWhy() {
  return (
    <section className="relative py-20 lg:py-28 text-white overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050D1F 0%, #071330 100%)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-2 gap-12 font-medium">
          {/* Who Can Apply */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#102D8C] to-[#E53935]" />

            <div className="flex items-center gap-4 mb-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#102D8C] to-[#0E2A75] shadow-lg shadow-primary/20 animate-pulse-slow">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3
                className="text-xl font-extrabold text-white"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Who Can Apply?
              </h3>
            </div>
            <ul className="flex flex-col gap-4">
              {whoCanApply.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 mt-0.5">
                    <ChevronRight className="h-3.5 w-3.5 text-[#6B9FFF]" />
                  </span>
                  <span className="text-sm text-white/70 leading-relaxed">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Why Choose EALP */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-[2.5rem] p-8 lg:p-10 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E53935] to-[#C62828]" />

            <div className="flex items-center gap-4 mb-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E53935] to-[#C62828] shadow-lg shadow-accent/20 animate-pulse-slow">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3
                className="text-xl font-extrabold text-white"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Why Choose EALP?
              </h3>
            </div>
            <ul className="flex flex-col gap-4">
              {whyChoose.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 mt-0.5">
                    <ChevronRight className="h-3.5 w-3.5 text-accent" />
                  </span>
                  <span className="text-sm text-white/70 leading-relaxed">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Closing paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center text-sm sm:text-base text-white/50 leading-relaxed max-w-3xl mx-auto"
        >
          This program helps you achieve your educational goals while
          leveraging your professional experience. Your hard work and skills
          deserve academic recognition—now you can earn your degree without
          starting from scratch!
        </motion.p>
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
          {/* Left - Image + Floating Support Card */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative font-medium"
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
                  src="https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
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

            {/* Overlapping secondary image or badge */}
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
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-300 resize-none font-medium"
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
export default function ApprenticeshipContent() {
  return (
    <>
      <ApprenticeshipHero />
      <EALPIntro />
      <HowItWorks />
      <DegreePrograms />
      <WhoAndWhy />
      <JourneyForm />
    </>
  );
}
