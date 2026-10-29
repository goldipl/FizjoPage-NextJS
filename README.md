# FizjoWebsite — Medical Center Website

A complete, responsive website for a physiotherapy & medical center built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS** and **React**. Exported as a static site and deployed to GitHub Pages.

## Features

- **13 page types / 33 static pages** – home, about, services (+ detail page per service), team (+ specialist profiles), pricing, gallery, blog (+ articles), contact, online booking, privacy policy, 404
- **Online booking** – 4-step wizard (service → specialist → date & time → details) with:
  - time slots generated from opening hours, visit duration and each specialist's working days
  - "any specialist" mode that assigns the first free person
  - deep links: `/rezerwacja?usluga=<slug>&wariant=<priceId>&specjalista=<slug>`
  - validation, booking number, `.ics` "add to calendar" download
  - bookings stored in `localStorage` so already booked slots become unavailable
- **Contact form** with validation and consent checkbox, map (OpenStreetMap), opening hours
- **Gallery** with category filters and keyboard-friendly lightbox
- Single source of truth for content in `src/data/` – navigation, footer, pricing and booking all read from the same data

## Getting Started

```bash
pnpm install
pnpm dev
```

The website will be available at:

```
http://localhost:3000
```

On GitHub Pages (build inside GitHub Actions) the site is served under `/FizjoPage-NextJS` – the `basePath` is set automatically in `next.config.js`.

## Forms backend

The site is a static export, so forms are sent to an external form backend (e.g. Formspree, Getform, Basin).
Set the endpoint at build time:

```bash
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx pnpm build
```

Without the variable the forms run in **demo mode** – submissions are validated and simulated, and the user sees a note about it.

## Project Structure

```
src/
├── app/                      — routes (App Router)
│   ├── layout.tsx            — root layout, fonts, metadata, Navbar + Footer
│   ├── page.tsx              — home page
│   ├── o-nas/                — about
│   ├── uslugi/[slug]/        — services list + detail
│   ├── zespol/[slug]/        — team list + profile
│   ├── cennik/               — pricing
│   ├── galeria/              — gallery
│   ├── blog/[slug]/          — blog list + article
│   ├── kontakt/              — contact
│   ├── rezerwacja/           — online booking
│   ├── polityka-prywatnosci/ — privacy policy
│   ├── not-found.tsx         — 404
│   └── icon.svg              — favicon
│
├── components/
│   ├── common/               — Navbar, Footer, Logo, PageHeader, SectionHeading, CtaBanner, FaqList
│   ├── cards/                — ServiceCard, TeamCard, PostCard, ReviewCard
│   ├── home/                 — home page sections
│   ├── gallery/              — GalleryGrid (filters + lightbox)
│   └── forms/                — ContactForm, BookingForm
│
├── data/                     — site config, services & prices, team, posts, reviews, FAQ, gallery, navigation
├── lib/                      — booking logic (slots, .ics), form submission & validation
└── css/globals.css           — Tailwind + shared form styles

public/img/                   — team, services, gallery, blog and page images (WebP)
```

## Content

All people, reviews, addresses and phone numbers are **fictional**. Photos are stock images from [Unsplash](https://unsplash.com) (Unsplash License).

To adapt the site for a real clinic, edit the files in `src/data/` and replace images in `public/img/`.

## Production Build

```bash
pnpm build
```

The static site is generated in `./out` and deployed by the GitHub Actions workflow in `.github/workflows/nextjs.yml`.

## License

Private project. All rights reserved.
