import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import BookingTable from "@/components/admin/BookingTable";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formattedBookings = bookings.map((booking) => ({
    id: booking.id,
    customerName: booking.customerName,
    email: booking.email,
    phone: booking.phone,
    route: booking.route,
    pickupLocation: booking.pickupLocation,
    dropoffLocation: booking.dropoffLocation,
    date: booking.date,
    time: booking.time,
    adults: booking.adults,
    childrenUnder5: booking.childrenUnder5,
    totalPrice: booking.totalPrice,
    status: booking.status,
  }));

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Booking Management
            </h1>
            <p className="mt-2 text-gray-600">
              View and manage customer shuttle bookings.
            </p>
          </div>

          <AdminLogoutButton />
        </div>

        <BookingTable bookings={formattedBookings} />
      </div>
    </main>
  );
}
