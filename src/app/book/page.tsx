import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingForm from "@/components/booking/BookingForm";

export default function BookPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-sky-700">
            Book Your Shuttle
          </h1>

          <p className="mt-4 text-gray-600">
            Select your trip and review your estimated fare.
          </p>
        </div>

        <BookingForm />
      </main>

      <Footer />
    </>
  );
}
