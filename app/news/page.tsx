"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/PageHero";
import { STATIC_NEWS_CATALOG, type WebsiteNewsItem } from "@/lib/news/catalog";
import { formatIsoDate } from "@/lib/admin/utils";
import { propertyImageProps } from "@/lib/images";
import type { NewsItem } from "@/lib/supabase/types";

function mapNews(item: NewsItem | WebsiteNewsItem): WebsiteNewsItem {
  if ("date" in item) return item;
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
  const [items, setItems] = useState<WebsiteNewsItem[]>(STATIC_NEWS_CATALOG);

  useEffect(() => {
    fetch("/api/content/news", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.items?.length) {
          setItems((data.items as NewsItem[]).map(mapNews));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <PageHero title="News Updates" />
      <section className="bg-[#f5f2ed] py-16 lg:py-24">
        <div className="mx-auto max-w-5xl space-y-8 px-4 lg:px-8">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm lg:grid lg:grid-cols-[280px_1fr]"
            >
              <div className="relative min-h-[200px]">
                <Image
                  {...propertyImageProps(item.image)}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 280px"
                />
              </div>
              <div className="p-6 lg:p-8">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase text-accent">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                      Featured
                    </span>
                  )}
                  <span className="text-xs text-primary/50">{formatIsoDate(item.date)}</span>
                </div>
                <h2 className="text-2xl font-bold text-primary">{item.title}</h2>
                <p className="mt-3 text-primary/70">{item.excerpt}</p>
                {item.details?.length ? (
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-primary/70">
                    {item.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                ) : null}
                <Link
                  href="/contact"
                  className="mt-6 inline-flex rounded-md bg-accent px-5 py-2 text-sm font-medium text-primary hover:bg-accent-blend"
                >
                  Talk to our team
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
