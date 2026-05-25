"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, Trophy, Settings } from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "achievements", label: "Awards", icon: Trophy },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function MobileNav() {
  const [active, setActive] = useState("dashboard");

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2"
      style={{ background: "rgba(30,30,30,0.95)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
    >
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => setActive(id)}
            className="relative flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl"
            style={{ color: isActive ? "#f0f0f0" : "#666666" }}
          >
            {isActive && (
              <motion.div
                layoutId="mobile-nav-indicator"
                className="absolute inset-0 rounded-xl"
                style={{ background: "rgba(255,255,255,0.08)" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <Icon size={18} strokeWidth={isActive ? 2 : 1.5} className="relative z-10" />
            <span className="text-xs relative z-10" style={{ fontSize: 10, color: isActive ? "#f0f0f0" : "#666666" }}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}