"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function Hero() {
  const [content, setContent] = useState({
    heroBadge: "Kerala's Premier Credit Transfer Institute",
    heroTitle: "Empowering Students Through Credit Transfer",
    heroDescription:
      "Resume your education with the Best Academic Credit Transfer institution in Kerala. Recognizing credits and saving time and cost to achieve your academic goals.",
  });

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch("/api/admin/home", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setContent({
            heroBadge:
              data.heroBadge || "Kerala's Premier Credit Transfer Institute",
            heroTitle:
              data.heroTitle ||
              "Empowering Students Through Credit Transfer",
            heroDescription:
              data.heroDescription ||
              "Resume your education with the Best Academic Credit Transfer institution in Kerala. Recognizing credits and saving time and cost to achieve your academic goals.",
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchContent();
  }, []);

  // Split title for highlight logic — highlight "Credit Transfer" or last two words
  const renderTitle = (title: string) => {
    if (title.includes("Credit Transfer")) {
      const parts = title.split("Credit Transfer");
      return (
        <>
          {parts[0]}
          <span className="hero-gradient-text">Credit Transfer</span>
          {parts[1]}
        </>
      );
    }
    // Fallback: highlight last word
    const words = title.split(" ");
    const lastWord = words.pop();
    return (
      <>
        {words.join(" ")}{" "}
        <span className="hero-gradient-text">{lastWord}</span>
      </>
    );
  };

  return (
    <>
      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url('/images/hero_bg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            rgba(0, 0, 0, 0.72) 0%,
            rgba(10, 10, 40, 0.78) 50%,
            rgba(0, 0, 0, 0.75) 100%
          );
          z-index: 1;
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 24px;
        }

        .hero-inner {
          max-width: 900px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* Glass badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          margin-bottom: 28px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
        }

        .hero-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #E53935;
          box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.35);
          flex-shrink: 0;
          animation: heroPulse 2s ease-in-out infinite;
        }

        @keyframes heroPulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.35); }
          50% { box-shadow: 0 0 0 6px rgba(229, 57, 53, 0.15); }
        }

        /* Heading */
        .hero-heading {
          font-size: clamp(2.125rem, 5.5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          color: #ffffff;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        @media (min-width: 768px) {
          .hero-heading {
            font-size: clamp(3rem, 5vw, 4rem);
          }
        }

        .hero-gradient-text {
          background: linear-gradient(135deg, #3E63C4 0%, #7FA6E0 45%, #E53935 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Description */
        .hero-description {
          font-size: 1.15rem;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.85);
          max-width: 700px;
          margin-bottom: 40px;
        }

        @media (max-width: 640px) {
          .hero-description {
            font-size: 1rem;
          }
        }

        /* Buttons */
        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
          align-items: center;
        }

        @media (max-width: 480px) {
          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 16px 36px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #1746B5 0%, #081F5C 100%);
          color: #fff;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          text-decoration: none;
          box-shadow: 0 8px 32px rgba(16, 45, 140, 0.5), 0 2px 8px rgba(0,0,0,0.3);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          border: none;
          cursor: pointer;
        }

        .hero-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 40px rgba(16, 45, 140, 0.6), 0 4px 16px rgba(0,0,0,0.3);
        }

        @media (max-width: 480px) {
          .hero-btn-primary {
            width: 100%;
            justify-content: center;
          }
        }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 34px;
          border-radius: 9999px;
          background: transparent;
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          border: 2px solid rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(4px);
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
          cursor: pointer;
        }

        .hero-btn-secondary:hover {
          background: rgba(255, 255, 255, 1);
          color: #071330;
          border-color: #fff;
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          .hero-btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }

        /* Scroll indicator */
        .hero-scroll-indicator {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.65);
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .hero-scroll-mouse {
          width: 24px;
          height: 38px;
          border: 2px solid rgba(255,255,255,0.5);
          border-radius: 12px;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 6px;
        }

        .hero-scroll-dot {
          width: 4px;
          height: 8px;
          border-radius: 2px;
          background: rgba(255,255,255,0.75);
        }
      `}</style>

      <section className="hero-section" aria-label="Hero">
        {/* Dark overlay */}
        <div className="hero-overlay" aria-hidden="true" />

        {/* Floating animated content container */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="hero-content-wrapper"
        >
          <div className="hero-inner">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hero-badge"
              role="status"
              aria-label="Badge"
            >
              <GraduationCap size={15} aria-hidden="true" />
              <span className="hero-badge-dot" aria-hidden="true" />
              {content.heroBadge}
            </motion.div>

            {/* Heading — Line 1 */}
            <div aria-label="Hero heading">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="hero-heading"
              >
                {renderTitle(content.heroTitle)}
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="hero-description"
            >
              {content.heroDescription}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
              className="hero-buttons"
            >
              <Link
                href="/contact"
                id="hero-cta-primary"
                className="hero-btn-primary"
                aria-label="Get Started Now"
              >
                Get Started Now
                <ArrowRight size={18} aria-hidden="true" />
              </Link>

              <Link
                href="/about"
                id="hero-cta-secondary"
                className="hero-btn-secondary"
                aria-label="Learn More"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="hero-scroll-mouse">
              <div className="hero-scroll-dot" />
            </div>
          </motion.div>
          <span>Scroll</span>
        </motion.div>
      </section>
    </>
  );
}
