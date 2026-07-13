'use client';

import React, { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle } from 'lucide-react';

export default function HomeTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    heroBadge: '',
    heroTitle: '',
    heroDescription: '',
    missionTitle: '',
    missionDescription: '',
    visionTitle: '',
    visionDescription: '',
    achievementsTitle: '',
    achievementsSubtitle: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/admin/home');
        if (res.ok) {
          const data = await res.json();
          setFormData({
            heroBadge: data.heroBadge || 'Empowering students through credit transfer',
            heroTitle: data.heroTitle || 'Complete Your B.Tech/Degree via Credit Transfer',
            heroDescription: data.heroDescription || 'Fast-track your degree with UGC-recognized universities. Transfer your credits securely and save years of study.',
            missionTitle: data.missionTitle || 'Our Mission',
            missionDescription: data.missionDescription || 'To provide accessible pathways for students to achieve their academic goals through credit transfer.',
            visionTitle: data.visionTitle || 'Our Vision',
            visionDescription: data.visionDescription || 'To be the leading credit transfer guidance institute in India, fostering smooth academic transitions.',
            achievementsTitle: data.achievementsTitle || 'Our Great Achievements',
            achievementsSubtitle: data.achievementsSubtitle || 'Over the years, we have helped thousands of students achieve their dreams of higher education.',
          });
        }
      } catch (err) {
        console.error('Failed to load home page content:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch('/api/admin/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
        <p className="text-xs font-bold text-paragraph uppercase tracking-wide">Loading home content...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border/80 shadow-soft rounded-[2.5rem] p-6 md:p-8 space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div>
          <h3 className="text-lg font-extrabold text-heading" style={{ fontFamily: "var(--font-poppins)" }}>Manage Home Page</h3>
          <p className="text-xs font-semibold text-paragraph/70">Edit core titles, headers, and section descriptors.</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-75"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : success ? (
            <>
              <CheckCircle className="h-4 w-4 text-white" />
              Saved!
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {success && (
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-xl p-4 text-xs font-bold border border-emerald-100">
          <CheckCircle className="h-5 w-5 shrink-0" />
          <span>Home page content has been updated successfully! Changes are live on the website.</span>
        </div>
      )}

      {/* Hero Section */}
      <div className="space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-primary/10 pb-2">Hero Section</h4>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-xs font-bold text-heading mb-2 uppercase tracking-wide">Hero Badge Tagline</label>
            <input
              type="text"
              name="heroBadge"
              value={formData.heroBadge}
              onChange={handleChange}
              placeholder="e.g. Empowering students through credit transfer"
              className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-heading mb-2 uppercase tracking-wide">Hero Main Title</label>
            <input
              type="text"
              name="heroTitle"
              value={formData.heroTitle}
              onChange={handleChange}
              placeholder="e.g. Complete Your B.Tech/Degree via Credit Transfer"
              className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-heading mb-2 uppercase tracking-wide">Hero Description</label>
            <textarea
              name="heroDescription"
              value={formData.heroDescription}
              onChange={handleChange}
              rows={3}
              placeholder="Give a short summary..."
              className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium"
            />
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-primary/10 pb-2">Mission & Vision Section</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-heading mb-2 uppercase tracking-wide">Mission Heading</label>
              <input
                type="text"
                name="missionTitle"
                value={formData.missionTitle}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-heading mb-2 uppercase tracking-wide">Mission Description</label>
              <textarea
                name="missionDescription"
                value={formData.missionDescription}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-heading mb-2 uppercase tracking-wide">Vision Heading</label>
              <input
                type="text"
                name="visionTitle"
                value={formData.visionTitle}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-heading mb-2 uppercase tracking-wide">Vision Description</label>
              <textarea
                name="visionDescription"
                value={formData.visionDescription}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="space-y-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-primary/10 pb-2">Achievements Section</h4>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-xs font-bold text-heading mb-2 uppercase tracking-wide">Achievements Heading</label>
            <input
              type="text"
              name="achievementsTitle"
              value={formData.achievementsTitle}
              onChange={handleChange}
              className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-heading mb-2 uppercase tracking-wide">Achievements Description Subtitle</label>
            <textarea
              name="achievementsSubtitle"
              value={formData.achievementsSubtitle}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium"
              />
          </div>
        </div>
      </div>
    </form>
  );
}
