export default function Footer() {
  return (
    <footer className="bg-sky-900 py-10 text-white">
      <div className="mx-auto max-w-7xl px-6 text-center">

        <h2 className="text-2xl font-bold">
          Seattle Airport Shuttle
        </h2>

        <p className="mt-3 text-blue-200">
          Airport • Hotel • Cruise Transportation
        </p>

        <p className="mt-8 text-sm text-blue-300">
          © {new Date().getFullYear()} Seattle Airport Shuttle.
          All rights reserved.
        </p>

      </div>
    </footer>
  );
}