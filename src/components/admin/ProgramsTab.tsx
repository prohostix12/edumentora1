'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ProgramItem {
  _id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt?: string;
  accent?: string;
  ring?: string;
  button?: string;
}

export default function ProgramsTab() {
  const [items, setItems] = useState<ProgramItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProgramItem | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    href: '',
    image: '',
    imageAlt: '',
    accent: 'from-primary/15 to-primary/5',
    ring: 'ring-primary/15',
    button: 'from-primary to-primary-dark',
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/programs');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      description: '',
      href: '',
      image: '',
      imageAlt: '',
      accent: 'from-primary/10 to-primary/0',
      ring: 'ring-primary/10',
      button: 'from-primary to-primary-dark',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: ProgramItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      href: item.href,
      image: item.image,
      imageAlt: item.imageAlt || '',
      accent: item.accent || 'from-primary/10 to-primary/0',
      ring: item.ring || 'ring-primary/10',
      button: item.button || 'from-primary to-primary-dark',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;
    try {
      const res = await fetch(`/api/admin/programs?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchItems();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem ? { ...formData, _id: editingItem._id } : formData;

      const res = await fetch('/api/admin/programs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchItems();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div>
          <h3 className="text-lg font-extrabold text-heading" style={{ fontFamily: "var(--font-poppins)" }}>Academic Programs & Services</h3>
          <p className="text-xs font-semibold text-paragraph/70">Add, edit, or remove programs shown on the homepage.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Add Program
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
          <p className="text-xs font-bold text-paragraph uppercase tracking-wide">Loading programs...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center p-12 bg-slate-50 border border-dashed border-border rounded-[2.5rem]">
          <p className="text-xs font-bold text-paragraph/70 mb-2 uppercase tracking-wide">No programs stored in database.</p>
          <button
            onClick={handleOpenAdd}
            className="text-xs text-primary font-bold hover:underline uppercase tracking-wider"
          >
            Create the first program entry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-border/85 rounded-[2.5rem] shadow-soft overflow-hidden flex flex-col justify-between group hover:border-primary/20 transition-all duration-500"
            >
              <div className="p-6 space-y-4">
                <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center border border-border/70">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-750"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-slate-300" />
                  )}
                </div>

                <div>
                  <h4 className="font-extrabold text-heading text-base mb-1" style={{ fontFamily: "var(--font-poppins)" }}>{item.title}</h4>
                  <p className="text-sm text-paragraph leading-relaxed line-clamp-3 font-medium">{item.description}</p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-slate-50 flex items-center justify-end gap-3 bg-slate-50/50">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2.5 text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all duration-300 border border-transparent hover:border-border/80 shadow-none hover:shadow-soft"
                  title="Edit Program"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all duration-300 border border-transparent hover:border-border/80 shadow-none hover:shadow-soft"
                  title="Delete Program"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] border border-border/80 w-full max-w-lg shadow-xl overflow-hidden animate-slideUp">
            <div className="flex items-center justify-between border-b border-border/80 p-6">
              <h4 className="font-extrabold text-lg text-heading" style={{ fontFamily: "var(--font-poppins)" }}>
                {editingItem ? 'Edit Program Details' : 'Add New Program'}
              </h4>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-heading p-1.5 hover:bg-slate-50 rounded-xl transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Program Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Credit Transfer Program"
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="A short summary of the program..."
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Link Path (Href)</label>
                  <input
                    type="text"
                    name="href"
                    value={formData.href}
                    onChange={handleChange}
                    required
                    placeholder="e.g. /credit-transfer"
                    className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Image Alt Text</label>
                  <input
                    type="text"
                    name="imageAlt"
                    value={formData.imageAlt}
                    onChange={handleChange}
                    placeholder="e.g. Student reviewing documents"
                    className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  placeholder="https://images.unsplash.com/... or relative path"
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/80">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-full border border-border px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-1.5 h-11 px-6 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-75"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingItem ? 'Save Changes' : 'Create Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
