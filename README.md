# Meridian — Learning Dashboard

A high-fidelity student dashboard built with Next.js App Router, Supabase, Tailwind CSS, and Framer Motion.

---

## Setup

```bash
npm install
cp .env.example .env.local
# fill in your Supabase credentials
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

## Architecture

### Server / Client Split

| File | Rendered on |
|---|---|
| `app/page.tsx` | Server — fetches courses via RSC |
| `components/CourseGrid.tsx` | Client — Framer Motion stagger |
| `components/CourseCard.tsx` | Client — hover springs, animated progress bars |
| `components/Sidebar.tsx` | Client — collapse state, layoutId highlight |
| `components/ActivityTile.tsx` | Client — generated graph, entrance animations |
| `components/HeroTile.tsx` | Client — hover spring |
| `components/StatsTile.tsx` | Client — hover spring |

`fetchCourses()` in `lib/supabase.ts` runs exclusively on the server and is called inside `<CoursesSection>`, an async Server Component wrapped in `<Suspense>`. Skeleton loaders appear during the async boundary.

### Animation Strategy

- **Zero layout shift**: all animations use `transform` and `opacity` only.
- **Spring physics**: every hover uses `type: "spring", stiffness: 300, damping: 20`.
- **Stagger**: `BentoShell` staggers section entrances; `CourseGrid` staggers card entrances independently.
- **Progress bars**: animated via `useInView` — bars only play when scrolled into view.
- **Sidebar highlight**: `layoutId="nav-highlight"` for smooth shared-layout transitions.

### Responsive Breakpoints

- **Mobile < 768px**: bottom navigation bar; grid stacks to a single column.
- **Tablet 768–1024px**: sidebar collapses to icon-only; grid uses 2 columns.
- **Desktop > 1024px**: full sidebar + 4-column bento grid.

---

## Deployment

Push to GitHub, import into Vercel, and add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables in the Vercel dashboard.
