import React from "react";
import PartylabsHero from "@/components/blocx/PartylabsHero";
import { FeaturedProjectsPreview } from "@/components/featured-projects-preview";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { HomeAboutTeaser } from "@/components/home-about-teaser";
import SkillSection from "../../components/section/skills-section";
import GithubContribution from "../../components/GithubContribution";
import CaremetricFooter from "@/components/blocx/CaremetricFooter";

export default function Home() {
  return (
    <main className="flex flex-col overflow-x-hidden min-h-[100dvh]">
      {/* 1. Hero Section: Partylabs 3D Depth Photo Field */}
      <PartylabsHero />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 mt-8">
        {/* 2. Selected Work (Top 3 Flagship Projects) */}
        <FeaturedProjectsPreview />

        {/* 3. Professional Work Experience */}
        <ExperienceTimeline />

        {/* 4. Tech & AI Agent Tooling Ecosystem */}
        <SkillSection />

        {/* 5. About Teaser with Authentic Portrait */}
        <HomeAboutTeaser />

        {/* 6. GitHub Contributions / Telemetry */}
        <GithubContribution />
      </div>

      {/* 7. janfdev Animated Footer */}
      <CaremetricFooter />
    </main>
  );
}
