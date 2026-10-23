import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculatePrice } from "@/lib/pricing";
import type { BookingRoute } from "@/types/booking";

const allowedRoutes: BookingRoute[] = [
  "airport-hotel",
  "hotel-airport",
  "hotel-cruise",
  "cruise-hotel",
];

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

type TurnstileVerification = {
  success?: boolean;
};

async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    throw new Error("TURNSTILE_SECRET_KEY is not configured.");
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    }
  );

  if (!response.ok) {
    throw new Error("Cloudflare Turnstile verification request failed.");
  }

  const result = (await response.json()) as TurnstileVerification;
  return result.success === true;
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid booking data." },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;

    // Validate the route.
    if (
      typeof data.route !== "string" ||
      !allowedRoutes.includes(data.route as BookingRoute)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid booking route." },
        { status: 400 }
      );
    }

    // Validate passenger counts.
    if (
      !Number.isInteger(data.adults) ||
      !Number.isInteger(data.childrenUnder5) ||
      (data.adults as number) < 0 ||
      (data.childrenUnder5 as number) < 0 ||
      (data.adults as number) > 20 ||
      (data.childrenUnder5 as number) > 20 ||
      (data.adults as number) + (data.childrenUnder5 as number) === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid passenger counts." },
        { status: 400 }
      );
    }

    // Validate required text fields.
    const requiredStrings = [
      "pickupLocation",
      "dropoffLocation",
      "customerName",
      "email",
      "phone",
      "date",
      "time",
    ];

    for (const field of requiredStrings) {
      if (!isNonEmptyString(data[field])) {
        return NextResponse.json(
          {
            success: false,
            message: `${field} is required.`,
          },
          { status: 400 }
        );
      }
    }

    const pickupLocation = (data.pickupLocation as string).trim();
    const dropoffLocation = (data.dropoffLocation as string).trim();
    const customerName = (data.customerName as string).trim();
    const email = (data.email as string).trim();
    const phone = (data.phone as string).trim();
    const date = data.date as string;
    const time = data.time as string;

    if (
      pickupLocation.length > 200 ||
      dropoffLocation.length > 200 ||
      customerName.length > 120 ||
      email.length > 254 ||
      phone.length > 40
    ) {
      return NextResponse.json(
        { success: false, message: "One or more fields are too long." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email." },
        { status: 400 }
      );
    }

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid date or time." },
        { status: 400 }
      );
    }

    if (
      data.cruiseTerminal !== undefined &&
      data.cruiseTerminal !== null &&
      (typeof data.cruiseTerminal !== "string" ||
        data.cruiseTerminal.length > 100)
    ) {
      return NextResponse.json(
        { success: false, message: "Invalid cruise terminal." },
        { status: 400 }
      );
    }

    if (
      data.notes !== undefined &&
      data.notes !== null &&
      (typeof data.notes !== "string" || data.notes.length > 1000)
    ) {
      return NextResponse.json(
        { success: false, message: "Notes are too long." },
        { status: 400 }
      );
    }

    // Verify the Turnstile token before creating a database record.
    // Tokens are single-use and expire, so the browser must provide a fresh one.
    const turnstileToken = data.turnstileToken;

    if (
      typeof turnstileToken !== "string" ||
      turnstileToken.trim().length === 0 ||
      turnstileToken.length > 2048
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete the security check and try again.",
        },
        { status: 400 }
      );
    }

    let turnstileVerified = false;

    try {
      turnstileVerified = await verifyTurnstileToken(turnstileToken);
    } catch (error) {
      console.error("Turnstile verification service error:", error);

      return NextResponse.json(
        {
          success: false,
          message:
            "The security check is temporarily unavailable. Please try again shortly.",
        },
        { status: 503 }
      );
    }

    if (!turnstileVerified) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The security check could not be verified. Please complete it again.",
        },
        { status: 403 }
      );
    }

    // Calculate the fare on the server.
    // Never trust the totalPrice supplied by the browser.
    const route = data.route as BookingRoute;
    const adults = data.adults as number;
    const childrenUnder5 = data.childrenUnder5 as number;

    const totalPrice = calculatePrice({
      route,
      adults,
      childrenUnder5,
    });

    const savedBooking = await prisma.booking.create({
      data: {
        route,
        pickupLocation,
        dropoffLocation,
        cruiseTerminal:
          typeof data.cruiseTerminal === "string"
            ? data.cruiseTerminal.trim()
            : null,
        date,
        time,
        adults,
        childrenUnder5,
        customerName,
        email,
        phone,
        notes:
          typeof data.notes === "string"
            ? data.notes.trim()
            : null,
        totalPrice,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking saved successfully.",
        bookingId: savedBooking.id,
        totalPrice: savedBooking.totalPrice,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON request." },
        { status: 400 }
      );
    }

    console.error("Booking API error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to save booking." },
      { status: 500 }
    );
  }
}
