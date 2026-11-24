"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { DATA } from "@/lib/data/resume";

export function Footer() {
  const [time, setTime] = useState("");
  const [copied, setCopied] = useState(false);

  // Live WIB (UTC+7) clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format in Asia/Jakarta timezone
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(DATA.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Global hotkey 'c' to copy email (Roktim & Faiz feature)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.metaKey ||
        e.ctrlKey
      ) {
        return;
      }

      if (e.key === "c" || e.key === "C") {
        copyEmail();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <footer className="pt-12 pb-24 border-t border-[var(--color-border)] mt-10">
      {/* Toast popup when C is pressed */}
      {copied && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[var(--color-fg)] px-4 py-2 text-[13px] font-medium text-[var(--color-fg-inverse)] shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <Check className="size-4 text-[#28c840]" />
          <span>Email copied: {DATA.contact.email}</span>
        </aside>
      )}

      <div className="flex flex-col gap-6 text-[14px]">
        {/* Navigation row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-[var(--color-fg-secondary)]">
            <Link href="/" className="hover:text-[var(--color-fg)] transition-colors">
              Home
            </Link>
            <Link href="/#work" className="hover:text-[var(--color-fg)] transition-colors">
              Work
            </Link>
            <Link href="/about" className="hover:text-[var(--color-fg)] transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-[var(--color-fg)] transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-4 text-[var(--color-fg-secondary)]">
            <a
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-fg)] transition-colors"
            >
              GitHub
            </a>
            <a
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-fg)] transition-colors"
            >
              LinkedIn
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="hover:text-[var(--color-fg)] transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <span>Email</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded text-[var(--color-fg-secondary)]">
                C
              </kbd>
            </button>
          </div>
        </div>

        {/* Bottom meta row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[12px] font-mono text-[var(--color-fg-secondary)] pt-4 border-t border-[var(--color-border-subtle)]">
          <div>
            © {new Date().getFullYear()} {DATA.name} · All rights reserved.
          </div>

          <div className="flex items-center gap-2">
            {time && <span>{time} in Indonesia (WIB)</span>}
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Press C to copy email</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
