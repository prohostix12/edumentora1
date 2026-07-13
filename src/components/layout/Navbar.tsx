"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AdminLoginModal from "@/components/layout/AdminLoginModal";
import { Menu, X, BookOpen, ChevronDown, Phone, User } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  dropdown?: { href: string; label: string }[];
}

const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/btech-credit-transfer", label: "B.Tech Credit Transfer" },
  {
    href: "/programs",
    label: "Programs",
    dropdown: [
      { href: "/credit-transfer", label: "Credit Transfer Program" },
      { href: "/apprenticeship-program", label: "Apprenticeship Program" },
      { href: "/work-integrated-learning-program", label: "Work Integrated Learning Program" },
    ],
  },
  { href: "/universities", label: "Universities" },
  {
    href: "/about",
    label: "About",
    dropdown: [
      { href: "/about", label: "About Us" },
      { href: "/gallery", label: "Gallery" },
      { href: "/blogs", label: "Blogs" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

function DesktopDropdown({ item, scrolled }: { item: NavItem; scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  const isChildActive = item.dropdown?.some((sub) => pathname === sub.href);

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={item.href}
        className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
          isChildActive
            ? "text-primary bg-primary/5"
            : "text-heading hover:text-primary hover:bg-primary/5"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            open ? "rotate-180 text-primary" : "text-paragraph/60"
          }`}
        />
      </Link>
      <AnimatePresence>
        {open && item.dropdown && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 rounded-2xl bg-white/95 backdrop-blur-md shadow-card border border-border p-2.5 z-50 origin-top"
          >
            {item.dropdown.map((sub) => {
              const isActive = pathname === sub.href;
              return (
                <Link
                  key={sub.label}
                  href={sub.href}
                  className={`block px-4 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-primary/5"
                      : "text-paragraph hover:text-primary hover:bg-slate-50"
                  }`}
                >
                  {sub.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 top-4 mx-auto max-w-6xl w-[92%] rounded-full border border-border/80 bg-white/80 backdrop-blur-xl shadow-card`}
      >
        <div className={`mx-auto px-6 lg:px-8 transition-all duration-500 ${scrolled ? "h-16" : "h-16"}`}>
          <div className="flex h-full items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark shadow-lg shadow-accent/25 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                <BookOpen className="h-4.5 w-4.5 text-white" />
              </div>
              <span
                className="text-lg font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                <span className="text-accent">edu</span>
                <span className="text-primary">Mentora</span>
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href && link.href === "/";
                const isCurrent = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");

                return link.dropdown ? (
                  <DesktopDropdown key={link.label} item={link} scrolled={scrolled} />
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                      isActive || isCurrent
                        ? "text-primary bg-primary/5"
                        : "text-heading hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Call Now and Admin CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setLoginOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-full text-xs font-bold text-paragraph hover:text-primary border border-border/80 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5 active:translate-y-0"
              >
                <User className="h-3.5 w-3.5 text-primary" />
                Portal Sign-In
              </button>
              <a
                href="tel:+919744587777"
                className="inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <Phone className="h-3.5 w-3.5" />
                Call Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100/50 active:bg-slate-100 transition-colors border border-transparent hover:border-border/60"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-heading" />
              ) : (
                <Menu className="h-5 w-5 text-heading" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-24 left-4 right-4 rounded-[2rem] bg-white border border-border/80 shadow-hover p-6 max-h-[75vh] overflow-y-auto"
            >
              <nav className="flex flex-col gap-1.5">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <div key={link.label}>
                      <button
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === link.label ? null : link.label
                          )
                        }
                        className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold text-heading hover:text-primary hover:bg-slate-50 rounded-xl transition-all"
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            mobileExpanded === link.label ? "rotate-180" : "text-paragraph/60"
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileExpanded === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 border-l border-border/70 pl-3 py-1 flex flex-col gap-1">
                              {link.dropdown.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="px-4 py-2 text-xs font-semibold text-paragraph hover:text-primary hover:bg-slate-50 rounded-xl transition-all"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-sm font-bold text-heading hover:text-primary hover:bg-slate-50 rounded-xl transition-all"
                    >
                      {link.label}
                    </Link>
                  )
                )}
                
                <div className="h-px bg-border/80 my-3" />

                <div className="grid grid-cols-2 gap-3 mt-1">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setLoginOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 h-12 rounded-xl text-xs font-bold text-paragraph bg-slate-50 border border-border/80 transition-all hover:bg-slate-100"
                  >
                    <User className="h-4 w-4 text-primary" />
                    Sign-In
                  </button>
                  <a
                    href="tel:+919744587777"
                    className="inline-flex items-center justify-center gap-1.5 h-12 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark transition-all shadow-md shadow-primary/10"
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {loginOpen && <AdminLoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />}
    </>
  );
}
