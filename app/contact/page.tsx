"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-primary/60">Loading…</div>}>
      <ContactForm />
    </Suspense>
  );
}

function ContactForm() {
  const searchParams = useSearchParams();
  const propertyName = searchParams.get("property_name") || "";
  const propertySlug = searchParams.get("property") || "";
  const propertyId = searchParams.get("property_id") || "";

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const message = String(data.get("message") || "");
    const subject = propertyName ? `Enquiry: ${propertyName}` : "Website contact";

    try {
      const inquiryRes = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message: propertyName ? `${message}\n\nProperty: ${propertyName}` : message,
          source: "contact_form",
        }),
      });

      if (propertyName && phone) {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone,
            property_id: propertyId ? Number(propertyId) : null,
            property_name: propertyName,
            message,
            source: "contact_form",
          }),
        });
      }

      if (!inquiryRes.ok) {
        const body = await inquiryRes.json().catch(() => ({}));
        throw new Error(body.error || "Could not send message");
      }

      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send message");
    }
  };

  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-3xl font-bold text-primary lg:text-4xl">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-primary/80">
            Get in touch with our team for personalized real estate guidance and exclusive access to
            prime properties across Kenya.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl bg-primary p-8 text-white"
          >
            <h2 className="mb-6 text-xl font-semibold text-accent">Get in Touch</h2>
            <div className="space-y-6">
              <a
                href="tel:+254725111444"
                className="flex items-center gap-4 transition-colors hover:text-accent"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-blend">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Phone</p>
                  <p className="font-medium">+254 725 111 444</p>
                </div>
              </a>
              <a
                href="mailto:info@mvuto.co.ke"
                className="flex items-center gap-4 transition-colors hover:text-accent"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-blend">
                  <Mail className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <p className="font-medium">info@mvuto.co.ke</p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-blend">
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
            <h2 className="mb-6 text-xl font-semibold text-primary">Send a Message</h2>
            {propertyName ? (
              <p className="mb-4 rounded-lg bg-accent-blend/50 px-3 py-2 text-sm text-primary">
                Enquiring about <strong>{propertyName}</strong>
                {propertySlug ? ` (${propertySlug})` : ""}
              </p>
            ) : null}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-primary">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-primary/20 px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-blend"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-primary">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-primary/20 px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-blend"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-primary">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full rounded-lg border border-primary/20 px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-blend"
                  placeholder="+254 XXX XXX XXX"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-primary">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full rounded-lg border border-primary/20 px-4 py-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-blend"
                  placeholder="Tell us about your property needs..."
                />
              </div>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              {status === "sent" ? (
                <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  Message sent. Our team will get back to you shortly.
                </p>
              ) : null}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-md bg-primary py-3 font-medium text-accent transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
