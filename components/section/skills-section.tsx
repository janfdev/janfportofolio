"use client";

import React from "react";
import Image from "next/image";
import { BlurFade } from "../ui/blur-fade";
import { BLUR_FADE_DELAY } from "../docs/";
import { LogoMarquee } from "../logo-marquee";

const techLogos: { name: string; src: string }[] = [
  {
    name: "Hermes Agent",
    src: "/icons/hermes.svg",
  },
  {
    name: "Claude Code",
    src: "/icons/claudecode.svg",
  },
  {
    name: "OpenAI Codex",
    src: "/icons/codex.svg",
  },
  {
    name: "Next.js",
    src: "/icons/nextjs.svg",
  },
  {
    name: "React",
    src: "/icons/react.svg",
  },
  {
    name: "TypeScript",
    src: "/icons/typescript.svg",
  },
  {
    name: "OpenCode",
    src: "/icons/opencode.svg",
  },
  {
    name: "Antigravity",
    src: "/icons/antigravity.svg",
  },
  {
    name: "9Router",
    src: "/icons/9router.svg",
  },
  {
    name: "Tailwind CSS",
    src: "/icons/tailwindcss.svg",
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

        {/* Quiet Infinite Logo Marquee Strip with Official Standalone Image SVGs */}
        <BlurFade delay={BLUR_FADE_DELAY * 9.5}>
          <div className="relative my-2 py-6 w-full">
            <LogoMarquee
              logos={techLogos.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center size-7 shrink-0">
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={28}
                      height={28}
                      className="size-7 object-contain"
                      unoptimized
                    />
                  </div>
                  <span className="text-sm font-semibold tracking-tight text-foreground select-none">
                    {item.name}
                  </span>
                </div>
              ))}
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
