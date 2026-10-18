"use client";

import React from "react";
import { BlurFade } from "../ui/blur-fade";
import { BLUR_FADE_DELAY } from "../../lib/type";
import { DATA } from "../../lib/data/resume";
import { Badge } from "../ui/badge";
import { LogoMarquee } from "../logo-marquee";
import { Icons } from "../icons";

const techLogos: { name: string; icon: React.ReactNode }[] = [
  {
    name: "Hermes Agent",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.hermes className="h-5 w-5 text-amber-500" />
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
        <Icons.codex className="h-5 w-5 text-emerald-500" />
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
        <Icons.react className="h-5 w-5 text-sky-400" />
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
        <Icons.tailwindcss className="h-5 w-5 text-teal-400" />
        <span className="text-sm font-semibold tracking-tight">Tailwind CSS</span>
      </div>
    ),
  },
];

const SkillSection = () => {
  return (
    <section id="skills" className="mt-16 w-full max-w-4xl mx-auto">
      <div className="flex min-h-0 flex-col gap-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Ecosystem & Technologies</h2>
            <p className="text-sm text-muted-foreground">
              Autonomous AI agent orchestration, developer tooling, and modern web frameworks.
            </p>
          </div>
        </BlurFade>

        {/* Quiet Infinite Logo Marquee Strip */}
        <BlurFade delay={BLUR_FADE_DELAY * 9.5}>
          <div className="my-3 py-4 rounded-xl border border-border/40 bg-muted/20 backdrop-blur-xs">
            <LogoMarquee
              logos={techLogos.map((item) => item.icon)}
              speed={42}
              gap={48}
              pauseOnHover={true}
            />
          </div>
        </BlurFade>

        {/* Detailed Skill Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {DATA.skills.map((skill, id) => (
            <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.04}>
              <Badge variant="secondary" className="px-2.5 py-1 text-xs font-medium">
                {skill}
              </Badge>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
