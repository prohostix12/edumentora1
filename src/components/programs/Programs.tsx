"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Globe,
  Briefcase,
  Laptop,
  Users,
  Sparkles,
} from "lucide-react";

const programs = [
  {
    icon: BookOpen,
    title: "Credit Transfer Program",
    description:
      "Seamlessly transfer your earned credits to partner universities. We review your mark sheets and syllabus to ensure maximum credit acceptance.",
    color: "from-[#102D8C] to-[#0E2A75]",
    glow: "rgba(16,45,140,0.5)",
    href: "/credit-transfer",
    featured: true,
  },
  {
    icon: GraduationCap,
    title: "University Admissions",
    description:
      "Get expert guidance for admissions into top universities across India. We help you choose the right institution based on your goals and credits.",
    color: "from-[#E53935] to-[#C62828]",
    glow: "rgba(229,57,53,0.5)",
  },
  {
    icon: Globe,
    title: "Study Abroad",
    description:
      "Explore international education opportunities with our study abroad programs. We assist with university selection, applications, and visa processing.",
    color: "from-[#0E2A75] to-[#102D8C]",
    glow: "rgba(14,42,117,0.5)",
  },
  {
    icon: Briefcase,
    title: "Career Counseling",
    description:
      "Receive personalized career guidance from industry experts. We help you align your education with your professional aspirations.",
    color: "from-[#102D8C] to-[#E53935]",
    glow: "rgba(16,45,140,0.4)",
  },
  {
    icon: Laptop,
    title: "Distance Education",
    description:
      "Pursue flexible learning through our distance education partnerships. Study at your own pace while earning recognized degrees.",
    color: "from-[#E53935] to-[#0E2A75]",
    glow: "rgba(229,57,53,0.4)",
  },
  {
    icon: Users,
    title: "Professional Courses",
    description:
      "Enhance your skills with industry-relevant professional courses. From management to technology, we offer programs that boost your career.",
    color: "from-[#0E2A75] to-[#E53935]",
    glow: "rgba(14,42,117,0.4)",
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
    setRotate({ x: dy * -7, y: dx * 7 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  // Extract gradient start color for button bg
  const gradFrom = program.color.split(" ")[0].replace("from-[", "").replace("]", "");
  const gradTo = program.color.split(" ")[1].replace("to-[", "").replace("]", "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ perspective: "1000px" }}
    >
      {/* 3D black shadow */}
      <motion.div
        animate={hovered ? { scale: 1.05, opacity: 0.85 } : { scale: 1, opacity: 0.6 }}
        transition={{ duration: 0.3 }}
        className="absolute -bottom-4 left-4 right-4 h-full rounded-[1.75rem] pointer-events-none"
        style={{ background: "#000", filter: "blur(20px)", zIndex: 0 }}
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
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="relative rounded-[1.75rem] overflow-hidden z-10 h-full"
        style={{
          transformStyle: "preserve-3d",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: hovered
            ? `0 24px 60px ${program.glow}, 0 0 0 1px rgba(255,255,255,0.1)`
            : "0 8px 32px rgba(0,0,0,0.3)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Top gradient bar */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${program.color} transition-opacity duration-500`}
          style={{ opacity: hovered ? 1 : 0.6 }}
        />

        {/* Glow on hover */}
        <motion.div
          animate={hovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${program.glow} 0%, transparent 70%)` }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 lg:p-9 flex flex-col h-full">
          {/* Icon */}
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${program.color} shadow-md mb-7 transition-transform duration-500`}
            style={{
              transform: hovered ? "scale(1.08) rotate(3deg)" : "scale(1) rotate(0deg)",
              boxShadow: hovered ? `0 8px 24px ${program.glow}` : "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <program.icon className="h-6 w-6 text-white" />
          </div>

          <h3
            className="text-lg font-bold text-white mb-3 transition-colors duration-300"
            style={{
              fontFamily: "var(--font-poppins)",
              color: hovered ? "#fff" : "rgba(255,255,255,0.92)",
            }}
          >
            {program.title}
          </h3>

          <p className="text-white/55 leading-relaxed mb-7 text-sm font-medium flex-grow">
            {program.description}
          </p>

          <Link
            href={program.href ?? "/contact"}
            className="inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-full text-xs font-bold text-white w-fit transition-all duration-300"
            style={{
              background: hovered
                ? `linear-gradient(135deg, ${gradFrom}, ${gradTo})`
                : "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: hovered ? `0 4px 20px ${program.glow}` : "none",
            }}
          >
            {program.href ? "Know More" : "Learn More"}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Programs() {
  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #071330 0%, #050D1F 50%, #0A1540 100%)" }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,45,140,0.2) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[5%] right-[-10%] w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(229,57,53,0.18) 0%, transparent 70%)" }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-white/15 bg-white/5 text-white/60 mb-5"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Our Programs
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Programs Designed for{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6B9FFF, #E53935)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your Success
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-base max-w-2xl font-medium"
          >
            We offer a comprehensive range of educational programs tailored to meet the diverse
            needs of students seeking academic growth and career advancement.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <ProgramCard key={program.title} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
