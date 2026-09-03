"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import PageHero from "@/components/PageHero";
import { STATIC_TESTIMONIALS, type StaticTestimonial } from "@/lib/testimonials/catalog";
import { propertyImageProps } from "@/lib/images";
import type { ClientTestimonial } from "@/lib/supabase/types";

function mapItem(item: ClientTestimonial | StaticTestimonial): StaticTestimonial {
  return {
    id: item.id,
    name: item.name,
    location: item.location,
    property: item.property,
    rating: item.rating,
    text: item.text,
    image: item.image,
    sort_order: item.sort_order,
  };
}

export default function TestimonialsPage() {
  const [items, setItems] = useState<StaticTestimonial[]>(STATIC_TESTIMONIALS);

  useEffect(() => {
    fetch("/api/content/testimonials", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.items?.length) {
          setItems((data.items as ClientTestimonial[]).map(mapItem));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <PageHero title="Client Testimonials" />
      <section className="bg-[#f5f2ed] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full bg-primary/10">
                    <Image
                      {...propertyImageProps(item.image)}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-primary">{item.name}</h2>
                    <p className="text-xs text-primary/55">
                      {item.property} · {item.location}
                    </p>
                  </div>
                </div>
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-primary/75">&ldquo;{item.text}&rdquo;</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
