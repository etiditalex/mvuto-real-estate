"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogListItem } from "@/lib/blog/catalog";
import { formatBlogDateCarousel } from "@/lib/blog/dates";
import { propertyImageProps } from "@/lib/images";

type Props = { posts: BlogListItem[] };

export default function BlogsHeroCarousel({ posts }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollStep = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const w = (card?.offsetWidth ?? 320) + 1;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * w,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="relative bg-primary" aria-label="Featured blog posts">
      <button
        type="button"
        onClick={() => scrollStep(-1)}
        className="absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-white text-primary shadow-md transition hover:bg-accent-blend md:flex lg:left-4"
        aria-label="Previous posts"
      >
        <ChevronLeft className="h-6 w-6" strokeWidth={2} aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => scrollStep(1)}
        className="absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/20 bg-white text-primary shadow-md transition hover:bg-accent-blend md:flex lg:right-4"
        aria-label="Next posts"
      >
        <ChevronRight className="h-6 w-6" strokeWidth={2} aria-hidden />
      </button>

      <div
        ref={scrollerRef}
        className="flex gap-px overflow-x-auto scroll-smooth px-3 py-6 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-4 md:px-6 md:pb-10 lg:snap-x lg:snap-mandatory [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            data-carousel-card
            className="group relative h-[min(48vh,420px)] min-h-[320px] w-[min(88vw,340px)] shrink-0 snap-center snap-always overflow-hidden bg-primary sm:w-[min(78vw,380px)] md:h-[min(52vh,480px)] md:min-h-[380px] md:w-[min(46vw,420px)] lg:h-[520px] lg:w-[min(calc(33.333vw-12px),400px)] xl:w-[min(calc(33.333vw-16px),440px)]"
          >
            <Image
              {...propertyImageProps(post.image)}
              alt={post.title}
              fill
              className="object-cover transition duration-700 ease-out group-hover:scale-105"
              sizes="(max-width:768px) 88vw, (max-width:1024px) 46vw, 33vw"
              priority={post.id === posts[0]?.id}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-primary/10"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-5 text-left text-white md:p-7 lg:p-8">
              <span className="font-serif text-2xl italic leading-none text-accent md:text-3xl lg:text-[2rem]">
                Blogs
              </span>
              <span className="mt-3 line-clamp-4 text-xl font-bold leading-snug tracking-tight text-white md:text-2xl lg:text-[1.65rem] lg:leading-tight">
                {post.title}
              </span>
              <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                {formatBlogDateCarousel(post.date)}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="border-t border-white/10 bg-primary px-4 py-5 text-center">
        <p className="text-sm text-white/70 md:text-base">
          MVUTO Real Estate — insights on{" "}
          <span className="text-accent">land, coastal growth &amp; smart buying in Kenya</span>
        </p>
      </div>

      <div className="flex justify-center gap-3 border-t border-white/10 py-3 md:hidden">
        <button
          type="button"
          onClick={() => scrollStep(-1)}
          className="flex h-11 w-11 items-center justify-center border border-white/20 bg-white text-primary"
          aria-label="Previous posts"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollStep(1)}
          className="flex h-11 w-11 items-center justify-center border border-white/20 bg-white text-primary"
          aria-label="Next posts"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </section>
  );
}
