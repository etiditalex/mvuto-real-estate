"use client";

import { Suspense } from "react";
import MarketResearchArchive from "@/components/market-research/MarketResearchArchive";

function ArchiveFallback() {
  return (
    <div className="bg-white pb-20 pt-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 md:grid-cols-2 md:px-6 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-64 animate-pulse border border-primary/10 bg-[#f5f5f5]" />
        ))}
      </div>
    </div>
  );
}

export default function MarketResearchPage() {
  return (
    <Suspense fallback={<ArchiveFallback />}>
      <MarketResearchArchive />
    </Suspense>
  );
}
