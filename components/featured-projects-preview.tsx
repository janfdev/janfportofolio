"use client";

import React from "react";
import Link from "next/link";
import { DATA } from "@/lib/data/resume";
import ProjectCard from "./project";
import { ArrowRight, Sparkles } from "lucide-react";

export function FeaturedProjectsPreview() {
  const featured = DATA.projects.slice(0, 3);

  return (
    <section className="mt-28 mb-24 w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            <Sparkles className="size-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Selected Work
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Recent production web platforms, distributed APIs, and fullstack systems.
          </p>
        </div>

        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors group shrink-0"
        >
          <span>View All Projects</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((project) => (
          <ProjectCard key={project.slug || project.title} {...project} />
        ))}
      </div>

      <div className="mt-10 text-center sm:hidden">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border/80 bg-card font-semibold text-xs text-foreground hover:bg-muted transition-colors shadow-xs"
        >
          <span>View All Projects</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
