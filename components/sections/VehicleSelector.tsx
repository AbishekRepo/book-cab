import { Users } from "lucide-react";
import { VEHICLES } from "@/data/vehicles";
import { cn } from "@/lib/utils";

/**
 * Controlled vehicle picker. Wired into the QuoteForm via react-hook-form
 * (value + onChange come from a Controller).
 */
export function VehicleSelector({
  value,
  onChange,
  error,
}: {
  value?: string;
  onChange: (id: string) => void;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-heading">Select Vehicle</span>
      <div
        role="radiogroup"
        aria-label="Select vehicle"
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3"
      >
        {VEHICLES.map((vehicle) => {
          const selected = value === vehicle.id;
          return (
            <button
              type="button"
              key={vehicle.id}
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(vehicle.id)}
              className={cn(
                "flex flex-col items-start gap-1 rounded-input border p-3 text-left transition-colors",
                selected
                  ? "border-primary bg-primary/10 ring-1 ring-primary"
                  : "border-line bg-white hover:border-primary/50"
              )}
            >
              <span className="text-sm font-semibold text-heading">
                {vehicle.name}
              </span>
              <span className="flex items-center gap-1 text-xs text-body">
                <Users className="size-3.5" />
                {vehicle.seats} · {vehicle.category}
              </span>
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
