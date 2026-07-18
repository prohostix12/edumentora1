"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useInView, animate } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";
import { ArrowRight, GraduationCap, Globe, Award, BookOpen, Send, CheckCircle2 } from "lucide-react";

// Load Playfair Display font for the heading
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

// Reusable Count-Up Counter Component
function Counter({ value, duration = 1.5, delay = 0 }: { value: string; duration?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    if (!node) return;

    // Parse numeric part
    const matches = value.match(/(\d+)/);
    if (!matches) {
      node.textContent = value;
      return;
    }

    const targetNumber = parseInt(matches[0], 10);
    const prefix = value.split(matches[0])[0] || "";
    const suffix = value.split(matches[0])[1] || "";

    const controls = animate(0, targetNumber, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate(current) {
        node.textContent = prefix + Math.floor(current) + suffix;
      },
    });

    return () => controls.stop();
  }, [value, inView, duration, delay]);

  return <span ref={ref}>0</span>;
}

// Letter-by-Letter Animated Text Component (for the Main Heading)
function AnimatedHeading({ text, shouldReduceMotion }: { text: string; shouldReduceMotion: boolean }) {
  // Split title by newline. If no newlines are present, we split by common lines.
  let lines = text.split("\n");

  // Fallback split for default titles to ensure proper lines and coloring
  if (lines.length === 1) {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("credit transfer")) {
      const parts = text.split(/(credit transfer)/i);
      lines = [parts[0].trim(), parts[1].trim()];
    } else if (lowerText.includes("education journey")) {
      const parts = text.split(/(education journey)/i);
      lines = [parts[0].trim(), parts[1].trim()];
    }
  }

  // Variant for the container (stagger children)
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.03,
        delayChildren: 0.4,
      },
    },
  };

  // Variant for individual letters
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 60,
      rotateX: shouldReduceMotion ? 0 : -90,
      filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.55,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`flex flex-col select-none my-6 ${playfairDisplay.className} text-[36px] md:text-[50px] lg:text-[64px] leading-[1.15] font-bold`}
      style={{ perspective: 1000 }}
    >
      {lines.map((line, lineIndex) => {
        const isWholeLineRed = 
          line.toLowerCase().trim() === "credit transfer" || 
          line.toLowerCase().trim() === "education journey";

        const words = line.split(" ");
        
        return (
          <div 
            key={lineIndex} 
            className={`block overflow-hidden py-1 leading-[1.15] ${
              isWholeLineRed ? "text-[#A1122A] underline decoration-[#A1122A] decoration-[3px] underline-offset-[8px]" : ""
            }`}
          >
            {words.map((word, wordIndex) => {
              const isRedWord =
                word.toLowerCase().includes("education") ||
                word.toLowerCase().includes("credit") ||
                word.toLowerCase().includes("transfer") ||
                word.toLowerCase().includes("abroad");

              const wordColorClass = isRedWord ? "text-[#A1122A]" : "text-[#081B3A]";
              const wordUnderlineClass = isRedWord && !isWholeLineRed ? "underline decoration-[#A1122A] decoration-[3px] underline-offset-[8px]" : "";

              return (
                <span
                  key={wordIndex}
                  className={`inline-block mr-[0.25em] whitespace-nowrap ${wordColorClass} ${wordUnderlineClass}`}
                >
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      variants={letterVariants}
                      className="inline-block transform-gpu"
                      style={{ transformOrigin: "50% 50% -40px" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </span>
              );
            })}
          </div>
        );
      })}
    </motion.div>
  );
}

