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
    name: "React",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.react className="h-6 w-6" />
        <span className="text-sm font-medium tracking-tight">React</span>
      </div>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.nextjs className="h-6 w-6" />
        <span className="text-sm font-medium tracking-tight">Next.js</span>
      </div>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.typescript className="h-6 w-6" />
        <span className="text-sm font-medium tracking-tight">TypeScript</span>
      </div>
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.tailwindcss className="h-6 w-6" />
        <span className="text-sm font-medium tracking-tight">Tailwind CSS</span>
      </div>
    ),
  },
  {
    name: "Framer Motion",
    icon: (
      <div className="flex items-center gap-2">
        <Icons.framermotion className="h-6 w-6" />
        <span className="text-sm font-medium tracking-tight">Framer Motion</span>
      </div>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-bold border border-current px-1 py-0.5 rounded">NODE</span>
        <span className="text-sm font-medium tracking-tight">Node.js</span>
      </div>
    ),
  },
  {
    name: "Prisma & Drizzle",
    icon: (
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-bold border border-current px-1 py-0.5 rounded">ORM</span>
        <span className="text-sm font-medium tracking-tight">Prisma & Drizzle</span>
      </div>
    ),
  },
  {
    name: "PostgreSQL & SQL",
    icon: (
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-bold border border-current px-1 py-0.5 rounded">SQL</span>
        <span className="text-sm font-medium tracking-tight">PostgreSQL</span>
      </div>
    ),
  },
  {
    name: "Express.js",
    icon: (
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-bold border border-current px-1 py-0.5 rounded">EX</span>
        <span className="text-sm font-medium tracking-tight">Express.js</span>
      </div>
    ),
  },
  {
    name: "Docker",
    icon: (
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-bold border border-current px-1 py-0.5 rounded">DOCKER</span>
        <span className="text-sm font-medium tracking-tight">Containerization</span>
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
            <h2 className="text-xl font-bold tracking-tight">Skills & Tech Stack</h2>
            <p className="text-sm text-muted-foreground">
              Technologies and frameworks I use to build scalable web applications.
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
              <Badge variant="secondary" className="px-2.5 py-1 text-xs">
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
