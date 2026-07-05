import type { NavLink } from "@/types";

/**
 * Central business config. Contact numbers come from public env vars so they
 * can be swapped per environment; the fallbacks are visible placeholders you
 * replace with the real numbers (see .env.example).
 *
 * Phone format: E.164-ish digits for tel:/wa.me (country code, no +, no spaces).
 */
export const SITE = {
  name: "Shami travels",
  tagline: "Trusted Taxi Partner Across Tamil Nadu",
  /** Used for tel: links */
  phone: process.env.NEXT_PUBLIC_PHONE ?? "918680848548",
  /** Used for wa.me links (digits only, incl. country code) */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "918680848548",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@bookcab.example",
  address: "Chennai, Tamil Nadu, India",
  rating: 4.8,
  happyCustomers: "5000+",
} as const;

/** Human-readable phone for display (basic formatting of the placeholder). */
export const PHONE_DISPLAY = `+${SITE.phone.slice(0, 2)} ${SITE.phone.slice(
  2,
)}`;

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Outstation", href: "#routes" },
  { label: "Local Packages", href: "#quote" },
  { label: "Fleet", href: "#fleet" },
  { label: "About", href: "#why-us" },
  { label: "Contact", href: "#footer" },
];

export const SOCIAL_LINKS = {
  facebook: "#",
  instagram: "#",
  googleMaps: "#",
} as const;
