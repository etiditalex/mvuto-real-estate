"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Phone, ChevronDown, Menu, X, MessageCircle, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY_PHONE_E164, COMPANY_WHATSAPP, LOGO_URL } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/for-sale", label: "For Sale" },
  {
    href: "/developments",
    label: "Developments",
    dropdown: [
      { href: "/developments/prime", label: "Prime Locations" },
      { href: "/developments/emerging", label: "Emerging Locations" },
    ],
  },
  { href: "/about", label: "About Us" },
  {
    href: "/insights",
    label: "Insights",
    dropdown: [
      { href: "/blog", label: "Blog" },
      { href: "/news", label: "News Updates" },
      { href: "/market-research", label: "Market Research" },
    ],
  },
  { href: "/testimonials", label: "Testimonials" },
  {
    href: "/services",
    label: "Services",
    dropdown: [
      { href: "/services/land-sales", label: "Land Sales & Marketing" },
      { href: "/services/acquisition", label: "Land Acquisition" },
      { href: "/services/investment", label: "Investment Guidance" },
      { href: "/services/due-diligence", label: "Due Diligence" },
      { href: "/services/support", label: "Client Support" },
    ],
  },
];

const utilityLinks = [
  { href: "/news", label: "News Updates" },
  { href: "/careers", label: "Careers" },
  { href: "/testimonials", label: "Testimonials" },
];

export default function Header() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string, dropdown?: { href: string }[]) => {
    if (href === "/") return pathname === "/";
    if (dropdown?.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))) {
      return true;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-primary text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 lg:px-8">
          <div className="flex items-center gap-2">
            <a
              href={`tel:${COMPANY_PHONE_E164}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary sm:text-sm"
            >
              <Phone className="h-3.5 w-3.5" />
              Call Us
            </a>
            <a
              href={`https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent("Hello MVUTO Real Estate, I would like help choosing a coastal plot.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-accent px-3 py-1 text-xs font-semibold text-accent sm:text-sm"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Chat With Us
            </a>
          </div>
          <nav aria-label="Secondary" className="hidden items-center gap-5 text-sm text-white/90 md:flex">
            {utilityLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-accent">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-b border-primary/10 bg-white">
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded lg:h-16 lg:w-16">
              <Image
                src={LOGO_URL}
                alt="Mvuto Real Estate Ltd"
                width={56}
                height={56}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden items-center gap-5 xl:flex 2xl:gap-8">
            {navLinks.map((link) =>
              "dropdown" in link && link.dropdown ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent ${
                      isActive(link.href, link.dropdown) ? "text-accent" : "text-primary"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        openDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </Link>
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full pt-2"
                      >
                        <div className="min-w-[220px] rounded-lg border border-primary/10 bg-white py-2 shadow-xl">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-primary transition-colors hover:bg-accent-blend hover:text-primary"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors hover:text-accent ${
                    isActive(link.href, "dropdown" in link ? link.dropdown : undefined)
                      ? "text-accent"
                      : "text-primary"
                  }`}
                >
                  {link.label}
                  {isActive(link.href, "dropdown" in link ? link.dropdown : undefined) && (
                    <motion.span
                      layoutId="navbar-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/for-sale#property-search"
              className="flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-accent-blend hover:text-accent"
              aria-label="Search properties"
            >
              <Search className="h-5 w-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-11 w-11 items-center justify-center text-primary xl:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-h-[min(80vh,calc(100dvh-7rem))] overflow-y-auto overflow-x-hidden border-t border-primary/10 xl:hidden"
            >
              <div className="space-y-1 px-4 py-4">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block min-h-11 rounded-lg px-4 py-3 ${
                        isActive(link.href, "dropdown" in link ? link.dropdown : undefined)
                          ? "bg-accent-blend font-semibold text-primary"
                          : "text-primary hover:bg-primary/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {"dropdown" in link &&
                      link.dropdown?.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="ml-6 block py-2 text-sm text-primary/70 hover:text-accent"
                        >
                          {item.label}
                        </Link>
                      ))}
                  </div>
                ))}
                {utilityLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-4 py-2 text-sm text-primary/70 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
