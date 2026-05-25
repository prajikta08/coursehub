"use client";

import { motion } from "framer-motion";

function SkeletonBlock({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      className={`rounded-lg ${className ?? ""}`}
      style={{
        background: "linear-gradient(90deg, var(--bg-elevated) 0%, var(--bg-card) 50%, var(--bg-elevated) 100%)",
        backgroundSize: "200% 100%",
        ...style,
      }}
      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function CourseCardSkeleton() {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)" }}
    >
      <SkeletonBlock style={{ width: 36, height: 36 }} className="rounded-xl" />
      <div className="flex flex-col gap-2">
        <SkeletonBlock style={{ height: 14, width: "85%" }} />
        <SkeletonBlock style={{ height: 14, width: "60%" }} />
      </div>
      <div className="flex flex-col gap-1.5 mt-auto">
        <div className="flex justify-between">
          <SkeletonBlock style={{ height: 10, width: 50 }} />
          <SkeletonBlock style={{ height: 10, width: 30 }} />
        </div>
        <SkeletonBlock style={{ height: 4, width: "100%" }} className="rounded-full" />
      </div>
    </div>
  );
}

export default function CourseSkeletons() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </>
  );
}
