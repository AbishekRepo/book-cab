import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-input border border-line bg-white px-3.5 py-2.5 text-sm text-heading " +
  "placeholder:text-body/60 transition-colors focus:border-primary focus:outline-none " +
  "focus:ring-4 focus:ring-primary/15 disabled:opacity-60 aria-[invalid=true]:border-red-400";

/** Label + control + error message wrapper. */
export function Field({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-heading">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cn(controlBase, className)} {...props} />;
});

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select ref={ref} className={cn(controlBase, "pr-8", className)} {...props}>
      {children}
    </select>
  );
});
