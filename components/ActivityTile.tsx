"use client";

import { motion } from "framer-motion";

const LEVEL_COLORS = [
  "rgba(255,255,255,0.07)",
  "rgba(34,197,94,0.25)",
  "rgba(34,197,94,0.5)",
  "rgba(34,197,94,0.75)",
  "#22c55e",
];

function generateActivity() {
  const today = new Date();
  const days: { date: Date; value: number }[] = [];
  for (let w = 15; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - w * 7 - d);
      const seed = (w * 7 + d) * 2654435761;
      const pseudo = ((seed >>> 0) % 100) / 100;
      const value = date > today ? 0 : pseudo < 0.3 ? 0 : (seed % 4) + 1;
      days.push({ date, value });
    }
  }
  return days;
}

const days = generateActivity();
const weeks = Array.from({ length: 16 }, (_, i) => days.slice(i * 7, i * 7 + 7));
const total = days.filter((d) => d.value > 0).length;

export default function ActivityTile() {
  return (
    <motion.article
      className="rounded-2xl p-5"
      style={{ background: "var(--bg-card)", border: "1px solid rgba(255,255,255,0.08)" }}
      whileHover={{ scale: 1.008 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex justify-between mb-4">
        <h2 className="text-sm font-semibold" style={{ color: "#f0f0f0" }}>Activity</h2>
        <span className="text-xs" style={{ color: "#aaaaaa" }}>{total} active days</span>
      </div>

      <div className="flex gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div
                key={di}
                title={`${day.date.toDateString()} · ${day.value} sessions`}
                className="rounded-sm"
                style={{ width: 10, height: 10, background: LEVEL_COLORS[day.value] ?? LEVEL_COLORS[0] }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1.5 mt-3">
        <span className="text-xs" style={{ color: "#aaaaaa" }}>Less</span>
        {LEVEL_COLORS.map((c, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-sm" style={{ background: c }} />
        ))}
        <span className="text-xs" style={{ color: "#aaaaaa" }}>More</span>
      </div>
    </motion.article>
  );
}