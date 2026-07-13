'use client';

import React from 'react';
import { 
  GraduationCap, 
  Building2, 
  Star, 
  HelpCircle, 
  Mail, 
  FileText, 
  ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

interface DashboardCounts {
  programs: number;
  universities: number;
  testimonials: number;
  faqs: number;
  enquiries: number;
}

interface DashboardTabProps {
  counts: DashboardCounts;
  setActiveTab: (tab: string) => void;
}

export default function DashboardTab({ counts, setActiveTab }: DashboardTabProps) {
  const cards = [
    {
      id: 'programs',
      title: 'Programs',
      count: counts.programs,
      label: 'Active Programs',
      icon: GraduationCap,
      color: 'bg-primary/10 text-primary border-primary/20',
    },
    {
      id: 'universities',
      title: 'Partners',
      count: counts.universities,
      label: 'Universities',
      icon: Building2,
      color: 'bg-primary/10 text-primary border-primary/20',
    },
    {
      id: 'testimonials',
      title: 'Testimonials',
      count: counts.testimonials,
      label: 'Student Reviews',
      icon: Star,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      id: 'faqs',
      title: 'FAQs',
      count: counts.faqs,
      label: 'Questions',
      icon: HelpCircle,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      id: 'enquiries',
      title: 'Enquiries',
      count: counts.enquiries,
      label: 'Received Messages',
      icon: Mail,
      color: 'bg-rose-50 text-rose-600 border-rose-100',
    },
    {
      id: 'home',
      title: 'Page Content',
      count: 2, // Home + About
      label: 'Editable Sections',
      icon: FileText,
      color: 'bg-accent/10 text-accent border-accent/20',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-primary to-primary-dark p-8 md:p-10 shadow-lg text-white">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3" style={{ fontFamily: "var(--font-poppins)" }}>
            Welcome to Admin Panel
          </h2>
          <p className="text-white/80 text-sm md:text-base mb-6 leading-relaxed font-medium">
            Manage your Edumentora website content, academic programs, partner universities, and student enquiries in one unified workspace.
          </p>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center justify-center gap-1.5 h-11 px-6 rounded-full text-xs font-bold text-primary bg-white shadow-soft hover:bg-slate-50 transition-all duration-300 hover:-translate-y-0.5"
          >
            View Website
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Grid of Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.id}
              onClick={() => setActiveTab(card.id)}
              className="flex flex-col text-left justify-between p-8 bg-white border border-border/85 hover:border-primary/20 shadow-soft hover:shadow-hover rounded-[2.5rem] transition-all duration-500 group cursor-pointer"
            >
              <div className="flex items-center justify-between w-full mb-8">
                <div className={`flex items-center justify-center h-12 w-12 rounded-2xl border ${card.color} transition-all duration-500 group-hover:scale-105 group-hover:rotate-3`}>
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>
              
              <div>
                <span className="text-4xl font-extrabold text-heading block mb-1" style={{ fontFamily: "var(--font-poppins)" }}>
                  {card.count}
                </span>
                <span className="text-xs font-bold text-paragraph uppercase tracking-wider group-hover:text-heading transition-colors duration-300">
                  {card.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
