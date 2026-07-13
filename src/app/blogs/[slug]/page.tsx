import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, FolderOpen } from "lucide-react";
import { blogPosts, getBlogBySlug } from "@/lib/blogs";

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Blog Not Found - Edumentora",
    };
  }

  return {
    title: `${post.title} - Edumentora`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) notFound();

  return (
    <main className="pt-20 bg-bg-section">
      {/* Header section */}
      <section className="relative overflow-hidden py-20 lg:py-24 bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 z-10">
          <Link
            href="/blogs"
            className="mb-8 inline-flex items-center justify-center gap-1.5 h-10 px-5 rounded-full text-xs font-bold text-primary border border-primary/10 bg-primary/5 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-5 text-xs sm:text-sm font-bold text-paragraph">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-2 text-primary uppercase tracking-wide">
              <FolderOpen className="h-4 w-4" />
              {post.category}
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold leading-tight text-heading"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {post.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base sm:text-lg text-paragraph leading-relaxed font-medium">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Content section */}
      <section className="py-20 lg:py-28 bg-bg-section relative">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border/80 bg-white shadow-soft">
            <div className="relative aspect-[16/8] overflow-hidden">
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover"
              />
            </div>

            <div className="p-8 lg:p-12">
              <div className="prose prose-slate max-w-none">
                {post.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mb-6 text-base leading-relaxed text-paragraph font-medium"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
