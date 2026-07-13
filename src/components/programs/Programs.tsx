"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";
import { ArrowRight, BookOpen, GraduationCap, Globe, Briefcase, Laptop, Users } from "lucide-react";

const programs = [
  {
    icon: BookOpen,
    title: "Credit Transfer Program",
    description:
      "Seamlessly transfer your earned credits to partner universities. We review your mark sheets and syllabus to ensure maximum credit acceptance.",
    color: "from-accent to-accent-dark",
    href: "/credit-transfer",
  },
  {
    icon: GraduationCap,
    title: "University Admissions",
    description:
      "Get expert guidance for admissions into top universities across India. We help you choose the right institution based on your goals and credits.",
    color: "from-accent to-accent-dark",
  },
  {
    icon: Globe,
    title: "Study Abroad",
    description:
      "Explore international education opportunities with our study abroad programs. We assist with university selection, applications, and visa processing.",
    color: "from-accent to-accent-dark",
  },
  {
    icon: Briefcase,
    title: "Career Counseling",
    description:
      "Receive personalized career guidance from industry experts. We help you align your education with your professional aspirations.",
    color: "from-accent to-accent-dark",
  },
  {
    icon: Laptop,
    title: "Distance Education",
    description:
      "Pursue flexible learning through our distance education partnerships. Study at your own pace while earning recognized degrees.",
    color: "from-accent to-accent-dark",
  },
  {
    icon: Users,
    title: "Professional Courses",
    description:
      "Enhance your skills with industry-relevant professional courses. From management to technology, we offer programs that boost your career.",
    color: "from-accent to-accent-dark",
  },
];

export default function Programs() {
  return (
    <section className="py-24 lg:py-32 bg-bg-section relative">
      {/* Decorative gradient blur */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[5%] right-[-10%] w-[450px] h-[450px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16">
          <SectionTitle
            label="Our Programs"
            title="Programs Designed for Your Success"
            description="We offer a comprehensive range of educational programs tailored to meet the diverse needs of students seeking academic growth and career advancement."
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="group relative glass rounded-[2.5rem] p-8 lg:p-9 shadow-soft hover:shadow-hover transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Top accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${program.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Decorative corner glow */}
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${program.color} shadow-md ring-4 ring-white mb-7 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3`}
                >
                  <program.icon className="h-6 w-6 text-white" />
                </div>

                <h3
                  className="text-lg font-bold text-heading mb-3 group-hover:text-primary transition-colors duration-300"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {program.title}
                </h3>

                <p className="text-paragraph leading-relaxed mb-7 text-sm font-medium">
                  {program.description}
                </p>

                <Link
                  href={program.href ?? "/contact"}
                  className="inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-full text-xs font-bold text-primary bg-primary/5 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary/20 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
