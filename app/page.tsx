"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Home,
  CircleDollarSign,
  Heart,
  TrendingUp,
  FileCheck,
} from "lucide-react";
import { propertiesForSale } from "@/lib/properties";

const featuredProperties = propertiesForSale.slice(0, 4);

const HERO_IMAGE_URL =
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1771828649/hero_photo_fpus31.jpg";

const whyMVuto = [
  {
    icon: Home,
    title: "WIDE RANGE OF PROPERTIES",
    description: "We Offer A Wide Variety of Property Investment Opportunities.",
  },
  {
    icon: CircleDollarSign,
    title: "FINANCING MADE EASY",
    description: (
      <>
        Our Finance Department Finds Financial Solutions to Help you Invest{" "}
        <strong>Safely</strong> and <strong>Correctly</strong>.
      </>
    ),
  },
  {
    icon: Heart,
    title: "TRUSTED BY HUNDREDS",
    description: (
      <>
        Over <strong>800 Clients</strong> and <strong>Five Delivered Projects</strong>.{" "}
        <strong>Four International Branches</strong>.
      </>
    ),
  },
  {
    icon: TrendingUp,
    title: "INVEST IN A PARTNERSHIP",
    description:
      "With Property Investment at MVUTO You Get a Trusted Partner Committed to Your Success.",
  },
  {
    icon: FileCheck,
    title: "TRANSPARENCY",
    description:
      "Always Stay Informed about Your Investment. We Keep You Updated Every Step of the Way.",
  },
  {
    icon: MapPin,
    title: "PRIME LOCATIONS",
    description:
      "Every Project is Carefully Hand-Picked to Offer the Best Value and Growth Potential.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        {/* Blurred background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 blur-lg"
          style={{ backgroundImage: `url("${HERO_IMAGE_URL}")` }}
          aria-hidden
        />
        {/* Dark overlay for text readability (blended, desaturated look) */}
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex w-full flex-col items-center text-center"
          >
            <h1 className="mb-8 text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
              Coastal&apos;s Gate to{" "}
              <span className="text-accent">Real Estate</span>
            </h1>
            <p className="mb-10 w-full max-w-7xl text-center text-lg leading-relaxed text-white lg:text-xl">
              <span className="block">
                We Connect Global Investors to Coastal&apos;s Property Market through Trust, Innovation, and Personalized Service & Partnership,
              </span>
              <span className="mt-2 block">
                Delivering Luxury Homes & Long-term Value Across the Continent.
              </span>
            </p>
            <Link
              href="/for-sale"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-8 py-3 font-medium text-primary transition-colors hover:bg-accent-blend"
            >
              Discover More
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Join the Family Section */}
      <section className="bg-[#f5f2ed] pt-16 pb-6 lg:pt-24 lg:pb-8">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              Join the Family
            </h2>
            <p className="text-base leading-relaxed text-gray-600 lg:text-lg">
              Our portfolio of Properties is as diverse as Your Dreams. Explore
              the following categories to find the Perfect Property that
              resonates with your Vision of Home or Investment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties for Sale */}
      <section className="bg-white pt-6 pb-16 lg:pt-8 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {featuredProperties.map((property) => (
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
                  <h3 className="mb-2 text-xl font-semibold text-primary">
                    {property.name}
                  </h3>
                  <p className="mb-4 flex items-center gap-2 text-sm text-primary/70">
                    <MapPin className="h-4 w-4 shrink-0" />
                    {property.location}
                  </p>
                  <div className="mb-4 space-y-1 border-t border-primary/10 pt-4">
                    <p className="flex justify-between text-sm">
                      <span className="text-primary/70">Price</span>
                      <span className="font-semibold text-primary">KES {property.price}</span>
                    </p>
                    <p className="flex justify-between text-sm">
                      <span className="text-primary/70">Deposit</span>
                      <span className="font-medium text-primary">KES {property.deposit}</span>
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
      </section>

      {/* Why MVUTO Real Estate */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center text-3xl font-bold text-white lg:text-4xl"
          >
            Why MVUTO Real Estate
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {whyMVuto.map((item) => (
              <motion.article
                key={item.title}
                variants={itemVariants}
                className="rounded-lg bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center text-accent">
                  <item.icon className="h-8 w-8" strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/80">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
              Ready to Start Your Land Journey?
            </h2>
            <p className="mb-8 text-white/90">
              Get in touch with our team for personalized guidance and exclusive
              access to prime properties.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-8 py-3 font-medium text-primary transition-colors hover:bg-accent-blend"
            >
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
