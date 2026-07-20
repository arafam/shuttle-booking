import Link from "next/link";
import { ArrowRight, Plane, Hotel, Ship } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-700 via-blue-600 to-indigo-700 text-white">
      <div className="mx-auto flex min-h-[85vh] max-w-7xl items-center px-6 py-20">
        <div className="max-w-3xl">

          <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
            🚐 Reliable Airport & Cruise Transportation
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-7xl">
            Seattle Airport &
            <br />
            Cruise Shuttle
          </h1>

          <p className="mt-6 max-w-2xl text-xl text-blue-100">
            Comfortable, affordable, and on-time transportation between
            Seattle-Tacoma International Airport, hotels, and cruise terminals.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/book">
                <Button size="lg">
                    Book Your Ride
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
            </Link>

            <Link href="/services">
                <Button variant="secondary" size="lg">
                    View Services
                </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Airport Pickup
            </div>

            <div className="flex items-center gap-2">
              <Hotel className="h-5 w-5" />
              Hotel Transfers
            </div>

            <div className="flex items-center gap-2">
              <Ship className="h-5 w-5" />
              Cruise Terminals
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}