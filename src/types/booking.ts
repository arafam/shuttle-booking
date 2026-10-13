export type BookingRoute =
  | "airport-hotel"
  | "hotel-airport"
  | "hotel-cruise"
  | "cruise-hotel";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export type BookingData = {
  route: BookingRoute;

  pickupLocation: string;
  dropoffLocation: string;
  cruiseTerminal?: string;

  date: string;
  time: string;

  adults: number;
  childrenUnder5: number;

  customerName: string;
  email: string;
  phone: string;

  notes?: string;

  totalPrice: number;
};

export type Booking = BookingData & {
  id: string;
  status: BookingStatus;
  createdAt: string;
};
