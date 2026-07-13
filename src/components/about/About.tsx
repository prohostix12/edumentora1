"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/common/SectionTitle";
import { CheckCircle2, Target, Eye, Lightbulb } from "lucide-react";

const features = [
  "Submit your mark sheets and syllabus",
  "We check which subjects match",
  "Credits get accepted seamlessly",
  "Join the right semester directly",
  "Save both time and money",
  "Finish your degree on time",
];

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To provide seamless credit transfer solutions that value students' previous efforts and help them achieve their academic goals without unnecessary delays.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To become the most trusted education partner in India, empowering every student with flexible learning pathways and world-class academic support.",
  },
  {
    icon: Lightbulb,
    title: "Our Approach",
    description:
      "We combine expert guidance with innovative processes to ensure every student experiences a smooth transition and completes their education successfully.",
  },
];

export default function About() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-card border border-border bg-gradient-to-br from-slate-50 to-white p-2">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-white to-accent/10 rounded-[2.2rem] flex items-center justify-center relative overflow-hidden">
                <div className="absolute -top-12 -left-12 h-40 w-40 rounded-full border border-primary/5 bg-primary/5 blur-xl" />
                <div className="absolute -bottom-16 -right-16 h-52 w-52 rounded-full border border-accent/5 bg-accent/5 blur-xl" />
                <div className="text-center p-12 relative z-10">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-white shadow-card border border-border/80 mb-6">
                    <Target className="h-10 w-10 text-primary" />
                  </div>
                  <h3
                    className="text-2xl font-extrabold text-heading"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Trusted by 5,000+ Students
                  </h3>
                </div>
              </div>
            </div>
            
            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-8 -right-8 glass rounded-2xl p-5 pr-8 shadow-hover border border-white/60 hidden lg:flex items-center gap-3.5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <div
                  className="text-2xl font-extrabold text-heading leading-tight"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  10+
                </div>
                <p className="text-[10px] font-bold text-paragraph/70 uppercase tracking-wide mt-0.5">Years of Excellence</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="flex flex-col gap-8">
            <SectionTitle
              label="About Us"
              title="We Help Students Transfer Credits Seamlessly"
              description="Many students look for better options when they move to a new city, need advanced facilities, or wish to study in a place that offers stronger career opportunities. In such cases, the Best Credit Transfer Institute in Kerala helps them carry forward the credits they have already earned."
              align="left"
            />

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm font-semibold text-paragraph">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              className="group relative rounded-[2rem] bg-gradient-to-b from-bg-section to-white p-8 lg:p-9 border border-border/80 shadow-soft hover:shadow-hover transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Decorative accents */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-14 -right-14 h-36 w-36 rounded-full bg-accent/5 blur-2xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-soft border border-border mb-7 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:border-primary/20 group-hover:shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:-rotate-3">
                  <value.icon className="h-6.5 w-6.5 text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <h3
                  className="text-lg font-bold text-heading mb-3 group-hover:text-primary transition-colors duration-300"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {value.title}
                </h3>
                <p className="text-paragraph leading-relaxed text-sm font-medium">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
