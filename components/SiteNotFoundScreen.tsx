export default function SiteNotFoundScreen({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "flex min-h-[520px] flex-col items-center justify-center bg-[#f5f2ed] px-6 py-16 text-center"
          : "flex min-h-screen flex-col items-center justify-center bg-[#f5f2ed] px-6 py-16 text-center"
      }
    >
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">404</p>
      <h1 className="mt-3 text-4xl font-bold text-primary sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-base text-primary/70">This page could not be found.</p>
    </div>
  );
}