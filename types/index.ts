export type TripType = "oneway" | "roundtrip" | "local" | "airport";

export interface Vehicle {
  /** Stable id used as the form value */
  id: string;
  name: string;
  seats: number;
  /** Short tagline shown under the name, e.g. "Sedan · AC" */
  category: string;
  ac: boolean;
  /** Starting price in INR, used for display only */
  startingPrice: number;
}

export interface FleetCar extends Vehicle {
  /** Path/URL to the vehicle image (placeholder for now) */
  image?: string;
}

export interface PopularRoute {
  id: string;
  from: string;
  to: string;
  startingPrice: number;
  /** Approximate one-way distance in km (for future fare estimate) */
  distanceKm?: number;
}

export interface Feature {
  /** lucide-react icon name resolved in the component */
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
}

export interface NavLink {
  label: string;
  href: string;
}
