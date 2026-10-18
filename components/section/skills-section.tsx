"use client";

import React from "react";
import { BlurFade } from "../ui/blur-fade";
import { BLUR_FADE_DELAY } from "../../lib/type";
import { LogoMarquee } from "../logo-marquee";
import { Icons } from "../icons";

const techLogos: { name: string; icon: React.ReactNode }[] = [
  {
    name: "Hermes Agent",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.hermes className="h-5 w-5" />
        <span className="text-sm font-semibold tracking-tight">Hermes</span>
      </div>
    ),
  },
  {
    name: "Claude Code",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.claudecode className="h-5 w-5" />
        <span className="text-sm font-semibold tracking-tight">Claude Code</span>
      </div>
    ),
  },
  {
    name: "OpenAI Codex",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.codex className="h-5 w-5" />
        <span className="text-sm font-semibold tracking-tight">Codex</span>
      </div>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.nextjs className="h-5 w-5" />
        <span className="text-sm font-semibold tracking-tight">Next.js</span>
      </div>
    ),
  },
  {
    name: "React",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.react className="h-5 w-5" />
        <span className="text-sm font-semibold tracking-tight">React</span>
      </div>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.typescript className="h-5 w-5" />
        <span className="text-sm font-semibold tracking-tight">TypeScript</span>
      </div>
    ),
  },
  {
    name: "OpenCode",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.opencode className="h-5 w-5" />
        <span className="text-sm font-semibold tracking-tight">OpenCode</span>
      </div>
    ),
  },
  {
    name: "Antigravity",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.antigravity className="h-5 w-5" />
        <span className="text-sm font-semibold tracking-tight">Antigravity</span>
      </div>
    ),
  },
  {
    name: "9Router",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.router9 className="h-5 w-5 rounded-sm" />
        <span className="text-sm font-semibold tracking-tight">9Router</span>
      </div>
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.tailwindcss className="h-5 w-5" />
        <span className="text-sm font-semibold tracking-tight">Tailwind CSS</span>
      </div>
    ),
  },
];

const SkillSection = () => {
  return (
    <section id="skills" className="mt-20 w-full max-w-7xl mx-auto">
      <div className="flex min-h-0 flex-col gap-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <div className="space-y-1.5 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">AI & Tech Ecosystem</h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Autonomous AI agent orchestration, developer telemetry, and modern fullstack tooling.
            </p>
          </div>
        </BlurFade>

        {/* Quiet Infinite Logo Marquee Strip with soft mask overlay */}
        <BlurFade delay={BLUR_FADE_DELAY * 9.5}>
          <div className="relative my-2 py-6 w-full">
            <LogoMarquee
              logos={techLogos.map((item) => item.icon)}
              speed={42}
              gap={56}
              pauseOnHover={true}
            />
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default SkillSection;
