import {
  Clock3,
  ShieldCheck,
  Car,
  BadgeDollarSign,
} from "lucide-react";

const features = [
  {
    icon: Clock3,
    title: "Always On Time",
    description: "We monitor flights and arrive promptly for every pickup.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Reliable",
    description: "Professional drivers focused on safety and comfort.",
  },
  {
    icon: Car,
    title: "Comfortable Vehicles",
    description: "Clean, spacious, and well-maintained shuttle vehicles.",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Rates",
    description: "Transparent pricing with no hidden fees.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-sky-700">
            Why Choose Us
          </h2>

          <p className="mt-4 text-gray-600">
            Trusted transportation for airport and cruise travelers.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-8 shadow-md"
              >
                <Icon className="mb-4 h-12 w-12 text-sky-700" />

                <h3 className="text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}