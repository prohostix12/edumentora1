"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import PainPointCard, { type PainPoint } from "./PainPointCard";

const painPoints: PainPoint[] = [
  {
    image:
      "https://images.pexels.com/photos/20640156/pexels-photo-20640156.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Worried student looking through library bookshelf",
    title: "Repeating Semesters",
    tag: "The Challenge",
    text: "Worried about repeating semesters you have already completed and passed.",
    solution: "We recognize your completed semesters — no repeats, no wasted time.",
  },
  {
    image:
      "https://images.pexels.com/photos/8199252/pexels-photo-8199252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Student researching universities on laptop",
    title: "Relocating Cities",
    tag: "The Challenge",
    text: "Moving to a new city and afraid of losing the credits you have already earned.",
    solution: "Your earned credits move with you, anywhere across India.",
  },
  {
    image:
      "https://images.pexels.com/photos/8199622/pexels-photo-8199622.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Students discussing with a mentor in library",
    title: "University Uncertainty",
    tag: "The Challenge",
    text: "Confused about which universities will accept your previous subjects and syllabus.",
    solution: "We match your syllabus to accredited universities that accept it.",
  },
];

export default function ReadyToGrow() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="grid lg:grid-cols-[38%_62%]">
        {/* Left — light panel, matching white canvas theme */}
        <div className="relative flex items-center overflow-hidden bg-white px-8 py-20 sm:px-12 lg:rounded-r-[4rem] lg:px-20 lg:py-28 xl:px-24">
          {/* Subtle dot grid — navy on white */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #0B1440 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          {/* Red glow — top right */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl animate-float" />
          {/* Navy glow — bottom left */}
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary/8 blur-3xl animate-float-delay" />
          {/* Tiny accent orb */}
          <div className="pointer-events-none absolute bottom-20 right-10 h-6 w-6 rounded-full bg-accent/20 animate-float-delay-2" />

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-soft backdrop-blur-md">
              <GraduationCap className="h-3.5 w-3.5 text-primary" />
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
              We Get It
            </span>

            <h2
              className="text-3xl font-bold uppercase leading-[1.2] tracking-wide sm:text-4xl lg:text-[40px]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <span className="block text-heading">Ready to</span>
              <span className="block text-heading">Grow? We</span>
              <span className="block text-accent">Understand</span>
              <span className="block text-paragraph">Your Pain</span>
              <span className="block text-accent">Points</span>
            </h2>
            <p className="mt-6 max-w-xs text-base leading-relaxed text-paragraph">
              Every student deserves a fresh start without losing what they
              have already achieved. We solve the real problems students face.
            </p>
          </motion.div>
        </div>

        {/* Right — pain point cards */}
        <div className="flex items-center bg-white px-8 py-20 sm:px-12 lg:px-16 lg:py-28">
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-10 lg:max-w-none">
            <div className="w-64 sm:w-64 xl:w-72">
              <PainPointCard point={painPoints[0]} index={0} />
            </div>
            <div className="flex w-full flex-col items-center gap-10 sm:flex-row sm:justify-center sm:gap-8 xl:gap-12">
              <div className="w-64 sm:w-64 xl:w-72">
                <PainPointCard point={painPoints[1]} index={1} />
              </div>
              <div className="w-64 sm:w-64 xl:w-72">
                <PainPointCard point={painPoints[2]} index={2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
