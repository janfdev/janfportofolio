"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { DATA } from "@/lib/data/resume";

interface NavLink {
  text: string;
  url: string;
}

interface FooterWithSuiteProps {
  brandName?: string;
  tagline?: string;
  navLinks?: NavLink[];
  socialLinks?: NavLink[];
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
  email?: string;
  copyright?: string;
  className?: string;
}

const defaultNavLinks: NavLink[] = [
  { text: "Home", url: "/" },
  { text: "Experience", url: "#work" },
  { text: "Ecosystem", url: "#skills" },
  { text: "Projects", url: "#projects" },
  { text: "Dashboard", url: "/dashboard" },
  { text: "Virtual Office", url: "https://office.fizaa.me" },
];

const defaultSocialLinks: NavLink[] = [
  { text: "GitHub", url: DATA.contact.social.GitHub.url },
  { text: "LinkedIn", url: DATA.contact.social.LinkedIn.url },
  { text: "Dahono", url: "https://office.fizaa.me" },
];

export default function FooterWithSuite({
  brandName = "Fauzan",
  tagline = "Architecting resilient web systems & autonomous AI agent workflows.",
  navLinks = defaultNavLinks,
  socialLinks = defaultSocialLinks,
  description = "Fullstack Developer & System Architect specializing in autonomous agent workflows, modular backend architectures, and high-performance frontend interfaces.",
  ctaText = "Initiate Collaboration",
  ctaUrl = `mailto:${DATA.contact.email}`,
  email = DATA.contact.email,
  copyright = `© ${new Date().getFullYear()} ${DATA.name}. All rights reserved.`,
  className,
}: FooterWithSuiteProps) {
  return (
    <footer
      className={cn(
        "w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-white dark:bg-neutral-950 select-none border-t border-neutral-200 dark:border-neutral-800 mt-28",
        className
      )}
    >
      <div className="grid grid-cols-2 gap-8 px-8 pt-12 pb-4 md:px-14">
        {/* Navigation Column */}
        <div className="flex flex-col gap-0">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className="py-1 text-[11px] tracking-[0.14em] uppercase text-neutral-900 dark:text-neutral-100 hover:text-neutral-400 dark:hover:text-neutral-500 transition-colors duration-200"
            >
              {link.text}
            </a>
          ))}

          <div className="h-6" />

          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 text-[11px] tracking-[0.14em] uppercase text-neutral-900 dark:text-neutral-100 hover:text-neutral-400 dark:hover:text-neutral-500 transition-colors duration-200"
            >
              {link.text}
            </a>
          ))}
        </div>

        {/* Narrative & Contact Column */}
        <div className="flex flex-col gap-0">
          <p className="text-[11px] tracking-[0.12em] uppercase text-neutral-900 dark:text-neutral-100 leading-relaxed max-w-md">
            {description}
          </p>

          <div className="h-6" />

          <p className="text-[11px] tracking-[0.12em] uppercase text-neutral-400 dark:text-neutral-500 leading-relaxed">
            Have a project, autonomous agent integration, or architecture review?
          </p>

          <div className="h-4" />

          <a
            href={ctaUrl}
            className="text-[11px] tracking-[0.14em] uppercase text-neutral-900 dark:text-neutral-100 hover:text-neutral-400 dark:hover:text-neutral-500 transition-colors duration-200 font-semibold"
          >
            {ctaText} &rarr;
          </a>

          <div className="h-4" />

          <a
            href={`mailto:${email}`}
            className="text-[11px] tracking-[0.14em] uppercase text-neutral-900 dark:text-neutral-100 hover:text-neutral-400 dark:hover:text-neutral-500 transition-colors duration-200 break-all"
          >
            {email}
          </a>

          <div className="h-4" />

          <p className="text-[11px] tracking-[0.12em] uppercase text-neutral-400 dark:text-neutral-500">
            {copyright}
          </p>
        </div>
      </div>

      {/* Oversized Brand Typography */}
      <p
        className="inset-x-0 text-center font-black tracking-tighter text-neutral-900 dark:text-neutral-100 leading-none select-none my-2"
        style={{ fontSize: "clamp(4rem, 16vw, 15rem)" }}
      >
        {brandName}
      </p>

      {/* Bottom Legal / Tagline Strip */}
      <div className="flex items-center justify-between px-8 md:px-14 py-4 border-t border-neutral-200 dark:border-neutral-800">
        <p className="text-[10px] tracking-[0.14em] uppercase text-neutral-400 dark:text-neutral-500">
          {tagline}
        </p>
        <p className="text-[10px] tracking-[0.14em] uppercase text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <span>Active on Dahono Cloud</span>
        </p>
      </div>
    </footer>
  );
}

export { FooterWithSuite };
