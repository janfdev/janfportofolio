"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DATA } from "@/lib/data/resume";
import { Icons } from "@/components/icons";
import { LogoZ2 } from "@/components/brand/logo";

interface FooterSimpleProps {
  className?: string;
}

export default function FooterWithSuite({ className }: FooterSimpleProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t border-border/40 bg-background/50 backdrop-blur-xs mt-24",
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Identity & Tagline */}
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Home" className="flex items-center group">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-950 text-white shadow-2xs transition-transform group-hover:scale-105 border border-black/10 dark:border-white/10 shrink-0">
                <LogoZ2 size={18} className="text-zinc-100" />
                <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950" />
              </div>
            </Link>
          </div>

          {/* Quick Nav Links */}
          <nav aria-label="Footer Nav" className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <Link href="/work" className="transition-colors hover:text-foreground">
              Work
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="transition-colors hover:text-foreground">
              Contact
            </Link>
            <a
              href="https://office.fizaa.me"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Virtual Office
            </a>
          </nav>

          {/* Socials & Copyright */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href={DATA.contact.social.GitHub.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition hover:text-foreground hover:bg-muted"
              >
                <Icons.github className="size-3.5" />
              </a>
              <a
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition hover:text-foreground hover:bg-muted"
              >
                <Icons.linkedin className="size-3.5" />
              </a>
            </div>
            <span className="text-[11px] text-muted-foreground">
              © {currentYear}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { FooterWithSuite };
