import { PRICING } from "@/constants/pricing";
import type { BookingRoute } from "@/types/booking";

type CalculatePriceInput = {
  route: BookingRoute;
  adults: number;
  childrenUnder5: number;
};

export function calculatePrice({
  route,
  adults,
  childrenUnder5,
}: CalculatePriceInput): number {
  const isAirportHotel =
    route === "airport-hotel" ||
    route === "hotel-airport";

  if (isAirportHotel) {
    const pricing = PRICING.airportHotel;

    // No regular passengers:
    // charge only for children under 5.
    if (adults === 0) {
      return childrenUnder5 * pricing.childUnder5;
    }

    // 1–3 regular passengers = $75 base fare.
    const additionalPassengers = Math.max(
      0,
      adults - pricing.includedPassengers
    );

    return (
      pricing.baseFare +
      additionalPassengers * pricing.additionalPassenger +
      childrenUnder5 * pricing.childUnder5
    );
  }

  // Hotel ↔ Cruise Terminal
  const pricing = PRICING.hotelCruise;

  return (
    adults * pricing.adult +
    childrenUnder5 * pricing.childUnder5
  );
}
