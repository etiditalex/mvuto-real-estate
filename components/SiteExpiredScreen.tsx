import { EXPIRED_BANNER, EXPIRED_HEADING } from "@/lib/site/availability";

function CircuitCorner({ className, flip = false }: { className: string; flip?: boolean }) {
  return (
    <svg
      className={`pointer-events-none absolute h-36 w-40 text-accent-blend/50 ${className}`}
      viewBox="0 0 160 140"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M8 28 H78 V72 H48" />
        <path d="M18 8 V58 H52" />
        <path d="M96 18 H140" />
      </g>
      <g fill="#e7ab28">
        <circle cx="78" cy="28" r="3.4" />
        <circle cx="48" cy="72" r="3.2" />
        <circle cx="52" cy="58" r="3" />
        <circle cx="140" cy="18" r="3.2" />
      </g>
    </svg>
  );
}

function RenewMark() {
  return (
    <svg viewBox="-22 0 370 292" className="h-auto w-full max-w-[320px]" aria-hidden="true">
      <rect x="58" y="78" width="210" height="148" rx="34" fill="#fff" />
      <text
        x="163"
        y="172"
        textAnchor="middle"
        fill="#001447"
        fontSize="46"
        fontWeight="800"
        fontFamily="Inter, Arial, sans-serif"
      >
        RENEW
      </text>
      <rect x="150" y="226" width="26" height="26" rx="4" fill="#fff" />
      <rect x="112" y="248" width="102" height="20" rx="10" fill="#fff" />

      <g transform="translate(78, 18)">
        <path d="M4 72 V26 C32 6 58 16 78 32 V82 C56 64 30 58 4 72Z" fill="#fff" />
        <path d="M152 72 V26 C124 6 98 16 78 32 V82 C100 64 126 58 152 72Z" fill="#fff" />
        <path d="M22 38 H62 M22 50 H62 M22 62 H54" stroke="#001447" strokeWidth="5" strokeLinecap="round" />
        <path d="M94 38 H134 M94 50 H134 M94 62 H126" stroke="#001447" strokeWidth="5" strokeLinecap="round" />
      </g>

      <g transform="translate(246, 0)">
        <path d="M78 36 A34 34 0 0 0 36 16" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        <path d="M78 36 l14 -6 -8 14 Z" fill="#fff" />
        <path d="M18 78 A34 34 0 0 0 60 98" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        <path d="M18 78 l-14 6 8 -14 Z" fill="#fff" />
        <path d="M48 28 l18 8 v20 c0 16 -18 28 -18 28 s-18 -12 -18 -28 V36 Z" fill="#e7ab28" />
        <path
          d="M40 52 l7 7 14 -16"
          fill="none"
          stroke="#001447"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default function SiteExpiredScreen({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "relative isolate flex min-h-[720px] items-center justify-center overflow-hidden bg-primary px-5 py-10 text-center"
          : "relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-primary px-5 py-12 text-center"
      }
    >
      <CircuitCorner className="left-0 top-0" />
      <CircuitCorner className="right-0 top-0" flip />
      <CircuitCorner className="bottom-0 left-0" />
      <CircuitCorner className="bottom-0 right-0" flip />
      <div className="relative z-10 flex w-full max-w-[440px] flex-col items-center">
        <p className="sr-only">
          {EXPIRED_HEADING}. {EXPIRED_BANNER}.
        </p>

        <h1 className="font-black uppercase leading-[0.86] tracking-tight">
          <span className="block text-6xl text-accent sm:text-7xl">Domain</span>
          <span className="mt-1 block text-6xl text-white sm:text-7xl">Renew</span>
        </h1>

        <div className="-mt-1 flex w-full justify-center">
          <RenewMark />
        </div>

        <p
          role="status"
          className="relative z-10 mt-2 max-w-[320px] rounded-full bg-accent px-6 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-primary shadow-md"
        >
          {EXPIRED_BANNER}
        </p>
      </div>
    </div>
  );
}
