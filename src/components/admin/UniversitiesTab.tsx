'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader2, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface UniversityItem {
  _id: string;
  name: string;
  logo: string;
  website: string;
  description?: string;
  imageUrl?: string;
}

export default function UniversitiesTab() {
  const [items, setItems] = useState<UniversityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<UniversityItem | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    website: '',
    description: '',
    imageUrl: '',
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/universities');
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
      name: '',
      logo: '',
      website: '',
      description: '',
      imageUrl: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: UniversityItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      logo: item.logo,
      website: item.website,
      description: item.description || '',
      imageUrl: item.imageUrl || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partner university?')) return;
    try {
      const res = await fetch(`/api/admin/universities?id=${id}`, { method: 'DELETE' });
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

      const res = await fetch('/api/admin/universities', {
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
          <h3 className="text-lg font-extrabold text-heading" style={{ fontFamily: "var(--font-poppins)" }}>Partner Universities</h3>
          <p className="text-xs font-semibold text-paragraph/70">Add, edit, or delete partner academic institutions.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Add University
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
          <p className="text-xs font-bold text-paragraph uppercase tracking-wide">Loading universities...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center p-12 bg-slate-50 border border-dashed border-border rounded-[2.5rem]">
          <p className="text-xs font-bold text-paragraph/70 mb-2 uppercase tracking-wide">No universities stored in database.</p>
          <button
            onClick={handleOpenAdd}
            className="text-xs text-primary font-bold hover:underline uppercase tracking-wider"
          >
            Create the first university entry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-border/85 rounded-[2.5rem] shadow-soft overflow-hidden flex flex-col justify-between group hover:border-primary/20 transition-all duration-500"
            >
              {item.imageUrl && (
                <div className="h-28 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.imageUrl}
                    alt=""
                    aria-hidden="true"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 border border-border/80 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="max-h-full max-w-full p-2 object-contain"
                    />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-slate-300" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="font-extrabold text-heading text-base truncate mb-0.5" style={{ fontFamily: "var(--font-poppins)" }}>{item.name}</h4>
                  {item.website && (
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary flex items-center gap-1 hover:underline font-bold"
                    >
                      <LinkIcon className="h-3 w-3" />
                      Visit Website
                    </a>
                  )}
                  {item.description && (
                    <p className="text-xs text-paragraph leading-normal line-clamp-1 mt-1 font-medium">{item.description}</p>
                  )}
                </div>
              </div>

              <div className="px-6 pb-4 pt-3 border-t border-slate-50 flex items-center justify-end gap-3 bg-slate-50/50">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 text-slate-400 hover:text-primary hover:bg-white rounded-xl transition-all duration-300 border border-transparent hover:border-border/85 shadow-none hover:shadow-soft"
                  title="Edit University"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all duration-300 border border-transparent hover:border-border/85 shadow-none hover:shadow-soft"
                  title="Delete University"
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
                {editingItem ? 'Edit University Details' : 'Add New Partner University'}
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
                <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">University Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Glocal University"
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Logo URL or Path</label>
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  required
                  placeholder="e.g. /logos/glocal.png or https://..."
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Official Website URL</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="e.g. https://www.glocaluniversity.edu.in"
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/university-image.jpg"
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
                <p className="mt-1 text-[11px] text-paragraph/60 font-medium">Used as the background image for this university&apos;s card on the site.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Short Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Brief context or status (e.g. UGC Approved, A-Grade)..."
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium"
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
                  {editingItem ? 'Save Changes' : 'Create Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
