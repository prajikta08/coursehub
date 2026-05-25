"use client";

import CourseCard from "./CourseCard";
import type { Course } from "@/lib/supabase";

interface CourseGridProps {
  courses: Course[];
}

export default function CourseGrid({ courses }: CourseGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {courses.map((course, i) => (
        <CourseCard key={course.id} course={course} index={i} />
      ))}
    </div>
  );
}