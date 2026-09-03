import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://mvuto.co.ke";
const LOGO_URL =
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1771659167/mvuto_real_estate_logo_a5evt8.jpg";

export const viewport: Viewport = {
  themeColor: "#001447",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MVUTO Real Estate Ltd | Land & Property in Kenya | Coast Region",
    template: "%s | MVUTO Real Estate Ltd",
  },
  description:
    "MVUTO Real Estate Ltd is a leading Kenyan real estate firm specializing in land acquisition, property advisory and investment facilitation across prime and emerging locations in Kenya. Explore properties for sale, developments and expert guidance.",
  keywords: [
    "MVUTO Real Estate",
    "Kenya real estate",
    "land for sale Kenya",
    "property Kenya",
    "Coast region property",
    "land acquisition Kenya",
    "Kilifi property",
    "Mombasa real estate",
  ],
  authors: [{ name: "MVUTO Real Estate Ltd", url: SITE_URL }],
  creator: "MVUTO Real Estate Ltd",
  publisher: "MVUTO Real Estate Ltd",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE_URL,
    siteName: "MVUTO Real Estate Ltd",
    title: "MVUTO Real Estate Ltd | Land & Property in Kenya",
    description:
      "Leading Kenyan real estate firm. Land for sale, property advisory and investment across prime Coast region locations.",
    images: [
      {
        url: LOGO_URL,
        width: 512,
        height: 512,
        alt: "MVUTO Real Estate Ltd",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MVUTO Real Estate Ltd | Land & Property in Kenya",
    description:
      "Leading Kenyan real estate firm. Land for sale, property advisory and investment across prime Coast region locations.",
    images: [LOGO_URL],
  },
  icons: {
    icon: LOGO_URL,
    apple: LOGO_URL,
  },
  appleWebApp: { capable: true, title: "MVUTO Real Estate" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "MVUTO Real Estate Ltd",
  url: SITE_URL,
  logo: LOGO_URL,
  description:
    "Leading Kenyan real estate firm specializing in land acquisition, property advisory and investment across prime and emerging locations in Kenya.",
  areaServed: { "@type": "Place", name: "Kenya" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+254-798-359-389",
    email: "info@mvuto.co.ke",
    contactType: "customer service",
    areaServed: "KE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
