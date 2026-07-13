'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader2, Star, User } from 'lucide-react';

interface TestimonialItem {
  _id: string;
  name: string;
  role: string;
  feedback: string;
  image?: string;
  rating: number;
  order: number;
  enabled: boolean;
}

export default function TestimonialsTab() {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    feedback: '',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop',
    rating: 5,
    order: 0,
    enabled: true,
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/testimonials');
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
      role: '',
      feedback: '',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop',
      rating: 5,
      order: items.length,
      enabled: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      role: item.role,
      feedback: item.feedback,
      image: item.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop',
      rating: item.rating || 5,
      order: item.order || 0,
      enabled: item.enabled !== false,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' });
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

      const res = await fetch('/api/admin/testimonials', {
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
    const target = e.target;
    const value = target.name === 'order'
      ? parseInt(target.value) || 0
      : target.type === 'checkbox'
        ? (target as HTMLInputElement).checked
        : target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div>
          <h3 className="text-lg font-extrabold text-heading" style={{ fontFamily: "var(--font-poppins)" }}>Student Testimonials</h3>
          <p className="text-xs font-semibold text-paragraph/70">Manage feedback reviews from successful credit transfer candidates.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
          <p className="text-xs font-bold text-paragraph uppercase tracking-wide">Loading testimonials...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center p-12 bg-slate-50 border border-dashed border-border rounded-[2.5rem]">
          <p className="text-xs font-bold text-paragraph/70 mb-2 uppercase tracking-wide">No testimonials stored in database.</p>
          <button
            onClick={handleOpenAdd}
            className="text-xs text-primary font-bold hover:underline uppercase tracking-wider"
          >
            Create the first testimonial entry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-border/85 rounded-[2.5rem] shadow-soft p-6 flex flex-col justify-between hover:border-primary/20 transition-all duration-500"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden bg-slate-50 flex items-center justify-center border border-border/80">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-heading text-sm" style={{ fontFamily: "var(--font-poppins)" }}>{item.name}</h4>
                      <p className="text-xs font-semibold text-paragraph/70">{item.role}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      item.enabled !== false 
                        ? "bg-emerald-50 text-emerald-700" 
                        : "bg-rose-50 text-rose-700"
                    }`}>
                      {item.enabled !== false ? 'Enabled' : 'Disabled'}
                    </span>
                    <span className="text-[10px] text-paragraph/60 font-bold uppercase tracking-wider">Order: {item.order}</span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < item.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm text-paragraph leading-relaxed italic font-medium">
                  &ldquo;{item.feedback}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl transition-all duration-300 border border-transparent hover:border-border/80 shadow-none hover:shadow-soft"
                  title="Edit"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-50 rounded-xl transition-all duration-300 border border-transparent hover:border-border/80 shadow-none hover:shadow-soft"
                  title="Delete"
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
                {editingItem ? 'Edit Testimonial Details' : 'Add New Testimonial'}
              </h4>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-heading p-1.5 hover:bg-slate-50 rounded-xl transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Student Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Course / Role Info</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    placeholder="e.g. B.Tech CSE Student (2024)"
                    className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Feedback Statement</label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Rahul's experience at Edumentora..."
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Photo URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/... or relative path"
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Priority Sort Order</label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    min={0}
                    className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Status</label>
                  <label className="flex items-center gap-2 cursor-pointer mt-2.5">
                    <input
                      type="checkbox"
                      name="enabled"
                      checked={formData.enabled}
                      onChange={handleChange}
                      className="h-4.5 w-4.5 rounded border-border text-primary focus:ring-primary cursor-pointer bg-slate-50"
                    />
                    <span className="text-xs font-bold text-paragraph uppercase tracking-wider">Enabled</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Rating (Stars)</label>
                <div className="flex items-center gap-1.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const ratingValue = i + 1;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleRatingChange(ratingValue)}
                        className="p-0.5 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`h-7 w-7 ${
                            ratingValue <= formData.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
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
