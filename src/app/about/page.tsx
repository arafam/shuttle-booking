import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen py-20">
        <div className="mx-auto max-w-5xl px-6">

          <h1 className="text-center text-5xl font-bold text-sky-700">
            About Us
          </h1>

          <div className="mt-10 space-y-6 text-lg leading-8 text-gray-700">

            <p>
              We provide dependable shuttle transportation between Seattle-Tacoma
              International Airport, hotels, and Seattle cruise terminals.
            </p>

            <p>
              Our goal is to provide safe, affordable, and on-time transportation
              for individuals, families, and groups.
            </p>

            <p>
              Whether you're arriving for a cruise or heading to the airport,
              we're committed to making your trip smooth and stress-free.
            </p>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}