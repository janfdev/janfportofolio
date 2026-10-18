"use client";

import React from "react";
import { DATA } from "@/lib/data/resume";
import { PixelBackground } from "@/components/ui/pixel-background";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";

export default function Intro() {
  return (
    <PixelBackground
      gridSize={30}
      pixelColor="rgba(100, 116, 139, 0.22)"
      className="relative isolate flex min-h-[85vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex-col justify-between overflow-hidden border-b border-border/40 bg-background/50 pt-24 pb-14 transition-colors duration-300 md:pt-32"
    >
      {/* Background Soft Radial Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_85%)]" />

      {/* Hero Content Section */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 text-center sm:px-6">
        {/* Availability Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-2xs backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Autonomous AI Orchestration & Fullstack Systems</span>
        </div>

        {/* Main Display Title with Flip Animation */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row flex-wrap max-w-full px-2">
          <LayoutTextFlip
            text="Hi, I'm"
            textClassName="text-foreground drop-shadow-sm font-extrabold text-3xl sm:text-4xl md:text-5xl"
            className="border-border/80 bg-background/95 text-foreground shadow-lg"
            words={[
              DATA.name,
              "AI Systems Architect",
              "Fullstack Craftsman",
              "Next.js Specialist",
            ]}
            duration={2800}
          />
        </div>

        {/* Subtitle / Value Proposition */}
        <p className="mt-6 max-w-2xl text-balance px-4 text-sm sm:text-base md:text-lg font-medium text-muted-foreground leading-relaxed">
          Crafting <span className="font-bold text-foreground underline decoration-primary underline-offset-4">resilient web architectures</span>, 
          modular APIs, and modern autonomous agent workflows from system design to production deployment.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs sm:text-sm font-semibold text-background shadow-sm transition hover:opacity-90 active:scale-95"
          >
            <span>Explore Projects</span>
            <ArrowRight className="size-4" />
          </a>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-6 py-3 text-xs sm:text-sm font-semibold text-foreground shadow-2xs backdrop-blur-md transition hover:bg-muted active:scale-95"
          >
            <Terminal className="size-4 text-muted-foreground" />
            <span>Developer Telemetry</span>
          </Link>
        </div>
      </div>

      {/* Bottom subtle edge divider */}
      <div className="relative z-10 w-full" />
    </PixelBackground>
  );
}
