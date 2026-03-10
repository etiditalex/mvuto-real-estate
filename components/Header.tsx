"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL =
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1771659167/mvuto_real_estate_logo_a5evt8.jpg";

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

export default function Header() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-primary">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
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
                  className={`flex items-center gap-1 transition-colors hover:text-accent ${
                    isActive(link.href) ? "text-accent" : "text-white/90"
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
                      <div className="min-w-[200px] rounded-lg border border-white/10 bg-primary/95 py-2 shadow-xl backdrop-blur-sm">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-white/90 transition-colors hover:bg-accent-blend hover:text-accent"
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
                className={`relative transition-colors hover:text-accent ${
                  isActive(link.href) ? "text-accent" : "text-white/90"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
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

        {/* Contact + CTA */}
        <div className="hidden items-center gap-6 lg:flex">
          <a
            href="tel:+254798359389"
            className="flex items-center gap-2 text-white/90 transition-colors hover:text-accent"
          >
            <Phone className="h-5 w-5 text-accent" />
            <span>0798 359389</span>
          </a>
          <Link
            href="/contact"
            className="rounded-md bg-accent px-6 py-2.5 font-medium text-primary transition-colors hover:bg-accent-blend"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-lg px-4 py-3 ${
                      isActive(link.href)
                        ? "bg-accent-blend text-accent"
                        : "text-white/90 hover:bg-white/5"
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
                        className="ml-6 block py-2 text-sm text-white/70 hover:text-accent"
                      >
                        {item.label}
                      </Link>
                    ))}
                </div>
              ))}
              <a
                href="tel:+254798359389"
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-white/90"
              >
                <Phone className="h-5 w-5 text-accent" />
                0798 359389
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 block rounded-lg bg-accent px-4 py-3 text-center font-medium text-primary"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
