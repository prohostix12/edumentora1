"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ChevronRight,
  Eye,
  Share2,
  Check,
  ImageIcon,
  Sparkles,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Category = "Events" | "Office" | "Awards" | "Products";
const filters: Array<"All" | Category> = ["All", "Events", "Office", "Awards", "Products"];

type HeroSlide = {
  id: string;
  title: string;
  category: Category;
  image: string;
  alt: string;
};

type MosaicItem = {
  id: string;
  title: string;
  category: Category;
  image: string;
  alt: string;
  span: "big" | "tall" | "normal";
};

const mosaicItems: MosaicItem[] = [
  {
    id: "m1",
    title: "Graduation Day Joy",
    category: "Awards",
    image:
      "https://images.pexels.com/photos/17615695/pexels-photo-17615695.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Smiling graduates posing together outdoors after graduation.",
    span: "big",
  },
  {
    id: "m2",
    title: "Engineering Excellence",
    category: "Awards",
    image:
      "https://images.pexels.com/photos/5538007/pexels-photo-5538007.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Smiling engineering student holding books on campus.",
    span: "tall",
  },
  {
    id: "m3",
    title: "One-on-One Guidance",
    category: "Office",
    image:
      "https://images.pexels.com/photos/20030981/pexels-photo-20030981.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Student receiving academic guidance in a counseling conversation.",
    span: "normal",
  },
  {
    id: "m4",
    title: "Hands-On Workshops",
    category: "Events",
    image:
      "https://images.pexels.com/photos/18999469/pexels-photo-18999469.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Professionals collaborating during a training workshop.",
    span: "normal",
  },
  {
    id: "m5",
    title: "Late Nights, Big Dreams",
    category: "Products",
    image:
      "https://images.pexels.com/photos/6283227/pexels-photo-6283227.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Student studying on laptop in a library.",
    span: "tall",
  },
  {
    id: "m6",
    title: "Inside the Lecture Hall",
    category: "Events",
    image:
      "https://images.pexels.com/photos/31367512/pexels-photo-31367512.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Students attending a bright university lecture hall session.",
    span: "big",
  },
  {
    id: "m7",
    title: "Diplomas & Distinction",
    category: "Awards",
    image:
      "https://images.pexels.com/photos/7942522/pexels-photo-7942522.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Graduates celebrating their achievement at a graduation ceremony.",
    span: "normal",
  },
  {
    id: "m8",
    title: "Heads Down, Focused",
    category: "Events",
    image:
      "https://images.pexels.com/photos/8199165/pexels-photo-8199165.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "College students studying with laptops and books in class.",
    span: "normal",
  },
  {
    id: "m9",
    title: "Certification Ceremony",
    category: "Awards",
    image:
      "https://images.pexels.com/photos/7942524/pexels-photo-7942524.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Apprenticeship graduation certification ceremony at Edumentora.",
    span: "normal",
  },
  {
    id: "m10",
    title: "Flexible Online Learning",
    category: "Products",
    image:
      "https://images.pexels.com/photos/19613149/pexels-photo-19613149.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
    alt: "Student studying with a laptop and book at home.",
    span: "tall",
  },
  {
    id: "m11",
    title: "Recognising Top Talent",
    category: "Awards",
    image:
      "https://images.pexels.com/photos/7942541/pexels-photo-7942541.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Mentor awarding a top-performing apprentice for excellence.",
    span: "normal",
  },
  {
    id: "m12",
    title: "Credit Transfer, Simplified",
    category: "Products",
    image:
      "https://images.pexels.com/photos/8112119/pexels-photo-8112119.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Student holding credit transfer documents.",
    span: "normal",
  },
  {
    id: "m13",
    title: "Our Support Team",
    category: "Office",
    image:
      "https://images.pexels.com/photos/8866802/pexels-photo-8866802.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Edumentora support team assisting students.",
    span: "normal",
  },
  {
    id: "m14",
    title: "Academic Counseling Events",
    category: "Office",
    image:
      "https://images.pexels.com/photos/7176132/pexels-photo-7176132.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    alt: "Counselor discussing educational pathways with students.",
    span: "normal",
  },
];

