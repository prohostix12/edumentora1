"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import { Users, Building2, Landmark, Globe } from "lucide-react";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

// Reusable Count-Up Counter Component
function Counter({ value, duration = 1.5, delay = 0 }: { value: string; duration?: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    if (!node) return;

    // Parse numeric part
    const matches = value.match(/(\d+)/);
    if (!matches) {
      node.textContent = value;
      return;
    }

    const targetNumber = parseInt(matches[0], 10);
    const prefix = value.split(matches[0])[0] || "";
    const suffix = value.split(matches[0])[1] || "";

    const controls = animate(0, targetNumber, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate(current) {
        node.textContent = prefix + Math.floor(current) + suffix;
      },
    });

    return () => controls.stop();
  }, [value, inView, duration, delay]);

  return <span ref={ref}>0</span>;
}

export default function HeroStats() {
  const stats = [
    { val: "10K+", label: "Students Guided", icon: Users },
    { val: "150+", label: "Partner Universities", icon: Building2 },
    { val: "98%", label: "Visa Success Rate", icon: Landmark },
    { val: "25+", label: "Countries Reached", icon: Globe },
  ];

  return (
    <section 
      className="w-full bg-[#F8FAFC] border-y border-slate-100 py-10 px-6 md:px-12 lg:px-24 snap-section !min-h-0 !h-auto"
      aria-label="Edumentora key statistics"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-soft transition-all duration-300 group"
              >
                <div className="p-3 bg-white border border-slate-100 rounded-2xl text-[#A1122A] shadow-sm group-hover:scale-105 group-hover:bg-[#A1122A] group-hover:text-white transition-all duration-300 shrink-0">
                  <Icon size={24} className="group-hover:rotate-6 transition-transform duration-300" />
                </div>
                <div className="flex flex-col">
                  <span className={`text-3xl md:text-4xl font-extrabold text-[#A1122A] tracking-tight ${playfairDisplay.className}`}>
                    <Counter value={stat.val} delay={idx * 0.05} />
                  </span>
                  <span className="text-xs md:text-sm text-slate-500 font-semibold uppercase tracking-wider mt-1.5">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
