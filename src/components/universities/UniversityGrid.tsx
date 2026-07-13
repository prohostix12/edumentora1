"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/common/SectionTitle";
import { MapPin, Award, Building2, Loader2, Globe } from "lucide-react";

// ─── Type matching the University Mongoose schema ─────────────────────────────
interface UniversityItem {
  _id: string;
  name: string;
  logo: string;       // URL or public path to logo image
  website: string;    // Official website URL
  description: string;
}

export default function UniversityGrid() {
  const [universities, setUniversities] = useState<UniversityItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch partner universities stored by admin from the database
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch("/api/admin/universities");
        if (res.ok) {
          const data: UniversityItem[] = await res.json();
          setUniversities(data);
        }
      } catch (err) {
        console.error("Failed to load universities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-white relative">
      {/* Decorative gradient blur in background */}
      <div className="absolute top-[15%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[5%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16">
          <SectionTitle
            label="Partner Universities"
            title="Top Universities We Collaborate With"
            description="We have partnered with leading universities across India to provide you with the best credit transfer and admission opportunities."
          />
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-3" />
            <p className="text-xs font-bold text-paragraph uppercase tracking-wide">
              Loading universities…
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && universities.length === 0 && (
          <div className="text-center py-20 bg-slate-50 border border-dashed border-border rounded-[2.5rem]">
            <Building2 className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-paragraph/70">
              No partner universities have been added yet.
            </p>
          </div>
        )}

        {/* Cards grid */}
        {!loading && universities.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-8">
            {universities.map((uni, index) => (
              <motion.div
                key={uni._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative glass rounded-[2.5rem] shadow-soft overflow-hidden hover:shadow-hover transition-all duration-500 hover:-translate-y-2"
              >
                {/* Header card banner */}
                <div className="relative h-52 bg-gradient-to-br from-primary/10 via-white to-accent/10 flex items-center justify-center p-8 overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full border border-primary/5 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                  <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full border border-accent/5 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-primary shadow-soft border border-primary/10">
                      <Award className="h-3.5 w-3.5" />
                      UGC Approved
                    </span>
                  </div>

                  <div className="text-center z-10">
                    {/* Show logo if available, otherwise fall back to Building2 icon */}
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-soft border border-border/60 mb-4 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3 overflow-hidden">
                      {uni.logo ? (
                        <img
                          src={uni.logo}
                          alt={uni.name}
                          className="max-h-full max-w-full p-1 object-contain"
                        />
                      ) : (
                        <Building2 className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <h3
                      className="text-lg font-bold text-heading group-hover:text-primary transition-colors duration-300"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {uni.name}
                    </h3>
                  </div>
                </div>

                {/* Content block */}
                <div className="relative p-8">
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Website link (replaces location row) */}
                  {uni.website && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                        <Globe className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <a
                        href={uni.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-primary hover:underline truncate"
                      >
                        {uni.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-paragraph leading-relaxed mb-6 text-sm font-medium">
                    {uni.description || "Details coming soon."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Credit Transfer Info Panel — unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-dark relative mt-16 rounded-[2.5rem] p-8 lg:p-12 text-white shadow-hover overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center z-10">
            <div>
              <h3
                className="text-2xl lg:text-3xl font-extrabold mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Understanding University Credit Transfer
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                Many students reach a point where they want to change their university.
                With University Credit Transfer, the subjects and credits a student has
                already earned will never go to waste. The new university reviews the
                mark sheets and syllabus from the previous institution and accepts the
                subjects that match. This saves both time and money.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { value: "No", label: "Repeated Classes" },
                { value: "100%", label: "Credit Valuation" },
                { value: "Flexible", label: "Study Locations" },
                { value: "On Time", label: "Degree Completion" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl bg-white/5 border border-white/5 p-6 text-center hover:bg-white/10 hover:border-white/10 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div
                    className="text-2xl font-bold mb-1"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {item.value}
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