function spanClasses(span: MosaicItem["span"]) {
  switch (span) {
    case "big":
      return "col-span-2 row-span-2";
    case "tall":
      return "row-span-2";
    default:
      return "";
  }
}



function MosaicTile({ item, filteredIndex }: { item: MosaicItem; filteredIndex: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 24 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 24 });
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 6);
    rotateX.set((0.5 - py) * 6);
    el.style.setProperty("--x", `${px * 100}%`);
    el.style.setProperty("--y", `${py * 100}%`);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleShare = (event: React.MouseEvent) => {
    event.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.image).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, ease: EASE, delay: filteredIndex * 0.04 }}
      className={`group relative ${spanClasses(item.span)}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
        className="relative h-full w-full overflow-hidden rounded-2xl border-2 border-white shadow-soft transition-shadow duration-300 group-hover:shadow-hover"
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          onLoad={() => setLoaded(true)}
          className={`object-cover transition-all duration-500 ${
            loaded ? "scale-100 opacity-100 blur-none" : "scale-105 opacity-0 blur-md"
          }`}
        />

        {/* Reflection highlight following cursor */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.35), transparent 55%)",
          }}
        />

        {/* Icon cluster */}
        <div className="absolute right-3 top-3 flex translate-y-1 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <a
            href={item.image}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${item.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/25 text-white backdrop-blur-md transition-colors hover:bg-white/45"
          >
            <Eye className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={handleShare}
            aria-label={`Share ${item.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/25 text-white backdrop-blur-md transition-colors hover:bg-white/45"
          >
            {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          </button>
        </div>

        {/* Caption bar */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-secondary/85 via-secondary/25 to-transparent p-4">
          <span className="mb-1.5 inline-flex rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
            {item.category}
          </span>
          <h3
            className="line-clamp-2 text-sm font-bold leading-snug"
            style={{ fontFamily: "var(--font-poppins)", color: "#fff" }}
          >
            {item.title}
          </h3>
        </div>
      </motion.div>
    </motion.article>
  );
}

function ViewAlbumCTA() {
  return (
    <motion.a
      href="#"
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(29,78,216,0.35)",
          "0 0 0 12px rgba(29,78,216,0)",
          "0 0 0 0 rgba(29,78,216,0)",
        ],
      }}
      transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 6.4, ease: "easeOut" }}
      className="inline-flex items-center gap-2 rounded-full gradient-bg px-5 py-2.5 text-sm font-semibold text-white"
    >
      <ImageIcon className="h-4 w-4" />
      View Album
    </motion.a>
  );
}

export default function GalleryShowcase() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  const filteredItems = useMemo(
    () =>
      activeFilter === "All"
        ? mosaicItems
        : mosaicItems.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  return (
    <section className="bg-white">
      {/* Sticky subheader */}
      <div className="sticky top-16 z-30 border-b border-border/70 bg-white/85 backdrop-blur-xl md:top-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-paragraph/70">
              <span>Home</span>
              <ChevronRight className="h-3 w-3" />
              <span className="font-semibold text-primary">Gallery</span>
            </div>
            <h2
              className="text-xl font-bold text-heading sm:text-2xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Gallery
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-primary text-white shadow-soft"
                    : "bg-bg-section text-paragraph ring-1 ring-border/70 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* Mosaic grid */}
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 md:pb-28">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" />
            {filteredItems.length} Curated Moments
          </div>
          <ViewAlbumCTA />
        </div>

        <motion.div
          layout
          className="grid grid-flow-dense grid-cols-2 auto-rows-[150px] gap-4 sm:grid-cols-3 sm:auto-rows-[170px] md:gap-5 lg:grid-cols-4 lg:auto-rows-[180px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <MosaicTile key={item.id} item={item} filteredIndex={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
