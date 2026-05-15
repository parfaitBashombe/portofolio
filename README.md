# Parfait Bashombe — Portfolio

Fullstack Developer specialized in Front-End.

I build web experiences that are fast, clean, and easy to use. My focus is on the front end — the part people actually see and interact with — but I'm comfortable across the full stack when the situation calls for it.

This portfolio is where I put my best work. It's built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4, with Framer Motion handling the animations. The data layer runs on Supabase (PostgreSQL), managed through a separate admin dashboard application.

**Live:** [portofolio-beryl-psi.vercel.app](https://portofolio-beryl-psi.vercel.app)

---

## Tech Stack

**Frontend** — Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion

**Backend / Data** — Supabase (PostgreSQL), server-side data fetching via Next.js route handlers

**Deployment** — Vercel

---

## Architecture

This repository contains the **client (portfolio) app**. The full system has two Next.js applications sharing one Supabase backend:

| App | Description |
|-----|-------------|
| `client/` | Public-facing portfolio — the app in this repo |
| `dashboard/` | Admin dashboard for managing projects and blog posts |

Both apps read from and write to the same Supabase project. The dashboard handles content creation (rich text editor, media uploads, project management), while the portfolio displays that content to visitors.

---

## Features

- Project showcase with image carousels and modal detail views
- Blog with full-text search, category filtering, and modal reading experience
- Standalone SEO-friendly detail pages for projects and blog posts
- Contact form
- Newsletter subscription
- Dark / light theme toggle
- Fully responsive design — mobile drawer navigation, stacked layouts on small screens
- Smooth animations throughout via Framer Motion

---

## What I Work With

**Front End** — Next.js, React, TypeScript, Tailwind CSS, Framer Motion, CSS, HTML5

**Back End** — Node.js, Express.js, REST APIs, Supabase, PostgreSQL, Prisma ORM

**Tools & Deployment** — Git, Vercel, GitHub, npm, Docker basics

**Other** — JWT Authentication, Zod validation, API design, Database design

---

## Featured Projects

### [PS5 Store](https://github.com/parfaitBashombe/ps5-store)
A modern, PS5-inspired e-commerce store with a premium dark UI and glassmorphism design. Features product filtering and a fully responsive gaming store experience.

### [Streamy](https://github.com/parfaitBashombe/streamy)
RESTful API for managing personal movie watchlists. Built with Express 5, TypeScript, and PostgreSQL via Prisma 7. Features dual JWT authentication with refresh token rotation and Zod-powered validation.

### [Japanese University News Hub](https://github.com/parfaitBashombe/japanese-university-news-hub)
A centralized Next.js platform where Japanese universities post news. Features auth simulation, post management, filtering, pagination, and responsive Tailwind UI.

### [Streary](https://github.com/parfaitBashombe/streary)
A premium streaming discovery platform for finding, saving, and organizing movies and TV series.

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Environment variables (`.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## Let's Work Together

If you have a project, an opportunity, or just want to talk about building something — reach out.

- **Portfolio:** [portofolio-beryl-psi.vercel.app](https://portofolio-beryl-psi.vercel.app)
- **Email:** ntavigwabashombe@gmail.com
- **GitHub:** [github.com/parfaitBashombe](https://github.com/parfaitBashombe)
- **LinkedIn:** [linkedin.com/in/parfait-bashombe-7b3866316](https://www.linkedin.com/in/parfait-bashombe-7b3866316/)
