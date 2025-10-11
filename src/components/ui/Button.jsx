import React from "react";
import cn from "classnames";

const VARIANTS = {
  primary: "bg-shadcn-primary text-shadcn-primary-foreground hover:opacity-95",
  secondary: "bg-shadcn-secondary text-shadcn-foreground hover:opacity-95",
  ghost: "bg-transparent text-shadcn-foreground hover:bg-shadcn-secondary/50",
  outline:
    "bg-transparent border border-shadcn-border text-shadcn-foreground hover:bg-shadcn-secondary",
  link: "bg-transparent text-shadcn-primary underline hover:opacity-90",
};

const SIZES = {
  sm: "px-3 py-1 text-base",
  md: "px-4 py-2 text-lg",
  lg: "px-5 py-3 text-xl",
  xl: "px-6 py-3.5 text-2xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}) {
  const variantCls = VARIANTS[variant] || VARIANTS.primary;
  const sizeCls = SIZES[size] || SIZES.md;
  const base =
    "rounded inline-flex items-center justify-center font-medium transition-colors";
  return (
    <button className={cn(base, variantCls, sizeCls, className)} {...props}>
      {children}
    </button>
  );
}
