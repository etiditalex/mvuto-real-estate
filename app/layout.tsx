import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import JsonLd from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { COMPANY_NAME, DEFAULT_OG_IMAGE, LOGO_URL, SITE_URL } from "@/lib/site";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#001447",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE">
      <body className={`${inter.className} antialiased`}>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-primary"
        >
          Skip to content
        </a>
        <ConditionalLayout>{children}</ConditionalLayout>
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
