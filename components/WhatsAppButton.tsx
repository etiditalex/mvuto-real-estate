"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { COMPANY_WHATSAPP } from "@/lib/site";

const WHATSAPP_URL = `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(
  "Hello MVUTO Real Estate, I would like help choosing a coastal plot."
)}`;

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 z-50 sm:bottom-8 sm:right-6">
      {open ? (
        <div className="mb-3 w-[min(100vw-2rem,320px)] rounded-2xl border border-primary/10 bg-white p-4 shadow-2xl">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-bold text-primary">MVUTO Real Estate</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-primary hover:bg-accent-blend"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-primary/75">
            Hello. Ask about coastal plots, a payment plan, or a site visit. We reply on WhatsApp.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-bold text-primary hover:bg-accent-blend"
          >
            <MessageCircle className="h-4 w-4" />
            Continue on WhatsApp
          </a>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Chat with MVUTO"}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-accent shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
      </button>
    </div>
  );
}
