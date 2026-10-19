import React from "react";
import { Metadata } from "next";
import { DATA } from "@/lib/data/resume";
import ProjectSection from "@/components/section/projects-section";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: `Work & Case Studies | ${DATA.name}`,
  description:
    "Explore production web applications, distributed backend services, and autonomous AI-driven systems engineered by Rizqi Noor Fauzan.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen pt-28 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
          <Sparkles className="size-3.5" />
          <span>Case Studies & Systems</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
          Selected Works & Systems
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Production web platforms, distributed backend services, and autonomous agent systems designed with high-craft execution and strict type safety.
        </p>
      </div>

      {/* Projects Section with category filter & case studies */}
      <ProjectSection />

      {/* Bottom CTA Banner */}
      <div className="mt-20 p-8 sm:p-12 rounded-3xl border border-border/60 bg-linear-to-b from-card/60 to-muted/20 text-center space-y-4 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Interested in Collaborating on a System?
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
          Whether you need high-throughput backend architecture, resilient full-stack applications, or autonomous AI agent pipelines.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-zinc-950 font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
