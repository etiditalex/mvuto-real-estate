import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import PropertyCard from "@/components/PropertyCard";
import FaqSection from "@/components/seo/FaqSection";
import { EMERGING_FAQS } from "@/lib/seo";
import { fetchEmergingProperties } from "@/lib/properties/getProperties";

export const dynamic = "force-dynamic";

export default async function EmergingLocationsPage() {
  const projects = await fetchEmergingProperties(6);

  return (
    <div className="bg-white">
      <PageHero title="Emerging Locations" />
      <section className="bg-[#f5f2ed] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Growth corridors
          </p>
          <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl">
            Affordable Coast plots with room to grow
          </h2>
          <p data-aeo-answer className="mt-4 max-w-3xl text-sm leading-relaxed text-primary/75 sm:text-base">
            Emerging MVUTO locations sit in rising Coast corridors — including Kibao Kiche and
            Bofa in Kilifi — where entry prices are more accessible and titles are still
            verified. Compare plots below or view the full list for sale.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {projects.length === 0 ? (
            <p className="rounded-xl border border-primary/10 bg-primary/5 px-6 py-10 text-center text-primary/80">
              Emerging listings will appear here shortly.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          <div className="mt-10 text-center">
            <Link
              href="/for-sale"
              className="inline-flex min-h-11 items-center gap-2 rounded-md border-2 border-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-primary hover:bg-accent-blend"
            >
              View all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      <FaqSection faqs={EMERGING_FAQS} title="Emerging Coast land — your questions" />
    </div>
  );
}
