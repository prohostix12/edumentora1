"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";

/* ------------------------------ Hero Section ------------------------------ */
function ApprenticeshipHero() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-28 right-[14%] h-12 w-12 rounded-2xl bg-primary/10 rotate-12"
        />
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-16 left-[12%] h-9 w-9 rounded-full bg-accent/15"
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft mb-6 uppercase tracking-wider"
        >
          Apprenticeship Program
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-tight text-heading mb-6"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Apprenticeship program at <span className="gradient-text">Edumentora</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-base sm:text-lg text-paragraph leading-relaxed max-w-2xl mx-auto mb-8 font-medium"
        >
          Edumentora&apos;s apprenticeship credit transfer lets you carry your
          earned experience to new opportunities. Stay on track, keep learning,
          and grow without interruption.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-1.5 h-12 px-7 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            Know more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------ EALP Intro -------------------------------- */
function EALPIntro() {
  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
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

/* ------------------------------ How It Works ------------------------------ */
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
    <section className="py-24 lg:py-32 bg-bg-section overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider mb-4">
            The Process
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight text-heading"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            How it Works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              className="group relative bg-white rounded-[2.5rem] border border-border/80 shadow-soft hover:shadow-hover hover:-translate-y-2 hover:border-primary/20 transition-all duration-500 p-8 overflow-hidden"
            >
              <span
                className="absolute -top-4 right-4 text-[6.5rem] font-bold leading-none text-slate-100 group-hover:text-primary/[0.04] transition-colors duration-500 select-none"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {step.number}
              </span>

              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-dark shadow-md shadow-accent/25 ring-4 ring-white mb-7 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                  <step.icon className="h-6 w-6 text-white" />
                </div>

                <h3
                  className="text-lg font-bold text-heading mb-4 group-hover:text-primary transition-colors duration-300"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {step.title}
                </h3>

                <ul className="flex flex-col gap-3">
                  {step.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-paragraph leading-relaxed font-medium">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Degree Programs ----------------------------- */
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

function DegreePrograms() {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider mb-4">
            Degree Options
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight text-heading mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Available Degree Programs
          </h2>
          <p className="text-paragraph text-sm sm:text-base font-medium">
            You can complete your degree in various fields, including:
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* UG Programs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2.5rem] bg-gradient-to-b from-bg-section to-white border border-border/80 shadow-soft p-8 lg:p-10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-dark" />
            <div className="flex items-center gap-4 mb-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-dark shadow-md shadow-accent/20">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <h3
                className="text-xl font-extrabold text-heading"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Undergraduate Programs
              </h3>
            </div>
            <ul className="flex flex-col gap-4">
              {ugPrograms.map((program, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                    <ChevronRight className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-sm text-paragraph leading-relaxed font-medium">
                    {program}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Image */}
            <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-2xl shadow-card border border-border">
              <Image
                src="https://images.pexels.com/photos/18999469/pexels-photo-18999469.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="Apprentices collaborating on digital learning projects during workshop"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* PG Programs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative rounded-[2.5rem] bg-gradient-to-b from-bg-section to-white border border-border/80 shadow-soft p-8 lg:p-10 overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-dark" />
            <div className="flex items-center gap-4 mb-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-dark shadow-md shadow-accent/25">
                <Award className="h-7 w-7 text-white" />
              </div>
              <h3
                className="text-xl font-extrabold text-heading"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Postgraduate Programs
              </h3>
            </div>
            <ul className="flex flex-col gap-4">
              {pgPrograms.map((program, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 mt-0.5">
                    <ChevronRight className="h-3.5 w-3.5 text-accent" />
                  </span>
                  <span className="text-sm text-paragraph leading-relaxed font-medium">
                    {program}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Image */}
            <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-2xl shadow-card border border-border">
              <Image
                src="https://images.pexels.com/photos/7942524/pexels-photo-7942524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="Apprenticeship Graduation – Certification Ceremony at Edu Mentora"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------- Who Can Apply / Why EALP ------------------------ */
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
    <section className="relative py-24 lg:py-32 bg-[#0B1440] text-white border-y border-white/5 overflow-hidden">
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
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Who Can Apply */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="rounded-[2.5rem] bg-white/5 border border-white/5 p-8 lg:p-10"
          >
            <div className="flex items-center gap-4 mb-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-dark shadow-lg shadow-accent/30">
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
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 mt-0.5">
                    <ChevronRight className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span className="text-sm text-slate-300 leading-relaxed font-medium">
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
            className="rounded-[2.5rem] bg-white/5 border border-white/5 p-8 lg:p-10"
          >
            <div className="flex items-center gap-4 mb-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-dark shadow-lg shadow-accent/30">
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
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 mt-0.5">
                    <ChevronRight className="h-3.5 w-3.5 text-accent" />
                  </span>
                  <span className="text-sm text-slate-300 leading-relaxed font-medium">
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
          className="mt-12 text-center text-sm sm:text-base text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium"
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

/* --------------------------- Journey Form Section -------------------------- */
function JourneyForm() {
  return (
    <section className="py-24 lg:py-32 bg-bg-section overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-hover border-4 border-white/90">
              <Image
                src="https://images.pexels.com/photos/7942541/pexels-photo-7942541.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="Mentor awarding top-performing apprentice for excellence during apprenticeship training"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            {/* Small overlapping image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-8 -right-3 sm:right-6 w-[42%]"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-hover border-4 border-white">
                <Image
                  src="https://images.pexels.com/photos/8112119/pexels-photo-8112119.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Credit Transfer program — student with transfer documents"
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="relative rounded-[2.5rem] bg-white border border-border/80 shadow-card p-8 lg:p-10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/5 blur-2xl pointer-events-none" />

              <h2
                className="relative text-2xl sm:text-3xl lg:text-[32px] font-extrabold leading-tight text-heading mb-8"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Start Your Journey with Edumentora
              </h2>

              <form className="relative flex flex-col gap-5 z-10">
                <div className="grid sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium"
                />
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1.5 h-12 px-7 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

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
