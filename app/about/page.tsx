"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const LOGO_URL =
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1771659167/mvuto_real_estate_logo_a5evt8.jpg";

export default function AboutPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col items-center gap-8 lg:flex-row"
        >
          <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-accent p-4 lg:h-40 lg:w-40">
            <Image
              src={LOGO_URL}
              alt="Mvuto Real Estate Ltd"
              width={140}
              height={140}
              className="object-contain"
            />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="mb-4 text-3xl font-bold text-primary lg:text-4xl">
              About Mvuto Real Estate Ltd
            </h1>
            <p className="max-w-2xl text-primary/90">
              Mvuto Real Estate Ltd is a leading Kenyan real estate firm
              specializing in land acquisition, property advisory and investment
              facilitation across prime and emerging locations in Kenya.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-3xl space-y-6 text-primary/90"
        >
          <h2 className="text-2xl font-semibold text-primary">Our Mission</h2>
          <p>
            Our mission is simple: to make land ownership accessible, secure and
            profitable for individuals, families and investors.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-primary">
            Our Values
          </h2>
          <p>
            Built on integrity, transparency and professionalism, we have
            established ourselves as a trusted partner in the property market.
            We guide clients through every stage of the land buying process,
            combining deep local market knowledge with a personalized service
            approach tailored to your goals.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
