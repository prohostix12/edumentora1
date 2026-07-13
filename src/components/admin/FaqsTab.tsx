'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader2, ArrowUpDown } from 'lucide-react';

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  order: number;
  enabled: boolean;
}

export default function FaqsTab() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 0,
    enabled: true,
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/faqs');
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
      question: '',
      answer: '',
      order: items.length, // auto-increment sort order
      enabled: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: FaqItem) => {
    setEditingItem(item);
    setFormData({
      question: item.question,
      answer: item.answer,
      order: item.order || 0,
      enabled: item.enabled !== false,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      const res = await fetch(`/api/admin/faqs?id=${id}`, { method: 'DELETE' });
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

      const res = await fetch('/api/admin/faqs', {
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

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between border-b border-border/80 pb-4">
        <div>
          <h3 className="text-lg font-extrabold text-heading" style={{ fontFamily: "var(--font-poppins)" }}>Frequently Asked Questions (FAQs)</h3>
          <p className="text-xs font-semibold text-paragraph/70">Add, edit, or prioritize accordions listed on the FAQ page.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-1.5 h-11 px-5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Add FAQ
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
          <p className="text-xs font-bold text-paragraph uppercase tracking-wide">Loading FAQs...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center p-12 bg-slate-50 border border-dashed border-border rounded-[2.5rem]">
          <p className="text-xs font-bold text-paragraph/70 mb-2 uppercase tracking-wide">No FAQs stored in database.</p>
          <button
            onClick={handleOpenAdd}
            className="text-xs text-primary font-bold hover:underline uppercase tracking-wider"
          >
            Create the first FAQ accordion
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-border/85 rounded-[2.5rem] p-6 hover:border-primary/20 transition-all duration-500 flex items-start gap-4"
            >
              <div className="flex items-center gap-1 text-slate-400 mt-1 cursor-grab" title="Order">
                <ArrowUpDown className="h-4 w-4 shrink-0" />
                <span className="text-xs font-bold">{item.order}</span>
              </div>
              
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="font-extrabold text-heading text-base" style={{ fontFamily: "var(--font-poppins)" }}>{item.question}</h4>
                  <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    item.enabled !== false 
                      ? "bg-emerald-50 text-emerald-700" 
                      : "bg-rose-50 text-rose-700"
                  }`}>
                    {item.enabled !== false ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <p className="text-sm text-paragraph leading-relaxed font-medium">{item.answer}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-xl transition-all duration-300 border border-transparent hover:border-border/80 shadow-none hover:shadow-soft"
                  title="Edit FAQ"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-50 rounded-xl transition-all duration-300 border border-transparent hover:border-border/85 shadow-none hover:shadow-soft"
                  title="Delete FAQ"
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
                {editingItem ? 'Edit FAQ Accordion' : 'Add New FAQ Accordion'}
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
                <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Question</label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                  placeholder="e.g. What is credit transfer?"
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-heading mb-1.5 uppercase tracking-wide">Answer Paragraph</label>
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Provide a clear, detailed answer..."
                  className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-2.5 text-sm text-heading placeholder:text-slate-400 focus:bg-white focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium"
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
                  <p className="text-[10px] font-bold text-paragraph/50 mt-1 uppercase tracking-wider">Lower numbers appear first.</p>
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
                  {editingItem ? 'Save Changes' : 'Create FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
