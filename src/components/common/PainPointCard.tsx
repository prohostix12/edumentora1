"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, MousePointerClick, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export interface PainPoint {
  image: string;
  alt: string;
  title: string;
  tag: string;
  text: string;
  solution: string;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PainPointCard({
  point,
  index,
}: {
  point: PainPoint;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.25, duration: 0.7, ease: EASE }}
      className="h-full w-full"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.6,
        }}
        className="group h-full w-full [perspective:1600px]"
      >
        <div
          tabIndex={0}
          className="relative aspect-[3/4] h-full w-full outline-none [transform-style:preserve-3d] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:rotate3d(1,1,0,180deg)] group-focus-visible:[transform:rotate3d(1,1,0,180deg)]"
        >
          {/* FRONT — the situation */}
          <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/10 shadow-hover [backface-visibility:hidden]">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary-dark to-primary" />
            <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />

            {/* Number ribbon */}
            <div className="absolute -right-10 top-6 z-20 w-36 rotate-45 bg-gradient-to-r from-accent to-accent-dark py-1.5 text-center text-xs font-extrabold tracking-wider text-white shadow-md">
              0{index + 1}
            </div>

            {/* Logo mark */}
            <div className="relative z-10 flex items-center gap-2 p-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-dark shadow-md shadow-accent/30">
                <BookOpen className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/90">
                Edumentora
              </span>
            </div>

            {/* Decorative geometric triangle */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-[30%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rotate-12 opacity-90"
              style={{
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                background:
                  "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)",
              }}
            />

            {/* Tag pill */}
            <div className="relative z-10 mt-2 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                <Sparkles className="h-3 w-3" />
                {point.tag}
              </span>
            </div>

            {/* Situation image */}
            <div className="relative z-10 mx-auto mt-3 w-[54%]">
              <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-white/85 shadow-xl">
                <Image
                  src={point.image}
                  alt={point.alt}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Title block */}
            <div className="relative z-10 mt-3 px-6 text-center">
              <p
                className="text-sm font-extrabold leading-snug text-white sm:text-base"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {point.title}
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-white/55 sm:text-[11px]">
                Common Concern
              </p>
            </div>

            {/* Bottom hint banner */}
            <div className="absolute -bottom-3 left-1/2 z-20 w-[85%] -translate-x-1/2 -rotate-2 rounded-full bg-gradient-to-r from-accent to-accent-dark px-4 py-2 text-center shadow-lg">
              <span className="inline-flex items-center justify-center gap-1.5 text-[11px] font-bold text-white">
                <MousePointerClick className="h-3.5 w-3.5" />
                Hover to see the fix
              </span>
            </div>
          </div>

          {/* BACK — how Edumentora helps */}
          <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/10 shadow-hover [backface-visibility:hidden] [transform:rotate3d(1,1,0,180deg)]">
            <div className="absolute inset-0 bg-gradient-to-bl from-primary via-primary-dark to-secondary" />
            <div className="pointer-events-none absolute -bottom-12 -right-12 h-44 w-44 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-dark shadow-md shadow-accent/30">
                  <BookOpen className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/90">
                  How We Help
                </span>
              </div>

              <p className="text-sm leading-relaxed text-white/85">{point.text}</p>

              <p
                className="text-sm font-bold leading-snug"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {point.solution}
              </p>

              <Link
                href="/credit-transfer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                Learn about Credit Transfer
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
