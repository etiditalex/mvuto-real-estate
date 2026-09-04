import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, buildMetadata, webPageSchema } from "@/lib/seo";
import { COMPANY_EMAIL, COMPANY_NAME, COMPANY_PHONE_DISPLAY } from "@/lib/site";

const title = "Privacy Policy";
const description =
  "How MVUTO Real Estate Ltd collects and uses enquiry, contact and site-visit information when you browse land for sale on Kenya's Coast.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/privacy",
  keywords: ["MVUTO privacy policy", "Kenya real estate privacy"],
});

export default function PrivacyPage() {
  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20">
      <JsonLd
        data={[
          webPageSchema({ path: "/privacy", title, description }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy" },
          ]),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 lg:px-8">
        <h1 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-primary/55">Last updated: 4 September 2026</p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-primary/80 sm:text-base">
          <p>
            {COMPANY_NAME} (“MVUTO”, “we”) operates mvuto.co.ke to market titled land on Kenya’s
            Coast and to handle buyer enquiries.
          </p>
          <h2 className="text-lg font-bold text-primary">Information we collect</h2>
          <p>
            When you use the contact form or enquire about a plot, we collect your name, email,
            phone number, message, and any property you selected. Server logs may include your IP
            address and browser type for security and diagnostics.
          </p>
          <h2 className="text-lg font-bold text-primary">How we use it</h2>
          <p>
            We use this information to respond to enquiries, arrange site visits, follow up on
            payment-plan questions, and improve the website. We do not sell your details to third
            parties for their marketing.
          </p>
          <h2 className="text-lg font-bold text-primary">Sharing</h2>
          <p>
            We may share data with service providers that host the site or send email on our
            behalf, and with authorities if required by Kenyan law. Payment and title processes
            may require sharing details with lawyers or conveyancers you appoint.
          </p>
          <h2 className="text-lg font-bold text-primary">Retention and your rights</h2>
          <p>
            We keep enquiry records for as long as needed to complete a transaction or handle
            follow-up, then delete or anonymise them where practical. You may request access,
            correction, or deletion of your personal data by emailing {COMPANY_EMAIL} or calling{" "}
            {COMPANY_PHONE_DISPLAY}.
          </p>
          <h2 className="text-lg font-bold text-primary">Cookies</h2>
          <p>
            The site uses essential cookies to run the service. If we add optional analytics, we
            will only load them when configured, and you can control cookies in your browser.
          </p>
        </div>
      </article>
    </div>
  );
}
