import type * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "secondary";

export function Badge({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"span"> & { variant?: Variant }) {
  const base =
    "inline-flex items-center justify-center w-fit whitespace-nowrap text-sm gap-2 px-2.5 py-1 rounded-md";
  const variants: Record<Variant, string> = {
    default: "bg-primary text-primary-foreground",
    outline: "border text-muted-foreground",
    secondary: "bg-muted text-muted-foreground",
  };
  return <span data-slot="badge" className={cn(base, variants[variant], className)} {...props} />;
}
