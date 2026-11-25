"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Full-screen intro preloader following the site's actual favicon (/profiless.png).
 * Reveals the favicon inside a broken-down, animated SVG squircle frame and progress arc.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const duration = prefersReducedMotion ? 200 : 1200;
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="site-preloader"
          role="status"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: prefersReducedMotion ? 0.15 : 0.35, ease: EASE_OUT },
          }}
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-bg)] select-none"
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0.9, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -6 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="relative flex size-28 sm:size-32 items-center justify-center"
          >
            {/* Broken-down SVG Frame & Orbital Arcs around the Favicon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
              fill="none"
              className="absolute inset-0 size-full"
              aria-hidden="true"
            >
              {/* 1. Outer subtle track squircle */}
              <rect
                x="10"
                y="10"
                width="108"
                height="108"
                rx="30"
                stroke="var(--color-border)"
                strokeWidth="1.5"
              />

              {/* 2. Animated primary squircle perimeter stroke */}
              <motion.rect
                x="10"
                y="10"
                width="108"
                height="108"
                rx="30"
                stroke="var(--color-fg)"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength={1}
                initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: prefersReducedMotion ? 1 : 0.3 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.65, ease: EASE_OUT }}
              />

              {/* 3. Segmented accent orbital arc (rotates gently on compositor) */}
              <motion.circle
                cx="64"
                cy="64"
                r="60"
                stroke="#ff6308"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="24 70 12 70"
                style={{ transformOrigin: "64px 64px" }}
                initial={prefersReducedMotion ? { opacity: 0.6, rotate: 0 } : { opacity: 0, rotate: -45 }}
                animate={{ opacity: 0.75, rotate: prefersReducedMotion ? 0 : 90 }}
                transition={{ duration: 1.1, ease: EASE_OUT }}
              />

              {/* 4. Four broken-down corner tick marks */}
              <motion.path
                d="M 4 22 L 4 12 Q 4 4 12 4 L 22 4"
                stroke="var(--color-fg-secondary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                pathLength={1}
                initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: 0.6 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.15, ease: EASE_OUT }}
              />
              <motion.path
                d="M 106 124 L 116 124 Q 124 124 124 116 L 124 106"
                stroke="var(--color-fg-secondary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                pathLength={1}
                initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: 0.6 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.15, ease: EASE_OUT }}
              />
            </svg>

            {/* Center Favicon Image with Geometric Clip-Path Reveal */}
            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.84, clipPath: "inset(18% round 22px)" }
              }
              animate={{
                opacity: 1,
                scale: 1,
                clipPath: "inset(0% round 22px)",
              }}
              transition={{
                duration: 0.5,
                delay: prefersReducedMotion ? 0 : 0.12,
                ease: EASE_OUT,
              }}
              className="relative size-20 sm:size-22 overflow-hidden rounded-[22px] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] shadow-sm"
            >
              <Image
                src="/profiless.png"
                alt="Site favicon"
                fill
                priority
                className="object-cover"
              />
            </motion.div>

            {/* Signature Available Status Dot */}
            <motion.span
              initial={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 22,
                delay: prefersReducedMotion ? 0 : 0.55,
              }}
              className="absolute top-2.5 right-2.5 size-3.5 rounded-full bg-[#28c840] ring-2 ring-[var(--color-bg)]"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
