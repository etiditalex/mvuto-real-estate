"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { propertyImageProps } from "@/lib/images";

const WHO_WE_ARE_IMAGE =
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1788437007/who_we_are_lys4wa.jpg";

const MISSION_IMAGE =
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1788437893/our_mission_loet5i.jpg";

const CORE_VALUES = [
  {
    title: "CLIENT-CENTRIC",
    body: "Your land journey comes first. From first enquiry to title deed, we listen, advise, and stay with you — so every decision feels clear, personal, and well guided.",
  },
  {
    title: "INTEGRITY",
    body: "We deal honestly in every transaction. Titles are verified, terms are stated plainly, and your investment on Kenya's Coast is handled with care you can trust.",
  },
  {
    title: "TRANSPARENCY",
    body: "Clear pricing, open communication, and regular updates. You always know where your plot, paperwork, and payments stand — no surprises, no hidden steps.",
  },
  {
    title: "ACCOUNTABILITY",
    body: "We own the process end to end: site visits, documentation, payments, and handover. If something needs following up, we follow it through until it is done.",
  },
  {
    title: "PROFESSIONALISM",
    body: "Deep Coast-region market knowledge, disciplined service, and a standard that reflects MVUTO — so you feel confident from first viewing to the day you hold your title.",
  },
];

