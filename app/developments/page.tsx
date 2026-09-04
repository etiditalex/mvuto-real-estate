"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const hubs = [
  {
    href: "/developments/prime",
    title: "Prime Locations",
    description:
      "Verified Coast plots in high-demand corridors — Kilifi, Diani, Mariakani, and more.",
    icon: MapPin,
  },
  {
    href: "/for-sale",
    title: "All Projects For Sale",
    description:
      "Browse the full MVUTO portfolio with prices, deposits, and flexible payment plans.",
    icon: Building2,
  },
];

export default function DevelopmentsPage() {
  return (
    <div className="bg-[#f5f2ed] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Developments
          </p>
          <h1 className="mt-3 text-3xl font-bold text-primary lg:text-4xl">
            Coast Land Worth Owning
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-primary/75">
            Explore prime development locations across Kenya&apos;s Coast — with
            verified titles, clear payment plans, and guidance from first enquiry
            to title deed.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {hubs.map((hub, index) => (
            <motion.div
              key={hub.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * index }}
            >
              <Link
                href={hub.href}
                className="group flex h-full flex-col rounded-xl border border-primary/10 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
              >
                <hub.icon className="mb-4 h-10 w-10 text-accent" strokeWidth={1.5} />
                <h2 className="text-2xl font-bold text-primary">{hub.title}</h2>
                <p className="mt-2 flex-1 text-sm text-primary/70">{hub.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-accent">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
