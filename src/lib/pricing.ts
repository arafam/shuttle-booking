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
    route === "airport-hotel" || route === "hotel-airport";

  const pricing = isAirportHotel
    ? PRICING.airportHotel
    : PRICING.hotelCruise;

  return (
    adults * pricing.adult +
    childrenUnder5 * pricing.childUnder5
  );
}
