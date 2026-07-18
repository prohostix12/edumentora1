"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star, Quote, Sparkles, MapPin, Phone, Mail, Clock, Send, BookOpen, GraduationCap, Users, Award, ArrowRight } from "lucide-react";
import Link from "next/link";

const defaultTestimonials = [
  {
    name: "Rahul Menon",
    position: "B.Tech Student, Glocal University",
    rating: 5,
    quote:
      "Edumentora made my credit transfer process incredibly smooth. I was worried about losing my credits when moving to a new city, but their team handled everything professionally. I joined the right semester without any hassle.",
  },
  {
    name: "Anjali Krishnan",
    position: "MBA Student, Arni University",
    rating: 5,
    quote:
      "The guidance I received from Edumentora was exceptional. They helped me understand the credit transfer system, reviewed all my documents, and ensured my previous subjects were accepted. Highly recommended!",
  },
  {
    name: "Vishnu Prasad",
    position: "BBA Student, Maya Devi University",
    rating: 5,
    quote:
      "Choosing Edumentora was the best decision for my education. They saved me an entire year by transferring my credits efficiently. The staff is knowledgeable, supportive, and always available to answer questions.",
  },
  {
    name: "Priya Sharma",
    position: "B.Sc Student, Glocal University",
    rating: 5,
    quote:
      "I was skeptical about credit transfer at first, but Edumentora proved me wrong. Their transparent process and expert counselors made the transition seamless. I am now continuing my degree without any delays.",
  },
  {
    name: "Mohammed Faizal",
    position: "BCA Student, Arni University",
    rating: 5,
    quote:
      "Edumentora values your previous efforts. They ensured all my completed subjects were recognized by the new university. The entire process was quick, and the team was extremely helpful throughout.",
  },
];

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

const stats = [
  { icon: GraduationCap, value: "800+", label: "Credits Transferred" },
  { icon: Users, value: "3000+", label: "Graduates Guided" },
  { icon: Award, value: "16 Yrs", label: "Of Expertise" },
];

type TabId = "reviews" | "contact" | "offices";

