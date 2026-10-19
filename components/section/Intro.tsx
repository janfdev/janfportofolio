"use client";

import React from "react";
import { motion } from "framer-motion";
import { Timeline, TimelineText } from "@/components/ui/timeline";
import PixelBackground from "@/components/ui/pixel-background";
import { DATA } from "@/lib/data/resume";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function HeroSectionwithPixelBackground() {
  return (
    <div className="relative min-h-[92vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white dark:bg-[#0a0a0a] overflow-hidden border-b border-border/40">
      {/* Top pixel shimmer header overlay with mask */}
      <div
        className="absolute inset-x-0 top-0 h-80 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      >
        <PixelBackground
          gap={6}
          speed={60}
          colors="#1a1a1a,#2a2a2a,#333333,#111111,#d4d4d4,#e5e5e5,#c4c4c4,#bababa"
          opacity={0.85}
          direction="top"
          className="w-full h-full absolute inset-0"
        />
      </div>

      <div className="relative flex min-h-[92vh] flex-col justify-center items-center px-6 py-20 md:py-28">
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex items-center gap-2.5 rounded-full border border-border/60 bg-background/80 px-4 py-1.5 backdrop-blur-md shadow-2xs"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Fullstack Engineer
          </span>
          <span className="h-px w-4 bg-border" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            System Orchestrator
          </span>
        </motion.div>

        {/* Display Title with Timeline Highlight */}
        <div className="flex flex-col items-center gap-2 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-zinc-900 dark:text-white text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none text-center"
          >
            I Build & Architect
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-2"
          >
            <Timeline
              rotation={-1.2}
              initialLeft={12}
              minWidth={56}
              containerClassName="bg-white dark:bg-[#0a0a0a]"
              handleClassName="bg-white dark:bg-[#0a0a0a] border-emerald-500"
              handleIndicatorClassName="bg-emerald-500"
            >
              <TimelineText className="text-emerald-600 dark:text-emerald-400 text-3xl sm:text-6xl md:text-7xl font-black tracking-tight py-3">
                Modern Web & Systems
              </TimelineText>
            </Timeline>
          </motion.div>
        </div>

        {/* Value Proposition Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-10 max-w-xl text-center text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
        >
          Hi, I&apos;m {DATA.name}. Developing end-to-end web applications, scalable backends, robust database architectures, and autonomous AI-driven workflows.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="border-2 border-emerald-500 bg-emerald-500 px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white dark:text-zinc-950 transition-all duration-300 hover:bg-emerald-600 hover:border-emerald-600 dark:hover:bg-emerald-400 dark:hover:border-emerald-400 hover:-translate-y-0.5 shadow-sm active:scale-95 flex items-center gap-2"
          >
            <span>View Projects</span>
            <ArrowRight className="size-3.5" />
          </a>
          <Link
            href="/contact"
            className="border-2 border-zinc-300 dark:border-zinc-700 bg-background/80 px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-700 dark:text-zinc-300 transition-all duration-300 hover:border-emerald-500 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 backdrop-blur-xs"
          >
            <Mail className="size-3.5" />
            <span>Get in Touch</span>
          </Link>
        </motion.div>
      </div>

      {/* Subtle bottom dividing line */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-zinc-300/60 dark:via-zinc-700/40 to-transparent" />
    </div>
  );
}
