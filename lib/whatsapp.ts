import { SITE } from "@/constants/site";
import { VEHICLES } from "@/data/vehicles";
import { TRIP_TYPES, type QuoteInput } from "@/lib/validation";

const labelFor = <T extends { value: string; label: string }>(
  list: readonly T[],
  value: string
) => list.find((item) => item.value === value)?.label ?? value;

/** Flat driver allowance added to every fare estimate (₹). */
export const DRIVER_ALLOWANCE = 500;

/** Fallback per-km rate when a vehicle can't be resolved (₹). */
const DEFAULT_RATE_PER_KM = 12;

/** Format a rupee amount with Indian digit grouping, no decimals. */
export const formatRupees = (amount: number) =>
  `₹${Math.round(amount).toLocaleString("en-IN")}`;

export interface FareEstimate {
  /** Distance text as returned by Google, e.g. "126 km" (one-way). */
  distanceText: string;
  /** Travel time text as returned by Google, e.g. "2 hours 30 mins". */
  durationText: string;
  /** Kilometres actually billed (round trip doubles the one-way distance). */
  billableKm: number;
  /** Per-km rate applied, from the vehicle's startingPrice. */
  ratePerKm: number;
  /** Whether billableKm was doubled for a round trip. */
  roundTrip: boolean;
  /** billableKm × ratePerKm. */
  distanceFare: number;
  /** Flat driver allowance. */
  driverAllowance: number;
  /** distanceFare + driverAllowance. */
  total: number;
}

/**
 * Compute a client-side fare estimate from Google's driving distance.
 * Pure function — no side effects, easy to unit test.
 */
export function calculateFare({
  distanceMeters,
  distanceText,
  durationText,
  tripType,
  vehicleId,
}: {
  distanceMeters: number;
  distanceText: string;
  durationText: string;
  tripType: QuoteInput["tripType"];
  vehicleId?: string;
}): FareEstimate {
  const ratePerKm =
    VEHICLES.find((v) => v.id === vehicleId)?.startingPrice ??
    DEFAULT_RATE_PER_KM;
  const roundTrip = tripType === "roundtrip";
  const oneWayKm = Math.round(distanceMeters / 1000);
  const billableKm = oneWayKm * (roundTrip ? 2 : 1);
  const distanceFare = billableKm * ratePerKm;
  const total = distanceFare + DRIVER_ALLOWANCE;

  return {
    distanceText,
    durationText,
    billableKm,
    ratePerKm,
    roundTrip,
    distanceFare,
    driverAllowance: DRIVER_ALLOWANCE,
    total,
  };
}

/** Build a wa.me link with an arbitrary prefilled message. */
export function whatsAppLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Build a booking link from a completed quote form. */
export function bookingLinkFromQuote(data: QuoteInput): string {
  const vehicleName =
    VEHICLES.find((v) => v.id === data.vehicle)?.name ?? data.vehicle;
  const tripLabel = labelFor(TRIP_TYPES, data.tripType);

  const message = [
    `Hi ${SITE.name}, I'd like to book a cab.`,
    ``,
    `Name: ${data.name}`,
    `Mobile: ${data.mobile}`,
    `Pickup: ${data.pickup}`,
    `Destination: ${data.destination}`,
    `Date: ${data.date}`,
    `Time: ${data.time}`,
    `Trip Type: ${tripLabel}`,
    `Vehicle: ${vehicleName}`,
  ].join("\n");

  return whatsAppLink(message);
}

/** Build a booking link from a completed quote plus its fare estimate. */
export function bookingLinkFromEstimate(
  data: QuoteInput,
  estimate: FareEstimate
): string {
  const vehicleName =
    (VEHICLES.find((v) => v.id === data.vehicle)?.name ?? data.vehicle) ||
    "Swift Dzire";
  const tripLabel = labelFor(TRIP_TYPES, data.tripType);

  const message = [
    `Hi ${SITE.name}, I'd like to book a cab.`,
    ``,
    `Name: ${data.name}`,
    `Mobile: ${data.mobile}`,
    `Pickup: ${data.pickup}`,
    `Destination: ${data.destination}`,
    `Date: ${data.date}`,
    `Time: ${data.time}`,
    `Trip Type: ${tripLabel}`,
    `Vehicle: ${vehicleName}`,
    `Distance: ${estimate.distanceText}`,
    `Estimated Travel Time: ${estimate.durationText}`,
    ``,
    `Fare estimate:`,
    `${estimate.billableKm} km × ${formatRupees(estimate.ratePerKm)} = ${formatRupees(estimate.distanceFare)}${estimate.roundTrip ? " (round trip)" : ""}`,
    `Driver Allowance = ${formatRupees(estimate.driverAllowance)}`,
    `Estimated Total = ${formatRupees(estimate.total)}`,
  ].join("\n");

  return whatsAppLink(message);
}

/** Build a booking link for a specific popular route. */
export function bookingLinkForRoute(from: string, to: string): string {
  return whatsAppLink(
    `Hi ${SITE.name}, I'd like to book a cab from ${from} to ${to}. Please share the fare.`
  );
}
