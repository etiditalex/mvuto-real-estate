"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import type { CatalogProperty } from "@/lib/properties/catalog";
import { getPaymentField, propertyPublicPath } from "@/lib/properties/catalog";
import { formatKes } from "@/lib/admin/utils";
import { propertyImageProps } from "@/lib/images";
import { COMPANY_WHATSAPP } from "@/lib/site";

export default function PropertyCard({
  property,
  showEnquire = false,
}: {
  property: CatalogProperty;
  showEnquire?: boolean;
}) {
  const deposit = getPaymentField(property.paymentPlan, ["Deposit"]);
  const installments = getPaymentField(property.paymentPlan, ["Installments"]);
  const href = propertyPublicPath(property);
  const image = property.image;
  const enquireHref = `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(
    `Hello MVUTO Real Estate, I am interested in ${property.title}. Please share more details.`
  )}`;

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-primary/5 transition-shadow hover:shadow-xl">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-primary/5">
        {image ? (
          <Image
            {...propertyImageProps(image)}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary/60">
            <span className="text-lg font-medium">Image coming soon</span>
          </div>
        )}
        <span className="absolute left-0 top-4 bg-accent px-3 py-1 text-xs font-bold tracking-wide text-primary shadow-md">
          {formatKes(property.price)}
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/85 via-primary/40 to-transparent px-4 pb-3 pt-10 text-white">
          <p className="text-sm font-semibold uppercase tracking-wide">{property.title}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-white/85">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {property.location}
          </p>
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-4 py-4">
        <h3 className="text-base font-bold text-primary">
          <Link href={href} className="hover:text-accent">
            {property.title}
          </Link>
        </h3>
        {(deposit || installments) && (
          <p className="mt-1 text-xs text-primary/60">
            {deposit ? `Deposit ${formatKes(deposit)}` : null}
            {deposit && installments ? " · " : null}
            {installments ? `Balance in ${installments}` : null}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-primary"
          >
            View details
            <ArrowRight className="h-4 w-4" />
          </Link>
          {showEnquire ? (
            <a
              href={enquireHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent"
            >
              <MessageCircle className="h-4 w-4" />
              Enquire
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
