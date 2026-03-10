"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Video,
} from "lucide-react";

const LOGO_URL =
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1771659167/mvuto_real_estate_logo_a5evt8.jpg";

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Get In Touch", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

const exploreLinks = [
  { label: "MVUTO Developments", href: "/developments" },
  { label: "Investment in Kenya", href: "/services/investment" },
  { label: "For Sale", href: "/for-sale" },
  { label: "News", href: "/news" },
  { label: "MVUTO Global", href: "#" },
];

const socialLinks = [
  { label: "TikTok", href: "https://www.tiktok.com/", icon: Video },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/", icon: Facebook },
  { label: "YouTube", href: "https://www.youtube.com/", icon: Youtube },
  { label: "X", href: "https://x.com/", icon: Twitter },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Social */}
          <div className="flex flex-col">
            <div className="mb-6 flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded">
              <Image
                src={LOGO_URL}
                alt="MVUTO Real Estate Ltd"
                width={72}
                height={72}
                className="object-contain"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded border border-white/30 text-white transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/90 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* EXPLORE */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/90 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT US */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+254798359389"
                  className="flex items-start gap-3 text-sm text-white/90 transition-colors hover:text-accent"
                >
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>+254 798 359 389</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@mvuto.co.ke"
                  className="flex items-start gap-3 text-sm text-white/90 transition-colors hover:text-accent"
                >
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>info@mvuto.co.ke</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/90">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>Coast Region, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          © {new Date().getFullYear()} MVUTO Real Estate Ltd. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
