"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { faqPageSchema, type FaqItem } from "@/lib/seo";

type FaqSectionProps = {
  title?: string;
  faqs: FaqItem[];
  className?: string;
};

export default function FaqSection({
  title = "Frequently asked questions",
  faqs,
  className = "",
}: FaqSectionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs.length) return null;

  return (
    <section className={`bg-[#f5f2ed] py-14 lg:py-20 ${className}`} aria-labelledby={`${baseId}-heading`}>
      <JsonLd data={faqPageSchema(faqs)} />
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <h2
          id={`${baseId}-heading`}
          className="text-center text-2xl font-bold text-primary sm:text-3xl"
        >
          {title}
        </h2>
        <div className="mx-auto mt-3 h-1 w-14 bg-accent" aria-hidden />
        <ul className="mt-8 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            return (
              <li
                key={faq.question}
                className="overflow-hidden rounded-xl border border-primary/10 bg-white"
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex min-h-12 w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                >
                  <span className="text-sm font-semibold text-primary sm:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-accent transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-4 pb-4 sm:px-5"
                >
                  <p data-aeo-answer className="text-sm leading-relaxed text-primary/75 sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
