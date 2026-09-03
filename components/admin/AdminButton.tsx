"use client";

import { cn } from "@/lib/admin/utils";

type AdminButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};

export default function AdminButton({
  variant = "primary",
  size = "md",
  loading,
  className,
  children,
  disabled,
  ...props
}: AdminButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-4 py-2.5 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        variant === "primary" &&
          "bg-primary text-accent shadow-lg hover:bg-primary/90",
        variant === "secondary" &&
          "bg-accent text-primary shadow-lg hover:bg-accent-blend",
        variant === "ghost" && "text-primary/70 hover:bg-primary/5",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        variant === "outline" &&
          "border border-primary/20 bg-white text-primary hover:border-accent hover:bg-accent-blend/40",
        className
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-accent" />
      )}
      {children}
    </button>
  );
}
