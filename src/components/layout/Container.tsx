import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12", className)}
      {...props}
    >
      {children}
    </div>
  );
}
