import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-card shadow-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
