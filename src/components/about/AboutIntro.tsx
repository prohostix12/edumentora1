"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, PhoneCall, Sparkles, Target, Compass, Users, Building2, BookOpen } from "lucide-react";
import AboutVisual from "./AboutVisual";

const features = [
  "Transfer Previously Earned Credits",
  "Recognized Universities",
  "Expert Academic Guidance",
  "Faster Graduation Path",
  "Affordable Education Solutions",
];

type TabId = "about" | "btech" | "mission";

export default function AboutIntro() {
  const [activeTab, setActiveTab] = useState<TabId>("about");

  const tabList = [
    { id: "about" as TabId, label: "About Edumentora" },
    { id: "btech" as TabId, label: "B.Tech Credit Transfer" },
    { id: "mission" as TabId, label: "Our Mission & Vision" },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center bg-section-light-navy overflow-hidden py-16 lg:py-20 px-[6vw] snap-section">
      {/* Background grid + ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(rgba(16,45,140,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -top-40 -right-40 h-[26rem] w-[26rem] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[26rem] w-[26rem] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative max-w-[1440px] w-full mx-auto z-10 flex flex-col gap-6 lg:gap-8">
        
        {/* Tab Controller Row */}
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center gap-1.5 p-1.5 bg-white/70 border border-slate-200/60 rounded-full shadow-sm backdrop-blur-md">
            {tabList.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-paragraph hover:text-heading"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeAboutTab"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Area with AnimatePresence */}
        <div className="min-h-[400px] lg:min-h-[450px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            
            {activeTab === "about" && (
              <motion.div
                key="about-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full"
              >
                {/* Left side — 3D interactive visual */}
                <div className="lg:col-span-5">
                  <AboutVisual />
                </div>

                {/* Right side — Content */}
                <div className="flex flex-col gap-5 lg:col-span-7">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-soft">
                    About Edumentora
                  </span>

                  <h2
                    className="text-3xl sm:text-4xl font-extrabold leading-tight text-heading"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Helping Students{" "}
                    <span className="text-accent">Continue Their Education</span>{" "}
                    Without Starting Over
                  </h2>

                  <p className="text-base leading-relaxed text-paragraph font-medium">
                    Resume your graduation or postgraduate education through
                    Edumentora, a leading academic credit transfer institution.
                    Transfer earned credits for B. Tech, engineering, and other
                    programs to recognized universities, saving time and costs
                    while achieving academic success.
                  </p>

                  <ul className="grid gap-3 pt-1 sm:grid-cols-2">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-sm font-bold text-heading"
                      >
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    <Link
                      href="/credit-transfer"
                      className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-dark px-8 text-sm font-bold text-white shadow-[0_8px_32px_rgba(16,45,140,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(16,45,140,0.35)]"
                    >
                      Start Your Credit Transfer
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex h-13 items-center justify-center gap-2 rounded-full border-2 border-primary/20 px-8 text-sm font-bold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white"
                    >
                      <PhoneCall className="h-4 w-4" />
                      Talk to an Expert
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "btech" && (
              <motion.div
                key="btech-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-10 items-center w-full"
              >
                {/* Left side — BTech content */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/10 bg-accent/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-accent shadow-soft">
                    B.Tech Specialization
                  </span>

                  <h2
                    className="text-3xl sm:text-4xl font-extrabold leading-tight text-heading"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Best Credit Transfer Institute in Kerala for B.Tech Students
                  </h2>

                  <p className="text-base leading-relaxed text-paragraph font-medium">
                    At Edumentora, we believe education is a right—not a privilege.
                    Unfortunately, many students are forced to discontinue their
                    graduation or postgraduate programs due to academic roadblocks,
                    personal setbacks, or institutional barriers. This often leaves
                    them uncertain about how to complete their education without
                    starting over. As a leading academic credit transfer institution,
                    Edumentora specializes in helping students seamlessly resume and
                    complete their degrees, including B. Tech and other professional
                    programs.
                  </p>

                  <p className="text-sm leading-relaxed text-paragraph/90">
                    Recognized as a trusted engineering academic credit transfer institution
                    in Kerala, we offer a streamlined solution for transferring previously
                    earned academic credits to UGC-recognized universities. Our process is
                    simple and effective: we assess your existing academic credits, align them
                    with partner universities, and ensure a smooth transfer—saving you
                    valuable time and money.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    <Link
                      href="/btech-credit-transfer"
                      className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-dark px-8 text-sm font-bold text-white shadow-[0_8px_32px_rgba(229,57,53,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(229,57,53,0.35)]"
                    >
                      B.Tech Admissions Info
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex h-13 items-center justify-center gap-2 rounded-full border-2 border-primary/20 px-8 text-sm font-bold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white"
                    >
                      <PhoneCall className="h-4 w-4" />
                      Talk to an Expert
                    </Link>
                  </div>
                </div>

                {/* Right side — BTech image with floating frames */}
                <div className="lg:col-span-5">
                  <div className="relative max-w-[340px] lg:max-w-[360px] mx-auto">
                    {/* Floating accents */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-6 -left-6 h-16 w-16 rounded-2xl bg-primary/25 rotate-12 pointer-events-none"
                    />
                    <motion.div
                      animate={{ y: [0, 8, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute -bottom-5 -right-5 h-12 w-12 rounded-full bg-accent/20 pointer-events-none"
                    />

                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-hover border border-white/40">
                      <Image
                        src="/images/btech-student.jpg"
                        alt="Happy B.Tech student holding a notebook"
                        fill
                        sizes="(max-width: 1024px) 100vw, 440px"
                        className="object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "mission" && (
              <motion.div
                key="mission-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-10 items-center w-full"
              >
                {/* Left side — Mission & Vision timeline */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-soft">
                    Mission & Vision
                  </span>

                  <h2
                    className="text-3xl sm:text-4xl font-extrabold leading-tight text-heading"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Empowering Students Through <span className="text-accent">Credit Transfer</span>
                  </h2>

                  <div className="relative mt-4 space-y-8 pl-10">
                    <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-primary/20 to-transparent" />
                    
                    <div className="relative">
                      <span className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent bg-white shadow-soft">
                        <Target className="h-4 w-4 text-accent" />
                      </span>
                      <h3
                        className="text-lg font-bold text-heading"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        Our Mission
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-paragraph font-medium">
                        To help students overcome academic setbacks by facilitating seamless credit
                        transfers to accredited universities for successful completion of their education.
                      </p>
                    </div>

                    <div className="relative">
                      <span className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent bg-white shadow-soft">
                        <Compass className="h-4 w-4 text-accent" />
                      </span>
                      <h3
                        className="text-lg font-bold text-heading"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        Our Vision
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-paragraph font-medium">
                        To create a bright future where every student can complete their education
                        without barriers through recognized credit transfer programs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right side — Image + floating stats badges */}
                <div className="lg:col-span-5">
                  <div className="relative max-w-[360px] lg:max-w-[380px] mx-auto">
                    <div
                      aria-hidden="true"
                      className="animate-spin-slow pointer-events-none absolute -inset-6 rounded-[3rem] opacity-25"
                      style={{
                        background:
                          "conic-gradient(from 0deg, var(--color-accent) 0deg, transparent 90deg, var(--color-primary) 180deg, transparent 270deg, var(--color-accent) 360deg)",
                        filter: "blur(2px)",
                      }}
                    />

                    <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] border border-slate-200/50 shadow-hover">
                      <Image
                        src="https://images.pexels.com/photos/7942522/pexels-photo-7942522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                        alt="Graduates celebrating their achievement"
                        fill
                        sizes="(max-width: 1024px) 100vw, 560px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>

                    {/* Floating statistics badges */}
                    <div className="absolute -bottom-6 -left-6 z-10">
                      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-md">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark text-white">
                          <Users className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-extrabold leading-none text-heading">5000+</p>
                          <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-paragraph">
                            Students Guided
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -top-6 -right-6 z-10">
                      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-md">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white">
                          <Building2 className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-extrabold leading-none text-heading">15+</p>
                          <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-paragraph">
                            Universities
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
