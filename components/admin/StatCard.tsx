"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/admin/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  gradient?: string;
  delay?: number;
};

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  gradient = "from-primary to-[#002266]",
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition hover:shadow-lg"
    >
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/10 transition group-hover:scale-110" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-primary/60">{title}</p>
          <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
          {change && <p className="mt-1 text-xs font-medium text-emerald-600">{change}</p>}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-accent shadow-lg",
            gradient
          )}
        >
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
}
