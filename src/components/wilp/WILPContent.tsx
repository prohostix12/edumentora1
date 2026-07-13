"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  LaptopMinimal,
  LayoutTemplate,
  BadgeCheck,
  Wallet,
  RefreshCw,
  TrendingUp,
  GraduationCap,
  Award,
  Users,
  Send,
  Headset,
  Stethoscope,
  Landmark,
  Newspaper,
  Scale,
  ShoppingBag,
  School,
  Hotel,
  ChevronRight,
} from "lucide-react";

const whyChoose = [
  {
    icon: BriefcaseBusiness,
    title: "Work While Studying",
    description: "No need to quit your job.",
  },
  {
    icon: LayoutTemplate,
    title: "Flexible Learning Modes",
    description: "Online, weekend, and evening classes.",
  },
  {
    icon: LaptopMinimal,
    title: "Industry-Focused Curriculum",
    description: "Courses designed for real-world applications.",
  },
  {
    icon: BadgeCheck,
    title: "Recognized Degrees & Certifications",
    description: "Valid for job promotions and career transitions.",
  },
  {
    icon: Wallet,
    title: "Cost-Effective & Time-Saving",
    description: "Complete your education faster and affordably.",
  },
  {
    icon: RefreshCw,
    title: "University Credit Transfers",
    description: "Convert previous academic credits and complete your degree.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth Opportunities",
    description: "Gain higher qualifications to boost your professional success.",
  },
];

const popularCourses = [
  {
    icon: GraduationCap,
    title: "Engineering & Tech",
    courses: "B.Tech/M.Tech in Mechanical, Civil, CSE, ECE, IT, AI, Cybersecurity",
  },
  {
    icon: BriefcaseBusiness,
    title: "Management",
    courses: "MBA, Executive MBA, Business Analytics, Digital Marketing",
  },
  {
    icon: LaptopMinimal,
    title: "Computer Science",
    courses: "MCA, Software Engineering, Cloud, AI, Blockchain",
  },
  {
    icon: Stethoscope,
    title: "Healthcare",
    courses: "Biotechnology, Healthcare Management",
  },
  {
    icon: Landmark,
    title: "Finance",
    courses: "Financial Management, Banking",
  },
  {
    icon: Newspaper,
    title: "Media",
    courses: "Digital Marketing, Mass Communication",
  },
  {
    icon: Scale,
    title: "Law",
    courses: "Corporate, Cyber, IP Law",
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    courses: "Retail Management, E-Commerce",
  },
  {
    icon: School,
    title: "Education",
    courses: "Educational Leadership",
  },
  {
    icon: Hotel,
    title: "Hospitality",
    courses: "Hotel Management, Tourism",
  },
];

const advantages = [
  "Study Without Leaving Your Job – Work & learn simultaneously.",
  "Flexible Learning Options – Online, weekend & evening classes.",
  "Industry-Focused Curriculum – Gain practical, job-ready skills.",
  "University-Recognized Degree – Accepted by top employers & government.",
  "Faster Career Growth – Better promotions, salary hikes & job security.",
  "Cost-Effective & Time-Saving – No relocation, lower fees, and quick completion.",
  "Global Career Opportunities – Valid for multinational & international jobs.",
  "Easy Admission & Credit Transfer – Seamless enrollment & degree continuation.",
];

function HeroSection() {
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative max-w-xl mx-auto lg:mx-0">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2.5rem] shadow-hover border-4 border-white/90">
                <Image
                  src="https://images.pexels.com/photos/7964503/pexels-photo-7964503.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Professional using laptop while participating in Work Integrated Learning program at Edu Mentora"
                  fill
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="object-cover"
                  priority
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="absolute -bottom-5 left-6 right-6 rounded-2xl bg-white/95 backdrop-blur-sm px-5 py-4 shadow-hover border border-border"
              >
                <p className="text-xs font-bold text-heading leading-relaxed">
                  Professional using laptop while participating in Work Integrated Learning program at Edu Mentora
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex flex-col gap-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider">
              WILP
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-tight text-heading"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Work Integrated <span className="gradient-text">Learning Program</span>
            </h1>
            <p className="text-base sm:text-lg text-paragraph leading-relaxed max-w-xl font-medium">
              Edumentora&apos;s WILP credit transfer helps working professionals
              continue their education without losing progress. Carry your
              credits forward and keep growing on the job and in the classroom.
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 h-12 px-7 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Know more
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] bg-gradient-to-b from-bg-section to-white border border-border/80 shadow-soft p-8 lg:p-10"
        >
          <h2
            className="text-2xl sm:text-3xl font-extrabold leading-tight text-heading mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Work Integrated Learning Program <span className="gradient-text">(WILP)</span>
          </h2>
          <div className="flex flex-col gap-6 text-sm sm:text-base text-paragraph leading-relaxed font-medium">
            <p>
              Work Integrated Learning Program (WILP) is a flexible education system designed for working professionals who want to pursue higher education without leaving their jobs. It allows individuals to gain academic qualifications while applying their knowledge in real-world work environments.
            </p>
            <p>
              At Edumentora, we specialize in academic credit transfer programs and support students in completing their education through WILP. Our programs are tailored for professionals who need a recognized degree for career growth without disrupting their work schedules.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-section overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider mb-4 animate-pulse">
            Benefits
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight text-heading"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Why Choose WILP Through Edumentora?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {whyChoose.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="group relative rounded-[2.5rem] bg-white border border-border/80 shadow-soft hover:shadow-hover hover:-translate-y-2 hover:border-primary/20 transition-all duration-500 p-8 overflow-hidden"
            >
              <div className="absolute -top-14 -right-14 h-32 w-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-dark shadow-md ring-4 ring-white mb-6 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3
                  className="text-lg font-extrabold text-heading mb-3 group-hover:text-primary transition-colors duration-300"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {index + 1}. {item.title}
                </h3>
                <p className="text-paragraph text-sm leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularCoursesSection() {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider mb-4">
            Courses
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight text-heading"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Popular WILP Courses
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCourses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.06, duration: 0.6 }}
              className="group relative rounded-[2.5rem] bg-gradient-to-b from-bg-section to-white border border-border/80 shadow-soft hover:shadow-hover hover:-translate-y-1 hover:border-primary/20 transition-all duration-500 p-8 overflow-hidden"
            >
              <div className="absolute -top-14 -right-14 h-32 w-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-soft border border-border mb-6 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:border-primary/20 transition-all duration-500">
                  <course.icon className="h-5.5 w-5.5 text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <h3
                  className="text-base font-extrabold text-heading mb-3 group-hover:text-primary transition-colors duration-300"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {course.title}
                </h3>
                <p className="text-paragraph text-xs leading-relaxed font-semibold uppercase tracking-wide">
                  {course.courses}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvantagesSection() {
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

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider mb-4">
            Advantages
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight text-white"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Advantages of Work Integrated Learning Program
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {advantages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08, duration: 0.55 }}
              className="rounded-2xl bg-white/5 border border-white/5 p-6"
            >
              <div className="flex items-start gap-3.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 mt-0.5">
                  <ChevronRight className="h-4.5 w-4.5 text-primary" />
                </span>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                  {item}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
                alt="Mentor awarding apprentice during training"
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
                  alt="Student with credit transfer documents"
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

export default function WILPContent() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <WhyChooseSection />
      <PopularCoursesSection />
      <AdvantagesSection />
      <JourneyForm />
    </>
  );
}
