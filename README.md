# FizjoPageNextjs — Medical Center Website

A modern responsive website template for a medical center built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **React**.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

The website will be available at:

```
http://localhost:3000/FizjoPage-NextJS
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       — Root layout, metadata, global styles
│   ├── page.tsx         — Main page composition
│   └── globals.css      — Tailwind CSS + global styles
│
├── components/
│   ├── common/
│   │   ├── Navbar.tsx   — Sticky navigation, dropdown menus, mobile menu
│   │   └── Footer.tsx   — Footer with contact details, navigation and opening hours
│   │
│   └── home/
│       ├── Hero.tsx     — Hero section with main CTA and feature highlights
│       ├── Team.tsx     — Medical team section with profile cards
│       └── Gallery.tsx  — Image gallery section
│
public/
├── icons/
└── img/
    └── logo/
        ├── fizjomedica.png
        └── fizjomedica2.png
```

## Technologies

Built with:

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Lucide Icons
- Next/Image optimization

---

## Production Build

Create an optimized production build:

```bash
pnpm build
```

Run the production server:

```bash
pnpm start
```

---

## License

Private project. All rights reserved.

```

```
