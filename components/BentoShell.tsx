"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function BentoShell({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className="grid grid-cols-1 xl:grid-cols-4 gap-3 p-5 md:p-7"
      style={{ maxWidth: 1280, margin: "0 auto" }}
    >
      {children}
    </motion.div>
  );
}