"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Send, Headset } from "lucide-react";

/* ------------------------------ Intro Section ----------------------------- */
function KnowMoreIntro() {
  return (
    <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-24 overflow-hidden bg-white">
      {/* Decorative */}
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
          Credit Transfer
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-tight text-heading mb-6"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Know more on <span className="gradient-text">Credit Transfers</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-base sm:text-lg text-paragraph leading-relaxed font-medium"
        >
          Credit transfer is a process that allows students to apply academic
          credits earned from one institution toward a degree or program at
          another. This system facilitates educational mobility, enabling
          learners to continue their studies without repeating equivalent
          coursework. By recognizing prior learning, credit transfers can
          reduce the time and cost required to complete a degree. However,
          acceptance of transfer credits depends on factors such as course
          equivalency, accreditation, and institutional policies. It&apos;s
          essential for students to consult with academic advisors to
          understand the transferability of their credits and ensure a smooth
          transition between educational institutions.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------------------------- Program Cards ------------------------------- */
const programs = [
  {
    title: "UG Credit Transfer Program",
    description:
      "Transfer your earned UG credits to top universities, saving time and costs while completing your degree efficiently.",
    image:
      "https://images.pexels.com/photos/7777689/pexels-photo-7777689.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
    imageAlt: "Student reviewing academic documents for undergraduate credit transfer",
    accent: "from-primary/10 to-primary/0",
    ring: "ring-primary/10",
  },
  {
    title: "PG Credit Transfer Program",
    description:
      "Transfer your PG credits to leading universities, saving time and money while completing your postgraduate degree smoothly and efficiently.",
    image:
      "https://images.pexels.com/photos/19613149/pexels-photo-19613149.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
    imageAlt: "Student continuing postgraduate studies with laptop and books",
    accent: "from-accent/15 to-accent/0",
    ring: "ring-accent/10",
  },
  {
    title: "Diploma Credit Transfer Program",
    description:
      "Transfer your Diploma credits to leading universities, saving time and money while completing your postgraduate degree smoothly and efficiently.",
    image:
      "https://images.pexels.com/photos/8199200/pexels-photo-8199200.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
    imageAlt: "Student with study materials representing diploma credit transfer",
    accent: "from-primary/10 to-primary/0",
    ring: "ring-primary/10",
  },
];

function ProgramList() {
  return (
    <section className="py-20 lg:py-28 bg-bg-section overflow-hidden relative">
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-32"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider mb-4">
              Program Options
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight text-heading mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Choose the Right Credit Transfer Path
            </h2>
            <p className="text-paragraph text-sm sm:text-base leading-relaxed max-w-md font-medium">
              Explore structured transfer pathways for undergraduate,
              postgraduate, and diploma learners—each designed to help students
              continue their education without unnecessary repetition.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 md:items-start pt-4">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                className={`group relative ${
                  index === 1 ? "md:translate-y-10" : ""
                } ${index === 2 ? "md:-translate-y-2 md:col-span-2 md:max-w-[50%]" : ""}`}
              >
                <div className="relative pt-20">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute left-1/2 top-0 z-20 h-32 w-32 -translate-x-1/2 overflow-hidden rounded-full shadow-hover ring-8 ring-white ${program.ring}`}
                  >
                    <Image
                      src={program.image}
                      alt={program.imageAlt}
                      fill
                      sizes="128px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </motion.div>

                  <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-white px-7 pb-7 pt-20 shadow-soft transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-hover hover:border-primary/20">
                    <div
                      className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${program.accent}`}
                    />
                    <div className="absolute -bottom-14 -right-14 h-32 w-32 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

                    <div className="relative text-center md:text-left z-10">
                      <h3
                        className="text-lg font-extrabold text-heading mb-3 group-hover:text-primary transition-colors duration-300"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {program.title}
                      </h3>
                      <p className="text-paragraph text-sm leading-relaxed mb-6 font-medium max-w-md mx-auto md:mx-0">
                        {program.description}
                      </p>

                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-1.5 h-11 px-6 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                      >
                        Know more
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Journey Form Section -------------------------- */
function JourneyForm() {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-hover border-4 border-white/90">
              <Image
                src="https://images.pexels.com/photos/8866802/pexels-photo-8866802.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="Edumentora support team assisting students"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -right-3 sm:right-6 glass rounded-2xl p-4.5 shadow-hover border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark shadow-md shadow-accent/20">
                  <Headset className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-heading">Expert Support</p>
                  <p className="text-[10px] font-bold text-paragraph/70 uppercase tracking-wide mt-0.5">Always Here to Help</p>
                </div>
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

export default function CreditTransferContent() {
  return (
    <>
      <KnowMoreIntro />
      <ProgramList />
      <JourneyForm />
    </>
  );
}
