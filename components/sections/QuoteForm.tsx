"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { format } from "date-fns";
import { CalendarIcon, Loader2, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Field, Select, Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlaceAutocompleteInput } from "@/components/ui/PlaceAutocompleteInput";
import { VEHICLES } from "@/data/vehicles";
import { cn } from "@/lib/utils";

import { quoteSchema, TRIP_TYPES, type QuoteInput } from "@/lib/validation";
import {
  bookingLinkFromEstimate,
  calculateFare,
  formatRupees,
  type FareEstimate,
} from "@/lib/whatsapp";

type EstimateStatus = "loading" | "idle" | "error";

const labelFor = (value: string) =>
  TRIP_TYPES.find((t) => t.value === value)?.label ?? value;

const vehicleName = (id?: string) =>
  VEHICLES.find((v) => v.id === id)?.name ?? "Swift Dzire";

const TIME_OPTIONS = Array.from({ length: 96 }).map((_, i) => {
  const hour = Math.floor(i / 4);
  const minute = (i % 4) * 15;
  const ampm = hour < 12 ? "AM" : "PM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const value = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  const label = `${displayHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${ampm}`;
  return { value, label };
});

export function QuoteForm() {
  const [dateOpen, setDateOpen] = useState(false);

  // Distance Matrix lives in the "routes" maps library — same hook family
  // used by usePlaceAutocomplete. Loads lazily once the Maps script is ready.
  const routesLib = useMapsLibrary("routes");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [status, setStatus] = useState<EstimateStatus>("loading");
  const [estimate, setEstimate] = useState<FareEstimate | null>(null);
  // Snapshot of the submitted trip, so the dialog + WhatsApp message stay
  // stable even if the user edits the form while the dialog is open.
  const [trip, setTrip] = useState<QuoteInput | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      mobile: "",
      pickup: "",
      destination: "",
      date: "",
      time: "",
      tripType: "oneway",
      vehicle: "",
    },
  });

  const dateValue = watch("date");

  /**
   * On submit, open the Trip Estimation dialog and compute the driving
   * distance / travel time with Google's Distance Matrix service. The fare
   * estimate is derived client-side; the user confirms via WhatsApp from
   * inside the dialog.
   */
  const onSubmit = (data: QuoteInput) => {
    setTrip(data);
    setEstimate(null);
    setStatus("loading");
    setDialogOpen(true);

    if (!routesLib) {
      setStatus("error");
      return;
    }

    // @ts-ignore - RouteMatrix might have strict typing for travelMode in some TS versions
    routesLib.RouteMatrix.computeRouteMatrix({
      origins: [data.pickup],
      destinations: [data.destination],
      travelMode: "DRIVING",
      routingPreference: "TRAFFIC_AWARE",
      fields: ["*"],
    })
      .then((response) => {
        const element = response?.matrix?.rows?.[0]?.items?.[0];

        if (!element || element.condition !== "ROUTE_EXISTS") {
          setStatus("error");
          return;
        }

        setEstimate(
          calculateFare({
            distanceMeters: element.distanceMeters ?? 0,
            distanceText: element.localizedValues?.distance ?? "",
            durationText: element.localizedValues?.duration ?? "",
            tripType: data.tripType,
            vehicleId: data.vehicle,
          }),
        );
        setStatus("idle");
      })
      .catch((error) => {
        console.error("Route estimation error:", error);
        setStatus("error");
      });
  };

  const bookOnWhatsApp = () => {
    if (!trip || !estimate) return;
    window.open(
      bookingLinkFromEstimate(trip, estimate),
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <Card
      id="quote"
      className="p-2.5 sm:p-4 shadow-2xl border border-white/20 bg-white/10 backdrop-blur-md [&_label]:text-white"
    >
      <h2 className="text-lg font-bold text-white">Get a Quote</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-2 sm:mt-3 flex flex-col gap-2 sm:gap-2.5"
        noValidate
      >
        <div className="grid gap-2 sm:gap-2.5 sm:grid-cols-2">
          <Field label="Full Name" htmlFor="name" error={errors.name?.message}>
            <Input
              id="name"
              placeholder="Santhose"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
          </Field>
          <Field
            label="Mobile Number"
            htmlFor="mobile"
            error={errors.mobile?.message}
          >
            <Input
              id="mobile"
              type="tel"
              inputMode="numeric"
              placeholder="9876543210"
              aria-invalid={!!errors.mobile}
              {...register("mobile")}
            />
          </Field>
        </div>

        <div className="grid gap-2 sm:gap-2.5 sm:grid-cols-2">
          <Field label="Pickup" htmlFor="pickup" error={errors.pickup?.message}>
            <Controller
              control={control}
              name="pickup"
              render={({ field }) => (
                <PlaceAutocompleteInput
                  id="pickup"
                  placeholder="Chennai Airport"
                  invalid={!!errors.pickup}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Field>
          <Field
            label="Destination"
            htmlFor="destination"
            error={errors.destination?.message}
          >
            <Controller
              control={control}
              name="destination"
              render={({ field }) => (
                <PlaceAutocompleteInput
                  id="destination"
                  placeholder="Pondicherry"
                  invalid={!!errors.destination}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Field>
        </div>

        <div className="grid gap-2 sm:gap-2.5 sm:grid-cols-3">
          {/* Journey Date — shadcn Date Picker */}
          <Field
            label="Journey Date"
            htmlFor="date-trigger"
            error={errors.date?.message}
          >
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger
                id="date-trigger"
                render={
                  <button
                    type="button"
                    aria-invalid={!!errors.date}
                    className={cn(
                      "w-full rounded-input border border-line bg-white px-3.5 py-2.5 text-sm text-heading transition-colors outline-none",
                      "flex items-center gap-2 text-left",
                      "focus:border-primary focus:ring-4 focus:ring-primary/15",
                      "aria-[invalid=true]:border-red-400",
                      !dateValue && "text-body/60",
                    )}
                  />
                }
              >
                <CalendarIcon className="size-3.5 shrink-0 opacity-60" />
                {dateValue ? dateValue : <span>Pick a date</span>}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateValue ? new Date(dateValue) : undefined}
                  onSelect={(day) => {
                    setValue("date", day ? format(day, "dd MMM yyyy") : "", {
                      shouldValidate: true,
                    });
                    setDateOpen(false);
                  }}
                  disabled={(day) =>
                    day < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </PopoverContent>
            </Popover>
          </Field>

          {/* Journey Time */}
          <Field
            label="Journey Time"
            htmlFor="time"
            error={errors.time?.message}
          >
            <Select
              id="time"
              aria-invalid={!!errors.time}
              {...register("time")}
            >
              <option value="" disabled>
                Select time
              </option>
              {TIME_OPTIONS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </Select>
          </Field>

          {/* Trip Type */}
          <Field
            label="Trip Type"
            htmlFor="tripType"
            error={errors.tripType?.message}
          >
            <Select
              id="tripType"
              aria-invalid={!!errors.tripType}
              {...register("tripType")}
            >
              {TRIP_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <Button type="submit" size="lg" className="mt-1 w-full">
          Get Quote
        </Button>
        <p className="text-center text-[11px] text-white/80 mt-1">
          * Swift Dzire is currently our only available vehicle.
        </p>
      </form>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Trip Estimation</DialogTitle>
          </DialogHeader>

          {status === "loading" && (
            <div className="flex items-center justify-center gap-2 py-8 text-body">
              <Loader2 className="size-5 animate-spin" />
              Calculating distance…
            </div>
          )}

          {status === "error" && (
            <p className="py-6 text-center text-sm text-body">
              Couldn&apos;t estimate this route. Please check the pickup and
              destination and try again.
            </p>
          )}

          {status === "idle" && trip && estimate && (
            <div className="flex flex-col gap-4">
              <dl className="flex flex-col gap-2 text-sm">
                <EstimateRow label="Pickup" value={trip.pickup} />
                <EstimateRow label="Destination" value={trip.destination} />
                <EstimateRow
                  label="Trip Type"
                  value={labelFor(trip.tripType)}
                />
                <EstimateRow
                  label="Vehicle"
                  value={vehicleName(trip.vehicle)}
                />
                <EstimateRow
                  label="Estimated Distance"
                  value={estimate.distanceText}
                />
                <EstimateRow
                  label="Estimated Travel Time"
                  value={estimate.durationText}
                />
              </dl>

              <div className="rounded-input border border-line bg-muted/40 p-3.5">
                <p className="mb-2 text-xs font-semibold tracking-wide text-heading uppercase">
                  Fare Calculation
                </p>
                <div className="flex flex-col gap-1.5 text-sm text-body">
                  <div className="flex items-center justify-between">
                    <span>
                      {estimate.billableKm} km ×{" "}
                      {formatRupees(estimate.ratePerKm)}
                      {estimate.roundTrip && (
                        <span className="text-body/70"> (round trip)</span>
                      )}
                    </span>
                    <span>{formatRupees(estimate.distanceFare)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Driver Allowance</span>
                    <span>{formatRupees(estimate.driverAllowance)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between border-t border-line pt-2 text-base font-semibold text-heading">
                    <span>Estimated Total</span>
                    <span>{formatRupees(estimate.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="whatsapp"
              size="lg"
              className="w-full"
              disabled={status !== "idle"}
              onClick={bookOnWhatsApp}
            >
              <MessageCircle className="size-5" />
              Book via WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function EstimateRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-body/70">{label}</dt>
      <dd className="text-right font-medium text-heading">{value}</dd>
    </div>
  );
}
