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





------------------------------------------------------------------------------
It is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
----------------------------------------------------------------------------------
