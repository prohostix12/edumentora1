"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Users, ShieldCheck, Building2, Award } from "lucide-react";
import { scaleIn } from "./animations";

const stats = [
  { icon: Users, value: "5000+", label: "Students Guided" },
  { icon: ShieldCheck, value: "95%", label: "Credit Approval" },
  { icon: Building2, value: "15+", label: "Partner Universities" },
  { icon: Award, value: "10+", label: "Years Experience" },
];

const cardPositions = [
  "-top-5 -left-4 sm:-left-8 lg:-left-12",
  "top-10 -right-2 sm:-right-6 lg:-right-12",
  "bottom-28 -left-3 sm:-left-9 lg:-left-14",
  "-bottom-6 right-2 sm:right-0 lg:-right-8",
];

function useTilt(mx: MotionValue<number>, my: MotionValue<number>, distance: number) {
  const x = useTransform(mx, [-0.5, 0.5], [-distance, distance]);
  const y = useTransform(my, [-0.5, 0.5], [-distance, distance]);
  return { x, y };
}

export default function AboutVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.4 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7]);

  const shapeParallax = useTilt(springX, springY, 8);
  const ringParallax = useTilt(springX, springY, 5);
  const secondaryParallaxA = useTilt(springX, springY, 14);
  const secondaryParallaxB = useTilt(springX, springY, 16);
  const cardParallax = [
    useTilt(springX, springY, 20),
    useTilt(springX, springY, 24),
    useTilt(springX, springY, 22),
    useTilt(springX, springY, 18),
  ];

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto w-full max-w-[560px] py-10 lg:max-w-none lg:py-16 [perspective:1400px]"
    >
      {/* Dot grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-16 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(rgba(16,45,140,0.16) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at center, black 45%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 45%, transparent 75%)",
        }}
      />

      {/* Ambient glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-6 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />

      {/* Slow-drifting geometric shapes */}
      <motion.div
        style={{ x: shapeParallax.x, y: shapeParallax.y }}
        aria-hidden="true"
        className="pointer-events-none absolute left-[6%] top-[8%] z-0 hidden lg:block"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="h-14 w-14 rounded-2xl border-2 border-primary/15"
        />
      </motion.div>
      <motion.div
        style={{ x: ringParallax.x, y: ringParallax.y }}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] right-[4%] z-0 hidden lg:block"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="h-20 w-20 rounded-full border-2 border-dashed border-accent/20"
        />
      </motion.div>

      {/* 3D tilt composition */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10"
      >
        {/* Main image */}
        <motion.div
          whileHover={{ scale: 1.03, z: 30 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative z-10 mx-auto w-[76%] sm:w-[70%] lg:w-[72%]"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] border-4 border-white shadow-hover">
            <Image
              src="https://images.pexels.com/photos/6283227/pexels-photo-6283227.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
              alt="Student studying on laptop in a library"
              fill
              sizes="(max-width: 1024px) 70vw, 420px"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Secondary floating image — top right */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ x: secondaryParallaxA.x, y: secondaryParallaxA.y }}
          className="absolute right-0 top-[6%] z-20 w-[38%] sm:w-[34%]"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl border-4 border-white shadow-card ring-1 ring-border/60">
              <Image
                src="https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Smiling student holding notebooks in university hallway"
                fill
                sizes="(max-width: 1024px) 34vw, 220px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Secondary floating image — bottom left */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          style={{ x: secondaryParallaxB.x, y: secondaryParallaxB.y }}
          className="absolute bottom-[4%] left-[2%] z-20 w-[30%] sm:w-[27%]"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            whileHover={{ scale: 1.05, rotate: -2 }}
          >
            <div className="relative aspect-square overflow-hidden rounded-full border-2 border-white shadow-card ring-4 ring-bg-section">
              <Image
                src="https://images.pexels.com/photos/8199613/pexels-photo-8199613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Students researching books in a library"
                fill
                sizes="(max-width: 1024px) 26vw, 170px"
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating glassmorphism stat cards */}
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.5 + index * 0.15, duration: 0.6 }}
          style={{ x: cardParallax[index].x, y: cardParallax[index].y }}
          className={`absolute z-30 ${cardPositions[index]}`}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.6,
            }}
            className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-[0_12px_40px_rgba(16,45,140,0.14)] backdrop-blur-xl"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark text-white shadow-md shadow-accent/25">
              <stat.icon className="h-5 w-5" />
            </span>
            <div>
              <p
                className="text-base font-extrabold leading-none text-heading"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 whitespace-nowrap text-[11px] font-semibold text-paragraph/80">
                {stat.label}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
