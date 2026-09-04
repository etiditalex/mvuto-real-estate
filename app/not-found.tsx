import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">404</p>
      <h1 className="mt-3 text-3xl font-bold text-primary">Page not found</h1>
      <p className="mt-3 max-w-md text-primary/70">
        That page does not exist. Browse land for sale or return home.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-md bg-primary px-6 py-2.5 font-medium text-accent"
        >
          Home
        </Link>
        <Link
          href="/for-sale"
          className="inline-flex min-h-11 items-center rounded-md border border-primary px-6 py-2.5 font-medium text-primary"
        >
          Land for sale
        </Link>
      </div>
    </div>
  );
}
