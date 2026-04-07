"use client";

import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  variant?: "fade" | "slide-up" | "slide-left" | "slide-right" | "scale";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  },
  "slide-left": {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  },
  "slide-right": {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
};

export function ScrollReveal({
  children,
  className,
  variant = "slide-up",
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
