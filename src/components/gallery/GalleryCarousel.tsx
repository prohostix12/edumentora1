"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";

type Slide = {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  description: string;
};

const slides: Slide[] = [
  {
    id: "h1",
    title: "Celebrating Every Milestone",
    category: "Awards",
    image:
      "https://images.pexels.com/photos/35487178/pexels-photo-35487178.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Group of university graduates celebrating with diplomas outdoors.",
    description: "Honoring our students' hard work and graduation achievements.",
  },
  {
    id: "h2",
    title: "Wins Worth Sharing",
    category: "Office",
    image:
      "https://images.pexels.com/photos/3760789/pexels-photo-3760789.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Happy student giving thumbs up with laptop.",
    description: "Guidance and mentoring that lead to real-world career success.",
  },
  {
    id: "h3",
    title: "Life on Campus",
    category: "Events",
    image:
      "https://images.pexels.com/photos/8199174/pexels-photo-8199174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Smiling student holding notebooks in university hallway.",
    description: "Experiencing student life and standard university education.",
  },
  {
    id: "h4",
    title: "Research, Together",
    category: "Office",
    image:
      "https://images.pexels.com/photos/8199613/pexels-photo-8199613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Students researching books in a library.",
    description: "Fostering academic curiosity through resources and counseling.",
  },
  {
    id: "h5",
    title: "Every Document, Handled with Care",
    category: "Products",
    image:
      "https://images.pexels.com/photos/7777689/pexels-photo-7777689.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=900",
    alt: "Student reviewing academic documents for undergraduate credit transfer.",
    description: "Ensuring smooth credit evaluation and official credit transfer documentation.",
  },
];

const AUTO_PLAY_INTERVAL = 4000; // 4 seconds (less than 5s)

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setDirection("next");
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, AUTO_PLAY_INTERVAL);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isHovered, currentIndex]);

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index);
  };

  // Define transition variations
  // For a seamless Ken Burns feel, we do cross-fade (opacity) coupled with zoom scaling.
  const slideVariants: Variants = {
    enter: (dir: "next" | "prev") => ({
      opacity: 0,
      scale: 1.08,
    }),
    center: {
      zIndex: 10,
      opacity: 1,
      scale: 1.02,
      transition: {
        opacity: { duration: 0.9, ease: "easeInOut" as const },
        scale: { duration: AUTO_PLAY_INTERVAL / 1000 + 0.5, ease: "easeOut" as const },
      },
    },
    exit: {
      zIndex: 0,
      opacity: 0,
      scale: 1,
      transition: {
        opacity: { duration: 0.9, ease: "easeInOut" as const },
      },
    },
  };

  const activeSlide = slides[currentIndex];

  return (
    <section
      className="relative w-full h-[400px] sm:h-[480px] md:h-[560px] lg:h-[620px] bg-slate-950 overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-60"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Radial overlay gradient for premium feel and text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/40" />

      {/* Static / Fixed Title for Gallery Hero */}
      <div className="absolute top-6 left-6 right-6 z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs font-bold text-white shadow-soft">
          <Camera className="h-3.5 w-3.5 text-accent" />
          <span>Edumentora Gallery</span>
        </div>
      </div>

      {/* Slide Text Content & Overlay */}
      <div className="absolute inset-0 z-20 flex items-end pb-16 sm:pb-20 md:pb-24">
        <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-3 sm:space-y-4"
              >
                <span className="inline-block px-3 py-1 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-accent bg-accent/15 border border-accent/25 rounded-md">
                  {activeSlide.category}
                </span>
                
                <h1 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {activeSlide.title}
                </h1>
                
                <p className="text-sm sm:text-base md:text-lg text-slate-300 font-medium leading-relaxed max-w-xl">
                  {activeSlide.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Manual Navigation Controls (Arrows) */}
      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-30 flex justify-between pointer-events-none">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="pointer-events-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/25 hover:border-white/40 hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="pointer-events-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/25 hover:border-white/40 hover:scale-105 active:scale-95"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* Pagination indicators (Dots) and Progress Line */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-30 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => handleDotClick(i)}
              className="relative group p-1"
            >
              <div 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentIndex === i 
                    ? "w-8 bg-white" 
                    : "w-2.5 bg-white/40 group-hover:bg-white/70"
                }`} 
              />
            </button>
          ))}
        </div>
      </div>

      {/* Thin animated progress bar at the very bottom of the carousel */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/15 z-30">
        <motion.div
          key={`${currentIndex}-${isHovered}`}
          initial={{ width: "0%" }}
          animate={!isHovered ? { width: "100%" } : { width: "0%" }}
          transition={{
            duration: AUTO_PLAY_INTERVAL / 1000,
            ease: "linear",
          }}
          className="h-full bg-accent"
        />
      </div>
    </section>
  );
}