export default function AboutPage() {
  const reduceMotion = useReducedMotion();
  const [hoveredVision, setHoveredVision] = useState<"card" | "image" | null>(null);
  const [hoveredMission, setHoveredMission] = useState<"card" | "image" | null>(null);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const hoverSpring = { type: "spring" as const, stiffness: 280, damping: 22 };

  return (
    <div className="bg-white">
      <section className="w-full bg-white pt-16 lg:pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 px-4 text-center text-3xl font-bold uppercase tracking-[0.12em] text-primary md:text-4xl lg:mb-12 lg:text-5xl"
        >
          Who We Are
        </motion.h1>

        <div className="grid w-full lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center px-4 py-8 sm:px-8 lg:py-12 lg:pl-16 lg:pr-10 xl:pl-24"
          >
            <motion.div
              onHoverStart={() => setHoveredVision("card")}
              onHoverEnd={() => setHoveredVision(null)}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: hoveredVision === "card" ? 1.04 : hoveredVision === "image" ? 0.96 : 1,
                      y: hoveredVision === "card" ? -10 : 0,
                    }
              }
              transition={hoverSpring}
              className={`w-full cursor-pointer overflow-hidden rounded-xl border bg-white ${
                hoveredVision === "card"
                  ? "border-accent shadow-[0_22px_50px_rgba(0,20,71,0.16)]"
                  : "border-primary/10 shadow-sm"
              }`}
            >
              <div
                className={`bg-accent transition-all duration-300 ${
                  hoveredVision === "card" ? "h-2.5" : "h-1.5"
                }`}
                aria-hidden
              />
              <div className="px-8 py-10 lg:px-12 lg:py-14">
                <h2 className="mb-5 text-2xl font-bold text-primary lg:text-3xl">Our Vision</h2>
                <p
                  className={`text-base leading-relaxed lg:text-lg ${
                    hoveredVision === "image" ? "text-primary/45" : "text-primary/70"
                  }`}
                >
                  To be Kenya&apos;s trusted coastal real estate partner — connecting global
                  investors to prime land, secure ownership, and long-term value through
                  integrity, innovation, and personalised service.
                </p>
              </div>
            </motion.div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onHoverStart={() => setHoveredVision("image")}
            onHoverEnd={() => setHoveredVision(null)}
            className="relative min-h-[280px] w-full cursor-pointer overflow-hidden sm:min-h-[420px] lg:min-h-[560px]"
          >
            <motion.div
              className="absolute inset-0"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: hoveredVision === "image" ? 1.08 : hoveredVision === "card" ? 0.97 : 1,
                    }
              }
              transition={hoverSpring}
            >
              <Image
                {...propertyImageProps(WHO_WE_ARE_IMAGE)}
                alt="MVUTO Real Estate team — growing together"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-[#f5f2ed] py-16 lg:py-20">
        <div className="grid w-full items-stretch gap-6 px-4 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:px-12 xl:px-16">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <motion.div
              onHoverStart={() => setHoveredMission("card")}
              onHoverEnd={() => setHoveredMission(null)}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale:
                        hoveredMission === "card" ? 1.04 : hoveredMission === "image" ? 0.96 : 1,
                      y: hoveredMission === "card" ? -10 : 0,
                    }
              }
              transition={hoverSpring}
              className={`w-full cursor-pointer overflow-hidden rounded-xl border bg-white ${
                hoveredMission === "card"
                  ? "border-accent shadow-[0_22px_50px_rgba(0,20,71,0.16)]"
                  : "border-primary/10 shadow-sm"
              }`}
            >
              <div
                className={`bg-accent transition-all duration-300 ${
                  hoveredMission === "card" ? "h-2.5" : "h-1.5"
                }`}
                aria-hidden
              />
              <div className="px-8 py-10 lg:px-12 lg:py-14">
                <h2 className="mb-5 text-2xl font-bold text-primary lg:text-3xl">Our Mission</h2>
                <p
                  className={`text-base leading-relaxed lg:text-lg ${
                    hoveredMission === "image" ? "text-primary/45" : "text-primary/70"
                  }`}
                >
                  To shape a secure future for our clients by opening Kenya&apos;s Coast to
                  accessible land ownership — with verified titles, flexible payment plans, and
                  exceptional guidance from first enquiry to title deed.
                </p>
              </div>
            </motion.div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onHoverStart={() => setHoveredMission("image")}
            onHoverEnd={() => setHoveredMission(null)}
            className={`relative min-h-[280px] cursor-pointer overflow-hidden rounded-xl sm:min-h-[380px] lg:min-h-[460px] ${
              hoveredMission === "image"
                ? "shadow-[0_22px_50px_rgba(0,20,71,0.18)]"
                : "shadow-[0_18px_40px_rgba(0,20,71,0.14)]"
            }`}
          >
            <motion.div
              className="absolute inset-0"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale:
                        hoveredMission === "image" ? 1.08 : hoveredMission === "card" ? 0.97 : 1,
                    }
              }
              transition={hoverSpring}
            >
              <Image
                {...propertyImageProps(MISSION_IMAGE)}
                alt="Our Mission — MVUTO Real Estate"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="w-full bg-white py-16 lg:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="px-4 text-center text-3xl font-bold text-primary md:text-4xl lg:text-5xl"
        >
          Our Core Values
        </motion.h2>
        <div className="mx-auto mt-4 h-1 w-16 bg-accent" aria-hidden />

        <div className="relative mt-12 w-full px-4 sm:mt-16 sm:px-8 lg:px-16 xl:px-24">
          <div
            className="absolute bottom-0 left-[1.75rem] top-0 w-0.5 bg-accent sm:left-[1.9rem] lg:left-1/2 lg:-translate-x-1/2"
            aria-hidden
          />

          <ol className="relative">
            {CORE_VALUES.map((value, index) => {
              const cardOnRight = index % 2 === 0;
              const isHovered = hoveredValue === index;
              const anotherHovered = hoveredValue !== null && !isHovered;

              return (
                <motion.li
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.06 }}
                  onHoverStart={() => setHoveredValue(index)}
                  onHoverEnd={() => setHoveredValue(null)}
                  className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-center py-5 sm:grid-cols-[4rem_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] lg:py-8"
                >
                  <div className="relative z-10 col-start-1 row-start-1 flex justify-center lg:col-start-2">
                    <motion.span
                      animate={
                        reduceMotion
                          ? undefined
                          : { scale: isHovered ? 1.18 : anotherHovered ? 0.9 : 1 }
                      }
                      transition={{ type: "spring", stiffness: 320, damping: 20 }}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-base font-bold text-primary shadow-[0_6px_18px_rgba(231,171,40,0.45)] sm:h-12 sm:w-12 sm:text-lg"
                    >
                      {index + 1}
                    </motion.span>
                  </div>

                  <motion.article
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: isHovered ? 1.05 : anotherHovered ? 0.95 : 1,
                            y: isHovered ? -10 : 0,
                          }
                    }
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className={`relative col-start-2 row-start-1 cursor-pointer rounded-lg border bg-white p-6 sm:p-8 lg:max-w-[36rem] ${
                      isHovered
                        ? "z-20 border-accent shadow-[0_22px_50px_rgba(0,20,71,0.16)]"
                        : "z-0 border-primary/10 shadow-[0_10px_28px_rgba(0,20,71,0.08)]"
                    } ${
                      cardOnRight
                        ? "origin-left lg:col-start-3 lg:justify-self-start lg:pl-10"
                        : "origin-right lg:col-start-1 lg:justify-self-end lg:pr-10"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-0 bg-accent transition-all duration-300 ${
                        isHovered ? "h-[5px] w-14" : "h-[3px] w-10"
                      }`}
                      aria-hidden
                    />
                    <span
                      className={`absolute left-0 top-0 bg-accent transition-all duration-300 ${
                        isHovered ? "h-14 w-[5px]" : "h-10 w-[3px]"
                      }`}
                      aria-hidden
                    />
                    <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-primary">
                      {value.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed lg:text-base ${
                        anotherHovered ? "text-primary/45" : "text-primary/70"
                      }`}
                    >
                      {value.body}
                    </p>
                  </motion.article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}
