"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Full-screen intro preloader using the broken-down `jf` SVG monogram.
 * Animates each geometric stroke sequentially on the compositor, then fades out.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const duration = prefersReducedMotion ? 200 : 1150;
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
          aria-label="Loading janf.dev"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: prefersReducedMotion ? 0.15 : 0.35, ease: EASE_OUT },
          }}
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[var(--color-bg)] select-none"
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0.85, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -6 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="relative size-20 sm:size-24"
          >
            {/* Broken-down SVG monogram matching app/icon.svg */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              fill="none"
              className="size-full drop-shadow-sm"
              aria-hidden="true"
            >
              {/* 1. Outer squircle fill (fades in as strokes complete) */}
              <motion.rect
                x="16"
                y="16"
                width="224"
                height="224"
                rx="56"
                fill="#18181a"
                initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.25, ease: EASE_OUT }}
              />

              {/* 2. Outer squircle border stroke */}
              <motion.rect
                x="16"
                y="16"
                width="224"
                height="224"
                rx="56"
                stroke="#2e2e32"
                strokeWidth="4"
                pathLength={1}
                initial={{ pathLength: prefersReducedMotion ? 1 : 0, opacity: prefersReducedMotion ? 1 : 0.4 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              />

              {/* 3. Letter 'j' stem & hook */}
              <motion.path
                d="M 102 108 L 102 164 Q 102 192 74 192 L 66 192"
                stroke="#f4f4f5"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.15, ease: EASE_OUT }}
              />

              {/* 4. Letter 'f' arch & stem */}
              <motion.path
                d="M 190 66 L 174 66 Q 152 66 152 92 L 152 186"
                stroke="#f4f4f5"
                strokeWidth="22"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.28, ease: EASE_OUT }}
              />

              {/* 5. Letter 'f' crossbar */}
              <motion.path
                d="M 130 116 L 184 116"
                stroke="#f4f4f5"
                strokeWidth="22"
                strokeLinecap="round"
                pathLength={1}
                initial={{ pathLength: prefersReducedMotion ? 1 : 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.28, delay: prefersReducedMotion ? 0 : 0.48, ease: EASE_OUT }}
              />

              {/* 6. Emerald signature tittle dot */}
              <motion.circle
                cx="102"
                cy="72"
                r="14"
                fill="#28c840"
                style={{ transformOrigin: "102px 72px" }}
                initial={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 22,
                  delay: prefersReducedMotion ? 0 : 0.58,
                }}
              />
            </svg>
          </motion.div>

          {/* Subtle monospace brand caption */}
          <motion.span
            initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: prefersReducedMotion ? 0 : 0.45, ease: EASE_OUT }}
            className="text-[12px] font-mono tracking-wider text-[var(--color-fg-secondary)]"
          >
            janf.dev
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
