"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, User } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState(0);

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
      setItems((current) => [review, ...current.filter((item) => item.text !== review.text || item.name !== review.name)]);
      setActiveIndex(0);
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
        {items.length > 0 ? (
          <div className="mx-auto max-w-4xl">
            <article className="bg-[#f3f3f3] px-6 py-8 sm:px-10 sm:py-10">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <User size={26} strokeWidth={2.25} />
                </span>
                <h3 className="text-lg font-bold text-primary sm:text-xl">
                  {items[activeIndex % items.length]?.name}
                </h3>
              </div>
              <p className="mt-5 text-base leading-relaxed text-neutral-900 sm:text-[17px]">
                {items[activeIndex % items.length]?.text}
              </p>
            </article>
            {items.length > 1 ? (
              <div className="mt-5 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setActiveIndex((index) => (index - 1 + items.length) % items.length)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-white text-primary hover:bg-primary hover:text-white"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
                  {items.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={index === activeIndex}
                      aria-label={`Show review from ${item.name}`}
                      onClick={() => setActiveIndex(index)}
                      className={`h-2.5 rounded-full transition ${
                        index === activeIndex ? "w-6 bg-primary" : "w-2.5 bg-primary/25"
                      }`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveIndex((index) => (index + 1) % items.length)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-white text-primary hover:bg-primary hover:text-white"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

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
