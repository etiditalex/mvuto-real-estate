"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Award,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  FileText,
  Heart,
  Home,
  Map,
  MapPin,
  MessageCircle,
  Users,
} from "lucide-react";
import HomeTestimonials from "@/components/HomeTestimonials";
import type { CatalogProperty } from "@/lib/properties/catalog";
import { COMPANY_WHATSAPP } from "@/lib/site";
import { STATIC_NEWS_CATALOG } from "@/lib/news/catalog";
import { formatKes } from "@/lib/admin/utils";
import { propertyImageProps } from "@/lib/images";

const COASTAL_AREAS = ["Chumani", "Mariakani", "Kaloleni", "Diani", "Bofa", "Kibao Kiche"] as const;

const PLOT_FINDER_POINTS = [
  "Verified titles for buyers",
  "A deposit, then monthly instalments",
  "Projects from Kilifi to Diani",
  "Flexible 12-month payment plans",
];

const HERO_IMAGE_URL =
  "https://res.cloudinary.com/dyfnobo9r/image/upload/v1771828649/hero_photo_fpus31.jpg";

const HERO_SLIDES: { image: string; title: ReactNode; text: string; href: string; cta: string }[] = [
  {
    image: HERO_IMAGE_URL,
    title: (
      <>
        Coastal&apos;s Gate to <span className="text-accent">Real Estate</span>
      </>
    ),
    text: "We Connect Global Investors to Coastal's Property Market through Trust, Innovation, and Personalized Service & Partnership, Delivering Luxury Homes & Long-term Value Across the Continent.",
    href: "/for-sale",
    cta: "Discover More",
  },
  {
    image: "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Chumani_project_xbvsj7.jpg",
    title: "Chumani Project",
    text: "Titled plots in Kilifi County. A deposit from KES 200,000, then 12 monthly instalments.",
    href: "/for-sale/chumani",
    cta: "View this project",
  },
  {
    image: "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773041195/Diani_project_nugmc5.jpg",
    title: "Diani Project",
    text: "South Coast plots from KES 1.95M, with a deposit and monthly instalments.",
    href: "/for-sale/diani",
    cta: "View this project",
  },
  {
    image: "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Mariakani_Bypass_qqjx8n.jpg",
    title: "Mariakani Bypass",
    text: "An accessible Coast listing. Open plots here begin at KES 350,000.",
    href: "/for-sale/mariakani-bypass",
    cta: "View this project",
  },
];

function matchesArea(property: CatalogProperty, area: string) {
  if (!area) return true;
  return `${property.title} ${property.location}`.toLowerCase().includes(area.toLowerCase());
}

const whyMVuto: { title: string; description: ReactNode; icon: typeof Home }[] = [
  {
    title: "Wide range of properties",
    description: "We Offer A Wide Variety of Property Investment Opportunities.",
    icon: Home,
  },
  {
    title: "Financing made easy",
    description: (
      <>
        Our Finance Department Finds Financial Solutions to Help you Invest{" "}
        <span className="font-semibold text-accent">Safely and Correctly</span>.
      </>
    ),
    icon: CircleDollarSign,
  },
  {
    title: "Trusted by hundreds",
    description: (
      <>
        Over <span className="font-semibold text-accent">800</span> Clients and{" "}
        <span className="font-semibold text-accent">Five</span> Delivered Projects.{" "}
        <span className="font-semibold text-accent">Four</span> International Branches.
      </>
    ),
    icon: Heart,
  },
  {
    title: "Invest in a partnership",
    description: "With Property Investment at MVUTO You Get a Trusted Partner Committed to Your Success.",
    icon: FileText,
  },
  {
    title: "Transparency",
    description: "Always Stay Informed about Your Investment. We Keep You Updated Every Step of the Way.",
    icon: ClipboardList,
  },
  {
    title: "Prime locations",
    description: "Every Project is Carefully Hand-Picked to Offer the Best Value and Growth Potential.",
    icon: Map,
  },
];

const stats = [
  { value: "800+", label: "Clients", icon: Users },
  { value: "5", label: "Delivered projects", icon: Building2 },
  { value: "4", label: "International branches", icon: Award },
];

