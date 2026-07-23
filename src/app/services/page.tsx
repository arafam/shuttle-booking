import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Services from "@/components/home/Services";

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <section className="bg-sky-700 py-20 text-white">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h1 className="text-5xl font-bold">Our Services</h1>

            <p className="mt-4 text-xl text-blue-100">
              Reliable transportation throughout Seattle.
            </p>
          </div>
        </section>

        <Services />
      </main>

      <Footer />
    </>
  );
}