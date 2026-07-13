'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, Loader2, Calendar, Phone, Mail, X, MessageSquare } from 'lucide-react';

interface EnquiryItem {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

// ── Full-message modal ──────────────────────────────────────────────────────
function MessageModal({
  item,
  onClose,
}: {
  item: EnquiryItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg relative overflow-hidden animate-scaleIn border border-border/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Colour bar */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-border/80">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary mb-0.5">Message from</p>
              <h3 className="text-base font-extrabold text-heading leading-tight" style={{ fontFamily: "var(--font-poppins)" }}>{item.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-heading transition-colors border border-border shrink-0 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-6 gap-y-1.5 px-6 py-4 bg-slate-50/50 border-b border-border/80 text-xs font-bold text-paragraph/70">
          <span className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-primary" /> {item.email}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 text-primary" /> {item.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            {new Date(item.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>

        {/* Subject badge */}
        <div className="px-6 pt-5">
          <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
            {item.subject}
          </span>
        </div>

        {/* Full message */}
        <div className="px-6 py-4">
          <p className="text-sm text-paragraph whitespace-pre-line break-words leading-relaxed font-medium">
            {item.message}
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full border border-border text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all duration-300 cursor-pointer uppercase tracking-wider"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main tab ────────────────────────────────────────────────────────────────
export default function EnquiriesTab() {
  const [items, setItems] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<EnquiryItem | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact');
      if (res.ok) setItems(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      const res = await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
      if (res.ok) fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Message modal */}
      {selectedItem && (
        <MessageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-heading" style={{ fontFamily: "var(--font-poppins)" }}>Submitted Enquiries</h3>
            <p className="text-xs font-semibold text-paragraph/70">
              View and manage contact inquiries. Click a message to read it in full.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
            <p className="text-xs font-bold text-paragraph uppercase tracking-wide">Loading enquiries...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center p-12 bg-slate-50 border border-dashed border-border rounded-[2.5rem]">
            <p className="text-xs font-bold text-paragraph/70 uppercase tracking-wide">No enquiries found in database.</p>
          </div>
        ) : (
          <div className="bg-white border border-border/85 rounded-[2.5rem] shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-border/80">
                    <th className="py-4 px-6">Sender Details</th>
                    <th className="py-4 px-6">Subject</th>
                    <th className="py-4 px-6">Message</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/80 text-sm">
                  {items.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/30 transition-all duration-300 align-top">
                      {/* Sender */}
                      <td className="py-5 px-6 space-y-1.5 min-w-[200px]">
                        <div className="font-extrabold text-heading">{item.name}</div>
                        <div className="text-xs text-paragraph/80 font-semibold flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 shrink-0 text-primary" /> {item.email}
                        </div>
                        <div className="text-xs text-paragraph/80 font-semibold flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 shrink-0 text-primary" /> {item.phone}
                        </div>
                      </td>

                      {/* Subject */}
                      <td className="py-5 px-6 min-w-[150px]">
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                          {item.subject}
                        </span>
                      </td>

                      {/* Message — click to open modal */}
                      <td className="py-5 px-6 max-w-xs">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="text-left w-full group cursor-pointer"
                          title="Click to view full message"
                        >
                          <p className="whitespace-pre-line line-clamp-2 leading-relaxed text-paragraph font-medium group-hover:text-primary transition-colors duration-300">
                            {item.message}
                          </p>
                          <span className="mt-1.5 inline-block text-[11px] font-bold text-primary group-hover:text-primary-dark transition-colors duration-300 uppercase tracking-wider">
                            View Message →
                          </span>
                        </button>
                      </td>

                      {/* Date */}
                      <td className="py-5 px-6 text-xs font-bold text-paragraph/70 min-w-[120px]">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                          {new Date(item.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </td>

                      {/* Delete */}
                      <td className="py-5 px-6 text-right min-w-[100px]">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-xl transition-all duration-300 border border-transparent hover:border-border/80 cursor-pointer"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
