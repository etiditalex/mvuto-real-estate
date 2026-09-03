"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { STATIC_TESTIMONIALS, type StaticTestimonial } from "@/lib/testimonials/catalog";
import type { ClientTestimonial } from "@/lib/supabase/types";

export default function HomeTestimonials() {
  const [items, setItems] = useState<StaticTestimonial[]>(STATIC_TESTIMONIALS.slice(0, 3));

  useEffect(() => {
    fetch("/api/content/testimonials", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.items?.length) {
          setItems(
            (data.items as ClientTestimonial[]).slice(0, 3).map((item) => ({
              id: item.id,
              name: item.name,
              location: item.location,
              property: item.property,
              rating: item.rating,
              text: item.text,
              image: item.image,
              sort_order: item.sort_order,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-[#f5f2ed] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold text-primary lg:text-4xl">What Clients Say</h2>
            <p className="mt-2 max-w-xl text-primary/70">
              Families and investors who bought Coast-region land with MVUTO.
            </p>
          </div>
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 font-medium text-primary hover:text-accent"
          >
            All testimonials <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="line-clamp-4 text-sm leading-relaxed text-primary/75">
                &ldquo;{item.text}&rdquo;
              </p>
              <p className="mt-4 font-bold text-primary">{item.name}</p>
              <p className="text-xs text-primary/50">
                {item.property} · {item.location}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
