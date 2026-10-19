"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/lib/data/resume";
import { ArrowRight, UserCheck, MapPin } from "lucide-react";

export function HomeAboutTeaser() {
  return (
    <section className="mt-24 mb-24 w-full">
      <div className="p-8 sm:p-12 rounded-3xl border border-border/60 bg-card/40 backdrop-blur-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Portrait Image */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative p-2 rounded-2xl bg-muted/40 border border-border/60 shadow-lg max-w-[280px] w-full">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl border border-border/40 bg-zinc-950">
                <Image
                  src={DATA.avatarUrl}
                  alt={DATA.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover object-top"
                />
              </div>
              <div className="mt-2.5 px-3 py-1.5 rounded-lg bg-card/80 border border-border/40 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Based in</span>
                </span>
                <span className="text-foreground font-semibold flex items-center gap-1">
                  <MapPin className="size-3 text-emerald-500" />
                  <span>Indonesia</span>
                </span>
              </div>
            </div>
          </div>

          {/* Narrative Preview */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              <UserCheck className="size-3.5" />
              <span>Engineering Philosophy</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Passionate about scalable systems, type safety, and autonomous AI tooling.
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              I develop end-to-end web applications with a focus on database integrity, high-throughput APIs, and clean user experience. My toolkit is centered on Next.js 15, TypeScript, PostgreSQL, and autonomous multi-agent engineering workflows.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors group"
              >
                <span>Read Full Biography & Career Timeline</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
