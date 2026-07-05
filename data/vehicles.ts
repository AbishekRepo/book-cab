import type { FleetCar } from "@/types";

/**
 * Fleet / selectable vehicles. `startingPrice` is display-only for Phase 1;
 * real fare computation arrives with the backend (Phase 2).
 */
export const VEHICLES: FleetCar[] = [
  {
    id: "swift-dzire",
    name: "Swift Dzire",
    category: "Sedan",
    seats: 4,
    ac: true,
    startingPrice: 12,
    image: "",
  },
  {
    id: "toyota-etios",
    name: "Toyota Etios",
    category: "Sedan",
    seats: 4,
    ac: true,
    startingPrice: 13,
    image: "",
  },
  {
    id: "ertiga",
    name: "Ertiga",
    category: "SUV",
    seats: 6,
    ac: true,
    startingPrice: 16,
    image: "",
  },
  {
    id: "innova",
    name: "Innova",
    category: "SUV",
    seats: 7,
    ac: true,
    startingPrice: 19,
    image: "",
  },
  {
    id: "traveller-12",
    name: "Traveller (12)",
    category: "Mini Bus",
    seats: 12,
    ac: true,
    startingPrice: 24,
    image: "",
  },
  {
    id: "traveller-18",
    name: "Traveller (18)",
    category: "Mini Bus",
    seats: 18,
    ac: true,
    startingPrice: 30,
    image: "",
  },
];
