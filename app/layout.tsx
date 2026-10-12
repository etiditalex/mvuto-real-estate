import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { COMPANY_NAME, DEFAULT_OG_IMAGE, LOGO_URL, SITE_URL } from "@/lib/site";
import { EXPIRED_BANNER, EXPIRED_HEADING } from "@/lib/site/availability";
import { fetchSiteAvailability } from "@/lib/site/fetchSiteAvailability";

const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#001447",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Land for Sale Kenya Coast | Kilifi, Diani & Mariakani Plots | MVUTO",
    template: "%s | MVUTO Real Estate Ltd",
  },
  description:
    "Buy titled land on Kenya's Coast with MVUTO Real Estate. Plots for sale in Kilifi, Diani, Mariakani and Bofa — verified titles, flexible payment plans, and guidance to title deed.",
  keywords: [
    "MVUTO Real Estate",
    "land for sale Kenya",
    "plots for sale Kenya Coast",
    "land for sale Kilifi",
    "land for sale Diani",
    "Mariakani plots for sale",
    "Bofa land for sale",
    "titled land Kenya",
    "buy land Kenya payment plan",
    "Kenya Coast real estate",
  ],
  authors: [{ name: COMPANY_NAME, url: SITE_URL }],
  creator: COMPANY_NAME,
  publisher: COMPANY_NAME,
  category: "Real Estate",
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE_URL,
    siteName: COMPANY_NAME,
    title: "Land for Sale Kenya Coast | MVUTO Real Estate",
    description:
      "Titled plots for sale in Kilifi, Diani, Mariakani and Bofa. Flexible payment plans from MVUTO Real Estate Ltd.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "MVUTO Real Estate — land for sale on Kenya's Coast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Land for Sale Kenya Coast | MVUTO Real Estate",
    description:
      "Titled plots for sale in Kilifi, Diani, Mariakani and Bofa. Flexible payment plans from MVUTO.",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: LOGO_URL,
    apple: LOGO_URL,
  },
  appleWebApp: { capable: true, title: "MVUTO Real Estate" },
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
};

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  if (headerStore.get("x-mvuto-site-expired") !== "1") return siteMetadata;

  if (headerStore.get("x-mvuto-offline-mode") === "not-found") {
    return {
      ...siteMetadata,
      title: { absolute: "Page not found" },
      description: "This page could not be found.",
      robots: { index: false, follow: false },
    };
  }

  return {
    ...siteMetadata,
    title: { absolute: EXPIRED_HEADING },
    description: EXPIRED_BANNER,
    robots: { index: false, follow: false },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { publicDisabled } = await fetchSiteAvailability();
  const headerStore = await headers();
  const offlineMode =
    headerStore.get("x-mvuto-site-expired") === "1"
      ? headerStore.get("x-mvuto-offline-mode") === "not-found"
        ? "not-found"
        : "expired"
      : "online";

  return (
    <html lang="en-KE">
      <head>
        {/* Google tag (gtag.js) — one tag for every page via the root layout */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CMG2JFNFP7" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CMG2JFNFP7');`,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {!publicDisabled && <JsonLd data={[organizationSchema(), websiteSchema()]} />}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-primary"
        >
          Skip to content
        </a>
        <ConditionalLayout offlineMode={offlineMode}>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
