"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Compass, Sparkles, Users, Building2 } from "lucide-react";
import {
  EASE,
  fadeLeft,
  fadeRight,
  fadeUp,
  scaleBlur,
  staggerContainer,
  viewportOnce,
} from "@/components/common/showcaseMotion";

export default function MissionVision() {
  const [content, setContent] = useState({
    missionTitle: "Our Mission",
    missionDescription:
      "In EduMentora Our Mission is to help students overcome academic setbacks by facilitating seamless credit transfers to accredited universities for successful completion.",
    visionTitle: "Our Vision",
    visionDescription:
      "In EduMentora Our Vision is to bright create a future where every student can complete their education without barriers through recognized credit transfer programs.",
  });

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch("/api/admin/home", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setContent({
            missionTitle: data.missionTitle || "Our Mission",
            missionDescription:
              data.missionDescription ||
              "In EduMentora Our Mission is to help students overcome academic setbacks by facilitating seamless credit transfers to accredited universities for successful completion.",
            visionTitle: data.visionTitle || "Our Vision",
            visionDescription:
              data.visionDescription ||
              "In EduMentora Our Vision is to bright create a future where every student can complete their education without barriers through recognized credit transfer programs.",
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchContent();
  }, []);

  const timeline = [
    { icon: Target, title: content.missionTitle, text: content.missionDescription },
    { icon: Compass, title: content.visionTitle, text: content.visionDescription },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20 lg:py-24">
      {/* Layered background — matches AboutIntro light theme */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Red glow — top right */}
        <div className="animate-mesh absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
        {/* Navy glow — bottom left */}
        <div className="animate-mesh-slow absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        {/* Soft mid accent */}
        <div className="animate-mesh absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-accent/6 blur-2xl" />
        {/* Subtle dot grid (navy dots on white) */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #0B1440 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
          {/* Left — typography + animated timeline */}
          <motion.div
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-7"
          >
            <motion.span
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              About Edumentora
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="max-w-xl text-3xl font-extrabold leading-tight text-heading sm:text-4xl lg:text-[42px]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Empowering students through{" "}
              <span className="text-accent">credit transfer</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg text-sm leading-relaxed text-paragraph sm:text-base"
            >
              Resume your graduation or postgraduate education through
              Edumentora, a leading academic credit transfer institution.
              Transfer earned credits for B. Tech, engineering, and other
              programs to recognized universities, saving time and costs
              while achieving academic success.
            </motion.p>

            {/* Animated timeline */}
            <div className="relative mt-12 space-y-10 pl-10">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
                style={{ transformOrigin: "top" }}
                className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-accent via-primary/20 to-transparent"
              />
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.3 + index * 0.2 }}
                  className="relative"
                >
                  <span className="absolute -left-10 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-accent bg-white shadow-[0_0_0_4px_rgba(229,57,53,0.1)] shadow-soft">
                    <item.icon className="h-3.5 w-3.5 text-accent" />
                  </span>
                  <h3
                    className="text-lg font-bold text-heading"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-paragraph">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — floating image + light glass badges */}
          <div className="relative lg:col-span-5">
            <motion.div
              variants={scaleBlur}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Rotating gradient ring — softened for light bg */}
              <div
                aria-hidden="true"
                className="animate-spin-slow pointer-events-none absolute -inset-6 rounded-[3rem] opacity-20"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--color-accent) 0deg, transparent 90deg, var(--color-primary) 180deg, transparent 270deg, var(--color-accent) 360deg)",
                  filter: "blur(2px)",
                }}
              />

              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] border border-border/80 shadow-hover"
              >
                <Image
                  src="https://images.pexels.com/photos/7942522/pexels-photo-7942522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Graduates celebrating their achievement at a graduation ceremony"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </motion.div>

              {/* Dotted SVG connector */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 text-primary/20 sm:-left-12"
                viewBox="0 0 100 100"
                fill="none"
              >
                <motion.path
                  d="M90 10 Q 20 20, 15 90"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="1 8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
                />
              </svg>

              {/* Floating achievement badge — "5000+" */}
              <motion.div
                variants={fadeLeft}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -bottom-8 -left-6 sm:-left-10"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center gap-3 rounded-2xl border border-border/80 bg-white px-4 py-3 shadow-hover"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark text-white shadow-md">
                    <Users className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold leading-none text-heading">5000+</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-paragraph">
                      Students Guided
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating badge — "15+" */}
              <motion.div
                variants={fadeRight}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="absolute -top-6 -right-4 sm:-right-8"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="flex items-center gap-3 rounded-2xl border border-border/80 bg-white px-4 py-3 shadow-hover"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-md">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold leading-none text-heading">15+</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-paragraph">
                      Universities
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
