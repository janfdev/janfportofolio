"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { DATA } from "@/lib/data/resume";
import { ContactDock } from "./ContactDock";

export function HeaderHero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(DATA.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="pt-16 sm:pt-20 pb-10">
      {/* Top bar with identity, status, and theme toggle */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3.5">
          {/* Avatar with online status */}
          <div className="relative size-12 shrink-0 rounded-[14px] overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-subtle)] shadow-xs">
            <Image
              src={DATA.avatarUrl}
              alt={DATA.name}
              fill
              className="object-cover"
              priority
            />
            <span
              className="absolute -top-0.5 -right-0.5 size-3 rounded-full bg-[#28c840] ring-2 ring-[var(--color-bg)]"
              title="Available for new opportunities"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[17px] font-medium tracking-tight text-[var(--color-fg)]">
                {DATA.name}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono bg-[#28c840]/10 text-[#1a7f2b]">
                <span className="size-1.5 rounded-full bg-[#28c840] animate-pulse" />
                Available
              </span>
            </div>
            <p className="text-[14px] text-[var(--color-fg-secondary)]">
              {DATA.description} · {DATA.location}
            </p>
          </div>
        </div>

        {/* Right action group: Mobile Contact Trigger */}
        <div className="flex items-center gap-2 sm:hidden">
          <ContactDock placement="header" align="end" />
        </div>
      </div>

      {/* Editorial Bio Copy */}
      <div className="flex flex-col gap-4 text-[16px] leading-[1.65] text-[var(--color-fg)]">
        <p>
          I am a Full-Stack Developer and Systems Architect based in Indonesia. I engineer end-to-end web applications with a focus on strict type safety, resilient database design, and autonomous AI-driven pipelines.
        </p>

        <p>
          Currently developing systems at{" "}
          <a
            href="https://umc.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-0.5 font-medium underline decoration-[var(--color-border-strong)] underline-offset-[3px] hover:decoration-[var(--color-fg)] transition-colors"
          >
            Library UMC
          </a>{" "}
          and previously built interfaces for{" "}
          <a
            href="https://uinssc.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-0.5 font-medium underline decoration-[var(--color-border-strong)] underline-offset-[3px] hover:decoration-[var(--color-fg)] transition-colors"
          >
            UIN Siber Cirebon
          </a>{" "}
          and{" "}
          <a
            href="https://digitalhero.id"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-0.5 font-medium underline decoration-[var(--color-border-strong)] underline-offset-[3px] hover:decoration-[var(--color-fg)] transition-colors"
          >
            Digital Hero
          </a>
          . Creator of{" "}
          <Link
            href="/projects/smartseum"
            className="group relative inline-flex items-center gap-0.5 font-medium underline decoration-[var(--color-border-strong)] underline-offset-[3px] hover:decoration-[var(--color-fg)] transition-colors"
          >
            Smartseum
          </Link>{" "}
          and{" "}
          <Link
            href="/projects/quavity"
            className="group relative inline-flex items-center gap-0.5 font-medium underline decoration-[var(--color-border-strong)] underline-offset-[3px] hover:decoration-[var(--color-fg)] transition-colors"
          >
            Quavity
          </Link>
          .
        </p>

        <p>
          Connect with me on{" "}
          <a
            href={DATA.contact.social.GitHub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline decoration-[var(--color-border-strong)] underline-offset-[3px] hover:decoration-[var(--color-fg)] transition-colors"
          >
            GitHub
          </a>
          ,{" "}
          <a
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline decoration-[var(--color-border-strong)] underline-offset-[3px] hover:decoration-[var(--color-fg)] transition-colors"
          >
            LinkedIn
          </a>
          , or reach me directly via{" "}
          <button
            type="button"
            onClick={copyEmail}
            className="group relative inline-flex items-center gap-1 font-medium underline decoration-[var(--color-border-strong)] underline-offset-[3px] hover:decoration-[var(--color-fg)] transition-colors cursor-pointer"
            title="Click or press C to copy email address"
          >
            <span>email</span>
            <span className="inline-block transition-transform duration-150">
              {copied ? (
                <Check className="size-3.5 text-[#1a7f2b]" />
              ) : (
                <Copy className="size-3.5 text-[var(--color-fg-secondary)] group-hover:text-[var(--color-fg)]" />
              )}
            </span>
          </button>
          .
        </p>
      </div>
    </header>
  );
}
