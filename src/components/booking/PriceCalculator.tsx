
import { calculatePrice } from "@/lib/pricing";
import type { BookingRoute } from "@/types/booking";

type PriceCalculatorProps = {
  route: BookingRoute;
  adults: number;
  childrenUnder5: number;
};

export default function PriceCalculator({
  route,
  adults,
  childrenUnder5,
}: PriceCalculatorProps) {
  const total = calculatePrice({
    route,
    adults,
    childrenUnder5,
  });

  return (
    <div className="rounded-2xl border border-sky-200 bg-sky-50 p-6">
      <h3 className="text-xl font-bold text-sky-900">
        Your Estimated Fare
      </h3>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>Adults</span>
          <span>{adults}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Children under 5</span>
          <span>{childrenUnder5}</span>
        </div>

        <div className="border-t border-sky-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">
              Total
            </span>

            <span className="text-3xl font-bold text-sky-700">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Estimated one-way fare based on your selected route
        and number of passengers.
      </p>
    </div>
  );
}
