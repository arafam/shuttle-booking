import { Plane, Hotel, Ship } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    title: "Airport to Hotel",
    description:
      "Reliable transportation between Seattle-Tacoma International Airport and your hotel.",
    icon: Plane,
    price: "$25 / person",
  },
  {
    title: "Hotel to Airport",
    description:
      "Comfortable and on-time shuttle service to Seattle-Tacoma International Airport.",
    icon: Hotel,
    price: "$25 / person",
  },
  {
    title: "Hotel to Cruise Terminal",
    description:
      "Transportation to Cruise 66, Cruise 91, and Cruise 99 terminals.",
    icon: Ship,
    price: "$15 / person",
  },
];

export default function Services() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-sky-700">
            Our Services
          </h2>

          <p className="mt-4 text-gray-600">
            Safe, reliable, and affordable transportation throughout Seattle.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Card
                key={service.title}
                className="rounded-2xl shadow-md transition hover:-translate-y-2 hover:shadow-xl"
              >
                <CardContent className="p-8">
                  <Icon className="mb-6 h-12 w-12 text-sky-600" />

                  <h3 className="text-2xl font-semibold">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-gray-600">
                    {service.description}
                  </p>

                  <div className="mt-6 text-xl font-bold text-sky-700">
                    {service.price}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}