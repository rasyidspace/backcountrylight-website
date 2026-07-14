import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeader({
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        {
          "items-start text-left": align === "left",
          "items-center text-center": align === "center",
          "items-end text-right": align === "right",
        },
        className
      )}
      {...props}
    >
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-accent text-lg md:text-xl max-w-2xl font-light leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
