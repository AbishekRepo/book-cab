import type { PopularRoute } from "@/types";

export const POPULAR_ROUTES: PopularRoute[] = [
  {
    id: "chennai-pondicherry",
    from: "Chennai Airport",
    to: "Pondicherry",
    startingPrice: 2900,
    distanceKm: 150,
  },
  {
    id: "chennai-bangalore",
    from: "Chennai",
    to: "Bangalore",
    startingPrice: 5500,
    distanceKm: 350,
  },
  {
    id: "coimbatore-ooty",
    from: "Coimbatore",
    to: "Ooty",
    startingPrice: 2500,
    distanceKm: 90,
  },
  {
    id: "madurai-rameshwaram",
    from: "Madurai",
    to: "Rameshwaram",
    startingPrice: 3200,
    distanceKm: 175,
  },
  {
    id: "chennai-tirupati",
    from: "Chennai",
    to: "Tirupati",
    startingPrice: 3500,
    distanceKm: 135,
  },
  {
    id: "trichy-thanjavur",
    from: "Trichy",
    to: "Thanjavur",
    startingPrice: 1800,
    distanceKm: 60,
  },
];
