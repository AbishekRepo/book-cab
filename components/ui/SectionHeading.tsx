import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-wide text-primary">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-2 text-2xl font-bold sm:text-3xl",
          dark ? "text-white" : "text-heading"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-3", dark ? "text-gray-300" : "text-body")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
