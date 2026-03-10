"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import Link from "next/link";

export default function DevelopmentsPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent-blend">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-primary lg:text-4xl">
            Developments
          </h1>
          <p className="mx-auto max-w-2xl text-primary/80">
            Explore prime and emerging development locations across Kenya. We
            offer exclusive access to high-growth areas with strong investment
            potential.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-md bg-primary px-8 py-3 font-medium text-accent transition-colors hover:bg-primary/90"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
