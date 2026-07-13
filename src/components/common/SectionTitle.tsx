"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
}

export default function SectionTitle({
  label,
  title,
  description,
  align = "center",
  light = false,
}: SectionTitleProps) {
  const alignClass =
    align === "center"
      ? "text-center items-center"
      : align === "right"
      ? "text-right items-end"
      : "text-left items-start";

  return (
    <div className={`flex flex-col gap-4 ${alignClass} max-w-3xl`}>
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full glass-accent px-4 py-1.5 text-sm font-semibold gradient-text w-fit"
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 26, scale: 0.98, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className={`text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight ${
          light ? "text-white" : "text-heading"
        }`}
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className={`text-base sm:text-lg leading-relaxed ${
            light ? "text-slate-300" : "text-paragraph"
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
