import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { createAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD is not configured.");

      return NextResponse.json(
        { success: false, message: "Login is temporarily unavailable." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const password = body?.password;

    if (typeof password !== "string" || password.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid password." },
        { status: 401 }
      );
    }

    const expected = Buffer.from(adminPassword);
    const received = Buffer.from(password);

    const passwordIsValid =
      expected.length === received.length &&
      timingSafeEqual(expected, received);

    if (!passwordIsValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password." },
        { status: 401 }
      );
    }

    await createAdminSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to log in right now." },
      { status: 500 }
    );
  }
}
