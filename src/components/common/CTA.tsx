"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary-dark to-secondary p-12 lg:p-20 text-center"
        >
          {/* Decorative */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 right-10 h-20 w-20 border border-white/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-10 left-10 h-16 w-16 border border-white/10 rounded-full"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4" />
              Start Your Journey Today
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-3xl leading-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Ready to Transfer Your Credits and Advance Your Education?
            </h2>

            <p className="text-red-100 text-lg max-w-2xl">
              Join thousands of students who have successfully transferred their
              credits and continued their education without losing valuable time.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-primary shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
