import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BookPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-6">

          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-sky-700">
              Book Your Shuttle
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Complete the booking request below.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-xl">
            <iframe
              src="https://tally.so/embed/Ekr05o?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              width="100%"
              height="1400"
              frameBorder="0"
              title="Booking Form"
            />
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}