"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
  className,
  textClassName,
}: {
  text: string;
  words: string[];
  duration?: number;
  className?: string;
  textClassName?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <>
      <motion.span
        layoutId="subtext"
        className={cn(
          "text-2xl font-bold tracking-tight md:text-4xl text-neutral-900 dark:text-neutral-100",
          textClassName
        )}
      >
        {text}
      </motion.span>

      <motion.span
        layout
        className={cn(
          "relative w-fit overflow-hidden rounded-md border border-neutral-200 bg-white/90 px-4 py-2 font-sans text-2xl font-bold tracking-tight text-neutral-900 shadow-md ring-1 ring-black/5 md:text-4xl dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-white dark:ring-white/10",
          className
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: "blur(10px)" }}
            animate={{
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{
              duration: 0.5,
            }}
            className={cn("inline-block whitespace-nowrap")}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};
