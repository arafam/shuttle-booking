"use client";

import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-2xl font-bold text-sky-700"
        >
          🚐 Seattle Shuttle
        </Link>

        <nav className="hidden items-center gap-8 md:flex">

          <Link href="/">Home</Link>

          <Link href="/services">Services</Link>

          <Link href="/book">Book</Link>

          <Link href="/about">About</Link>

          <Link href="/contact">Contact</Link>

        </nav>

        <div className="hidden md:block">
          <Button>
            <Phone className="mr-2 h-4 w-4" />
            Call Now
          </Button>
        </div>

        <button className="md:hidden">
          <Menu />
        </button>

      </div>
    </header>
  );
}