// Letter-by-Letter Typing Animation Component (with cursor)
function TypingText({ text, delay, shouldReduceMotion }: { text: string; delay: number; shouldReduceMotion: boolean }) {
  const characters = text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="inline-flex items-center text-sm md:text-base font-semibold text-[#081B3A] tracking-wider uppercase bg-[#F8FAFC] border border-slate-100 rounded-full px-5 py-2.5 shadow-sm">
      <GraduationCap size={16} className="text-[#A1122A] mr-2 shrink-0 animate-pulse" />
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="inline"
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
      {/* Blinking typing cursor */}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "linear" as const }}
        className="inline-block w-[2px] h-[1.1em] bg-[#A1122A] ml-1 shrink-0"
        style={{ verticalAlign: "middle" }}
      />
    </div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax hook
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 120]);

  const [content, setContent] = useState({
    heroBadge: "Kerala's Premier Credit Transfer Institute",
    heroTitle: "Empowering students through\ncredit transfer",
    heroDescription:
      "Resume your education with the Best Academic Credit Transfer institution in Kerala. Recognizing credits and saving time and cost to achieve your academic goals.",
  });

  // Preserve database fetch logic
  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch("/api/admin/home", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          // If the title from API is the old default or empty, we use our new default
          const title = data.heroTitle || "";
          const isOldDefault =
            title === "Empowering Students Through Credit Transfer" ||
            title === "Complete Your B.Tech/Degree via Credit Transfer" ||
            title === "Transform Your\nEducation\nJourney" ||
            !title;

          setContent({
            heroBadge: data.heroBadge || "Kerala's Premier Credit Transfer Institute",
            heroTitle: isOldDefault ? "Empowering students through\ncredit transfer" : title,
            heroDescription:
              data.heroDescription ||
              "Resume your education with the Best Academic Credit Transfer institution in Kerala. Recognizing credits and saving time and cost to achieve your academic goals.",
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchContent();
  }, []);

  // Floating decoration background elements for Left side
  const floatingElements = [
    { Icon: GraduationCap, size: 36, top: "12%", left: "8%", delay: 0 },
    { Icon: Globe, size: 44, top: "28%", right: "12%", delay: 1.2 },
    { Icon: Award, size: 32, bottom: "24%", left: "6%", delay: 0.8 },
    { Icon: BookOpen, size: 40, bottom: "12%", right: "10%", delay: 1.8 },
    { Icon: Send, size: 28, top: "55%", left: "15%", delay: 0.5 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full !min-h-0 lg:!min-h-[calc(100vh-88px)] !h-auto lg:!h-[calc(100vh-88px)] flex flex-col-reverse lg:flex-row bg-white overflow-hidden mt-[88px]"
      aria-label="Welcome to Edumentora"
    >
      {/* ================= LEFT CONTENT PANEL (45%) ================= */}
      <div className="relative w-full lg:w-[45%] lg:h-full bg-white flex flex-col justify-center px-6 py-12 sm:px-12 lg:py-8 lg:px-10 xl:py-12 xl:px-16 z-10 overflow-hidden">
        {/* Soft Background Gradients */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[15%] left-[8%] w-72 h-72 rounded-full bg-[#A1122A]/[0.02] blur-[80px]" />
          <div className="absolute bottom-[20%] right-[8%] w-80 h-80 rounded-full bg-[#081B3A]/[0.03] blur-[100px]" />
        </div>

        {/* Faint Floating Watermark Icons */}
        {!shouldReduceMotion &&
          floatingElements.map((el, idx) => (
            <motion.div
              key={idx}
              style={{
                position: "absolute",
                top: el.top,
                left: el.left,
                right: el.right,
                bottom: el.bottom,
                zIndex: 0,
              }}
              className="text-[#081B3A]/[0.04] pointer-events-none select-none hidden md:block"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 6, -6, 0],
              }}
              transition={{
                duration: 6 + idx * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: el.delay,
              }}
            >
              <el.Icon size={el.size} strokeWidth={1.2} />
            </motion.div>
          ))}

        {/* Left Side Content Container */}
        <div className="relative w-full flex flex-col items-center lg:items-start text-center lg:text-left z-10 max-w-2xl mx-auto lg:mx-0">
          
          {/* Subtitle */}
          <motion.span
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-xs md:text-sm font-bold tracking-[0.18em] text-[#081B3A] mb-4 uppercase"
          >
            Your Global Education Partner
          </motion.span>

          {/* Heading (Bebas Neue) */}
          <AnimatedHeading text={content.heroTitle} shouldReduceMotion={shouldReduceMotion} />

          {/* Tagline / Badge (Typed Character by Character) */}
          <div className="min-h-[44px] flex items-center mb-6">
            <TypingText text={content.heroBadge} delay={1.4} shouldReduceMotion={shouldReduceMotion} />
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.6, ease: "easeOut" }}
            className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-10"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {content.heroDescription}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.9, ease: "easeOut" }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start w-full mb-12 sm:mb-16"
          >
            <Link href="/contact" id="hero-cta-primary" className="inline-block">
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -6,
                        backgroundColor: "#A1122A",
                        borderColor: "#A1122A",
                        boxShadow: "0 12px 30px rgba(161, 18, 42, 0.4)",
                      }
                }
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group inline-flex items-center gap-2.5 h-14 px-8 rounded-full bg-[#081B3A] border border-[#081B3A] text-white font-bold text-sm shadow-md cursor-pointer transition-colors duration-300"
              >
                Apply Now
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5 shrink-0" />
              </motion.div>
            </Link>

            <Link href="/about" id="hero-cta-secondary" className="inline-block">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -4, backgroundColor: "#F8FAFC" }}
                className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-white border border-slate-200 text-[#081B3A] font-semibold text-sm hover:bg-slate-50 transition-all duration-300 cursor-pointer shadow-sm"
              >
                Explore Programs
              </motion.div>
            </Link>
          </motion.div>

          {/* Statistics Section moved below Hero on Home Page */}

        </div>
      </div>

      {/* ================= RIGHT IMAGE PANEL (55%) ================= */}
      <div className="relative w-full lg:w-[55%] h-[40vh] sm:h-[50vh] lg:h-full overflow-hidden select-none bg-[#081B3A]">
        {/* Parallax & Ken Burns Image Wrapper */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : y }}
          initial={{ scale: 1 }}
          animate={shouldReduceMotion ? { scale: 1 } : { scale: 1.08 }}
          transition={{ duration: 12, ease: "easeOut" }}
          className="absolute inset-0 w-full h-[115%] origin-center"
        >
          <Image
            src="/images/university-campus.jpg"
            alt="Edumentora University Campus Building"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </motion.div>

        {/* Overlays */}
        {/* Primary Dark Navy tint overlay */}
        <div className="absolute inset-0 bg-[#081B3A]/45 mix-blend-multiply pointer-events-none" />
        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081B3A]/75 via-[#081B3A]/30 to-transparent pointer-events-none" />

        {/* Floating Glassmorphic Accent Badge */}
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-auto sm:max-w-xs glass-dark p-5 rounded-2xl text-white shadow-2xl backdrop-blur-md z-25"
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-[#A1122A] rounded-xl text-white shrink-0 shadow-lg">
              <CheckCircle2 size={20} className="animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide uppercase text-white">UGC Approved Pathways</h3>
              <p className="text-xs text-slate-200 mt-1 leading-normal">
                Direct academic pathways for completing your degree with accredited programs.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
