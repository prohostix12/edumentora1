'use client';

import React, { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle } from 'lucide-react';

export default function AboutTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    introText: '',
    fullContent: '',
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/admin/about');
        if (res.ok) {
          const data = await res.json();
          setFormData({
            title: data.title || 'Best Credit Transfer Institute in Kerala for B.Tech Students',
            introText: data.introText || 'Edumentora is dedicated to guiding students through B.Tech credit transfers, ensuring standard guidelines are met seamlessly.',
            fullContent: data.fullContent || 'We provide comprehensive support, evaluation of syllabus compatibility, and handhold you until successful admission and degree completion.',
          });
        }
      } catch (err) {
        console.error('Failed to load about section content:', err);
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
      const res = await fetch('/api/admin/about', {
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
        <p className="text-xs font-bold text-paragraph uppercase tracking-wide">Loading about content...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border/80 shadow-soft rounded-[2.5rem] p-6 md:p-8 space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div>
          <h3 className="text-lg font-extrabold text-heading" style={{ fontFamily: "var(--font-poppins)" }}>Manage About Content</h3>
          <p className="text-xs font-semibold text-paragraph/70">Edit the about introduction, paragraphs, and detail descriptors.</p>
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
          <span>About section content has been updated successfully! Changes are live on the website.</span>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-heading mb-2 uppercase tracking-wide">Section Header Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Best Credit Transfer Institute..."
            className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-heading mb-2 uppercase tracking-wide">Introductory Paragraph (Summary)</label>
          <textarea
            name="introText"
            value={formData.introText}
            onChange={handleChange}
            rows={3}
            placeholder="Introduce the about content in brief..."
            className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-heading mb-2 uppercase tracking-wide">Detailed Content</label>
          <textarea
            name="fullContent"
            value={formData.fullContent}
            onChange={handleChange}
            rows={6}
            placeholder="Provide all background content, support details, and program context..."
            className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium"
          />
        </div>
      </div>
    </form>
  );
}
