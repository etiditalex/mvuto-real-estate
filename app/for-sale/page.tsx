"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import FaqSection from "@/components/seo/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, SALE_FAQS, webPageSchema } from "@/lib/seo";
import { STATIC_PROPERTY_CATALOG, type CatalogProperty } from "@/lib/properties/catalog";
import { sortPropertiesNewestFirst } from "@/lib/properties/sortProperties";

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
    const area = new URLSearchParams(window.location.search).get("q");
    if (area) setQuery(area);
  }, []);

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
      <JsonLd
        data={[
          webPageSchema({
            path: "/for-sale",
            title: "Land & Plots for Sale in Kenya",
            description:
              "Browse titled land and plots for sale on Kenya's Coast. Chumani, Diani, Mariakani, Bofa and more — prices, deposits and flexible payment plans from MVUTO.",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "For Sale", path: "/for-sale" },
          ]),
        ]}
      />
      <section className="bg-primary py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white lg:text-4xl"
          >
            Properties For Sale
          </motion.h1>
        </div>
      </section>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-10">
          <p className="max-w-4xl text-base leading-relaxed text-primary/80">
            Browse titled land and plots for sale on Kenya&apos;s Coast. Chumani, Diani, Mariakani,
            Bofa and more — prices, deposits and flexible payment plans from MVUTO.
          </p>
          <h2 className="mt-8 text-2xl font-bold text-accent">Available plots</h2>
          <div id="property-search" className="relative mt-5 max-w-xl scroll-mt-32">
            <Search
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/50"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by property name or location..."
              className="w-full rounded-full border border-primary/15 bg-white py-3 pl-12 pr-4 text-primary shadow-sm placeholder:text-primary/50 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
              aria-label="Search properties"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 lg:px-8 lg:pb-24">
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
      <FaqSection faqs={SALE_FAQS} title="Buying land on Kenya's Coast" />
    </div>
  );
}
