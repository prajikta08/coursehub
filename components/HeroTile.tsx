"use client";

import { motion } from "framer-motion";
import { Flame, TrendingUp, Clock } from "lucide-react";

const STATS = [
  { icon: Flame, label: "day streak", value: "14" },
  { icon: TrendingUp, label: "this week", value: "+18%" },
  { icon: Clock, label: "today", value: "3.2h" },
];

export default function HeroTile() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <motion.article
      className="rounded-2xl p-7 col-span-2"
      style={{ background: "var(--bg-card)", border: "1px solid rgba(255,255,255,0.08)", minHeight: 180 }}
      whileHover={{ scale: 1.012 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#aaaaaa" }}>{greeting}</p>
      <h1 className="text-3xl font-bold" style={{ color: "#f0f0f0" }}>Welcome Back!</h1>
      <h1 className="text-3xl font-bold" style={{ color: "#f0f0f0" }}>Prajikta Sati</h1>
      <p className="text-sm mt-1" style={{ color: "#aaaaaa" }}>You're on a roll — keep it up.</p>

      <div className="flex gap-3 mt-4">
        {STATS.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-2 rounded-lg px-3 py-1.5" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
            <Icon size={13} color="#aaaaaa" />
            <span className="text-sm font-bold" style={{ color: "#f0f0f0" }}>{value}</span>
            <span className="text-xs" style={{ color: "#aaaaaa" }}>{label}</span>
          </div>
        ))}
      </div>
    </motion.article>
  );
}