"use client";

import React from "react";
import { CloudShader } from "@/components/ui/cloud-shader";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { DATA } from "@/lib/data/resume";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default function Intro() {
  return (
    <section id="hero" className="relative isolate flex min-h-[100dvh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex-col justify-between overflow-hidden">
      {/* Dynamic Animated Cloud Shader Background */}
      <CloudShader
        className="absolute inset-0 -z-10 h-full w-full"
        speed={0.8}
        count={4}
        cloudColor="#ffffff"
        skyTopColor="#0f172a"
        skyBottomColor="#38bdf8"
      />

      {/* Top Navbar Header */}
      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 md:px-12">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/95 text-sky-900 font-display font-black text-sm shadow-md transition-transform group-hover:scale-105">
            {DATA.initials}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-base font-bold tracking-tight text-white drop-shadow-md leading-none">
              {DATA.name}
            </span>
            <span className="text-[11px] font-medium text-white/80 drop-shadow-sm tracking-wide mt-0.5">
              Fullstack Developer
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden items-center gap-8 text-sm font-semibold text-white/90 drop-shadow-sm md:flex">
          <a href="#about" className="transition hover:text-white hover:underline underline-offset-8">
            About
          </a>
          <a href="#work" className="transition hover:text-white hover:underline underline-offset-8">
            Experience
          </a>
          <a href="#skills" className="transition hover:text-white hover:underline underline-offset-8">
            Skills
          </a>
          <a href="#projects" className="transition hover:text-white hover:underline underline-offset-8">
            Projects
          </a>
        </nav>

        {/* Right Nav Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <a
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <Github className="size-4" />
            </a>
            <a
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <Linkedin className="size-4" />
            </a>
          </div>

          <div className="rounded-full bg-white/15 p-1 backdrop-blur-md border border-white/20 shadow-sm">
            <ModeToggle />
          </div>

          <a
            href={DATA.contact.social.GitHub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white px-4 py-2 text-xs sm:text-sm font-bold text-sky-900 shadow-md transition hover:bg-white/90 hover:scale-105"
          >
            Connect
          </a>
        </div>
      </header>

      {/* Main Hero Body */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-12 text-center antialiased">
        {/* Availability Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-80" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span>Available for New Projects & Full-Time Roles</span>
        </div>

        {/* Flip Text Heading */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row flex-wrap max-w-full px-2">
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
        <p className="mt-6 max-w-3xl text-balance px-4 text-sm sm:text-base md:text-xl font-medium text-white/95 drop-shadow-md leading-relaxed">
          Crafting <span className="font-bold underline decoration-sky-300 underline-offset-4">resilient web architectures</span>, 
          modular APIs, and modern interactive user experiences from database design to production deployment.
        </p>
      </div>

      {/* Subtle bottom fade transition into page content */}
      <div className="h-12 w-full bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </section>
  );
}