const HEARD_OPTIONS = ["Facebook", "Instagram", "TikTok", "Google Search", "Referral / Friend", "Other"];

function CoastalPlotFinder({ area, onArea }: { area: string; onArea: (area: string) => void }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const visibleAreas = expanded ? COASTAL_AREAS : COASTAL_AREAS.slice(0, 4);
  const hiddenCount = COASTAL_AREAS.length - 4;

  const browsePlots = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (area) params.set("q", area);
    router.push(params.toString() ? `/for-sale?${params}` : "/for-sale");
  };

  return (
    <section id="find-a-plot" aria-labelledby="find-a-plot-heading" className="bg-white px-4 py-12 lg:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="find-a-plot-heading" className="text-3xl font-bold text-accent lg:text-[2.1rem]">
          Find a coastal plot that matches your plan.
        </h2>
        <p className="mt-3 text-sm text-primary/70 sm:text-base">
          MVUTO Real Estate connects buyers to verified titled land on Kenya&apos;s Coast. Open listings begin at{" "}
          <strong className="text-primary">KES 350,000</strong>. Tap a location to see the matching plots.
        </p>

        <form role="search" aria-label="Find plots by area" onSubmit={browsePlots} className="mt-7">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {visibleAreas.map((name) => {
              const selected = area === name;
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onArea(selected ? "" : name)}
                  className={`rounded-full border bg-white px-4 py-2 text-sm text-primary transition ${
                    selected ? "border-accent shadow-[0_0_0_1px_#e7ab28]" : "border-primary/20 hover:border-accent"
                  }`}
                >
                  {name}
                </button>
              );
            })}
            {hiddenCount > 0 ? (
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setExpanded((current) => !current)}
                className="rounded-full border border-dashed border-primary/30 bg-white px-4 py-2 text-sm font-medium text-primary hover:border-accent"
              >
                {expanded ? "Show fewer" : `+ ${hiddenCount} more`}
              </button>
            ) : null}
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex min-h-11 items-center rounded-full border border-accent px-7 py-2.5 text-sm font-semibold text-primary transition hover:bg-accent-blend"
          >
            {area ? `See ${area} plots` : "View plots"}
          </button>
        </form>

        <Link href="/for-sale" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary/70 hover:text-accent">
          View all locations
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          {PLOT_FINDER_POINTS.map((point) => (
            <li key={point} className="flex items-center gap-1.5 text-xs text-primary/60 sm:text-sm">
              <Check size={14} className="shrink-0 text-accent" strokeWidth={2.5} />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HomePlotCard({ property }: { property: CatalogProperty }) {
  const href = `/for-sale/${property.slug || property.id}`;
  const enquireHref = `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(
    `Hello MVUTO Real Estate, I am interested in ${property.title}. Please share more details.`
  )}`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md">
      <Link href={href} className="relative block aspect-[4/3] bg-primary/5">
        {property.image ? (
          <Image
            {...propertyImageProps(property.image)}
            alt={property.title}
            fill
            className="object-cover"
            sizes="280px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-primary/50">Image coming soon</div>
        )}
        {property.status === "available" ? (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-primary">
            Available
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-primary/50">{property.location}</p>
        <h3 className="mt-1 text-base font-bold text-primary">
          <Link href={href} className="hover:text-accent">
            {property.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-primary/80">From {formatKes(property.price)}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href={enquireHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1 rounded-full bg-accent px-2 py-2 text-xs font-semibold text-primary hover:bg-accent-blend"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Enquire
          </a>
          <Link
            href={href}
            className="inline-flex items-center justify-center gap-1 rounded-full border border-primary/15 px-2 py-2 text-xs font-semibold text-primary hover:border-accent"
          >
            View details
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function FeaturedCarousel({ properties, seeAllHref }: { properties: CatalogProperty[]; seeAllHref: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, scrollLeft: 0, moved: false });
  const [edges, setEdges] = useState({ prev: true, next: false });

  const updateEdges = () => {
    const el = scroller.current;
    if (!el) return;
    setEdges({
      prev: el.scrollLeft <= 2,
      next: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  };

  useEffect(() => {
    scroller.current?.scrollTo({ left: 0 });
    updateEdges();
  }, [properties]);

  const scrollByCard = (direction: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: direction * 300, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-end gap-3">
        <p className="text-xs text-primary/50">Click and drag to explore</p>
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={edges.prev}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/15 bg-white text-primary hover:border-accent disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous properties"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={edges.next}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/15 bg-white text-primary hover:border-accent disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next properties"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      {properties.length === 0 ? (
        <p className="rounded-2xl bg-white px-6 py-10 text-center text-sm text-primary/70">
          No open listing matches that location yet.{" "}
          <Link href="/for-sale" className="font-semibold text-accent">
            Browse all properties
          </Link>
        </p>
      ) : (
        <div
          ref={scroller}
          onScroll={updateEdges}
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse" || !scroller.current) return;
            drag.current = {
              down: true,
              startX: event.clientX,
              scrollLeft: scroller.current.scrollLeft,
              moved: false,
            };
            scroller.current.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!drag.current.down || !scroller.current) return;
            const delta = event.clientX - drag.current.startX;
            if (Math.abs(delta) > 4) drag.current.moved = true;
            scroller.current.scrollLeft = drag.current.scrollLeft - delta;
          }}
          onPointerUp={() => {
            drag.current.down = false;
          }}
          onClickCapture={(event) => {
            if (!drag.current.moved) return;
            event.preventDefault();
            event.stopPropagation();
            drag.current.moved = false;
          }}
          className="flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto pb-2 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {properties.map((property) => (
            <div key={property.id} className="w-[78%] shrink-0 snap-start sm:w-[280px]">
              <HomePlotCard property={property} />
            </div>
          ))}
          <div className="flex w-[78%] shrink-0 snap-start sm:w-[280px]">
            <article className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-accent bg-white px-6 py-10 text-center">
              <h3 className="text-lg font-bold text-primary">See all properties</h3>
              <p className="mt-2 text-sm text-primary/70">Every open coastal listing is on the properties page.</p>
              <Link
                href={seeAllHref}
                className="mt-5 inline-flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-primary hover:bg-accent-blend"
              >
                Browse all
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </div>
      )}
      <div className="mt-6 text-center">
        <Link
          href={seeAllHref}
          className="inline-flex items-center gap-1 rounded-full border border-accent px-6 py-2.5 text-sm font-semibold text-primary hover:bg-accent-blend"
        >
          Browse all properties
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1100);
      setValue(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

function StatFigure({ value, label, icon: Icon }: { value: string; label: string; icon: typeof Users }) {
  const ref = useRef<HTMLLIElement>(null);
  const [active, setActive] = useState(false);
  const numeric = Number(value.replace(/[^\d]/g, "")) || 0;
  const suffix = value.replace(/\d/g, "");
  const shown = useCountUp(numeric, active);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActive(true);
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <li ref={ref}>
      <Icon className="mx-auto h-7 w-7 text-accent" strokeWidth={1.5} />
      <p className="mt-2 text-3xl font-bold lg:text-4xl">
        {shown}
        {suffix}
      </p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-white/80 sm:text-xs">{label}</p>
    </li>
  );
}

function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = HERO_SLIDES.length;
  const slide = HERO_SLIDES[index];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % count), 6500);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  const go = (next: number) => setIndex((next + count) % count);

  return (
    <section
      className="bg-primary"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative">
        <div className="relative h-[240px] sm:h-[320px] lg:h-[500px]">
        {HERO_SLIDES.map((item, slideIndex) => (
          <Image
            key={item.href}
            src={item.image}
            alt=""
            fill
            priority={slideIndex === 0}
            className={`object-cover object-[center_30%] transition-opacity duration-700 ${
              slideIndex === index ? "opacity-100" : "opacity-0"
            }`}
            sizes="100vw"
          />
        ))}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary hover:bg-accent"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {HERO_SLIDES.map((item, slideIndex) => (
            <button
              key={item.href}
              type="button"
              aria-label={`Show slide ${slideIndex + 1}`}
              aria-current={slideIndex === index}
              onClick={() => go(slideIndex)}
              className={`h-2.5 rounded-full ${slideIndex === index ? "w-6 bg-accent" : "w-2.5 bg-white/80"}`}
            />
          ))}
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary hover:bg-accent"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        </div>
        <div className="relative flex items-center bg-primary px-6 py-10 sm:px-10 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[48%] lg:bg-transparent lg:px-12">
          <div
            className="absolute inset-0 hidden bg-primary lg:block"
            style={{ clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)" }}
            aria-hidden
          />
          <div className="relative max-w-md lg:pl-10">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{slide.title}</h1>
            <p data-aeo-answer className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
              {slide.text}
            </p>
            <Link
              href={slide.href}
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-primary hover:bg-accent-blend"
            >
              {slide.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      <div className="h-1.5 bg-accent" />
    </section>
  );
}

