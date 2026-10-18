"use client";

import React from "react";
import Link from "next/link";
import { DATA } from "@/lib/data/resume";
import { Icons } from "@/components/icons";

export function FooterWithSuite() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t border-border/40 bg-muted/20 backdrop-blur-xs mt-24">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Suite Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background font-display font-black text-sm">
                {DATA.initials}
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                {DATA.name}
              </span>
            </div>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              Designing and engineering resilient web platforms, autonomous AI agent workflows, and modern cloud telemetry systems.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={DATA.contact.social.GitHub.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-foreground transition hover:bg-muted"
              >
                <Icons.github className="size-4" />
              </a>
              <a
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-foreground transition hover:bg-muted"
              >
                <Icons.linkedin className="size-4" />
              </a>
            </div>
          </div>

          {/* Navigation Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="transition hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="#work" className="transition hover:text-foreground">
                  Experience
                </a>
              </li>
              <li>
                <a href="#skills" className="transition hover:text-foreground">
                  Ecosystem
                </a>
              </li>
              <li>
                <a href="#projects" className="transition hover:text-foreground">
                  Projects
                </a>
              </li>
            </ul>
          </div>

          {/* Ecosystem / Suite Col */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Developer Suite
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard" className="transition hover:text-foreground">
                  Telemetry Dashboard
                </Link>
              </li>
              <li>
                <a
                  href="https://office.fizaa.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-foreground"
                >
                  Virtual Office
                </a>
              </li>
              <li>
                <a
                  href={DATA.contact.social.GitHub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-foreground"
                >
                  GitHub Repositories
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border/40 pt-6 text-xs text-muted-foreground gap-4">
          <p>© {currentYear} {DATA.name}. Built with Next.js, Tailwind CSS, & AI Agent Tooling.</p>
          <p className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Systems operational & active</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
