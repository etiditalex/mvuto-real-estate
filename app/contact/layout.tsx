import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";
import { COMPANY_EMAIL, COMPANY_PHONE_E164, SITE_URL } from "@/lib/site";

const title = "Contact MVUTO Real Estate";
const description =
  "Contact MVUTO Real Estate to buy land on Kenya's Coast. Call +254 798 359 389, email info@mvuto.co.ke, or book a site visit for Kilifi, Diani and Mariakani plots.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/contact",
  keywords: [
    "contact MVUTO Real Estate",
    "buy land Kenya contact",
    "Kilifi land enquiry",
    "book site visit Coast Kenya",
  ],
});

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${SITE_URL}/contact`,
  name: title,
  description,
  mainEntity: {
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#organization`,
    telephone: COMPANY_PHONE_E164,
    email: COMPANY_EMAIL,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ path: "/contact", title, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          contactPageSchema,
        ]}
      />
      {children}
    </>
  );
}
