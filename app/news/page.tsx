"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Calendar, Clock, ArrowRight, Home, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { STATIC_NEWS_CATALOG, type WebsiteNewsItem } from "@/lib/news/catalog";
import { formatNewsDate } from "@/lib/blog/dates";
import { propertyImageProps } from "@/lib/images";
import type { NewsItem } from "@/lib/supabase/types";

function mapNews(item: NewsItem): WebsiteNewsItem {
  return {
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    date: item.published_at,
    category: item.category,
    image: item.image,
    featured: item.featured,
    details: item.details,
  };
}

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<WebsiteNewsItem[]>(STATIC_NEWS_CATALOG);

  useEffect(() => {
    fetch("/api/content/news", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data.items) || data.items.length === 0) return;
        setNewsItems(
          (data.items as NewsItem[]).map((item) => ({
            ...mapNews(item),
            details: Array.isArray(item.details) ? item.details : [],
          }))
        );
      })
      .catch(() => {});
  }, []);

  return (
    <div className="pb-20">
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-primary/60 sm:text-base">
                <Link href="/" className="flex items-center transition hover:text-accent">
                  <Home size={18} className="stroke-2" />
                </Link>
                <ChevronRight size={16} className="text-primary/30" />
                <Link href="/insights" className="transition hover:text-accent">
                  Insights
                </Link>
                <ChevronRight size={16} className="text-primary/30" />
                <span className="font-medium text-primary">News</span>
              </div>

              <h1 className="mb-4 text-3xl font-bold text-primary sm:text-4xl md:text-5xl lg:text-6xl">
                News &amp; Updates
              </h1>
              <p className="text-lg text-primary/70 md:text-xl">
                Stay updated with the latest from MVUTO Real Estate
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden h-64 md:h-80 lg:block"
            >
              <svg
                viewBox="0 0 400 300"
                className="h-full w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <g stroke="#001447" strokeOpacity="0.18" strokeWidth="1.5" fill="none">
                  <rect x="20" y="180" width="60" height="100" />
                  <rect x="25" y="190" width="8" height="8" />
                  <rect x="37" y="190" width="8" height="8" />
                  <rect x="49" y="190" width="8" height="8" />
                  <rect x="61" y="190" width="8" height="8" />
                  <rect x="25" y="205" width="8" height="8" />
                  <rect x="37" y="205" width="8" height="8" />
                  <rect x="49" y="205" width="8" height="8" />
                  <rect x="61" y="205" width="8" height="8" />
                  <rect x="100" y="150" width="70" height="130" />
                  <rect x="108" y="160" width="10" height="10" />
                  <rect x="123" y="160" width="10" height="10" />
                  <rect x="138" y="160" width="10" height="10" />
                  <rect x="153" y="160" width="10" height="10" />
                  <rect x="108" y="178" width="10" height="10" />
                  <rect x="123" y="178" width="10" height="10" />
                  <rect x="138" y="178" width="10" height="10" />
                  <rect x="153" y="178" width="10" height="10" />
                  <rect x="108" y="196" width="10" height="10" />
                  <rect x="123" y="196" width="10" height="10" />
                  <rect x="138" y="196" width="10" height="10" />
                  <rect x="190" y="200" width="50" height="80" />
                  <rect x="197" y="210" width="8" height="8" />
                  <rect x="209" y="210" width="8" height="8" />
                  <rect x="221" y="210" width="8" height="8" />
                  <rect x="233" y="210" width="8" height="8" />
                  <rect x="197" y="225" width="8" height="8" />
                  <rect x="209" y="225" width="8" height="8" />
                  <rect x="221" y="225" width="8" height="8" />
                  <rect x="233" y="225" width="8" height="8" />
                </g>
                <g stroke="#e7ab28" strokeOpacity="0.7" strokeWidth="1.5" fill="none">
                  <rect x="260" y="120" width="80" height="160" />
                  <rect x="270" y="135" width="12" height="12" />
                  <rect x="287" y="135" width="12" height="12" />
                  <rect x="304" y="135" width="12" height="12" />
                  <rect x="321" y="135" width="12" height="12" />
                  <rect x="270" y="155" width="12" height="12" />
                  <rect x="287" y="155" width="12" height="12" />
                  <rect x="304" y="155" width="12" height="12" />
                  <rect x="321" y="155" width="12" height="12" />
                  <rect x="270" y="175" width="12" height="12" />
                  <rect x="287" y="175" width="12" height="12" />
                  <rect x="304" y="175" width="12" height="12" />
                </g>
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden rounded-xl bg-white shadow-lg transition hover:shadow-xl"
            >
              <div className="grid gap-0 md:grid-cols-2">
                <div className="relative flex min-h-[220px] items-center justify-center bg-[#f5f2ed] p-4 sm:min-h-[280px] sm:p-6 md:min-h-[320px] lg:min-h-[400px]">
                  <div className="relative h-full w-full">
                    <Image
                      {...propertyImageProps(item.image)}
                      alt={item.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <div className="mb-4">
                      <span className="inline-block rounded-lg bg-primary px-4 py-1 text-sm font-semibold text-accent">
                        {item.category}
                      </span>
                    </div>

                    <h2 className="mb-4 text-2xl font-bold text-primary md:text-3xl">{item.title}</h2>

                    <div className="mb-4 flex items-center gap-2 text-sm text-primary/70">
                      <Calendar size={16} className="text-accent" />
                      <span>{formatNewsDate(item.date)}</span>
                    </div>

                    <p className="mb-6 leading-relaxed text-primary/70">{item.excerpt}</p>

                    {item.details && item.details.length > 0 && (
                      <div className="mb-6">
                        <ul className="space-y-2">
                          {item.details.map((detail) => (
                            <li key={detail} className="flex items-center text-primary/70">
                              <span className="mr-3 h-1.5 w-1.5 rounded-full bg-accent" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    {item.featured ? (
                      <Link
                        href="/contact"
                        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-accent transition hover:bg-primary/90"
                      >
                        <Clock size={18} />
                        Book Site Visit
                        <ArrowRight size={18} />
                      </Link>
                    ) : (
                      <Link
                        href="/contact"
                        className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-accent transition hover:bg-primary/90"
                      >
                        Learn More
                        <ArrowRight size={18} />
                      </Link>
                    )}
                    <Link
                      href="/for-sale"
                      className="flex items-center justify-center gap-2 rounded-lg border-2 border-primary bg-white px-6 py-3 font-semibold text-primary transition hover:bg-accent-blend"
                    >
                      View Properties
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
