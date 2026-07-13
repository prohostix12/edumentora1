"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Building2,
  GraduationCap,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import CTA from "@/components/common/CTA";

const faqItems = [
  {
    question: "What is academic credit transfer?",
    answer:
      "Academic credit transfer allows students to transfer previously earned credits from one institution to another, enabling them to continue their education without starting over.",
  },
  {
    question: "Who can apply for a credit transfer?",
    answer:
      "Any student who has discontinued their degree program (due to financial, personal, or academic reasons) from a recognized university can apply to transfer their credits.",
  },
  {
    question: "Which universities does Edumentora partner with?",
    answer:
      "We partner with leading UGC-recognized universities including Glocal University, Arni University, and Maya Devi University, ensuring valid and respected degree completions.",
  },
  {
    question: "How does the credit transfer process work?",
    answer:
      "Our team reviews your official mark sheets and syllabus. We check credit equivalency with partner universities, coordinate the matching process, and manage direct admission to the right semester.",
  },
  {
    question:
      "Will my transferred credits be recognized by the new university?",
    answer:
      "Yes. Credit transfers are completed in accordance with official UGC guidelines and university regulations, meaning your final degree is fully valid, recognized, and credentialed.",
  },
];

function FAQCard() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="grid gap-4">
      {faqItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
              isOpen
                ? "border-primary/20 bg-gradient-to-b from-white to-bg-section/60 shadow-card -translate-y-0.5"
                : "border-border/80 bg-white/70 shadow-soft hover:border-primary/20 hover:shadow-card hover:-translate-y-0.5"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 p-6 text-left"
            >
              <span
                className={`text-sm sm:text-base font-extrabold ${
                  isOpen ? "text-primary" : "text-heading"
                }`}
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {item.question}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-350 ${
                  isOpen
                    ? "bg-gradient-to-br from-accent to-accent-dark text-white shadow-md shadow-accent/25"
                    : "bg-slate-50 text-paragraph/70 border border-border/80"
                }`}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-0">
                    <div className="mb-4 h-px bg-border/80" />
                    <p className="text-sm text-paragraph leading-relaxed font-medium">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function AboutPageContent() {
  return (
    <main className="pt-20 bg-bg-section">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider">
                About Us
              </span>
              <h1
                className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-tight text-heading"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Transform Past Efforts into <span className="gradient-text">Future Success</span>
              </h1>
              <p className="text-base sm:text-lg text-paragraph leading-relaxed font-medium">
                Edumentora makes restarting your education easy by transferring
                past credits to accredited universities, saving you time and
                money.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#faq"
                  className="inline-flex items-center justify-center gap-1.5 h-12 px-7 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  Explore FAQs
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#tims"
                  className="inline-flex items-center justify-center gap-1.5 h-12 px-7 rounded-full text-xs font-bold text-primary border border-primary/20 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Know TIMS
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="relative max-w-xl ml-auto">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-hover border-4 border-white/90">
                  <Image
                    src="https://images.pexels.com/photos/7176132/pexels-photo-7176132.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                    alt="About TIMS Education Kerala — counseling and degree programs"
                    fill
                    sizes="(max-width: 1024px) 100vw, 580px"
                    className="object-cover"
                    priority
                  />
                </div>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-5 left-6 right-6 rounded-2xl bg-white/95 backdrop-blur-sm px-5 py-4 shadow-hover border border-border"
                >
                  <p className="text-xs font-bold text-heading leading-relaxed">
                    TIMS Education Kerala — trusted counseling and guidance for distance and online degree programs
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main About Narrative */}
      <section className="py-24 lg:py-28 bg-white relative">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.5rem] bg-gradient-to-b from-bg-section to-white border border-border/80 shadow-soft p-8 lg:p-10"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-dark shadow-md shadow-accent/20">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2
                  className="text-xl font-extrabold text-heading"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  About Edumentora
                </h2>
                <p className="text-xs font-semibold text-paragraph/75 mt-0.5">Student-focused academic credit transfer services</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-paragraph leading-relaxed font-medium">
              Edumentora is an innovative education service provider that specializes in academic credit transfer solutions, helping students across India restart and complete their discontinued degree programs. Whether due to financial hardship, personal setbacks, academic difficulties, or institutional issues, many students pause their education, but with Edumentora, they don&apos;t have to start over. We make it possible to transfer previously earned college or university credits to UGC-recognized institutions, allowing students to pick up where they left off. Our goal is to ensure that prior academic efforts are not wasted and that every learner gets a second chance to earn a respected qualification. At Edumentora, we&apos;re committed to turning past progress into future success through reliable, student-focused credit transfer services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="py-24 lg:py-32 bg-bg-section overflow-hidden relative">
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider">
                Best B.Tech Credit Transfer Institute in Kerala
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-[38px] font-extrabold leading-tight text-heading"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Empowering students through <span className="gradient-text">credit transfer</span>
              </h2>
              <p className="text-sm sm:text-base text-paragraph leading-relaxed font-medium">
                Resume your graduation or postgraduate education through Edumentora, a leading academic credit transfer institution. Transfer earned credits for B. Tech, engineering, and other programs to recognized universities, saving time and costs while achieving academic success.
              </p>

              <div className="space-y-5">
                {[
                  {
                    title: "Our Mission",
                    text: "In EduMentora Our Mission is to help students overcome academic setbacks by facilitating seamless credit transfers to accredited universities for successful completion.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Our Vision",
                    text: "In EduMentora Our Vision is to bright create a future where every student can complete their education without barriers through recognized credit transfer programs.",
                    icon: GraduationCap,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="rounded-2xl bg-white border border-border/80 shadow-soft p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark shadow-md shadow-accent/20">
                        <item.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3
                          className="text-base font-extrabold text-heading mb-1.5"
                          style={{ fontFamily: "var(--font-poppins)" }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-paragraph leading-relaxed font-medium">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-7"
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2.5rem] shadow-hover border-4 border-white">
                <Image
                  src="https://images.pexels.com/photos/19613149/pexels-photo-19613149.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                  alt="Student continuing graduation or postgraduate education through online learning"
                  fill
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider mb-4">
              Best B.Tech Credit Transfer Institute in Kerala
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight text-heading"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Frequently Asked Questions
            </h2>
          </motion.div>
          <FAQCard />
        </div>
      </section>

      {/* TIMS */}
      <section id="tims" className="py-24 lg:py-32 bg-bg-section overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-hover border-4 border-white">
                <img
                  src="/images/tims.png"
                  alt="TIMS Education Kerala counseling and guidance session"
                  className="h-full w-full object-cover"
                />
              </div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 left-6 right-6 rounded-2xl bg-white/95 backdrop-blur-sm px-5 py-4 shadow-hover border border-border"
              >
                <p className="text-xs font-bold text-heading">
                  Tirur Institute of Management Studies (TIMS)
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider">
                <Building2 className="h-4 w-4 text-primary" />
                Trusted Institution
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight text-heading mb-6"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Tirur Institute of Management Studies <span className="gradient-text">(TIMS)</span>
              </h2>
              <p className="text-sm sm:text-base text-paragraph leading-relaxed font-medium">
                EduMentora proudly partners with Tirur Institute of Management Studies (TIMS), a leading institution with 16 years of expertise in distance education, attestation, and credit transfer services. With branches in Tirur and Edappal, TIMS offers diverse programs, including SSLC, Plus Two, Online Degrees, Postgraduate Courses, BTech/MTech, and Diplomas, ensuring flexible learning opportunities for students.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Director's Message */}
      <section className="py-24 lg:py-32 bg-white overflow-hidden relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider mb-4">
              Leadership Note
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold leading-tight text-heading"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Director&apos;s Message
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-dark relative overflow-hidden rounded-[2.5rem] p-8 sm:p-10 lg:p-12 shadow-hover"
          >
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

            <div className="relative grid gap-6">
              {[
                "At Edumentora, we strongly believe that education should never be a dead end. Across India, thousands of students discontinue their degree programs due to financial challenges, personal circumstances, academic hurdles, or institutional constraints. Unfortunately, this often leads to wasted academic effort and lost confidence. Our mission is to change that narrative.",
                "Edumentora was founded with a clear purpose: to help students restart and complete their higher education without having to begin from scratch. Through our academic credit transfer solutions, we enable learners to transfer their previously earned credits to UGC-recognized institutions, allowing them to continue their education from where they left off. Every credit earned represents hard work, time, and determination—and we ensure it is respected and utilized.",
                "We are deeply committed to providing transparent, reliable, and student-focused guidance at every step of the process. Our team works closely with each student to understand their academic background and identify the best possible pathway to a recognized qualification.",
                "At Edumentora, we don’t just offer education services—we offer second chances, renewed confidence, and a clear path toward a successful future. Together, let us transform past progress into lasting achievement.",
              ].map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + index * 0.08, duration: 0.5 }}
                  className="text-sm sm:text-base leading-relaxed text-slate-300 font-medium"
                >
                  {paragraph}
                </motion.p>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-4 rounded-2xl bg-white/5 border border-white/5 px-6 py-5 w-fit"
              >
                <p
                  className="text-base font-extrabold text-white"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  — Mohamed Shameem
                </p>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                  Director, Edumentora
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing narrative */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {[
              "When students think about shifting to another college or university, one of the biggest worries is whether their earlier studies will still count. Nobody wants to repeat the same subjects or lose valuable years. This is where choosing the Best Credit Transfer Institute makes all the difference.",
              "The Best Credit Transfer Institute gives students a chance to carry their credits from one institution to another without starting the degree all over again. By submitting mark sheets, subject details, and the syllabus of the courses already completed, students can have their past work evaluated. Once the credits are approved, they can continue their studies directly from the right semester.",
              "For students who want to move forward without wasting time or money, the Best Credit Transfer Institute provides the right pathway. It makes sure that the effort already put in is not ignored, and it allows students to complete their education in a smooth and stress-free manner.",
              "Many learners face unexpected changes in life, but with the help of the Best Credit Transfer Institute, their education remains on track. It values hard work, supports growth, and opens doors to better opportunities.",
            ].map((paragraph, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.1, duration: 0.55 }}
                className="rounded-2xl bg-gradient-to-b from-bg-section to-white border border-border/80 shadow-soft p-6 lg:p-7"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                    <CheckCircle2 className="h-4.5 w-4.5 text-primary" />
                  </span>
                  <p className="text-sm sm:text-base text-paragraph leading-relaxed font-medium">
                    {paragraph}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
