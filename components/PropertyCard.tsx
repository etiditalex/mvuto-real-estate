"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { CatalogProperty } from "@/lib/properties/catalog";
import { getPaymentField, propertyPublicPath } from "@/lib/properties/catalog";
import { formatKes } from "@/lib/admin/utils";
import { propertyImageProps } from "@/lib/images";

export default function PropertyCard({ property }: { property: CatalogProperty }) {
  const deposit = getPaymentField(property.paymentPlan, ["Deposit"]);
  const installments = getPaymentField(property.paymentPlan, ["Installments"]);
  const href = propertyPublicPath(property);
  const image = property.image;

  return (
    <article className="group overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-primary/5">
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
      </div>
      <div className="p-5">
        <h2 className="mb-2 text-xl font-semibold text-primary">{property.title}</h2>
        <p className="mb-4 flex items-center gap-2 text-sm text-primary/70">
          <MapPin className="h-4 w-4 shrink-0" />
          {property.location}
        </p>
        <div className="mb-4 space-y-1 border-t border-primary/10 pt-4">
          <p className="flex justify-between text-sm">
            <span className="text-primary/70">Price</span>
            <span className="font-semibold text-primary">{formatKes(property.price)}</span>
          </p>
          {deposit ? (
            <p className="flex justify-between text-sm">
              <span className="text-primary/70">Deposit</span>
              <span className="font-medium text-primary">{formatKes(deposit)}</span>
            </p>
          ) : null}
          {installments ? (
            <p className="text-xs text-primary/60">Balance in {installments}</p>
          ) : null}
        </div>
        <Link
          href={href}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 font-medium text-accent transition-colors hover:bg-primary/90"
        >
          View details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