export default function TestimonialSlider() {
  const [activeTab, setActiveTab] = useState<TabId>("reviews");
  const [list, setList] = useState<any[]>([]);

  // Form states from ContactSection
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

  // Fetch testimonials
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/testimonials", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mapped = data.map((item: any) => ({
              name: item.name,
              position: item.role,
              rating: item.rating,
              quote: item.feedback,
              image: item.image,
            }));
            setList(mapped);
          } else {
            setList(defaultTestimonials);
          }
        } else {
          setList(defaultTestimonials);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
        setList(defaultTestimonials);
      }
    }
    fetchTestimonials();
  }, []);

  // Form handlers
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
          message: "Thank you! Your enquiry has been submitted successfully. Our counselor will get in touch shortly."
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

  const tabList = [
    { id: "reviews" as TabId, label: "Student Reviews" },
    { id: "contact" as TabId, label: "Speak to a Counselor" },
    { id: "offices" as TabId, label: "Offices & Map" },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center bg-section-white overflow-hidden py-24 px-[6vw] snap-section">
      
      {/* Background decorations */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-10%] w-[380px] h-[380px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #0B1440 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative max-w-[1440px] w-full mx-auto z-10 flex flex-col gap-10">
        
        {/* Toggle Selector */}
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 border border-slate-200/50 rounded-full shadow-sm">
            {tabList.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-paragraph hover:text-heading"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeContactTab"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab content area */}
        <div className="min-h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            
            {activeTab === "reviews" && (
              <motion.div
                key="reviews-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full flex flex-col gap-8"
              >
                <div className="text-center max-w-xl mx-auto flex flex-col items-center">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-soft">
                    <Sparkles className="h-3.5 w-3.5 text-accent" />
                    Testimonials
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-heading mt-3" style={{ fontFamily: "var(--font-poppins)" }}>
                    What Our Students Say
                  </h3>
                </div>

                {list.length > 0 && (
                  <Swiper
                    key={list.length}
                    modules={[Pagination, Autoplay, Keyboard]}
                    spaceBetween={32}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    loop={list.length > 3}
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    breakpoints={{
                      640: { slidesPerView: 1 },
                      768: { slidesPerView: 2 },
                      1024: { slidesPerView: 3 },
                    }}
                    className="pt-8 pb-12 w-full"
                  >
                    {list.map((testimonial, index) => {
                      const initials =
                        (testimonial.name || "")
                          .split(" ")
                          .filter(Boolean)
                          .map((n: string) => n[0])
                          .join("") || "U";

                      return (
                        <SwiperSlide key={index} className="h-auto pt-6 pb-8">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="group relative h-full"
                          >
                            <div className="relative h-full flex flex-col max-w-[360px] mx-auto">
                              {/* Layered navy backdrop */}
                              <div
                                aria-hidden="true"
                                className="absolute -inset-2 rounded-[1.75rem] bg-gradient-to-br from-primary to-primary-dark rotate-[-2deg] shadow-md transition-transform duration-500 ease-out group-hover:rotate-[-4deg]"
                              />

                              {/* White card */}
                              <div className="relative flex flex-col flex-1 rounded-[1.6rem] bg-white p-5 pb-6 shadow-sm transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-md border border-slate-100">
                                <Quote
                                  aria-hidden="true"
                                  className="absolute top-4 left-4 h-6 w-6 text-primary/10"
                                />

                                {/* Stars */}
                                <div className="flex justify-center gap-1 mb-3.5">
                                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                    />
                                  ))}
                                </div>

                                {/* Comment */}
                                <p className="text-center text-xs sm:text-sm leading-relaxed text-paragraph font-medium line-clamp-4 min-h-[4.5rem] flex items-center justify-center">
                                  &ldquo;{testimonial.quote}&rdquo;
                                </p>

                                {/* Divider */}
                                <div className="h-px bg-slate-100 my-3.5" />

                                {/* Avatar & Info inside card */}
                                <div className="flex items-center gap-2.5">
                                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-primary bg-primary/10 shadow-sm">
                                    {testimonial.image ? (
                                      <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <div className="flex h-full w-full items-center justify-center text-xs font-bold text-primary">
                                        {initials}
                                      </div>
                                    )}
                                  </div>
                                  <div className="text-left overflow-hidden">
                                    <h4 className="text-xs sm:text-sm font-extrabold text-heading truncate" style={{ fontFamily: "var(--font-poppins)" }}>
                                      {testimonial.name}
                                    </h4>
                                    <p className="text-[9px] font-bold text-paragraph/70 truncate">
                                      {testimonial.position}
                                    </p>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </motion.div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                )}
              </motion.div>
            )}

            {activeTab === "contact" && (
              <motion.div
                key="contact-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-8 items-stretch w-full text-left"
              >
                {/* Left Column: Integrated CTA stats panel */}
                <div className="lg:col-span-5 relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-secondary p-8 sm:p-10 rounded-[2rem] text-white shadow-md flex flex-col justify-between">
                  <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl pointer-events-none" />
                  
                  <div className="relative z-10">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-3.5 py-1 text-xs font-bold text-white uppercase tracking-wider">
                      <Sparkles className="h-3.5 w-3.5 text-accent" />
                      Take action today
                    </span>

                    <h3
                      className="text-2xl font-extrabold mb-4 leading-tight"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      Ready to Transfer Credits and Save Semesters?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-semibold mb-6">
                      Join thousands of students who have successfully transferred their credits and continued their education without losing valuable time.
                    </p>
                  </div>

                  <div className="relative z-10 grid grid-cols-3 gap-3 mb-6">
                    {stats.map((stat) => (
                      <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                        <stat.icon className="h-4.5 w-4.5 text-accent mx-auto mb-1.5" />
                        <div className="text-sm font-extrabold text-white" style={{ fontFamily: "var(--font-poppins)" }}>
                          {stat.value}
                        </div>
                        <div className="text-[9px] font-bold text-slate-300 leading-tight">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions list */}
                  <div className="relative z-10 flex flex-col gap-2.5">
                    <a
                      href="tel:+919744587777"
                      className="group flex items-center justify-between gap-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 px-4.5 py-3 text-white transition-all duration-300 cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5 text-xs font-bold">
                        <Phone className="h-4 w-4 text-accent" />
                        Book a Free Call
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-white/50 transition-transform group-hover:translate-x-1" />
                    </a>

                    <Link
                      href="/programs"
                      className="group flex items-center justify-between gap-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 px-4.5 py-3 text-white transition-all duration-300 cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5 text-xs font-bold">
                        <BookOpen className="h-4 w-4 text-accent" />
                        Explore Programs
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-white/50 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Query Submission Form */}
                <div className="lg:col-span-7 rounded-[2rem] bg-slate-50 border border-slate-200/50 p-8 shadow-sm flex flex-col justify-center">
                  <h4 className="text-lg font-extrabold text-heading mb-4" style={{ fontFamily: "var(--font-poppins)" }}>
                    Send us a Message
                  </h4>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-heading/70 uppercase tracking-wider mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-heading placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-heading/70 uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-heading placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-heading/70 uppercase tracking-wider mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 974458 7777"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-heading placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-semibold"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-heading/70 uppercase tracking-wider mb-1.5">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-heading focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all font-semibold cursor-pointer"
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
                      <label className="block text-[10px] font-bold text-heading/70 uppercase tracking-wider mb-1.5">
                        Message
                      </label>
                      <textarea
                        rows={3}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements..."
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs text-heading placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none font-semibold"
                        required
                      />
                    </div>

                    {status.type && (
                      <div className={`p-3.5 rounded-xl border text-xs font-bold ${
                        status.type === "success" 
                          ? "bg-emerald-50 border-emerald-100 text-emerald-800" 
                          : "bg-red-50 border-red-100 text-red-800"
                      }`}>
                        {status.message}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-1.5 h-11 px-6 rounded-full text-xs font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer w-fit"
                    >
                      <Send className="h-3.5 w-3.5" />
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {activeTab === "offices" && (
              <motion.div
                key="offices-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-12 gap-8 items-stretch w-full text-left"
              >
                {/* Left Column: Office contact addresses */}
                <div className="lg:col-span-5 flex flex-col gap-4 justify-center">
                  {contactInfo.map((info) => (
                    <div
                      key={info.title}
                      className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/15">
                        <info.icon className="h-4.5 w-4.5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-heading mb-1 uppercase tracking-wider" style={{ fontFamily: "var(--font-poppins)" }}>
                          {info.title}
                        </h4>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-xs text-paragraph font-medium leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Column: Google Maps Embed */}
                <div className="lg:col-span-7 rounded-[2rem] overflow-hidden border border-slate-200/50 shadow-sm h-full min-h-[350px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.135724743!2d75.7803!3d11.2588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65938563d47e1%3A0x5064b!2sKozhikode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "350px" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Edumentora Location"
                  />
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
