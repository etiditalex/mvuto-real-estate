import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { fetchPropertyDetail } from "@/lib/properties/getProperties";
import { getPaymentField } from "@/lib/properties/catalog";
import { formatKes } from "@/lib/admin/utils";
import { propertyImageProps } from "@/lib/images";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = await fetchPropertyDetail(id);
  if (!property) return { title: "Property not found" };
  return {
    title: property.title,
    description: `${property.title} in ${property.location}. ${formatKes(property.price)}.`,
  };
}

export default async function PropertyForSalePage({ params }: PageProps) {
  const { id } = await params;
  const property = await fetchPropertyDetail(id);

  if (!property) {
    notFound();
  }

  const deposit = getPaymentField(property.paymentPlan, ["Deposit"]);
  const installments = getPaymentField(property.paymentPlan, ["Installments"]);
  const image = property.image;
  const enquireHref = `/contact?property=${encodeURIComponent(property.slug)}&property_name=${encodeURIComponent(property.title)}&property_id=${property.id}`;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <Link
          href="/for-sale"
          className="mb-8 inline-flex items-center gap-2 text-primary/80 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to properties for sale
        </Link>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-primary/5 lg:aspect-[3/2]">
            {image ? (
              <Image
                {...propertyImageProps(image)}
                alt={property.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary/60">
                <span className="text-lg font-medium">Image coming soon</span>
              </div>
            )}
          </div>

          <div>
            <h1 className="mb-4 text-3xl font-bold text-primary lg:text-4xl">
              {property.h1 || property.title}
            </h1>
            <p className="mb-6 flex items-center gap-2 text-primary/70">
              <MapPin className="h-5 w-5 shrink-0 text-primary/60" />
              {property.location}
            </p>

            <div className="mb-8 space-y-4 rounded-xl border border-primary/10 bg-primary/5 p-6">
              <div className="flex justify-between border-b border-primary/10 pb-3">
                <span className="text-primary/70">Price</span>
                <span className="text-xl font-semibold text-primary">{formatKes(property.price)}</span>
              </div>
              {deposit ? (
                <div className="flex justify-between border-b border-primary/10 pb-3">
                  <span className="text-primary/70">Deposit</span>
                  <span className="font-medium text-primary">{formatKes(deposit)}</span>
                </div>
              ) : null}
              {installments ? (
                <p className="text-sm text-primary/60">Balance payable in {installments}.</p>
              ) : null}
            </div>

            <p className="mb-8 text-primary/80">
              {property.description ||
                "Prime land in a high-growth location. This offering is part of our verified, legally compliant portfolio with flexible payment plans to suit your investment goals."}
            </p>

            {property.features && property.features.length > 0 ? (
              <ul className="mb-8 list-disc space-y-1 pl-5 text-sm text-primary/80">
                {property.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            ) : null}

            <Link
              href={enquireHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 font-medium text-accent transition-colors hover:bg-primary/90 sm:w-auto"
            >
              Enquire now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
