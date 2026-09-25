"use client";

import { useEffect, useState, type FormEvent } from "react";
import { User } from "lucide-react";
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

function mapItem(item: ClientTestimonial | StaticTestimonial): StaticTestimonial {
  return {
    id: item.id,
    name: item.name,
    location: item.location,
    property: item.property,
    rating: item.rating,
    text: item.text,
    image: item.image,
    sort_order: item.sort_order,
  };
}

export default function TestimonialsPage() {
  const [items, setItems] = useState<StaticTestimonial[]>(STATIC_TESTIMONIALS);
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
          ? (data.items as ClientTestimonial[]).map(mapItem)
          : STATIC_TESTIMONIALS;
        const seen = new Set<string>();
        const merged = [...stored, ...fromApi].filter((item) => {
          const key = `${item.name}|${item.text}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        setItems(merged);
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
      setItems((current) => [
        review,
        ...current.filter((item) => item.text !== review.text || item.name !== review.name),
      ]);
      setName("");
      setEmail("");
      setMessage("");
      setFormNote("Thank you. Your review is now with the others below.");
    } catch {
      setFormError("Could not send your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f5f2ed]">
      <section id="review" className="scroll-mt-24 border-b border-primary/10 bg-white py-10 lg:py-14">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h1 className="text-3xl font-bold text-primary lg:text-4xl">Share your experience</h1>
          <form onSubmit={submitReview} className="mt-6">
            <p className="text-base font-semibold leading-relaxed text-primary sm:text-lg">
              Tell us about buying land with MVUTO. This page can be shared with clients who want to
              leave a review.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
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
            <label className="mt-6 block text-sm font-medium text-primary">
              Your Message
              <textarea
                required
                rows={5}
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

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-primary lg:text-3xl">What clients say</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article key={item.id} className="bg-[#f3f3f3] px-6 py-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    <User size={26} strokeWidth={2.25} />
                  </span>
                  <h3 className="text-lg font-bold text-primary">{item.name}</h3>
                </div>
                <p className="mt-5 text-base leading-relaxed text-neutral-900">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
