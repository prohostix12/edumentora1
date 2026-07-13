"use client";

import Link from "next/link";
import { BookOpen, MapPin, Phone, Mail, Globe } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/btech-credit-transfer", label: "B.Tech Credit Transfer" },
  { href: "/about", label: "About Us" },
  { href: "/programs", label: "Programs" },
  { href: "/universities", label: "Universities" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const programs = [
  "Credit Transfer",
  "University Admissions",
  "Career Counseling",
  "Study Abroad",
  "Distance Education",
  "Professional Courses",
];

export default function Footer() {
  return (
    <footer className="bg-[#0B1440] text-slate-300 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 pr-0 lg:pr-8">
            <Link href="/" className="flex items-center gap-2.5 mb-6 group w-fit">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark shadow-lg shadow-accent/20 transition-transform duration-300 group-hover:scale-105">
                <BookOpen className="h-4.5 w-4.5 text-white" />
              </div>
              <span
                className="text-lg font-extrabold tracking-tight"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                <span className="text-accent">edu</span>
                <span className="text-blue-100">Mentora</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your trusted partner in education, offering expert guidance and innovative learning resources to empower students and professionals for academic and career success.
            </p>
            <div className="flex items-center gap-3">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((label, i) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:border-primary/40 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Globe className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:pl-4">
            <h4
              className="text-sm font-bold text-white tracking-wide uppercase mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-2 lg:pl-2">
            <h4
              className="text-sm font-bold text-white tracking-wide uppercase mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Programs
            </h4>
            <ul className="space-y-3.5">
              {programs.map((program) => (
                <li key={program}>
                  <span className="text-sm text-slate-400 hover:text-slate-300 transition-colors cursor-default">
                    {program}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h4
              className="text-sm font-bold text-white tracking-wide uppercase mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Contact Us
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">Calicut Office</p>
                  <p className="text-sm text-slate-400 leading-normal">
                    YMCA Cross Road, Kozhikode, Kerala – 673001
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-0.5">Kochi Office</p>
                  <p className="text-sm text-slate-400 leading-normal">
                    6th Floor, National Pearl Star building, Near Changampuzha park Metro Station, Edappally, Kochi, Kerala 682024
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <a
                  href="tel:+919744587777"
                  className="text-sm text-slate-400 hover:text-primary transition-colors"
                >
                  +91 974458 7777
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <a
                  href="mailto:info@edumentora.com"
                  className="text-sm text-slate-400 hover:text-primary transition-colors"
                >
                  info@edumentora.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-slate-900/60 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-medium">
            © {new Date().getFullYear()} Edumentora. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
