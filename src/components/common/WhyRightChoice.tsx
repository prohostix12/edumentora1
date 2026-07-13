"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  Variants,
} from "framer-motion";
import {
  UserCheck,
  Route,
  HeartHandshake,
  Zap,
  ShieldCheck,
  PiggyBank,
  Sparkles,
  GraduationCap,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Reason {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;       // gradient for the icon bubble
  glow: string;           // shadow color on hover
  accent: string;         // ring color
  span?: "col" | "row";   // optional grid span hint
}

// ─── Data ────────────────────────────────────────────────────────────────────

const reasons: Reason[] = [
  {
    icon: UserCheck,
    title: "Expert Guidance",
    description:
      "Our dedicated team offers tailored guidance, ensuring a seamless and successful academic credit transfer experience for each student.",
    gradient: "from-[#102D8C] to-[#1E40AF]",
    glow: "rgba(16,45,140,0.35)",
    accent: "#102D8C",
    span: "col",
  },
  {
    icon: Route,
    title: "Flexible Learning Paths",
    description:
      "We offer tailored programs that allow you to balance education with personal and professional commitments effectively.",
    gradient: "from-[#E53935] to-[#F97316]",
    glow: "rgba(229,57,53,0.35)",
    accent: "#E53935",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Support",
    description:
      "Our experienced team offers personalized support, guaranteeing a seamless and hassle-free academic credit transfer experience.",
    gradient: "from-[#7C3AED] to-[#A855F7]",
    glow: "rgba(124,58,237,0.35)",
    accent: "#7C3AED",
  },
  {
    icon: Zap,
    title: "Effortless Credit Transfer",
    description:
      "Seamlessly transfer your earned credits to resume your education without losing progress or starting from scratch.",
    gradient: "from-[#0EA5E9] to-[#06B6D4]",
    glow: "rgba(14,165,233,0.35)",
    accent: "#0EA5E9",
    span: "row",
  },
  {
    icon: ShieldCheck,
    title: "Trusted University",
    description:
      "Collaborations with Glocal University, Radha Govind University, and Arni University ensure globally recognized credentials.",
    gradient: "from-[#10B981] to-[#059669]",
    glow: "rgba(16,185,129,0.35)",
    accent: "#10B981",
  },
  {
    icon: PiggyBank,
    title: "Save Time & Money",
    description:
      "Resume your education from where you paused, saving valuable time and reducing overall financial burden significantly.",
    gradient: "from-[#F59E0B] to-[#D97706]",
    glow: "rgba(245,158,11,0.35)",
    accent: "#F59E0B",
  },
];

// ─── Animation Variants ──────────────────────────────────────────────────────

/** Staggered container: children animate in sequence */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** Individual card entrance: fade + slide-up */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Heading word-by-word reveal */
const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Animated Counter ────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 24);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Floating Orb (decorative background element) ───────────────────────────

function FloatingOrb({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-30 ${className}`}
      animate={{
        y: [0, -30, 0],
        scale: [1, 1.06, 1],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// ─── Feature Card ────────────────────────────────────────────────────────────

function FeatureCard({
  reason,
  index,
}: {
  reason: Reason;
  index: number;
}) {
  const Icon = reason.icon;

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-[#E1E7F5] bg-white/80 backdrop-blur-sm p-7 cursor-default"
      style={{
        boxShadow: "0 4px 30px rgba(16,45,140,0.06)",
      }}
      // Dynamic hover glow via CSS custom property technique
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 20px 60px ${reason.glow}, 0 4px 20px rgba(0,0,0,0.05)`;
        (e.currentTarget as HTMLElement).style.borderColor = `${reason.accent}40`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 4px 30px rgba(16,45,140,0.06)";
        (e.currentTarget as HTMLElement).style.borderColor = "#E1E7F5";
      }}
      aria-label={reason.title}
    >
      {/* Top accent bar that slides in on hover */}
      <div
        className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${reason.gradient} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
      />

      {/* Subtle corner glow blob */}
      <div
        className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${reason.accent} 0%, transparent 70%)`,
        }}
      />

      {/* Index number watermark */}
      <span
        className="absolute top-5 right-6 text-6xl font-black text-gray-100 select-none leading-none group-hover:text-gray-200 transition-colors duration-300"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon */}
      <motion.div
        className={`relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${reason.gradient} shadow-lg`}
        whileHover={{ rotate: [0, -8, 8, 0], scale: 1.12 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      >
        <Icon className="h-7 w-7 text-white" aria-hidden="true" />
        {/* Subtle shine overlay */}
        <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Text */}
      <h3
        className="relative text-[17px] font-bold text-[#071330] mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-300"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {reason.title}
      </h3>
      <p className="relative text-[13.5px] leading-relaxed text-[#475569]">
        {reason.description}
      </p>
    </motion.article>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  // Parallax scroll effect for the heading block
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center start"],
  });
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const headingWords = ["Why", "We're", "the", "Right", "Choice"];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-36"
      aria-labelledby="why-choose-heading"
    >
      {/* ── Background ──────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-white" />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(16,45,140,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Floating gradient orbs */}
      <FloatingOrb
        className="h-96 w-96 bg-primary/10 -top-20 -left-32"
        delay={0}
      />
      <FloatingOrb
        className="h-72 w-72 bg-accent/10 -bottom-16 right-0"
        delay={2.5}
      />
      <FloatingOrb
        className="h-56 w-56 bg-primary/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        delay={4.5}
      />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Heading ─────────────────────────────────────────── */}
        <motion.div
          ref={headingRef}
          style={{ y: headingY }}
          className="mb-16 lg:mb-20 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={headingInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-[#102D8C]/20 bg-white/70 backdrop-blur-sm px-5 py-2 text-sm font-semibold text-[#102D8C] shadow-sm mb-6"
          >
            <Sparkles className="h-4 w-4 text-[#E53935]" aria-hidden="true" />
            Why Choose Us
          </motion.div>

          {/* Animated heading */}
          <h2
            id="why-choose-heading"
            className="text-4xl sm:text-5xl lg:text-[56px] font-black leading-tight text-[#071330] tracking-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
            aria-label="Why We're the Right Choice"
          >
            {headingWords.map((word, i) => (
              <motion.span
                key={word + i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate={headingInView ? "visible" : "hidden"}
                className={`inline-block mr-3 ${
                  word === "Right" ? "gradient-text" : ""
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={headingInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#102D8C] via-[#E53935] to-[#F97316] origin-left"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-[#475569] leading-relaxed"
          >
            Join thousands of students who rediscovered their academic journey
            with our trusted, proven platform — built for real lives.
          </motion.p>
        </motion.div>

        {/* ── Stats Bar ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: 10000, suffix: "+", label: "Students Enrolled", icon: GraduationCap },
            { value: 95, suffix: "%", label: "Success Rate", icon: ShieldCheck },
            { value: 3, suffix: "+", label: "Trusted Universities", icon: UserCheck },
            { value: 12, suffix: " Yrs", label: "Of Experience", icon: Sparkles },
          ].map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group flex flex-col items-center justify-center rounded-2xl border border-[#E1E7F5] bg-white/75 backdrop-blur-sm p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <StatIcon
                  className="h-5 w-5 text-[#102D8C] mb-2"
                  aria-hidden="true"
                />
                <span
                  className="text-2xl sm:text-3xl font-black text-[#071330]"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-xs text-[#475569] mt-1 text-center font-medium">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* ── 6-Card Uniform Grid (3 cols × 2 rows) ────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {reasons.map((reason, index) => (
            <FeatureCard key={reason.title} reason={reason} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
