"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SectionTitle from "@/components/common/SectionTitle";
import { Star, Quote } from "lucide-react";

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

export default function TestimonialSlider() {
  const [list, setList] = useState<any[]>([]);

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

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-[30%] right-[-10%] w-[450px] h-[450px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[380px] h-[380px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      {/* subtle floating particles */}
      <span className="hidden md:block absolute top-[18%] left-[12%] h-2 w-2 rounded-full bg-primary/30 animate-float pointer-events-none" />
      <span className="hidden md:block absolute top-[65%] left-[22%] h-1.5 w-1.5 rounded-full bg-accent/40 animate-float-delay pointer-events-none" />
      <span className="hidden md:block absolute top-[35%] right-[18%] h-2 w-2 rounded-full bg-accent/30 animate-float-delay-2 pointer-events-none" />
      <span className="hidden md:block absolute top-[75%] right-[28%] h-1.5 w-1.5 rounded-full bg-primary/30 animate-float-delay pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16">
          <SectionTitle
            label="Testimonials"
            title="What Our Students Say"
            description="Your trusted partner in education, offering expert guidance and innovative learning resources to empower students and professionals for academic and career success."
          />
        </div>

        {list.length > 0 && (
          <Swiper
            key={list.length}
            modules={[Pagination, Autoplay, Keyboard]}
            spaceBetween={32}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={list.length > 3}
            keyboard={{ enabled: true, onlyInViewport: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pt-4 pb-16 !overflow-visible"
          >
            {list.map((testimonial, index) => {
              const initials =
                (testimonial.name || "")
                  .split(" ")
                  .filter(Boolean)
                  .map((n: string) => n[0])
                  .join("") || "U";

              return (
                <SwiperSlide key={index} className="h-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: "spring", stiffness: 120, damping: 16 }}
                    className="group relative"
                  >
                    <div className="relative">
                      {/* Layered navy backdrop */}
                      <div
                        aria-hidden="true"
                        className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-primary to-primary-dark rotate-[-3deg] shadow-lg transition-transform duration-500 ease-out group-hover:rotate-[-6deg]"
                      />

                      {/* White card */}
                      <div className="relative flex flex-col rounded-[30px] bg-white p-8 pb-9 shadow-soft transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-hover">
                        <Quote
                          aria-hidden="true"
                          className="absolute top-6 left-7 h-8 w-8 text-primary/10"
                        />

                        {/* Stars top center */}
                        <div className="flex justify-center gap-1 mb-5">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star
                              key={i}
                              style={{ transitionDelay: `${i * 60}ms` }}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400 transition-transform duration-300 ease-out group-hover:scale-125"
                            />
                          ))}
                        </div>

                        {/* Comment */}
                        <p className="text-center text-base md:text-lg font-medium leading-relaxed text-paragraph line-clamp-5 min-h-[7.5rem]">
                          {testimonial.quote}
                        </p>
                      </div>

                      {/* Avatar overlapping bottom-left corner */}
                      <div className="absolute -bottom-8 left-8 z-10 h-16 w-16 overflow-hidden rounded-full border-4 border-primary bg-primary/10 shadow-md transition-transform duration-500 ease-out group-hover:scale-110">
                        {testimonial.image ? (
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm font-extrabold text-primary">
                            {initials}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Name / designation below the card, centered */}
                    <div className="mt-10 text-center">
                      <h4
                        className="text-lg md:text-[22px] font-extrabold text-heading"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {testimonial.name}
                      </h4>
                      <p className="mt-1 text-sm md:text-base font-medium text-paragraph/70">
                        {testimonial.position}
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </section>
  );
}
