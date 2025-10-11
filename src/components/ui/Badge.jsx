import React from "react";

export default function Badge({children, variant}) {
  // Lighter backgrounds using alpha + matching darker text for readability
  const bg =
    variant === "ok"
      ? "bg-shadcn-success/18"
      : variant === "warn"
      ? "bg-shadcn-warning/18"
      : variant === "secondary"
      ? "bg-shadcn-secondary/30"
      : "bg-shadcn-destructive/18";

  const text =
    variant === "ok"
      ? "text-shadcn-success"
      : variant === "warn"
      ? "text-shadcn-warning"
      : variant === "secondary"
      ? "text-shadcn-foreground"
      : "text-shadcn-destructive";

  return (
    <span
      className={`inline-flex items-center justify-center min-w-[48px] whitespace-nowrap px-2 py-0.5 rounded-full text-sm font-medium ${bg} ${text}`}
    >
      {children}
    </span>
  );
}
