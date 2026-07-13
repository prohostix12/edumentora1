"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import AboutVisual from "./AboutVisual";
import { EASE, staggerContainer, fadeUp, fadeRight } from "./animations";

const features = [
  "Transfer Previously Earned Credits",
  "Recognized Universities",
  "Expert Academic Guidance",
  "Faster Graduation Path",
  "Affordable Education Solutions",
];

export default function AboutIntro() {
  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Premium layered background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-white via-white to-white"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(29,78,216,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[26rem] w-[26rem] rounded-full bg-primary/10 blur-3xl"
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-24 left-[46%] hidden text-primary/10 lg:block"
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
      >
        <path d="M10 90 Q 60 10, 110 50" stroke="currentColor" strokeWidth="3" fill="none" />
        <path
          d="M20 105 Q 70 25, 115 65"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          fill="none"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-y-16 lg:grid-cols-12 lg:gap-x-10">
          {/* Left — 3D interactive visual (~55%) */}
          <div className="lg:col-span-7">
            <AboutVisual />
          </div>

          {/* Right — Content (~45%) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6 lg:col-span-5"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-soft"
            >
              About Edumentora
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="text-3xl font-extrabold leading-tight text-heading sm:text-4xl lg:text-[42px]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Helping Students{" "}
              <span className="gradient-text">Continue Their Education</span>{" "}
              Without Starting Over
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-paragraph sm:text-lg"
            >
              Resume your graduation or postgraduate education through
              Edumentora, a leading academic credit transfer institution.
              Transfer earned credits for B. Tech, engineering, and other
              programs to recognized universities, saving time and costs
              while achieving academic success.
            </motion.p>

            <motion.ul variants={staggerContainer} className="grid gap-3 pt-1 sm:grid-cols-2">
              {features.map((feature) => (
                <motion.li
                  key={feature}
                  variants={fadeUp}
                  className="flex items-center gap-2.5 text-sm font-semibold text-heading"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                  {feature}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeRight}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="flex flex-wrap items-center gap-4 pt-3"
            >
              <Link
                href="/credit-transfer"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-dark px-8 text-sm font-bold text-white shadow-[0_8px_32px_rgba(16,45,140,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(16,45,140,0.45)]"
              >
                Start Your Credit Transfer
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-13 items-center justify-center gap-2 rounded-full border-2 border-primary/25 px-8 text-sm font-bold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white"
              >
                <PhoneCall className="h-4 w-4" />
                Talk to an Expert
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
