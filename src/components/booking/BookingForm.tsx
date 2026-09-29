"use client";

import { useState, type FormEvent } from "react";
import PriceCalculator from "./PriceCalculator";
import type { BookingRoute } from "@/types/booking";

const routes: { value: BookingRoute; label: string }[] = [
  { value: "airport-hotel", label: "Airport → Hotel" },
  { value: "hotel-airport", label: "Hotel → Airport" },
  { value: "hotel-cruise", label: "Hotel → Cruise Terminal" },
  { value: "cruise-hotel", label: "Cruise Terminal → Hotel" },
];

export default function BookingForm() {
  const [route, setRoute] = useState<BookingRoute>("airport-hotel");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [cruiseTerminal, setCruiseTerminal] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [adults, setAdults] = useState(1);
  const [childrenUnder5, setChildrenUnder5] = useState(0);

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [showReview, setShowReview] = useState(false);

  const isCruiseRoute =
    route === "hotel-cruise" || route === "cruise-hotel";
  

  const terminalName = cruiseTerminal
    ? cruiseTerminal === "99"
      ? "Terminal 99"
      : `Pier ${cruiseTerminal}`
    : "Not selected";

  const actualPickupLocation =
    route === "cruise-hotel"
      ? terminalName
      : pickupLocation;

  const actualDropoffLocation =
    route === "hotel-cruise"
      ? terminalName
      : dropoffLocation;



  
  function handleReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Require at least one passenger.
    if (adults + childrenUnder5 < 1) {
      alert("Please select at least one passenger.");
      return;
    }

    // Require a terminal for cruise routes.
    if (isCruiseRoute && !cruiseTerminal) {
      alert("Please select your cruise terminal.");
      return;
    }

    // Validate the locations actually needed for this route.
    if (
      route !== "cruise-hotel" &&
      !pickupLocation.trim()
    ) {
      alert("Please enter your pickup location.");
      return;
    }

    if (
      route !== "hotel-cruise" &&
      !dropoffLocation.trim()
    ) {
      alert("Please enter your drop-off location.");
      return;
    }

    // Require a date and time.
    if (!date || !time) {
      alert("Please select your travel date and pickup time.");
      return;
    }

    // Prevent bookings in the past.
    const pickupDateTime = new Date(`${date}T${time}`);

    if (
      Number.isNaN(pickupDateTime.getTime()) ||
      pickupDateTime <= new Date()
    ) {
      alert("Please select a future pickup date and time.");
      return;
    }

    setShowReview(true);
  }


  return (
    <form
      onSubmit={handleReview}
      onChange={() => setShowReview(false)}
      className="mx-auto max-w-4xl space-y-8"
    >
      <div className="rounded-2xl bg-white p-6 shadow-md md:p-8">
        <h2 className="mb-6 text-2xl font-bold text-sky-800">
          1. Trip Details
        </h2>

        <div className="space-y-5">
          <div>
            <label htmlFor="route" className="mb-2 block font-medium">
              Select Route
            </label>
            <select
              id="route"
              value={route}
              onChange={(event) => {
                setRoute(event.target.value as BookingRoute);
                setCruiseTerminal("");
              }}
              className="w-full rounded-lg border p-3"
              required
            >
              {routes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {isCruiseRoute && (
            <div>
              <label
                htmlFor="cruiseTerminal"
                className="mb-2 block font-medium"
              >
                Cruise Terminal
              </label>
              <select
                id="cruiseTerminal"
                value={cruiseTerminal}
                onChange={(event) =>
                  setCruiseTerminal(event.target.value)
                }
                className="w-full rounded-lg border p-3"
                required
              >
                <option value="">Select a terminal</option>
                <option value="66">Pier 66</option>
                <option value="91">Pier 91</option>
              </select>
            </div>
          )}


            
          <div className="grid gap-5 md:grid-cols-2">
            {route !== "cruise-hotel" && (
              <div>
                <label
                  htmlFor="pickupLocation"
                  className="mb-2 block font-medium"
                >
                  {route === "airport-hotel"
                    ? "Airport Pickup Location"
                    : "Hotel Pickup Location"}
                </label>

                <input
                  id="pickupLocation"
                  type="text"
                  value={pickupLocation}
                  onChange={(event) =>
                    setPickupLocation(event.target.value)
                  }
                  placeholder={
                    route === "airport-hotel"
                      ? "Enter airport pickup location"
                      : "Enter hotel name and address"
                  }
                  className="w-full rounded-lg border p-3"
                  required
                />
              </div>
            )}

            {route !== "hotel-cruise" && (
              <div>
                <label
                  htmlFor="dropoffLocation"
                  className="mb-2 block font-medium"
                >
                  {route === "hotel-airport"
                    ? "Airport Drop-off Location"
                    : "Hotel Drop-off Location"}
                </label>

                <input
                  id="dropoffLocation"
                  type="text"
                  value={dropoffLocation}
                  onChange={(event) =>
                    setDropoffLocation(event.target.value)
                  }
                  placeholder={
                    route === "hotel-airport"
                      ? "Enter airport drop-off location"
                      : "Enter hotel name and address"
                  }
                  className="w-full rounded-lg border p-3"
                  required
                />
              </div>
            )}
          </div>



          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="date" className="mb-2 block font-medium">
                Travel Date
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="w-full rounded-lg border p-3"
                required
              />
            </div>

            <div>
              <label htmlFor="time" className="mb-2 block font-medium">
                Pickup Time
              </label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="w-full rounded-lg border p-3"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md md:p-8">
        <h2 className="mb-6 text-2xl font-bold text-sky-800">
          2. Passengers
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="adults" className="mb-2 block font-medium">
              Adults
            </label>
            <input
              id="adults"
              type="number"
              min="0"
              max="50"
              value={adults}
              onChange={(event) =>
                setAdults(Math.max(0, Number(event.target.value)))
              }
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label htmlFor="children" className="mb-2 block font-medium">
              Children Under 5
            </label>
            <input
              id="children"
              type="number"
              min="0"
              max="50"
              value={childrenUnder5}
              onChange={(event) =>
                setChildrenUnder5(
                  Math.max(0, Number(event.target.value))
                )
              }
              className="w-full rounded-lg border p-3"
              required
            />
          </div>
        </div>

        <div className="mt-8">
          <PriceCalculator
            route={route}
            adults={adults}
            childrenUnder5={childrenUnder5}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-md md:p-8">
        <h2 className="mb-6 text-2xl font-bold text-sky-800">
          3. Contact Information
        </h2>

        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              className="w-full rounded-lg border p-3"
              autoComplete="name"
              required
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="email" className="mb-2 block font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border p-3"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block font-medium">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-lg border p-3"
                autoComplete="tel"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="mb-2 block font-medium">
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              placeholder="Flight number, hotel name, special requests..."
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-sky-700 px-6 py-4 text-lg font-semibold text-white transition hover:bg-sky-800"
      >
        Review Booking
      </button>

      {showReview && (
        <div
          role="status"
          className="rounded-2xl border border-sky-200 bg-sky-50 p-6"
        >
          <h2 className="text-2xl font-bold text-sky-900">
            Booking Summary
          </h2>

          <div className="mt-4 space-y-2 text-gray-700">
            <p>
              <strong>Route:</strong>{" "}
              {routes.find((item) => item.value === route)?.label}
            </p>

            {isCruiseRoute && (
              <p>
                <strong>Terminal:</strong> {cruiseTerminal}
              </p>
            )}

            <p><strong>Date:</strong> {date}</p>
            <p><strong>Pickup Time:</strong> {time}</p>
            <p><strong>Passengers:</strong> {adults + childrenUnder5}</p>
            <p><strong>Name:</strong> {customerName}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p>
              <strong>Pickup:</strong> {actualPickupLocation}
            </p>
            <p>
              <strong>Drop-off:</strong> {actualDropoffLocation}
            </p>
            {notes && <p><strong>Notes:</strong> {notes}</p>}
          </div>

          <div className="mt-6">
            <PriceCalculator
              route={route}
              adults={adults}
              childrenUnder5={childrenUnder5}
            />
          </div>

          
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="font-semibold text-amber-900">
              Please review your booking details.
            </p>

            <p className="mt-2 text-sm text-amber-800">
              This is a preview only. Your booking has not been
              submitted or confirmed. You can change any information
              above before submitting your request.
            </p>
          </div>

        </div>
      )}
    </form>
  );
}
