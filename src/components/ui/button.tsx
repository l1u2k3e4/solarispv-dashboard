import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-brand-orange hover:bg-primary-hover hover:-translate-y-px",
        accent:
          "bg-accent text-accent-foreground hover:bg-navy-700 hover:-translate-y-px",
        outline:
          "border-2 border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground",
        "outline-white":
          "border-2 border-white bg-transparent text-white hover:bg-white hover:text-accent",
        ghost:
          "hover:bg-gray-50 text-foreground",
        link: "text-primary-surface underline-offset-4 hover:underline",
        destructive:
          "bg-primary text-primary-foreground hover:bg-primary-hover hover:-translate-y-px",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "h-11 px-5 py-2 rounded-md",
        sm: "h-9 px-3 text-xs rounded-md",
        lg: "h-14 px-8 text-base rounded-md",
        xl: "h-16 px-10 text-lg rounded-md",
        icon: "h-10 w-10 rounded-md",
        pill: "h-9 px-4 text-xs rounded-pill",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
