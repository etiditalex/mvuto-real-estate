"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowRight, MapPin } from "lucide-react";
import { propertiesForSale } from "@/lib/properties";

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
  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14 text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
            <Home className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-primary lg:text-4xl">
            Properties For Sale
          </h1>
          <p className="mx-auto max-w-2xl text-primary/80">
            Exclusive access to verified, legally compliant land in prime,
            high-growth locations across Kenya. Browse our curated listings with
            flexible payment plans.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {propertiesForSale.map((property) => (
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
      </div>
    </div>
  );
}
