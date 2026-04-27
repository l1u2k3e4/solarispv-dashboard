import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-sternhoff-primary text-white hover:bg-sternhoff-primary-dark",
        accent:
          "bg-sternhoff-accent text-white hover:bg-sternhoff-accent-dark",
        outline:
          "border-2 border-sternhoff-primary text-sternhoff-primary hover:bg-sternhoff-primary hover:text-white",
        "outline-white":
          "border-2 border-white text-white hover:bg-white hover:text-sternhoff-primary",
        ghost:
          "hover:bg-sternhoff-bg-light text-sternhoff-text-dark",
        link: "text-sternhoff-primary underline-offset-4 hover:underline",
        destructive:
          "bg-sternhoff-accent text-white hover:bg-sternhoff-accent-dark",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-14 rounded-md px-8 text-base",
        xl: "h-16 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
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
