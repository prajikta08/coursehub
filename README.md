# CourseHub — Learning Dashboard

A student dashboard built with Next.js App Router, Supabase, Tailwind CSS, and Framer Motion.

---

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

If env vars are absent, the app falls back to built-in mock data — no setup required to preview.

---

## Supabase Table Schema

```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null check (progress between 0 and 100),
  icon_name text not null,
  created_at timestamptz default now()
);

-- Seed data
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 74, 'Layers'),
  ('Systems Design Fundamentals', 42, 'Network'),
  ('TypeScript Deep Dive', 91, 'Code2'),
  ('Machine Learning Basics', 28, 'Brain');
```

---

## Architectural Choices

### Why App Router?
Next.js App Router allows components to be Server Components by default. This means data fetching happens on the server with zero client-side waterfalls — the courses are fetched before the page reaches the browser.

### Why Supabase?
Supabase gives a hosted PostgreSQL database with a simple JS client. The `fetchCourses()` function runs server-side only, so API keys are never exposed to the client.

---

## Server / Client Component Split

The core principle was: **fetch on the server, animate on the client.**

| File | Rendered on | Why |
|---|---|---|
| `app/page.tsx` | Server | Data fetching, layout |
| `CoursesSection` (in page.tsx) | Server | Async Supabase fetch |
| `components/CourseCard.tsx` | Client | Framer Motion animations |
| `components/Sidebar.tsx` | Client | useState for collapse/active |
| `components/ActivityTile.tsx` | Client | Deterministic graph generation |
| `components/HeroTile.tsx` | Client | Hover spring animations |
| `components/StatsTile.tsx` | Client | Hover spring animations |
| `components/BentoShell.tsx` | Client | Staggered entrance animations |

`<CoursesSection>` is wrapped in `<Suspense>` so skeleton loaders appear instantly while Supabase responds. If the database is unreachable, it falls back to mock data gracefully without crashing.

---

## Challenges

**1. Hydration mismatch with Math.random()**
The activity graph initially used `Math.random()` inside a component, which produced different values on the server and client causing a React hydration error. Fixed by moving to a deterministic pseudo-random function based on position index, computed once at module level.

**2. Framer Motion with Server Components**
Framer Motion requires `"use client"` — any component using it can't be a Server Component. The solution was to keep all data fetching in pure async Server Components and pass data down as props to Client Components for animation.


---

## Responsive Breakpoints

- **Mobile < 768px**: bottom navigation bar; grid stacks to a single column.
- **Tablet 768–1024px**: sidebar collapses to icon-only; grid uses 2 columns.
- **Desktop > 1024px**: full sidebar + 4-column bento grid.

---

## Deployment

Push to GitHub, import into Vercel, and add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables in the Vercel dashboard.
