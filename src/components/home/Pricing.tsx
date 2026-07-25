const pricing = [
  {
    route: "Airport ↔ Hotel",
    price: "$25",
    notes: [
      "Per passenger",
      "Children under 5: $15",
    ],
  },
  {
    route: "Hotel ↔ Cruise Terminal",
    price: "$15",
    notes: [
      "Per passenger",
      "Children under 5: $12",
    ],
  },
  {
    route: "And any other route you need",
    price: "Contact us",
    notes: [
      "We can provide transportation to any location in the Seattle area.",
      //"Children under 5: $12",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-sky-700">
            Simple & Transparent Pricing
          </h2>

          <p className="mt-4 text-gray-600">
            No hidden fees. Know your fare before you ride.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {pricing.map((item) => (
            <div
              key={item.route}
              className="rounded-2xl border bg-sky-50 p-8 text-center shadow-sm transition hover:shadow-lg"
            >
              <h3 className="text-2xl font-semibold">{item.route}</h3>

              <p className="mt-6 text-5xl font-bold text-sky-700">
                {item.price}
              </p>

              <div className="mt-4 space-y-1">
                {item.notes.map((note) => (
                    <p key={note} className="text-gray-600">
                    {note}
                    </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}