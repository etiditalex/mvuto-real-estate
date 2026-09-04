"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { SERVICE_PAGES } from "@/lib/seo";

const serviceCopy: Record<string, string> = {
  "land-sales":
    "We offer exclusive access to verified, legally compliant land in prime, high-growth locations across Kenya. Our carefully curated listings cater to diverse needs—whether you're looking to build your home, develop property or grow your investments with confidence.",
  acquisition:
    "We walk with you every step of the land-buying journey—from choosing the perfect plot to completing ownership transfer—ensuring a seamless, secure and stress-free experience.",
  investment:
    "We empower investors to spot high-growth opportunities by identifying prime locations and projects with strong returns, backed by real market data, local expertise and forward-looking insights.",
  "due-diligence":
    "We help clients confidently secure their land by verifying ownership, title deeds and all essential documents. Our expert guidance on land searches, ownership history and legal compliance ensures every transaction is safe, legitimate and risk-free.",
  support:
    "Our commitment goes beyond the sale. We provide dedicated post-purchase support to ensure a smooth transition into ownership and development, helping you make the most of your investment with ease and confidence.",
};

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = SERVICE_PAGES[slug];
  const content = service
    ? { title: service.title, description: serviceCopy[slug] || service.description }
    : null;

  if (!content) {
    return (
      <div className="py-16 text-center">
        <p className="text-primary/80">Service not found.</p>
        <Link href="/services" className="mt-4 text-accent underline">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/services"
            className="mb-8 inline-flex items-center gap-2 text-primary/80 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
          <h1 className="mb-6 break-words text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
            {content.title}
          </h1>
          <p className="text-lg text-primary/90">{content.description}</p>
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
