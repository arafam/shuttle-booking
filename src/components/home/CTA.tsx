import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-sky-700 py-20 text-white">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-5xl font-bold">
          Ready to Book Your Ride?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-xl text-sky-100">
          Reserve your airport or cruise shuttle in just a few minutes.
        </p>

        <Link
          href="/book"
          className="mt-10 inline-block rounded-xl bg-white px-8 py-4 text-lg font-semibold text-sky-700 transition hover:bg-gray-100"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}