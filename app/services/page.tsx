"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Landmark,
  FileSearch,
  TrendingUp,
  ShieldCheck,
  HeadphonesIcon,
  ArrowRight,
} from "lucide-react";
import FaqSection from "@/components/seo/FaqSection";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, SERVICES_FAQS, webPageSchema } from "@/lib/seo";

const services = [
  {
    icon: Landmark,
    title: "Land Sales & Marketing",
    description: "Verified, legally compliant land in prime locations.",
    href: "/services/land-sales",
  },
  {
    icon: FileSearch,
    title: "Land Acquisition Consulting",
    description: "End-to-end support through your land-buying journey.",
    href: "/services/acquisition",
  },
  {
    icon: TrendingUp,
    title: "Real Estate Investment Guidance",
    description: "High-growth opportunities with strong returns.",
    href: "/services/investment",
  },
  {
    icon: ShieldCheck,
    title: "Due Diligence & Verification",
    description: "Ownership verification and legal compliance.",
    href: "/services/due-diligence",
  },
  {
    icon: HeadphonesIcon,
    title: "Client Support & After-Sales",
    description: "Dedicated post-purchase support.",
    href: "/services/support",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <JsonLd
        data={[
          webPageSchema({
            path: "/services",
            title: "Real Estate Services Kenya",
            description:
              "MVUTO real estate services in Kenya: land sales, acquisition consulting, investment guidance, due diligence and after-sales support on the Coast.",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <div className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-4 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              Our Services
            </h1>
            <p className="mx-auto max-w-2xl text-primary/80">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href={service.href}
                  className="group flex items-start gap-4 rounded-xl border border-primary/10 bg-white p-5 transition-shadow hover:shadow-lg sm:p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-blend text-primary group-hover:bg-accent">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="mb-2 font-semibold text-primary">
                      {service.title}
                    </h2>
                    <p className="mb-4 text-primary/80">{service.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:text-accent">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <FaqSection faqs={SERVICES_FAQS} title="Our services — common questions" />
    </div>
  );
}
