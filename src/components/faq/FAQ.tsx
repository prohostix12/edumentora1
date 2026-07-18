"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Phone } from "lucide-react";

const defaultFaqs = [
  {
    question: "What is credit transfer and how does it work?",
    answer:
      "Credit transfer allows students to carry forward the credits they have already earned from a previous institution to a new university. Students submit their mark sheets, syllabus, and proof of completed subjects. The new institute then checks which subjects match their own syllabus. Once the credits are accepted, the student can directly join the appropriate semester without starting from the beginning.",
  },
  {
    question: "How long does the credit transfer process take?",
    answer:
      "The credit transfer process typically takes between 2 to 6 weeks, depending on the universities involved and the completeness of your documentation. We work closely with both institutions to expedite the process and ensure a smooth transition.",
  },
  {
    question: "Will all my credits be accepted by the new university?",
    answer:
      "Credit acceptance depends on how closely your previous subjects match the new university's syllabus. Our experts review your documents beforehand to give you an accurate assessment of which credits are likely to be transferred. In most cases, a significant portion of credits are accepted.",
  },
  {
    question: "Is credit transfer recognized by UGC?",
    answer:
      "Yes, credit transfer is a recognized process under UGC guidelines. We only partner with UGC-recognized universities that accept credit transfers in accordance with regulatory frameworks. Your degree will be fully valid and recognized.",
  },
  {
    question: "Can I transfer credits from any university?",
    answer:
      "Credit transfers are generally possible between recognized universities. The key factor is whether the subjects you have completed align with the syllabus of the receiving university. We evaluate your case individually and guide you to the best-matching institutions.",
  },
  {
    question: "What documents are required for credit transfer?",
    answer:
      "You will need to submit your mark sheets from the previous institution, detailed syllabus of completed subjects, course completion certificates, identity proof, and transfer certificate. Our team assists you in gathering and organizing all necessary documents.",
  },
  {
    question: "Does credit transfer save money?",
    answer:
      "Absolutely. Credit transfer saves both time and money. Since you do not need to repeat classes you have already passed, you pay fewer semester fees and complete your degree faster, reducing overall educational expenses.",
  },
  {
    question: "Which universities do you partner with?",
    answer:
      "We partner with leading UGC-recognized universities including Glocal University, Arni University, and Maya Devi University. These institutions offer a wide range of programs across engineering, management, law, pharmacy, and more.",
  },
];

function AccordionRow({
  question,
  answer,
  isOpen,
  onClick,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className={`rounded-2xl transition-all duration-300 ${
        isOpen
          ? "bg-white shadow-card"
          : "bg-bg-section/70 hover:bg-bg-section"
      }`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className={`text-sm sm:text-base font-bold transition-colors ${
            isOpen ? "text-primary" : "text-heading"
          }`}
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          {question}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen
              ? "bg-heading text-white"
              : "bg-white text-heading/60 border border-border"
          }`}
        >
          {isOpen ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
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
            <p className="px-6 pb-6 text-paragraph leading-relaxed text-sm">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqList, setFaqList] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await fetch("/api/faqs", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setFaqList(data);
          } else {
            setFaqList(defaultFaqs);
          }
        } else {
          setFaqList(defaultFaqs);
        }
      } catch (err) {
        console.error("Failed to fetch dynamic FAQs:", err);
        setFaqList(defaultFaqs);
      }
    }
    fetchFaqs();
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-[10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left column: heading + book a call card */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-4"
              >
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent w-fit">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  FAQs
                </span>
                <h2
                  className="text-3xl sm:text-4xl font-bold leading-tight text-heading"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Frequently Asked Questions
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-[2rem] border border-border/80 bg-bg-section/60 p-6 shadow-soft"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-bg text-white shadow-md shadow-primary/20 mb-5">
                  <Phone className="h-6 w-6" />
                </div>
                <h3
                  className="text-lg font-bold text-heading mb-2"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Book a 15 min call
                </h3>
                <p className="text-sm text-paragraph leading-relaxed mb-6">
                  If you have any questions, just book a free 15-minute call
                  with our team before you get started.
                </p>
                <a
                  href="tel:+919744587777"
                  className="inline-flex w-full items-center justify-center gap-1.5 h-12 px-6 rounded-full text-sm font-bold text-white gradient-bg-accent hover:shadow-hover shadow-md transition-all duration-300"
                >
                  Book a Free Call
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right column: accordion list */}
          <div className="lg:col-span-8 flex flex-col gap-3">
            {faqList.map((faq, index) => (
              <AccordionRow
                key={faq._id || index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
