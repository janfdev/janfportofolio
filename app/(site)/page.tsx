import React from "react";
import PartylabsHero from "@/components/blocx/PartylabsHero";
import { FeaturedProjectsPreview } from "@/components/featured-projects-preview";
import { HomeAboutTeaser } from "@/components/home-about-teaser";
import SkillSection from "../../components/section/skills-section";
import GithubContribution from "../../components/GithubContribution";
import CaremetricFooter from "@/components/blocx/CaremetricFooter";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export default function Home() {
  return (
    <main className="flex flex-col overflow-x-hidden min-h-[100dvh]">
      <SmoothCursor />
      
      {/* 1. Hero Section: Partylabs 3D Depth Photo Field */}
      <PartylabsHero />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 mt-8">
        {/* 2. Selected Work (Top 3 Flagship Projects) */}
        <FeaturedProjectsPreview />

        {/* 3. Tech & AI Agent Tooling Ecosystem */}
        <SkillSection />

        {/* 4. About Teaser with Authentic Portrait */}
        <HomeAboutTeaser />

        {/* 5. GitHub Contributions / Telemetry */}
        <GithubContribution />
      </div>

      {/* 6. janfdev Animated Footer */}
      <CaremetricFooter />
    </main>
  );
}
