# Shuttle Booking

Am working on a booking website for a shuttle service that runs transfers between the airport, local hotels, and the cruise terminal (cruises 66, 91, and 99).

Customers pick a pickup and drop-off location, choose a date and time, and enter their passenger count — the site calculates the price automatically and confirms the booking. A QR code linking to the site will be printed on business cards, airport signage, and the vehicles themselves.

## Pricing

| Route                          | Price       |
| ------------------------------ | ----------- |
| Airport ↔ Hotel                | $25/person  |
| Hotel ↔ Cruise Terminal        | $15/person  |
| Child under 5 (any route)      | $12/person  |

## Features

- **Booking form** — pickup/destination, calendar date & time picker, passenger counts, live price calculation
- **Booking confirmation** — generates a booking number (e.g. `SH-10482`) and total
- **Admin dashboard** — view, accept, cancel, and complete the day's bookings
- Fully responsive (phone, tablet, desktop)

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Forms/validation:** react-hook-form + zod
- **Database & auth:** Supabase
- **Hosting:** Vercel
- **Email confirmations:** Resend

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/          # Pages: home, book, admin, about, services, contact
├── components/   # BookingForm, PriceCalculator, Navbar, etc.
├── constants/    # Pricing, routes, cruise numbers
├── lib/          # Validators, shared utils
├── types/        # Shared TypeScript types
└── utils/        # Price calculation, date/currency formatting
```

## Status

🚧 In progress — booking form and admin dashboard under active development.

