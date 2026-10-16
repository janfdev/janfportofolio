"use client";

import React from "react";
import { BackgroundCubesGrid } from "@/components/ui/background-cubes-grid";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { DATA } from "@/lib/data/resume";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRight, Github, Linkedin, Sparkles } from "lucide-react";

export default function Intro() {
  return (
    <section id="hero" className="relative isolate flex min-h-[46rem] w-full items-center justify-center overflow-hidden px-4 py-20 sm:px-8">
      {/* 3D Isometric Interactive Cubes Grid Background */}
      <BackgroundCubesGrid
        className="-z-10 opacity-70 dark:opacity-40"
        amplitude={0.9}
        speed={1.2}
        cellSize={44}
      />

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center antialiased">
        {/* Availability Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 backdrop-blur-md shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>Available for New Projects & Roles</span>
        </div>

        {/* Avatar with Subtle Glow */}
        <div className="relative mb-6">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 opacity-40 blur-md" />
          <Avatar className="relative size-24 border-2 border-white/60 shadow-xl dark:border-white/10 sm:size-28">
            <AvatarImage
              draggable={false}
              alt={DATA.name}
              src={DATA.avatarUrl}
              className="object-cover"
            />
            <AvatarFallback className="font-bold text-lg">{DATA.initials}</AvatarFallback>
          </Avatar>
        </div>

        {/* Text Flip Animated Heading */}
        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row flex-wrap">
          <LayoutTextFlip
            text="Hi, I'm"
            words={[
              "Rizqi Noor Fauzan",
              "Fullstack Engineer",
              "System Architect",
              "Next.js Craftsman",
            ]}
            duration={2800}
          />
        </div>

        {/* Subtitle / Value Proposition */}
        <p className="mt-6 max-w-2xl text-balance text-base text-neutral-600 dark:text-neutral-300 sm:text-lg leading-relaxed">
          Crafting <span className="font-semibold text-neutral-900 dark:text-white">resilient web architectures</span>, 
          modular APIs, and modern interactive user experiences from database design to production deployment.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-neutral-900 px-6 text-sm font-semibold text-white shadow-lg shadow-neutral-900/20 transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            <Sparkles className="size-4 text-amber-400" />
            <span>Lihat Proyek Unggulan</span>
          </a>

          <a
            href={DATA.contact.social.GitHub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-neutral-300 bg-white/80 px-5 text-sm font-medium text-neutral-800 backdrop-blur-md transition hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <Github className="size-4" />
            <span>GitHub</span>
            <ArrowUpRight className="size-3.5 opacity-60" />
          </a>

          <a
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-neutral-300 bg-white/80 px-5 text-sm font-medium text-neutral-800 backdrop-blur-md transition hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:bg-neutral-800"
          >
            <Linkedin className="size-4 text-blue-500" />
            <span>LinkedIn</span>
            <ArrowUpRight className="size-3.5 opacity-60" />
          </a>
        </div>

        {/* Quick Highlights / Mini Stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 max-w-lg w-full text-center">
          <div className="rounded-2xl border border-neutral-200/80 bg-white/60 p-3.5 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-900/60 shadow-2xs">
            <div className="text-xl font-black text-neutral-900 dark:text-white">5+</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Shipped Projects</div>
          </div>
          <div className="rounded-2xl border border-neutral-200/80 bg-white/60 p-3.5 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-900/60 shadow-2xs">
            <div className="text-xl font-black text-neutral-900 dark:text-white">Enterprise</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Banking & Campus</div>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-neutral-200/80 bg-white/60 p-3.5 backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-900/60 shadow-2xs">
            <div className="text-xl font-black text-neutral-900 dark:text-white">Next.js 15</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Fullstack & ORM</div>
          </div>
        </div>
      </div>
    </section>
  );
}
