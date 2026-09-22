export type BookingRoute =
  | "airport-hotel"
  | "hotel-airport"
  | "hotel-cruise"
  | "cruise-hotel";

export type BookingData = {
  route: BookingRoute;

  date: Date | undefined;

  time: string;

  cruiseNumber?: string;

  adults: number;

  childrenUnder5: number;

  customerName: string;

  email: string;

  phone: string;

  notes?: string;
};
