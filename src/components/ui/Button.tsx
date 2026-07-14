import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide";

    const variants = {
      primary: "bg-primary text-white hover:bg-primary/90",
      secondary: "bg-secondary text-primary hover:bg-secondary/80",
      outline: "border border-primary bg-transparent text-primary hover:bg-primary hover:text-white",
      ghost: "hover:bg-primary/5 text-primary",
    };

    const sizes = {
      default: "h-12 px-6 py-2",
      sm: "h-9 rounded-sm px-3",
      lg: "h-14 rounded-sm px-8 text-base",
      icon: "h-12 w-12",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
