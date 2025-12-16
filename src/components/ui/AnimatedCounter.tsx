"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString("fr-FR")
  );

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, spring, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

interface AnimatedStatProps {
  value: string;
  label: string;
  description: string;
}

export function AnimatedStat({ value, label, description }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Parse the value to extract number, prefix and suffix
  const match = value.match(/^([<>+-]?)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match?.[1] || "";
  const numValue = parseFloat(match?.[2] || "0");
  const suffix = match?.[3] || "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="card-glass text-center p-8"
    >
      <div className="text-5xl md:text-6xl font-bold text-accent mb-2">
        <AnimatedCounter
          value={numValue}
          prefix={prefix}
          suffix={suffix}
          duration={2}
        />
      </div>
      <div className="text-primary font-semibold mb-2">{label}</div>
      <div className="text-muted text-sm">{description}</div>
    </motion.div>
  );
}
