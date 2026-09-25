"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { STATIC_TESTIMONIALS, type StaticTestimonial } from "@/lib/testimonials/catalog";
import { LOGO_URL } from "@/lib/site";
import type { ClientTestimonial } from "@/lib/supabase/types";

const STORED_REVIEWS_KEY = "mvuto-submitted-reviews";

function readStoredReviews(): StaticTestimonial[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORED_REVIEWS_KEY);
    const parsed = raw ? (JSON.parse(raw) as StaticTestimonial[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function storeReview(review: StaticTestimonial) {
  const next = [review, ...readStoredReviews().filter((item) => item.id !== review.id)];
  window.localStorage.setItem(STORED_REVIEWS_KEY, JSON.stringify(next.slice(0, 12)));
}

export default function HomeTestimonials() {
  const [items, setItems] = useState<StaticTestimonial[]>(STATIC_TESTIMONIALS.slice(0, 3));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formNote, setFormNote] = useState("");

  useEffect(() => {
    fetch("/api/content/testimonials", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        const stored = readStoredReviews();
        const fromApi = data.items?.length
          ? (data.items as ClientTestimonial[]).map((item) => ({
              id: item.id,
              name: item.name,
              location: item.location,
              property: item.property,
              rating: item.rating,
              text: item.text,
              image: item.image,
              sort_order: item.sort_order,
            }))
          : STATIC_TESTIMONIALS;
        const seen = new Set<string>();
        const merged = [...stored, ...fromApi].filter((item) => {
          const key = `${item.name}|${item.text}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        setItems(merged.slice(0, 3 + stored.length));
      })
      .catch(() => {});
  }, []);

  const submitReview = async (event: FormEvent) => {
    event.preventDefault();
    setFormError("");
    setFormNote("");
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormError("Name, email, and message are required.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setFormError(data.error || "Could not send your review.");
        return;
      }

      const review: StaticTestimonial = {
        id: data.review?.id ?? Date.now(),
        name: data.review?.name || trimmedName,
        location: data.review?.location || "Client review",
        property: data.review?.property || "MVUTO Real Estate",
        rating: data.review?.rating || 5,
        text: data.review?.text || trimmedMessage,
        image: data.review?.image || LOGO_URL,
        sort_order: 0,
      };
      storeReview(review);
      setItems((current) => [review, ...current.filter((item) => item.text !== review.text || item.name !== review.name)]);
      setName("");
      setEmail("");
      setMessage("");
      setFormNote("Thank you. Your review is now in the testimonials above.");
    } catch {
      setFormError("Could not send your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#f5f2ed] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold text-primary lg:text-4xl">What Clients Say</h2>
            <p className="mt-2 max-w-xl text-primary/70">
              Families and investors who bought Coast-region land with MVUTO.
            </p>
          </div>
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 font-medium text-primary hover:text-accent"
          >
            All testimonials <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-xl border border-primary/10 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="line-clamp-4 text-sm leading-relaxed text-primary/75">
                &ldquo;{item.text}&rdquo;
              </p>
              <p className="mt-4 font-bold text-primary">{item.name}</p>
              <p className="text-xs text-primary/50">
                {item.property} · {item.location}
              </p>
            </motion.article>
          ))}
        </div>

        <form onSubmit={submitReview} className="mx-auto mt-14 max-w-3xl">
          <p className="text-base font-semibold leading-relaxed text-primary sm:text-lg">
            Please fill in the form below to share your experience with MVUTO. Thank you for your
            great, unwavering support
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <label className="block text-sm font-medium uppercase tracking-wide text-primary">
              Name *
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full border border-primary/30 bg-[#f7f7f7] px-3 py-3 text-base normal-case tracking-normal text-primary outline-none focus:border-primary"
              />
            </label>
            <label className="block text-sm font-medium uppercase tracking-wide text-primary">
              Email *
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full border border-primary/30 bg-[#f7f7f7] px-3 py-3 text-base normal-case tracking-normal text-primary outline-none focus:border-primary"
              />
            </label>
          </div>
          <label className="mt-8 block text-sm font-medium text-primary">
            Your Message
            <textarea
              required
              rows={7}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="mt-2 w-full resize-y border border-primary/30 bg-[#f7f7f7] px-3 py-3 text-base text-primary outline-none focus:border-primary"
            />
          </label>
          {formError ? <p className="mt-4 text-sm text-red-700">{formError}</p> : null}
          {formNote ? <p className="mt-4 text-sm text-primary">{formNote}</p> : null}
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 rounded-md bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-primary/90 disabled:opacity-60"
          >
            {submitting ? "Sending" : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
}
