"use client";

import { useState } from "react";

type Booking = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  route: string;
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  time: string;
  adults: number;
  childrenUnder5: number;
  totalPrice: number;
  status: string;
};

type BookingTableProps = {
  bookings: Booking[];
};

const statuses = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

export default function BookingTable({
  bookings: initialBookings,
}: BookingTableProps) {
  const [bookings, setBookings] = useState(initialBookings);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);

    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update booking.");
      }

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === id
            ? { ...booking, status }
            : booking
        )
      );
    } catch (error) {
      console.error(error);
      alert("Unable to update booking status.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Route</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">
                Passengers
              </th>
              <th className="px-6 py-4 font-semibold">Total</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {booking.customerName}
                  </div>

                  <div className="text-gray-500">
                    {booking.email}
                  </div>

                  <div className="text-gray-500">
                    {booking.phone}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="font-medium">
                    {booking.route}
                  </div>

                  <div className="mt-1 text-gray-500">
                    {booking.pickupLocation}
                    {" → "}
                    {booking.dropoffLocation}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div>{booking.date}</div>

                  <div className="text-gray-500">
                    {booking.time}
                  </div>
                </td>

                <td className="px-6 py-4">
                  {booking.adults} adults

                  {booking.childrenUnder5 > 0 && (
                    <div className="text-gray-500">
                      {booking.childrenUnder5} children
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 font-semibold">
                  ${booking.totalPrice.toFixed(2)}
                </td>

                <td className="px-6 py-4">
                  <select
                    value={booking.status}
                    disabled={updatingId === booking.id}
                    onChange={(event) =>
                      updateStatus(
                        booking.id,
                        event.target.value
                      )
                    }
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm capitalize outline-none focus:border-sky-500"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && (
        <div className="px-6 py-12 text-center text-gray-500">
          No bookings yet.
        </div>
      )}
    </div>
  );
}
