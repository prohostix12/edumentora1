"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Building2, ChevronLeft, ChevronRight, ExternalLink, Globe, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";

interface UniversityItem {
  _id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  imageUrl?: string;
}

interface UniversityMarqueeItem {
  logo: string | null;
  name: string;
}

const fallbackMarqueeList: UniversityMarqueeItem[] = [
  { logo: "/images/manipur_university.png", name: "Manipur International University (MIU)" },
  { logo: "/images/global_university.png", name: "Glocal University" },
  { logo: "/images/maya_devi_university.png", name: "Maya Devi University" },
  { logo: "/images/arni_university.png", name: "Arni University" },
];

const AUTOPLAY_DELAY = 6000;

export default function UniversityGrid() {
  const [universities, setUniversities] = useState<UniversityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch partner universities from database
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

  const total = universities.length;
  const safeIndex = total > 0 ? Math.min(activeIndex, total - 1) : 0;
  const activeUni = universities[safeIndex];

  const goTo = useCallback((index: number) => {
    if (total === 0) return;
    setActiveIndex(((index % total) + total) % total);
  }, [total]);

  const goNext = useCallback(() => goTo(safeIndex + 1), [safeIndex, goTo]);
  const goPrev = useCallback(() => goTo(safeIndex - 1), [safeIndex, goTo]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  // Combine fetched university logos with fallbacks to populate the marquee track
  const marqueeList = total > 0 
    ? [...universities.map(u => ({ logo: u.logo, name: u.name })), ...fallbackMarqueeList]
    : fallbackMarqueeList;
  const doubleTrack = [...marqueeList, ...marqueeList, ...marqueeList];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center bg-section-light-red overflow-hidden py-20 px-[6vw] snap-section">
      
      {/* Background visual components */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-[10%] left-[-10%] w-[380px] h-[380px] rounded-full bg-primary/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #E53935 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative max-w-[1440px] w-full mx-auto z-10 flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Partner Universities
          </span>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-heading mt-3 leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Top Universities We Collaborate With
          </h2>
        </div>

        {/* Mid Row: Carousel (Left) & Understanding Panel (Right) */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive University Carousel (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white/40 border border-slate-200/50 rounded-[2.5rem] min-h-[360px]">
                <Loader2 className="h-8 w-8 text-accent animate-spin mb-3" />
                <p className="text-xs font-bold text-paragraph uppercase tracking-wider">
                  Loading universities…
                </p>
              </div>
            ) : total === 0 ? (
              <div className="text-center py-20 bg-white/40 border border-dashed border-slate-200 rounded-[2.5rem] min-h-[360px] flex flex-col justify-center items-center">
                <Building2 className="h-10 w-10 text-slate-350 mb-3" />
                <p className="text-sm font-bold text-paragraph/70">
                  No partner universities have been added yet.
                </p>
              </div>
            ) : (
              <div
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="relative h-[340px] sm:h-[400px] lg:h-[420px] w-full overflow-hidden rounded-[2.5rem] shadow-md border border-slate-100/60 bg-slate-900"
              >
                {/* Background image zoom crossfades */}
                <AnimatePresence>
                  <motion.div
                    key={`bg-${activeUni._id}`}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1.05 }}
                    exit={{ opacity: 0, scale: 1.08 }}
                    transition={{
                      opacity: { duration: 0.9, ease: "easeInOut" },
                      scale: { duration: 6, ease: "easeOut" },
                    }}
                    className="absolute inset-0 z-0"
                  >
                    {activeUni.imageUrl && !brokenImages[activeUni._id] ? (
                      <img
                        src={activeUni.imageUrl}
                        alt=""
                        onError={() => setBrokenImages((prev) => ({ ...prev, [activeUni._id]: true }))}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-nv-900 via-nv-800 to-nv-700" />
                    )}
                    <div className="absolute inset-0 bg-slate-950/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* UGC Badge */}
                <div className="absolute top-5 right-5 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-primary shadow-sm border border-slate-100">
                    <Award className="h-3.5 w-3.5 text-accent" />
                    UGC Approved
                  </span>
                </div>

                {/* Logo badge */}
                {activeUni.logo && (
                  <div className="absolute top-5 left-5 z-10 inline-flex h-12 w-28 items-center justify-center rounded-xl bg-white/95 shadow-sm border border-slate-100 p-1.5">
                    <img
                      src={activeUni.logo}
                      alt={activeUni.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 sm:p-10 text-left">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`content-${activeUni._id}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="max-w-2xl flex flex-col gap-2.5"
                    >
                      <h3
                        className="text-2xl sm:text-3xl font-extrabold text-white"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {activeUni.name}
                      </h3>
                      {activeUni.description && (
                        <p className="text-xs sm:text-sm text-white/80 line-clamp-2 leading-relaxed">
                          {activeUni.description}
                        </p>
                      )}
                      {activeUni.website && (
                        <a
                          href={activeUni.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 w-fit px-4 py-1.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                        >
                          <Globe className="h-3.5 w-3.5" />
                          {activeUni.website.replace(/^https?:\/\//, "")}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Arrows */}
                {total > 1 && (
                  <div className="absolute bottom-5 right-5 z-20 flex gap-2">
                    <button
                      onClick={goPrev}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all duration-300 cursor-pointer"
                    >
                      <ChevronLeft className="h-4.5 w-4.5" />
                    </button>
                    <button
                      onClick={goNext}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all duration-300 cursor-pointer"
                    >
                      <ChevronRight className="h-4.5 w-4.5" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Understanding Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="glass-dark relative rounded-[2.5rem] p-6 sm:p-8 text-white shadow-md overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-accent/5 blur-2xl pointer-events-none" />

              <div className="relative z-10 flex-1 flex flex-col justify-center">
                <h3
                  className="text-lg sm:text-xl font-extrabold mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Understanding University Credit Transfer
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                  With University Credit Transfer, the subjects and credits a student has
                  already earned will never go to waste. The new university reviews the
                  mark sheets and syllabus from the previous institution and accepts the
                  subjects that match, saving both time and money.
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-3.5">
                {[
                  { value: "No", label: "Repeated Classes" },
                  { value: "100%", label: "Credit Valuation" },
                  { value: "Flexible", label: "Study Locations" },
                  { value: "On Time", label: "Degree Completion" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-white/5 border border-white/5 p-3 sm:p-4 text-center hover:bg-white/10 transition-colors"
                  >
                    <div
                      className="text-base sm:text-lg font-bold text-accent mb-0.5"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {item.value}
                    </div>
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-none">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row: Infinite Scrolling Logo Marquee */}
        <div className="relative w-full overflow-hidden border-y border-slate-200/60 py-6 bg-white/40 rounded-2xl backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-section-light-red via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-section-light-red via-transparent to-transparent" />
          
          <div className="animate-marquee flex w-max [animation-play-state:running] hover:[animation-play-state:paused]">
            {doubleTrack.map((uni, index) => (
              <div
                key={`${uni.name}-${index}`}
                className="group relative mx-6 flex h-14 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                {uni.logo ? (
                  <img
                    src={uni.logo}
                    alt={uni.name}
                    className="h-10 w-24 object-contain"
                  />
                ) : (
                  <span className="text-[10px] font-extrabold text-heading text-center truncate px-1">
                    {uni.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
