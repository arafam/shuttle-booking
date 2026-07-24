import { ShieldCheck, Clock, Users, Car } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    description: "Professional transportation service you can trust.",
  },
  {
    icon: Clock,
    title: "On-Time Pickup",
    description: "We monitor schedules and arrive when you need us.",
  },
  {
    icon: Users,
    title: "Family Friendly",
    description: "Comfortable rides for individuals, families, and groups.",
  },
  {
    icon: Car,
    title: "Clean Vehicles",
    description: "Well-maintained, clean, and comfortable shuttle vehicles.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-sky-700">
            Why Choose Us
          </h2>
          <p className="mt-4 text-gray-600">
            Reliable transportation backed by professional service.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title} className="text-center">
                <CardContent className="p-8">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">
                    <Icon className="h-8 w-8 text-sky-700" />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}