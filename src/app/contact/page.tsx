import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen py-20">
        <div className="mx-auto max-w-5xl px-6">

          <h1 className="text-center text-5xl font-bold text-sky-700">
            Contact Us
          </h1>

          <div className="mt-12 space-y-8 rounded-2xl bg-white p-10 shadow-lg">

            <div className="flex items-center gap-4">
              <Phone className="text-sky-700" />
              <span>(206) XXX-XXXX</span>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="text-sky-700" />
              <span>info@yourshuttle.com</span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-sky-700" />
              <span>Seattle, Washington</span>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}