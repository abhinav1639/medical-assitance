"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export { motion, useReducedMotion };

/** Returns true until after mount, then the real prefers-reduced-motion value. Avoids SSR/client mismatch from `useReducedMotion()`. */
export function useHydrationSafeReducedMotion(): boolean {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  useEffect(() => setMounted(true), []);
  if (!mounted) return true;
  return !!prefersReduced;
}

