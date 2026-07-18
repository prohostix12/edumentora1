"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Phone,
  GraduationCap,
  Users,
  Award,
  BookOpen,
} from "lucide-react";

const stats = [
  { icon: GraduationCap, value: "800+", label: "Credits Transferred" },
  { icon: Users, value: "3000+", label: "Graduates Guided" },
  { icon: Award, value: "16 Yrs", label: "Of Expertise" },
];

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20 lg:py-24">
      {/* Decorative background — dot grid + floating orbs, matching site language */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #0B1440 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="animate-mesh absolute -top-32 -left-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="animate-mesh-slow absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="grid overflow-hidden rounded-[2.5rem] shadow-hover lg:grid-cols-12"
        >
          {/* Left — story panel (dark gradient, matches site's navy/accent palette) */}
          <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-secondary p-10 sm:p-12 lg:col-span-7 lg:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: "radial-gradient(circle, #FFFFFF 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full border border-white/10"
            />
            <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex h-full flex-col">
              <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-white">
                <Sparkles className="h-4 w-4 text-accent" />
                Start Your Journey Today
              </span>

              <h2
                className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[42px]"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Ready to Transfer Your Credits and Advance Your Education?
              </h2>

              <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">
                Join thousands of students who have successfully transferred
                their credits and continued their education without losing
                valuable time.
              </p>

              <div className="mt-auto grid grid-cols-3 gap-3 pt-10 sm:gap-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4"
                  >
                    <stat.icon className="h-4 w-4 text-accent" />
                    <div
                      className="mt-2 text-lg font-extrabold text-white sm:text-xl"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-medium leading-snug text-white/60">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — action panel (light, focused on next step) */}
          <div className="relative flex flex-col justify-center gap-4 bg-bg-section p-10 sm:p-12 lg:col-span-5 lg:p-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3
                className="text-lg font-bold text-heading"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Take the next step
              </h3>
              <p className="mt-1 mb-6 text-sm text-paragraph">
                Pick whichever works best for you — we&apos;re ready when you are.
              </p>
            </motion.div>

            <Link
              href="/contact"
              className="group flex items-center justify-between gap-3 rounded-2xl gradient-bg-accent px-6 py-4 text-white shadow-md transition-all duration-300 hover:shadow-hover hover:-translate-y-0.5"
            >
              <span className="text-sm font-bold">Get Started Now</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="tel:+919744587777"
              className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-white px-6 py-4 shadow-soft transition-all duration-300 hover:border-primary/20 hover:shadow-card hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-3 text-sm font-bold text-heading">
                <Phone className="h-4 w-4 text-primary" />
                Book a Free Call
              </span>
              <ArrowRight className="h-4 w-4 text-paragraph/50 transition-transform group-hover:translate-x-1" />
            </a>

            <Link
              href="/programs"
              className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-white px-6 py-4 shadow-soft transition-all duration-300 hover:border-primary/20 hover:shadow-card hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-3 text-sm font-bold text-heading">
                <BookOpen className="h-4 w-4 text-primary" />
                Explore Programs
              </span>
              <ArrowRight className="h-4 w-4 text-paragraph/50 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
