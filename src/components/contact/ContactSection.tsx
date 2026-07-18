"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/common/SectionTitle";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Calicut Office",
    details: ["YMCA Cross Road, Kozhikode", "Kerala – 673001"],
  },
  {
    icon: MapPin,
    title: "Kochi Office",
    details: [
      "6th Floor, National Pearl Star building",
      "Near Changampuzha park Metro Station",
      "Edappally, Kochi, Kerala 682024",
    ],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 974458 7777"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@edumentora.com", "admissions@edumentora.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Monday - Saturday: 9:00 AM - 6:00 PM", "Sunday: Closed"],
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Credit Transfer",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: null, message: "" });

    // Client-side validation
    if (!formData.name.trim()) {
      setStatus({ type: "error", message: "Name is required." });
      setSubmitting(false);
      return;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ type: "error", message: "A valid email address is required." });
      setSubmitting(false);
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().replace(/\D/g, "").length < 10) {
      setStatus({ type: "error", message: "A valid phone number (at least 10 digits) is required." });
      setSubmitting(false);
      return;
    }
    if (!formData.message.trim()) {
      setStatus({ type: "error", message: "Message cannot be empty." });
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus({
          type: "success",
          message: "Thank you! Your enquiry has been submitted successfully. Our counselor will get in touch with you shortly."
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "Credit Transfer",
          message: ""
        });
      } else {
        const errData = await res.json();
        setStatus({
          type: "error",
          message: errData.error || "Something went wrong. Please try again."
        });
      }
    } catch (err) {
      setStatus({ type: "error", message: "Failed to connect to the server. Please check your network." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative gradient background blur */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <SectionTitle
            label="Contact Us"
            title="Start Your Journey with Edumentora"
            description="Get in touch with our team for expert guidance on credit transfer, university admissions, and career counseling."
          />
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group relative flex items-start gap-4 rounded-[2.5rem] bg-white border border-border/80 shadow-soft hover:shadow-hover hover:-translate-y-1 hover:border-primary/20 transition-all duration-500 p-6 overflow-hidden"
              >
                {/* Decorative glow */}
                <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-primary/5 blur-xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-dark group-hover:border-primary/20 transition-all duration-500">
                  <info.icon className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h4
                    className="text-sm font-extrabold text-heading mb-1.5"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {info.title}
                  </h4>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-sm text-paragraph font-medium leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="relative rounded-[2.5rem] bg-white p-8 lg:p-10 border border-border/80 shadow-card overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
              
              <h3
                className="text-xl font-extrabold text-heading mb-6"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-heading/80 uppercase tracking-wide mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-heading/80 uppercase tracking-wide mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-heading/80 uppercase tracking-wide mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 974458 7777"
                      className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-heading/80 uppercase tracking-wide mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium cursor-pointer"
                    >
                      <option value="Credit Transfer">Credit Transfer</option>
                      <option value="University Admission">University Admission</option>
                      <option value="Career Counseling">Career Counseling</option>
                      <option value="Study Abroad">Study Abroad</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-heading/80 uppercase tracking-wide mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    className="w-full rounded-xl border border-border bg-slate-50/50 px-4 py-3 text-sm text-heading placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium"
                    required
                  />
                </div>

                {status.type && (
                  <div className={`p-4 rounded-xl border text-sm font-semibold transition-all ${
                    status.type === "success" 
                      ? "bg-emerald-50 border-emerald-150 text-emerald-800" 
                      : "bg-red-50 border-red-150 text-red-800"
                  }`}>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-1.5 h-12 px-7 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-md shadow-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 rounded-[2.5rem] overflow-hidden border border-border/80 shadow-soft"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.135724743!2d75.7803!3d11.2588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65938563d47e1%3A0x5064b!2sKozhikode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Edumentora Location"
          />
        </motion.div>
      </div>
    </section>
  );
}
