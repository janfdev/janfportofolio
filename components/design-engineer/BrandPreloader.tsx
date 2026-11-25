"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface BrandPreloaderProps {
  isLoading: boolean;
  variant?: "fullscreen" | "inline";
  minDurationMs?: number;
  onExitComplete?: () => void;
}

const EASE_IGNITION = [0.34, 1.56, 0.64, 1] as const;
const EASE_REVEAL = [0.22, 1, 0.36, 1] as const;
const EASE_EXIT = [0.23, 1, 0.32, 1] as const;

export function BrandPreloader({
  isLoading,
  variant = "fullscreen",
  minDurationMs = 600,
  onExitComplete,
}: BrandPreloaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const [shouldRender, setShouldRender] = useState(isLoading);
  const [isLooping, setIsLooping] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const prevOverflowRef = useRef<string | null>(null);

  // Enforce minimum display time (minDurationMs) to prevent flicker on fast loads
  useEffect(() => {
    if (isLoading) {
      startTimeRef.current = Date.now();
      setShouldRender(true);
      return;
    }

    const elapsed = Date.now() - startTimeRef.current;
    const remaining = Math.max(0, minDurationMs - elapsed);

    const timer = window.setTimeout(() => {
      setShouldRender(false);
    }, remaining);

    return () => window.clearTimeout(timer);
  }, [isLoading, minDurationMs]);

  // Trigger Fase 3 (Active Loading Loop) at 850ms while loading
  useEffect(() => {
    if (!shouldRender || prefersReducedMotion) {
      setIsLooping(false);
      return;
    }

    const loopTimer = window.setTimeout(() => {
      if (isLoading) {
        setIsLooping(true);
      }
    }, 850);

    return () => window.clearTimeout(loopTimer);
  }, [shouldRender, isLoading, prefersReducedMotion]);

  // Lock body scroll in fullscreen mode until exit transition completes
  useEffect(() => {
    if (variant !== "fullscreen") return;

    if (shouldRender) {
      if (prevOverflowRef.current === null) {
        prevOverflowRef.current = document.body.style.overflow;
      }
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (!shouldRender && prevOverflowRef.current !== null) {
        document.body.style.overflow = prevOverflowRef.current;
        prevOverflowRef.current = null;
      }
    };
  }, [variant, shouldRender]);

  // Ensure overflow is restored on unmount
  useEffect(() => {
    return () => {
      if (prevOverflowRef.current !== null) {
        document.body.style.overflow = prevOverflowRef.current;
        prevOverflowRef.current = null;
      }
    };
  }, []);

  const handleExitComplete = () => {
    if (variant === "fullscreen" && prevOverflowRef.current !== null) {
      document.body.style.overflow = prevOverflowRef.current;
      prevOverflowRef.current = null;
    }
    onExitComplete?.();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {shouldRender && (
        <motion.div
          key="brand-preloader"
          id="bg-canvas"
          role="status"
          aria-label="Memuat halaman"
          initial={{ opacity: prefersReducedMotion ? 0 : 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: EASE_EXIT },
          }}
          className={cn(
            "flex items-center justify-center bg-[#0E0E0E] select-none",
            variant === "fullscreen"
              ? "fixed inset-0 z-[100]"
              : "relative size-full min-h-[160px] rounded-2xl"
          )}
        >
          <motion.div
            initial={{ scale: 1 }}
            exit={{
              scale: prefersReducedMotion ? 1 : 0.92,
              transition: { duration: 0.35, ease: EASE_EXIT },
            }}
            className="size-16 sm:size-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="none"
              className="size-full"
              aria-hidden="true"
            >
              {/* Layer 1: #z-dot — Emerald Green Ignition Point */}
              <motion.circle
                id="z-dot"
                cx="256"
                cy="256"
                r="22"
                fill="#10B981"
                style={{ transformOrigin: "256px 256px" }}
                initial={
                  prefersReducedMotion
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0, opacity: 0 }
                }
                animate={
                  prefersReducedMotion
                    ? { scale: 1, opacity: 1 }
                    : isLooping
                    ? {
                        scale: [1, 1.18, 1],
                        opacity: 1,
                        transition: {
                          scale: {
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        },
                      }
                    : {
                        scale: 1,
                        opacity: 1,
                        transition: {
                          duration: 0.3,
                          ease: EASE_IGNITION,
                        },
                      }
                }
              />

              {/* Layer 2: #z-upper — Top horizontal bar + right diagonal */}
              <motion.path
                id="z-upper"
                d="M 294 218 L 392 120 L 120 120"
                stroke="#FFFFFF"
                strokeWidth="44"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                pathLength={1}
                initial={
                  prefersReducedMotion
                    ? { pathLength: 1, opacity: 1, x: 0, y: 0 }
                    : { pathLength: 0, opacity: 1, x: 0, y: 0 }
                }
                animate={
                  prefersReducedMotion
                    ? { pathLength: 1, opacity: 1, x: 0, y: 0 }
                    : isLooping
                    ? {
                        pathLength: 1,
                        x: [0, 2, 0],
                        y: [0, -2, 0],
                        transition: {
                          x: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
                          y: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
                        },
                      }
                    : {
                        pathLength: 1,
                        transition: {
                          duration: 0.6,
                          delay: 0.25,
                          ease: EASE_REVEAL,
                        },
                      }
                }
              />

              {/* Layer 3: #z-lower — Left diagonal + bottom horizontal bar */}
              <motion.path
                id="z-lower"
                d="M 218 294 L 120 392 L 392 392"
                stroke="#FFFFFF"
                strokeWidth="44"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                pathLength={1}
                initial={
                  prefersReducedMotion
                    ? { pathLength: 1, opacity: 1, x: 0, y: 0 }
                    : { pathLength: 0, opacity: 1, x: 0, y: 0 }
                }
                animate={
                  prefersReducedMotion
                    ? { pathLength: 1, opacity: 1, x: 0, y: 0 }
                    : isLooping
                    ? {
                        pathLength: 1,
                        x: [0, -2, 0],
                        y: [0, 2, 0],
                        transition: {
                          x: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
                          y: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
                        },
                      }
                    : {
                        pathLength: 1,
                        transition: {
                          duration: 0.6,
                          delay: 0.25,
                          ease: EASE_REVEAL,
                        },
                      }
                }
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Convenience wrapper for initial site entry in SiteLayout.
 * Plays the full Ignition + Symmetrical Path Reveal sequence (minDurationMs = 950ms) then exits.
 */
export function SiteBrandPreloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <BrandPreloader
      isLoading={isLoading}
      variant="fullscreen"
      minDurationMs={950}
    />
  );
}
