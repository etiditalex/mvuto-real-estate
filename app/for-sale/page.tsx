"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import { STATIC_PROPERTY_CATALOG, type CatalogProperty } from "@/lib/properties/catalog";
import { sortPropertiesNewestFirst } from "@/lib/properties/sortProperties";

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
  const [properties, setProperties] = useState<CatalogProperty[]>(
    sortPropertiesNewestFirst(STATIC_PROPERTY_CATALOG)
  );

  useEffect(() => {
    fetch("/api/content/properties", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data.properties?.length) {
          setProperties(sortPropertiesNewestFirst(data.properties));
        }
      })
      .catch(() => {});
  }, []);

  const filteredProperties = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return properties;
    return properties.filter(
      (p) => p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)
    );
  }, [query, properties]);

  return (
    <div>
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

      <div className="border-b border-primary/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <div className="relative max-w-xl">
            <Search
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/50"
              aria-hidden
            />
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
              <motion.div key={property.id} variants={itemVariants}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
