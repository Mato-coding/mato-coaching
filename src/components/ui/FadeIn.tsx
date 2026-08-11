"use client";

import { motion, useReducedMotion, type Easing } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  durationSec?: number;
  ease?: Easing | Easing[];
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  y = 20,
  durationSec = 0.8,
  ease = "easeOut",
  className,
}: FadeInProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: prefersReduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: durationSec, delay, ease }}
    >
      {children}
    </motion.div>
  );
}