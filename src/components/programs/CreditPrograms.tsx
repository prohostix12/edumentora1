"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const programs = [
  {
    title: "Credit Transfer Program",
    description:
      "Transfer your past credits to complete your degree faster with Edumentora.",
    href: "/credit-transfer",
    image:
      "https://images.pexels.com/photos/7777689/pexels-photo-7777689.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
    imageAlt: "Student reviewing academic documents for credit transfer",
    accent: "from-primary/10 to-primary/0",
    ring: "ring-primary/10",
    button: "from-primary to-primary-dark shadow-primary/20",
  },
  {
    title: "Apprenticeship Program",
    description:
      "Study while gaining real work experience through industry training.",
    href: "/apprenticeship-program",
    image:
      "https://images.pexels.com/photos/18999469/pexels-photo-18999469.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
    imageAlt: "Professionals collaborating during apprenticeship training",
    accent: "from-accent/15 to-accent/0",
    ring: "ring-accent/10",
    button: "from-primary to-primary-dark shadow-primary/20",
  },
  {
    title: "Work Integrated Learning Program",
    description:
      "Learn theory and apply it practically for a career-ready education.",
    href: "/work-integrated-learning-program",
    image:
      "https://images.pexels.com/photos/7964503/pexels-photo-7964503.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
    imageAlt: "Professional using laptop while learning through WILP",
    accent: "from-primary/10 to-primary/0",
    ring: "ring-primary/10",
    button: "from-primary to-primary-dark shadow-primary/20",
  },
];

export default function CreditPrograms() {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden relative">
      {/* Decorative gradient blur */}
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left - Sticky Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 lg:sticky lg:top-32"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider mb-4">
              Our Programs
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight text-heading mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Our Credit Transfer Programs
            </h2>
            <p className="text-paragraph text-sm sm:text-base leading-relaxed max-w-md font-medium">
              In EduMentora Our Vision is to create a bright future where every
              student can complete their education without barriers through
              recognized credit transfer programs.
            </p>
          </motion.div>

          {/* Right - Image Cards */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-8 gap-y-12 lg:gap-y-14 pt-4">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.12, duration: 0.65, ease: "easeOut" }}
                className={`group relative ${index === 1 ? "sm:translate-y-8" : ""} ${
                  index === 2 ? "sm:translate-y-2" : ""
                }`}
              >
                <div className="relative pt-20">
                  
                  {/* Floating Circular Image */}
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
                      className="object-cover transition-transform duration-750 group-hover:scale-105"
                    />
                  </motion.div>

                  {/* Card Panel */}
                  <div className="glass relative overflow-hidden rounded-[2.5rem] px-7 pb-7 pt-20 shadow-soft transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-hover hover:border-primary/20">
                    <div
                      className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${program.accent}`}
                    />
                    <div className="absolute -bottom-14 -right-14 h-32 w-32 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

                    <div className="relative text-center sm:text-left z-10">
                      <h3
                        className="text-lg font-extrabold text-heading mb-3 group-hover:text-primary transition-colors duration-300"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {program.title}
                      </h3>
                      <p className="text-paragraph text-sm leading-relaxed mb-6 font-medium max-w-md mx-auto sm:mx-0">
                        {program.description}
                      </p>

                      <Link
                        href={program.href}
                        className={`inline-flex items-center justify-center gap-1.5 h-11 px-6 rounded-full text-xs font-bold text-white bg-gradient-to-r ${program.button} shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
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
