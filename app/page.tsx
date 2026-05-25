import { Suspense } from "react";
import { fetchCourses } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import HeroTile from "@/components/HeroTile";
import ActivityTile from "@/components/ActivityTile";
import StatsTile from "@/components/StatsTile";
import CourseGrid from "@/components/CourseGrid";
import MobileNav from "@/components/MobileNav";
import CourseSkeletons from "@/components/SkeletonLoader";

async function CoursesSection() {
  const { courses, error } = await fetchCourses();

  if (error) {
    return (
      <div
        className="rounded-2xl p-5 text-sm"
        style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}
      >
        Could not connect to the database. Showing cached data instead.
      </div>
    );
  }

  return <CourseGrid courses={courses} />;
}

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1f1f1f 100%)" }}>
      <Sidebar />
 
      <main className="flex-1 overflow-y-auto scrollbar-hide pb-20 md:pb-0 " style={{ background: "transparent" }}>
        <div className="flex flex-col gap-3 p-5 md:p-7" style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Hero + Stats */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-3">
            <div className="xl:col-span-3"><HeroTile /></div>
            <div className="xl:col-span-1"><StatsTile /></div>
          </div>

          {/* Section label */}
          <div className="flex items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#666666" }}>
              Active Courses
            </p>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Courses */}
          <Suspense fallback={
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
              <CourseSkeletons />
            </div>
          }>
            <CoursesSection />
          </Suspense>

          {/* Activity */}
          <ActivityTile />

        </div>
      </main>

      <MobileNav />
    </div>
  );
}