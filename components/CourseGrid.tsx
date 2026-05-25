"use client";

import CourseCard from "./CourseCard";
import type { Course } from "@/lib/supabase";

export default function CourseGrid({ courses }: { courses: Course[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {courses.map((course, i) => (
        <CourseCard key={course.id} course={course} index={i} />
      ))}
    </div>
  );
}