"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Book Now", href: "/book" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-sky-700"
          onClick={() => setMobileOpen(false)}
        >
          🚐 Arafa's Airport Shuttle
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium text-gray-700 transition hover:text-sky-700"
            >
              {link.name}
            </Link>
          ))}

          <a
            href="tel:+12063354739"
            className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white transition hover:bg-sky-800"
          >
            Call Now
          </a>
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <Menu className="h-8 w-8" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="flex flex-col p-6">

            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-4 text-lg font-medium hover:bg-sky-50"
              >
                {link.name}
              </Link>
            ))}

            <a
              href="tel:+12063354739"
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-sky-700 py-4 font-semibold text-white"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>

          </div>
        </div>
      )}
    </header>
  );
}