"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { propertiesForSale } from "@/lib/properties";

const HERO_IMAGE_URL =
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1771828649/hero_photo_fpus31.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ForSalePage() {
  const [query, setQuery] = useState("");

  const filteredProperties = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return propertiesForSale;
    return propertiesForSale.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[240px] overflow-hidden py-12 lg:min-h-[280px] lg:py-16">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={HERO_IMAGE_URL}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-primary/55" />
        <div className="relative z-10 flex min-h-[240px] items-center lg:min-h-[280px]">
          <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white lg:text-4xl"
            >
              Properties For Sale
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Search bar */}
      <div className="border-b border-primary/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/50" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by property name or location..."
              className="w-full rounded-lg border border-primary/20 bg-white py-3 pl-12 pr-4 text-primary placeholder:text-primary/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
              aria-label="Search properties"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
        {filteredProperties.length === 0 ? (
          <p className="rounded-xl border border-primary/10 bg-primary/5 px-6 py-10 text-center text-primary/80">
            No properties match &quot;{query}&quot;. Try a different name or location.
          </p>
        ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProperties.map((property) => (
            <motion.article
              key={property.id}
              variants={itemVariants}
              className="group overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-primary/5">
                {property.image ? (
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary/60">
                    <span className="text-lg font-medium">Image coming soon</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h2 className="mb-2 text-xl font-semibold text-primary">
                  {property.name}
                </h2>
                <p className="mb-4 flex items-center gap-2 text-sm text-primary/70">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {property.location}
                </p>
                <div className="mb-4 space-y-1 border-t border-primary/10 pt-4">
                  <p className="flex justify-between text-sm">
                    <span className="text-primary/70">Price</span>
                    <span className="font-semibold text-primary">
                      KES {property.price}
                    </span>
                  </p>
                  <p className="flex justify-between text-sm">
                    <span className="text-primary/70">Deposit</span>
                    <span className="font-medium text-primary">
                      KES {property.deposit}
                    </span>
                  </p>
                  <p className="text-xs text-primary/60">
                    Balance in {property.installments}
                  </p>
                </div>
          <Link
                  href={`/for-sale/${property.id}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 font-medium text-accent transition-colors hover:bg-primary/90"
          >
                  View details
                  <ArrowRight className="h-4 w-4" />
          </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
        )}
      </div>
    </div>
  );
}
