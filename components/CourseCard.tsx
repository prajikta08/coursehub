"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import * as LucideIcons from "lucide-react";
import type { Course } from "@/lib/supabase";

function ProgressBar({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full h-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: "#f0f0f0" }}
        initial={{ width: "0%" }}
        animate={{ width: isInView ? `${value}%` : "0%" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export default function CourseCard({ course, index }: { course: Course; index: number }) {
  const Icon = (LucideIcons as unknown as Record<string, React.ElementType>)[course.icon_name] ?? LucideIcons.BookOpen;

  return (
    <motion.article
      className="rounded-2xl p-5 flex flex-col gap-3"
      style={{ background: "var(--bg-card)", border: "1px solid rgba(255,255,255,0.08)" }}
      whileHover={{ scale: 1.018 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Icon size={18} color="#f0f0f0" strokeWidth={1.75} />
      <h3 className="text-sm font-semibold" style={{ color: "#f0f0f0" }}>{course.title}</h3>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between">
          <span className="text-xs" style={{ color: "#aaaaaa" }}>Progress</span>
          <span className="text-xs font-semibold" style={{ color: "#f0f0f0" }}>{course.progress}%</span>
        </div>
        <ProgressBar value={course.progress} />
      </div>
    </motion.article>
  );
}