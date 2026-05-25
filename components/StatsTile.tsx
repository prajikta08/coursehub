"use client";

import { motion } from "framer-motion";
import { Zap, Target, BookMarked } from "lucide-react";

const STATS = [
  { label: "XP earned", value: "2,840", sub: "+140 today", icon: Zap },
  { label: "Goals hit", value: "7/10", sub: "this month", icon: Target },
  { label: "Resources", value: "38", sub: "bookmarked", icon: BookMarked },
];

export default function StatsTile() {
  return (
    <motion.article
      className="rounded-2xl p-5 flex flex-col gap-4"
      style={{ background: "var(--bg-card)", border: "1px solid rgba(255,255,255,0.08)" }}
      whileHover={{ scale: 1.018 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#aaaaaa" }}>
        Overview
      </h2>
      {STATS.map(({ label, value, sub, icon: Icon }) => (
        <div key={label} className="flex items-center gap-3">
          <Icon size={16} color="#aaaaaa" strokeWidth={1.75} />
          <div>
            <p className="text-sm font-bold" style={{ color: "#f0f0f0" }}>{value}</p>
            <p className="text-xs" style={{ color: "#aaaaaa" }}>{label} · {sub}</p>
          </div>
        </div>
      ))}
    </motion.article>
  );
}