import Navbar from "@/components/layout/Navbar";

export default function BookPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-sky-700">
            Book Your Shuttle
          </h1>

          <p className="mt-3 text-gray-600">
            Complete the booking form below and we'll confirm your reservation
            shortly.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-white shadow-lg">
          <iframe
            src="https://tally.so/embed/Ekr05o?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            width="100%"
            height="1200"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Shuttle Booking Form"
          >
            Loading...
          </iframe>
        </div>
      </main>
    </>
  );
}