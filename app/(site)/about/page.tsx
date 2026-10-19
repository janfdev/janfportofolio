import React from "react";
import { Metadata } from "next";
import { DATA } from "@/lib/data/resume";
import { AboutContent } from "@/components/about-content";

export const metadata: Metadata = {
  title: `About | ${DATA.name}`,
  description:
    "Learn about Rizqi Noor Fauzan: software engineer, system architect, and autonomous AI agent orchestrator.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-28 pb-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <AboutContent />
    </main>
  );
}
