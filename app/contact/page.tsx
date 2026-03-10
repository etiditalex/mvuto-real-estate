"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-3xl font-bold text-primary lg:text-4xl">
            Contact Us
          </h1>
          <p className="mx-auto max-w-2xl text-primary/80">
            Get in touch with our team for personalized real estate guidance and
            exclusive access to prime properties across Kenya.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl bg-primary p-8 text-white"
          >
            <h2 className="mb-6 text-xl font-semibold text-accent">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <a
                href="tel:+254725111444"
                className="flex items-center gap-4 transition-colors hover:text-accent"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Phone</p>
                  <p className="font-medium">+254 725 111 444</p>
                </div>
              </a>
              <a
                href="mailto:info@mvuorealestate.co.ke"
                className="flex items-center gap-4 transition-colors hover:text-accent"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <p className="font-medium">info@mvuorealestate.co.ke</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Location</p>
                  <p className="font-medium">Kenya</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-primary/10 bg-white p-8 shadow-sm"
          >
            <h2 className="mb-6 text-xl font-semibold text-primary">
              Send a Message
            </h2>
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-primary"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-primary/20 px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-primary"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-primary/20 px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-primary"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full rounded-lg border border-primary/20 px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  placeholder="+254 XXX XXX XXX"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-primary"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-primary/20 px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                  placeholder="Tell us about your property needs..."
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-primary py-3 font-medium text-accent transition-colors hover:bg-primary/90"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
