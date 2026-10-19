import React from "react";
import PartylabsHero from "@/components/blocx/PartylabsHero";
import SkillSection from "../../components/section/skills-section";
import { HomeDirectoryIndex } from "@/components/home-directory-index";
import GithubContribution from "../../components/GithubContribution";
import CaremetricFooter from "@/components/blocx/CaremetricFooter";

export default function Home() {
  return (
    <main className="flex flex-col overflow-x-hidden min-h-[100dvh]">
      {/* 1. Hero Section: Partylabs 3D Depth Field with 30 Glass Tech Cards */}
      <PartylabsHero />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 mt-12">
        {/* 2. Tech & AI Agent Tooling Ecosystem */}
        <SkillSection />

        {/* 3. Studio Directory Gateway: Direct links to /work, /about, /contact */}
        <HomeDirectoryIndex />

        {/* 4. GitHub Contributions / Telemetry */}
        <GithubContribution />
      </div>

      {/* 5. janfdev Animated Footer */}
      <CaremetricFooter />
    </main>
  );
}
