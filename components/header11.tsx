"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DATA } from "@/lib/data/resume";
import { ModeToggle } from "@/components/mode-toggle";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Header11() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40 hidden md:flex items-center justify-center pointer-events-none transition-all duration-300 px-4 py-3 sm:py-4">
      <nav
        aria-label="Desktop Primary"
        className={cn(
          "pointer-events-auto flex items-center justify-between transition-all duration-300 ease-out",
          scrolled
            ? "w-full max-w-4xl rounded-full border border-border/60 bg-background/80 px-5 py-2.5 shadow-lg shadow-black/5 backdrop-blur-md dark:border-white/10 dark:bg-background/70"
            : "w-full max-w-6xl rounded-2xl border border-transparent bg-transparent px-6 py-3"
        )}
      >
        {/* Brand Logomark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className={cn(
              "flex items-center justify-center rounded-xl bg-foreground text-background font-display font-black text-sm transition-all duration-300 group-hover:scale-105",
              scrolled ? "h-8 w-8 text-xs" : "h-9 w-9 text-sm"
            )}
          >
            {DATA.initials}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold tracking-tight text-foreground leading-none">
              {DATA.name}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground tracking-wide mt-0.5">
              Fullstack Engineer
            </span>
          </div>
        </Link>

        {/* Center Links */}
        <div className="flex items-center gap-7 text-xs font-semibold text-muted-foreground">
          <a href="#about" className="transition-colors hover:text-foreground">
            About
          </a>
          <a href="#work" className="transition-colors hover:text-foreground">
            Experience
          </a>
          <a href="#skills" className="transition-colors hover:text-foreground">
            Ecosystem
          </a>
          <a href="#projects" className="transition-colors hover:text-foreground">
            Projects
          </a>
          <Link href="/dashboard" className="transition-colors hover:text-foreground">
            Dashboard
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={DATA.contact.social.GitHub.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 text-foreground transition hover:bg-muted"
          >
            <Icons.github className="size-3.5" />
          </a>
          <a
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 text-foreground transition hover:bg-muted"
          >
            <Icons.linkedin className="size-3.5" />
          </a>
          <div className="flex items-center">
            <ModeToggle />
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-foreground px-3.5 py-1.5 text-xs font-semibold text-background shadow-xs transition hover:opacity-90 active:scale-95"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
