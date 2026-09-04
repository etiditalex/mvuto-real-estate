"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  CircleDollarSign,
  Users,
  FileText,
  Leaf,
  TrendingUp,
  Home,
} from "lucide-react";
import type { CatalogProperty } from "@/lib/properties/catalog";
import { getPaymentField, propertyPublicPath } from "@/lib/properties/catalog";
import { formatKes } from "@/lib/admin/utils";
import { propertyImageProps } from "@/lib/images";
import FaqSection from "@/components/seo/FaqSection";
import { PRIME_FAQS } from "@/lib/seo";

const HERO_IMAGE =
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1771828649/hero_photo_fpus31.jpg";

const ABOUT_IMAGE =
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1788437007/who_we_are_lys4wa.jpg";

const CTA_IMAGE =
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773041195/Diani_project_nugmc5.jpg";

const heroHighlights = [
  { icon: ShieldCheck, label: "Genuine Titles" },
  { icon: MapPin, label: "Strategic Locations" },
  { icon: CircleDollarSign, label: "Flexible Payment Plans" },
];

const whyInvest = [
  {
    icon: ShieldCheck,
    title: "Verified & Genuine Land",
    description:
      "Every plot is backed by due diligence and clear documentation so your ownership is secure from day one.",
  },
  {
    icon: MapPin,
    title: "Strategic Locations",
    description:
      "Hand-picked Coast corridors — Kilifi, Diani, Mariakani, Bofa — chosen for access, demand, and long-term value.",
  },
  {
    icon: CircleDollarSign,
    title: "Flexible Payment Plans",
    description:
      "Structured deposits and monthly instalments that keep titled land ownership reachable without pressure.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description:
      "Personal guidance from first enquiry to title deed — site visits, paperwork, and updates you can rely on.",
  },
];

type Props = {
  projects: CatalogProperty[];
};

export default function PrimeLocationsPage({ projects }: Props) {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[480px] w-full overflow-hidden sm:min-h-[560px] lg:min-h-[640px]">
        <Image
          {...propertyImageProps(HERO_IMAGE)}
          alt="Prime coastal land with MVUTO Real Estate"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-primary/25" />

        <div className="relative z-10 mx-auto flex min-h-[480px] max-w-7xl flex-col justify-center px-4 py-16 pb-36 sm:min-h-[560px] sm:py-20 sm:pb-28 lg:min-h-[640px] lg:px-8 lg:py-28 lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-xl"
          >
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Prime Plots.{" "}
              <span className="text-accent">Greater Possibilities.</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/90 md:text-xl">
              Own a piece of tomorrow in Kenya&apos;s most promising Coast
              locations. Affordable. Verified. Strategically placed for lasting
              value.
            </p>
            <Link
              href="#featured-projects"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-primary transition hover:bg-accent-blend"
            >
              Explore Our Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-primary/70 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-white/15 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
            {heroHighlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center justify-center gap-3 px-4 py-4 text-white sm:py-5"
              >
                <Icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
                <span className="text-sm font-semibold tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section id="featured-projects" className="w-full bg-white py-16 lg:py-24">
        <div className="mb-12 w-full px-4 text-center sm:px-8 lg:px-12 xl:px-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Featured Projects
          </p>
          <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">
            Our Plots in Prime Locations
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 bg-accent" aria-hidden />
        </div>

        <div className="grid w-full gap-4 px-4 sm:grid-cols-2 sm:px-6 md:gap-6 lg:grid-cols-3 lg:px-8">
          {projects.map((property, index) => {
            const deposit = getPaymentField(property.paymentPlan, ["Deposit"]);
            const installments = getPaymentField(property.paymentPlan, [
              "Installments",
            ]);
            const featureLine =
              property.features?.[0] || `Prime land in ${property.location}`;

            return (
              <motion.article
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm"
              >
                <div className="relative aspect-[16/10] bg-[#f5f2ed]">
                  {property.image ? (
                    <Image
                      {...propertyImageProps(property.image)}
                      alt={property.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-primary">{property.title}</h3>
                  <p className="mt-1 text-sm text-primary/60">{property.location}</p>

                  <ul className="mt-5 space-y-3 text-sm text-primary/75">
                    <li className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{featureLine}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{property.size} — verified, titled offering</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CircleDollarSign className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>
                        From {formatKes(property.price)}
                        {deposit ? ` · Deposit ${formatKes(deposit)}` : ""}
                        {installments ? ` · ${installments}` : ""}
                      </span>
                    </li>
                  </ul>

                  <Link
                    href={propertyPublicPath(property)}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wide text-accent transition hover:bg-primary/90"
                  >
                    View Project
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 w-full px-4 text-center sm:px-8 lg:px-12">
          <Link
            href="/for-sale"
            className="inline-flex items-center gap-2 rounded-md border-2 border-primary px-7 py-3 text-sm font-bold uppercase tracking-wide text-primary transition hover:bg-accent-blend"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Why invest */}
      <section className="relative w-full overflow-hidden bg-primary py-16 lg:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-primary/80" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Why Invest With Us
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Your Trusted Land Partner
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {whyInvest.map((item, index) => (
              <div
                key={item.title}
                className={`px-2 text-center lg:px-6 ${
                  index > 0 ? "lg:border-l lg:border-white/20" : ""
                }`}
              >
                <item.icon
                  className="mx-auto mb-4 h-9 w-9 text-accent"
                  strokeWidth={1.5}
                />
                <h3 className="mb-2 text-base font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/75">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="w-full bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              About MVUTO
            </p>
            <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">
              Building Futures Through Land Ownership
            </h2>
            <p className="mt-5 text-base leading-relaxed text-primary/75 md:text-lg">
              MVUTO Real Estate connects families and investors to verified Coast
              land — with transparent payment plans, personal service, and a
              clear path from first viewing to title deed. We open Kenya&apos;s
              Coast to secure ownership you can trust.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent transition hover:bg-primary/90"
            >
              Learn More About Us
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="relative min-h-[360px] overflow-hidden rounded-xl shadow-[0_18px_40px_rgba(0,20,71,0.14)] lg:min-h-[420px]">
              <Image
                {...propertyImageProps(ABOUT_IMAGE)}
                alt="MVUTO coastal communities and land ownership"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
              <p className="absolute right-6 top-6 font-serif text-2xl italic text-white drop-shadow md:text-3xl">
                Invest. Grow. Belong.
              </p>
            </div>

            <div className="relative z-10 mx-4 -mt-8 grid grid-cols-3 gap-2 rounded-xl border border-primary/10 bg-white px-3 py-4 shadow-lg sm:mx-8 sm:gap-0 sm:px-4">
              {[
                { icon: Leaf, label: "Communities" },
                { icon: TrendingUp, label: "Value" },
                { icon: Home, label: "A Better Tomorrow" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className={`flex flex-col items-center gap-1.5 px-1 text-center sm:px-3 ${
                    i > 0 ? "border-l border-primary/10" : ""
                  }`}
                >
                  <item.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative w-full overflow-hidden py-16 lg:py-20">
        <Image
          {...propertyImageProps(CTA_IMAGE)}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 flex w-full flex-col items-start justify-between gap-8 px-4 sm:px-8 lg:flex-row lg:items-center lg:px-12 xl:px-16">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Ready to Own a Plot?
            </p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              Let&apos;s Make It Happen.
            </h2>
            <p className="mt-3 text-white/85">
              Speak with the MVUTO team about site visits, payment plans, and the
              right Coast location for your goals.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-primary transition hover:bg-accent-blend"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <FaqSection faqs={PRIME_FAQS} title="Prime Coast land — your questions" />
    </div>
  );
}
