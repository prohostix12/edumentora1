'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Home, 
  Info, 
  GraduationCap, 
  Building2, 
  Star, 
  HelpCircle, 
  Mail, 
  LogOut, 
  Globe, 
  ArrowLeft,
  Loader2,
  Menu,
  X
} from 'lucide-react';

// Subcomponents
import DashboardTab from '@/components/admin/DashboardTab';
import HomeTab from '@/components/admin/HomeTab';
import AboutTab from '@/components/admin/AboutTab';
import ProgramsTab from '@/components/admin/ProgramsTab';
import UniversitiesTab from '@/components/admin/UniversitiesTab';
import TestimonialsTab from '@/components/admin/TestimonialsTab';
import FaqsTab from '@/components/admin/FaqsTab';
import EnquiriesTab from '@/components/admin/EnquiriesTab';

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [counts, setCounts] = useState({
    programs: 0,
    universities: 0,
    testimonials: 0,
    faqs: 0,
    enquiries: 0
  });
  const [countsLoading, setCountsLoading] = useState(true);

  // Fetch counts for dashboard view
  const fetchCounts = async () => {
    try {
      const [programs, unis, testimonials, faqs, enquiries] = await Promise.all([
        fetch('/api/admin/programs').then(r => r.ok ? r.json() : []),
        fetch('/api/admin/universities').then(r => r.ok ? r.json() : []),
        fetch('/api/admin/testimonials').then(r => r.ok ? r.json() : []),
        fetch('/api/admin/faqs').then(r => r.ok ? r.json() : []),
        fetch('/api/contact').then(r => r.ok ? r.json() : [])
      ]);

      setCounts({
        programs: programs.length,
        universities: unis.length,
        testimonials: testimonials.length,
        faqs: faqs.length,
        enquiries: enquiries.length
      });
    } catch (err) {
      console.error("Failed to load dashboard counts", err);
    } finally {
      setCountsLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, [activeTab]); // Refetch counts when switching tabs

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to sign out?')) return;
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        router.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Menu Definition
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'home', label: 'Home Content', icon: Home },
    { id: 'about', label: 'About Section', icon: Info },
    { id: 'programs', label: 'Programs', icon: GraduationCap },
    { id: 'universities', label: 'Partners', icon: Building2 },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'enquiries', label: 'Enquiries', icon: Mail },
  ];

  const getPageTitle = () => {
    const item = menuItems.find(m => m.id === activeTab);
    return item ? item.label : 'Admin Panel';
  };

  return (
    <div className="min-h-screen bg-bg-section flex text-heading">
      {/* 1. Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col justify-between w-64 bg-slate-950 text-white shrink-0 border-r border-white/5">
        <div>
          {/* Logo / Header */}
          <div className="flex items-center gap-3 p-6 border-b border-white/5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark shadow-md shadow-accent/20 text-white">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-wide uppercase text-white" style={{ fontFamily: "var(--font-poppins)" }}>Edumentora</h1>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ADMIN PORTAL</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 text-left uppercase tracking-wider ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Area */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => router.push('/')}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all text-left uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            Back to Website
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden animate-fadeIn">
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <aside className="relative flex flex-col justify-between w-64 bg-slate-950 text-white h-full animate-slideRight">
            <div>
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-dark text-white">
                    <Globe className="h-4 w-4" />
                  </div>
                  <h1 className="font-extrabold text-sm tracking-wide text-white" style={{ fontFamily: "var(--font-poppins)" }}>Edumentora</h1>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="p-4 space-y-1.5">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left uppercase tracking-wider ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 border-t border-white/5">
              <button
                onClick={() => {
                  router.push('/');
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all text-left uppercase tracking-wider"
              >
                <ArrowLeft className="h-4 w-4 shrink-0" />
                Back to Website
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-border/80 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 text-paragraph hover:bg-slate-50 rounded-xl border border-border"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-extrabold text-heading" style={{ fontFamily: "var(--font-poppins)" }}>{getPageTitle()}</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* User Profile */}
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-extrabold text-heading">admin@edumentora.com</span>
              <span className="text-[10px] font-bold text-paragraph/70 uppercase tracking-wider">Administrator</span>
            </div>

            {/* Avatar Badge */}
            <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/20 text-primary font-extrabold text-sm flex items-center justify-center shadow-inner">
              A
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2.5 text-red-500 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-100 rounded-xl transition-all"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Content Pane */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            countsLoading ? (
              <div className="flex flex-col items-center justify-center p-24">
                <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                <p className="text-xs font-bold text-paragraph uppercase tracking-wide">Retrieving stats...</p>
              </div>
            ) : (
              <DashboardTab counts={counts} setActiveTab={setActiveTab} />
            )
          )}
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'about' && <AboutTab />}
          {activeTab === 'programs' && <ProgramsTab />}
          {activeTab === 'universities' && <UniversitiesTab />}
          {activeTab === 'testimonials' && <TestimonialsTab />}
          {activeTab === 'faqs' && <FaqsTab />}
          {activeTab === 'enquiries' && <EnquiriesTab />}
        </main>
      </div>
    </div>
  );
}
