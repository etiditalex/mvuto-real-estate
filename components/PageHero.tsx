"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const HERO_IMAGE_URL =
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1771828649/hero_photo_fpus31.jpg";

export default function PageHero({ title }: { title: string }) {
  return (
    <section className="relative min-h-[220px] overflow-hidden py-12 lg:min-h-[260px] lg:py-16">
      <div className="absolute inset-0" aria-hidden>
        <Image src={HERO_IMAGE_URL} alt="" fill className="object-cover" sizes="100vw" priority />
      </div>
      <div className="absolute inset-0 bg-primary/55" />
      <div className="relative z-10 flex min-h-[220px] items-center lg:min-h-[260px]">
        <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="break-words text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
          >
            {title}
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
