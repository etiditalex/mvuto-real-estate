import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";
import { COMPANY_EMAIL } from "@/lib/site";

const title = "Careers at MVUTO";
const description =
  "Work with MVUTO Real Estate Ltd on Kenya's Coast — land sales, client support and project roles. Send your CV if no role is listed.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/careers",
  keywords: ["MVUTO careers", "real estate jobs Kenya Coast", "Kilifi land sales jobs"],
});

export default function CareersPage() {
  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20">
      <JsonLd
        data={[
          webPageSchema({ path: "/careers", title, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Careers", path: "/careers" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Careers</p>
        <h1 className="mt-3 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
          Grow with MVUTO
        </h1>
        <p data-aeo-answer className="mt-4 text-sm leading-relaxed text-primary/75 sm:text-base">
          We are a Kenya Coast land firm. When roles open — sales, client support, or site
          coordination — they will be listed here. There are no advertised vacancies right now.
        </p>
        <p className="mt-4 text-sm text-primary/75 sm:text-base">
          You are welcome to send a CV and a short note to{" "}
          <a href={`mailto:${COMPANY_EMAIL}`} className="font-semibold text-primary underline">
            {COMPANY_EMAIL}
          </a>{" "}
          with the subject “Career enquiry”.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex min-h-11 items-center rounded-md bg-primary px-6 py-3 font-medium text-accent hover:bg-primary/90"
        >
          Contact the team
        </Link>
      </div>
    </div>
  );
}
