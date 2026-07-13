import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PenSquare } from "lucide-react";
import { blogPosts } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blogs - Edumentora",
  description:
    "Read Edumentora blogs on credit transfer, student success, universities, and academic opportunities.",
};

export default function BlogsPage() {
  return (
    <main className="pt-20 bg-bg-section">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-24 bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4.5 py-1.5 text-xs font-bold text-primary shadow-soft w-fit uppercase tracking-wider">
            <PenSquare className="h-3.5 w-3.5" />
            Blogs
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-heading mb-6 leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Read Our <span className="gradient-text">Latest Blogs</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-paragraph leading-relaxed font-medium">
            Practical guidance, student support insights, and credit transfer
            knowledge to help learners continue their academic journey with confidence.
          </p>
        </div>
      </section>

      {/* Grid List */}
      <section className="py-20 lg:py-28 bg-bg-section relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <article
                key={post.slug}
                className={`group overflow-hidden rounded-[2.5rem] border border-border/80 bg-white shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-hover ${
                  index === 1 ? "lg:translate-y-4" : ""
                }`}
              >
                <Link href={`/blogs/${post.slug}`} className="block">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-750 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="p-8">
                  <div className="mb-4 text-xs sm:text-sm text-paragraph font-bold">
                    <span>{post.date}</span>
                    <span className="mx-2 text-primary">|</span>
                    <span className="text-primary uppercase tracking-wide">{post.category}</span>
                  </div>

                  <h2
                    className="text-lg sm:text-xl font-extrabold leading-snug text-heading mb-8 group-hover:text-primary transition-colors duration-300 line-clamp-2"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-3 text-xs font-bold text-heading hover:text-primary transition-all duration-300 uppercase tracking-wider"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-50 text-paragraph border border-border/80 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary/20 group-hover:shadow-md">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
