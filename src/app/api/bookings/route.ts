
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { BookingData } from "@/types/booking";

export async function POST(request: Request) {
  try {
    const booking: BookingData = await request.json();

    const savedBooking = await prisma.booking.create({
      data: {
        route: booking.route,
        pickupLocation: booking.pickupLocation,
        dropoffLocation: booking.dropoffLocation,
        cruiseTerminal: booking.cruiseTerminal,
        date: booking.date,
        time: booking.time,
        adults: booking.adults,
        childrenUnder5: booking.childrenUnder5,
        customerName: booking.customerName,
        email: booking.email,
        phone: booking.phone,
        notes: booking.notes,
        totalPrice: booking.totalPrice,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking saved successfully.",
        booking: savedBooking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save booking.",
      },
      { status: 500 }
    );
  }
}
