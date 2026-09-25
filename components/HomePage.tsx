"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleDollarSign,
  FileCheck,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  TrendingUp,
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import HomeTestimonials from "@/components/HomeTestimonials";
import type { CatalogProperty } from "@/lib/properties/catalog";
import { COMPANY_PHONE_E164 } from "@/lib/site";

const COASTAL_AREAS = ["Chumani", "Mariakani", "Kaloleni", "Diani", "Bofa", "Kibao Kiche"] as const;

const PLOT_FINDER_POINTS = [
  "Verified titles for buyers",
  "A deposit, then monthly instalments",
  "Projects from Kilifi to Diani",
  "Flexible 12-month payment plans",
];

function CoastalPlotFinder() {
  const router = useRouter();
  const [area, setArea] = useState("");

  const browsePlots = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (area) params.set("q", area);
    router.push(params.toString() ? `/for-sale?${params}` : "/for-sale");
  };

  return (
    <section id="find-a-plot" aria-labelledby="find-a-plot-heading" className="bg-white pb-8 pt-10 lg:pb-10 lg:pt-14">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 id="find-a-plot-heading" className="text-3xl font-bold text-accent lg:text-4xl">
            Find a coastal plot that matches your plan.
          </h2>
          <p className="mt-3 text-base text-primary/80 lg:text-lg">
            MVUTO Real Estate connects buyers to verified titled land on Kenya&apos;s Coast.
          </p>
          <p className="mt-1 text-base font-semibold text-primary lg:text-lg">
            Open listings begin at KES 350,000
          </p>

          <form
            role="search"
            aria-label="Find plots by area"
            onSubmit={browsePlots}
            className="mx-auto mt-8 flex w-full max-w-xl items-center rounded-full border border-primary/15 bg-white p-1.5 shadow-md"
          >
            <div className="relative min-w-0 flex-1">
              <select
                value={area}
                onChange={(event) => setArea(event.target.value)}
                aria-label="Choose a project area"
                className="w-full appearance-none bg-transparent py-3 pl-4 pr-10 text-sm text-primary/70 focus:outline-none sm:text-base"
              >
                <option value="">Choose a coastal area</option>
                {COASTAL_AREAS.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary/40"
              />
            </div>
            <button
              type="submit"
              className="shrink-0 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 sm:px-6 sm:text-base"
            >
              View plots
            </button>
          </form>

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {PLOT_FINDER_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-1.5 text-sm text-primary/70">
                <Check size={16} className="shrink-0 text-primary" strokeWidth={2.5} />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${COMPANY_PHONE_E164}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary/5"
            >
              <Phone size={18} />
              Talk to an Expert
            </a>
            <a
              href={`https://wa.me/254798359389?text=${encodeURIComponent("Hello MVUTO Real Estate, I would like help choosing a coastal plot.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white transition hover:bg-[#1ebe5d]"
            >
              <MessageCircle size={18} />
              Chat with us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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

export default function HomePage({ featuredProperties }: { featuredProperties: CatalogProperty[] }) {
  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat blur-lg"
          style={{ backgroundImage: `url("${HERO_IMAGE_URL}")` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex w-full flex-col items-center text-center"
          >
            <h1 className="mb-6 break-words text-3xl font-bold text-white sm:mb-8 sm:text-4xl lg:text-5xl xl:text-6xl">
              Coastal&apos;s Gate to <span className="text-accent">Real Estate</span>
            </h1>
            <p
              data-aeo-answer
              className="mb-8 w-full max-w-7xl text-center text-base leading-relaxed text-white sm:mb-10 sm:text-lg lg:text-xl"
            >
              <span className="block">
                We Connect Global Investors to Coastal&apos;s Property Market through Trust, Innovation, and Personalized Service & Partnership,
              </span>
              <span className="mt-2 block">
                Delivering Luxury Homes & Long-term Value Across the Continent.
              </span>
            </p>
            <Link
              href="/for-sale"
              className="inline-flex min-h-12 items-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-primary transition-colors hover:bg-accent-blend sm:px-8"
            >
              Discover More
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-[#f5f2ed] pb-6 pt-16 lg:pb-8 lg:pt-24">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">Join the Family</h2>
            <p className="text-base leading-relaxed text-gray-600 lg:text-lg">
              Our portfolio of Properties is as diverse as Your Dreams. Explore the following
              categories to find the Perfect Property that resonates with your Vision of Home or
              Investment.
            </p>
          </motion.div>
        </div>
      </section>

      <CoastalPlotFinder />

      <section className="w-full bg-white pb-16 pt-6 lg:pb-24 lg:pt-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid w-full gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-6 lg:px-8"
        >
          {featuredProperties.map((property) => (
            <motion.div key={property.id} variants={itemVariants} className="min-w-0">
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
      </section>

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
                <p className="text-sm leading-relaxed text-white/80">{item.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <HomeTestimonials />

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
              Get in touch with our team for personalized guidance and exclusive access to prime
              properties.
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
