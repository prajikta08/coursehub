"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, BookOpen, Trophy, Settings, ChevronLeft, Flame, Bell, Search } from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "My Courses", icon: BookOpen },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.nav
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col h-full relative flex-shrink-0"
      style={{ background: "#1e1e1e", borderRight: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-8 overflow-hidden">
        <Flame size={18} color="#f0f0f0" strokeWidth={2} className="flex-shrink-0" />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-sm font-bold uppercase tracking-widest" style={{ color: "#f0f0f0" }}
            >
              Meridian
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Search */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mx-3 mb-6">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              <Search size={13} color="#aaaaaa" />
              <span className="text-xs" style={{ color: "#aaaaaa" }}>Search...</span>
              <span className="ml-auto text-xs" style={{ color: "#aaaaaa", fontSize: 10 }}>⌘K</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className="relative w-full flex items-center gap-3 rounded-lg px-3 py-2.5"
              style={{ color: isActive ? "#f0f0f0" : "#666666", justifyContent: collapsed ? "center" : "flex-start" }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-highlight"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon size={16} strokeWidth={isActive ? 2 : 1.5} className="relative z-10 flex-shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="relative z-10 text-sm font-medium"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-2" style={{ justifyContent: collapsed ? "center" : "space-between" }}>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }} />
              <div>
                <p className="text-xs font-semibold" style={{ color: "#f0f0f0" }}>Prajikta Sati</p>
                <p className="text-xs" style={{ color: "#aaaaaa" }}>Pro</p>
              </div>
            </div>
          )}
          <Bell size={14} color="#aaaaaa" />
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full flex items-center justify-center"
        style={{ background: "var(--bg-card)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
          <ChevronLeft size={12} color="#aaaaaa" />
        </motion.div>
      </button>
    </motion.nav>
  );
}