function HearFromYou() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const message = String(data.get("message") || "");
    const heard = String(data.get("heard") || "");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject: "Website contact",
          message: heard ? `${message}\n\nHow they heard about us: ${heard}` : message,
          source: "home_form",
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Could not send message");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send message");
    }
  };

  return (
    <section className="bg-[#f5f2ed]" aria-labelledby="hear-heading">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[340px] bg-white sm:min-h-[460px] lg:min-h-full">
          <Image
            src="https://res.cloudinary.com/dyfnobo9r/image/upload/v1793951858/WhatsApp_Image_2026-11-06_at_10.56.18_mekn2j.jpg"
            alt="MVUTO Real Estate"
            fill
            className="object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="px-4 py-12 sm:px-10 lg:px-14 lg:py-16">
          <h2 id="hear-heading" className="text-center text-2xl font-bold text-accent sm:text-3xl">
            Ready to Start Your Land Journey?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-sm text-primary/70">
            Get in touch with our team for personalized guidance and exclusive access to prime properties.
          </p>
          <form onSubmit={submit} className="mx-auto mt-8 max-w-xl space-y-4">
            <label className="block text-sm text-primary/80">
              Full Name <span className="text-accent">*</span>
              <input
                name="name"
                required
                placeholder="e.g. Jane Wanjiku"
                className="mt-1 w-full rounded-lg border border-primary/10 bg-white px-3 py-2.5 text-sm text-primary outline-none focus:border-accent"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-primary/80">
                Email <span className="text-accent">*</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-lg border border-primary/10 bg-white px-3 py-2.5 text-sm text-primary outline-none focus:border-accent"
                />
              </label>
              <label className="block text-sm text-primary/80">
                Phone <span className="text-accent">*</span>
                <input
                  name="phone"
                  required
                  placeholder="07XX XXX XXX"
                  className="mt-1 w-full rounded-lg border border-primary/10 bg-white px-3 py-2.5 text-sm text-primary outline-none focus:border-accent"
                />
              </label>
            </div>
            <label className="block text-sm text-primary/80">
              Your Message
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell us what you're looking for..."
                className="mt-1 w-full rounded-lg border border-primary/10 bg-white px-3 py-2.5 text-sm text-primary outline-none focus:border-accent"
              />
            </label>
            <label className="block text-sm text-primary/80">
              How Did You Hear About Us?
              <select
                name="heard"
                defaultValue=""
                className="mt-1 w-full rounded-lg border border-primary/10 bg-white px-3 py-2.5 text-sm text-primary outline-none focus:border-accent"
              >
                <option value="">Select an option</option>
                {HEARD_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wide text-primary hover:bg-accent-blend disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              {status === "sent" ? <p className="mt-3 text-sm text-primary">Message sent. We will be in touch.</p> : null}
              {status === "error" ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ featuredProperties }: { featuredProperties: CatalogProperty[] }) {
  const [area, setArea] = useState("");
  const updates = STATIC_NEWS_CATALOG.slice(0, 3);
  const featuredUpdate = updates[0];
  const moreUpdates = updates.slice(1);
  const visibleProperties = featuredProperties.filter((property) => matchesArea(property, area));
  const seeAllHref = area ? `/for-sale?q=${encodeURIComponent(area)}` : "/for-sale";

  return (
    <>
      <HeroSlideshow />

      <CoastalPlotFinder area={area} onArea={setArea} />

      <section className="bg-primary text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-5 lg:flex-row lg:justify-between lg:gap-6">
          <p className="text-center text-lg font-bold sm:text-xl lg:text-left">
            Open listings begin at{" "}
            <span className="ml-1 inline-block rounded-md bg-accent px-2 py-0.5 text-primary">KES 350,000</span>
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {PLOT_FINDER_POINTS.slice(0, 3).map((point) => (
              <li key={point} className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium sm:text-sm">
                {point}
              </li>
            ))}
          </ul>
          <Link
            href="/for-sale"
            className="inline-flex shrink-0 items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-primary hover:bg-accent-blend"
          >
            View plots
          </Link>
        </div>
      </section>

      <section className="relative bg-[#f5f2ed] py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-6 flex items-end justify-between gap-4 pr-0 sm:pr-24">
            <div>
              <h2 className="text-3xl font-bold text-accent">Join the Family</h2>
              <p className="mt-1 max-w-xl text-sm text-primary/70">
                Our portfolio of Properties is as diverse as Your Dreams. Explore the following categories to find
                the Perfect Property that resonates with your Vision of Home or Investment.
              </p>
            </div>
          </div>
              <FeaturedCarousel properties={visibleProperties} seeAllHref={seeAllHref} />
        </div>
      </section>

      <section className="bg-white px-4 py-12 lg:py-16" aria-labelledby="locations-heading">
        <div className="mx-auto max-w-4xl text-center">
          <h2 id="locations-heading" className="text-2xl font-bold text-accent sm:text-3xl">
            Prime Locations
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-primary/70">
            Every Project is Carefully Hand-Picked to Offer the Best Value and Growth Potential.
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            {COASTAL_AREAS.map((name, index) => (
              <li key={name}>
                <Link
                  href={`/for-sale?q=${encodeURIComponent(name)}`}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium ${
                    index === 0
                      ? "border-accent bg-accent text-primary"
                      : "border-primary/20 bg-white text-primary hover:border-accent"
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-primary py-10 text-white">
        <ul className="mx-auto grid max-w-5xl grid-cols-3 gap-4 px-4 text-center">
          {stats.map((item) => (
            <StatFigure key={item.label} value={item.value} label={item.label} icon={item.icon} />
          ))}
        </ul>
      </section>

      <section className="border-t border-accent bg-primary px-4 py-14 lg:py-20" aria-labelledby="why-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="why-heading" className="text-center text-3xl font-bold text-white sm:text-4xl">
            Why MVUTO
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {whyMVuto.map((item) => (
              <article key={item.title} className="border border-white/30 bg-primary px-5 py-6 sm:min-h-[190px]">
                <item.icon className="h-6 w-6 text-accent" strokeWidth={1.75} />
                <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HearFromYou />

      <section className="bg-white px-4 py-14 lg:py-16" aria-labelledby="news-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="news-heading" className="text-center text-2xl font-bold text-accent sm:text-3xl">
            News &amp; Updates
          </h2>
          {featuredUpdate ? (
            <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
              <Link href="/news" className="relative block aspect-[16/10] overflow-hidden rounded-lg bg-primary/5">
                <Image
                  {...propertyImageProps(featuredUpdate.image)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </Link>
              <div className="space-y-6">
                <article>
                  <h3 className="text-lg font-bold text-accent">
                    <Link href="/news" className="hover:text-primary">
                      {featuredUpdate.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary/75">{featuredUpdate.excerpt}</p>
                </article>
                {moreUpdates.map((item) => (
                  <article key={item.id}>
                    <h3 className="text-lg font-bold text-accent">
                      <Link href="/news" className="hover:text-primary">
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-primary/75">{item.excerpt}</p>
                  </article>
                ))}
                <Link href="/news" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent">
                  View more updates
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <HomeTestimonials />
    </>
  );
}
