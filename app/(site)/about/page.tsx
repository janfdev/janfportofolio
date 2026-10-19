import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { DATA } from "@/lib/data/resume";
import {
  MapPin,
  Mail,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Github,
  Linkedin,
} from "lucide-react";
import SkillSection from "@/components/section/skills-section";

export const metadata: Metadata = {
  title: `About | ${DATA.name}`,
  description:
    "Learn about Rizqi Noor Fauzan: software engineer, system architect, and autonomous AI agent orchestrator.",
};

const PRINCIPLES = [
  {
    icon: Layers,
    title: "End-to-End System Integrity",
    description:
      "From database indexing in PostgreSQL to zero-drift TypeScript contracts and fluid client interactions. Every layer is built with strict boundary validation and resilience.",
  },
  {
    icon: Cpu,
    title: "Autonomous AI Orchestration",
    description:
      "Leveraging multi-agent architectures (Hermes Agent, Claude Code, Antigravity) with persistent graph memory to accelerate software engineering without sacrificing code quality.",
  },
  {
    icon: Code2,
    title: "Minimalist & Native First",
    description:
      "Embracing the Ponytail philosophy: stdlib and platform features first, avoiding unrequested abstractions, and writing the shortest robust diff that works reliably.",
  },
  {
    icon: ShieldCheck,
    title: "Production Discipline",
    description:
      "Zero tolerance for AI slop, broken states, or dead UI buttons. Every interface adheres to WCAG AA accessibility, proper error handling, and tested workflows.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-28 pb-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-24">
      {/* 1. Hero Split: Portrait + Bio */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Portrait with Double-Bezel Frame */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative group p-2.5 rounded-3xl bg-muted/40 border border-border/60 shadow-xl max-w-sm w-full">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-[calc(1.5rem-0.25rem)] border border-border/40 bg-zinc-950">
              <Image
                src={DATA.avatarUrl}
                alt={DATA.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80" />
              
              {/* Bottom Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <p className="text-base font-bold tracking-tight">{DATA.name}</p>
                <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                  <MapPin className="size-3 text-emerald-400" />
                  <span>{DATA.location}</span>
                </div>
              </div>
            </div>

            {/* Status Pill Indicator */}
            <div className="mt-3 px-3 py-2 rounded-xl bg-card/60 border border-border/40 flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-muted-foreground font-medium">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Status</span>
              </span>
              <span className="text-foreground font-semibold">Available for Hire</span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Biography */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            <span>About Me</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
            Engineering reliable systems and modern web experiences.
          </h1>

          <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
            <p>
              I am <span className="text-foreground font-semibold">{DATA.name}</span>, a Full-Stack Engineer and System Architect based in Indonesia. I specialize in designing and delivering end-to-end applications that bridge intuitive user interfaces with robust, scalable backends.
            </p>
            <p>
              My engineering stack spans modern React/Next.js architectures, type-safe APIs with TypeScript and Drizzle/Prisma, distributed SQL databases, and autonomous AI coding agent workflows. I believe that great software is defined by clarity, speed, and resilient architecture rather than excessive complexity.
            </p>
            <p>
              When I am not designing systems or writing code, I explore telemetry, autonomous multi-agent pipelines, and modern audio/motion technologies.
            </p>
          </div>

          {/* Socials & Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-zinc-950 font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
            >
              <Mail className="size-4" />
              <span>Get in Touch</span>
            </Link>

            <a
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/80 bg-card/60 hover:bg-muted text-xs sm:text-sm font-semibold text-foreground transition-colors shadow-xs"
            >
              <Github className="size-4" />
              <span>GitHub</span>
            </a>

            <a
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/80 bg-card/60 hover:bg-muted text-xs sm:text-sm font-semibold text-foreground transition-colors shadow-xs"
            >
              <Linkedin className="size-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Core Engineering Principles */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span>Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            How I Build Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRINCIPLES.map((principle) => {
            const IconComponent = principle.icon;
            return (
              <div
                key={principle.title}
                className="p-6 sm:p-7 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xs space-y-3 hover:border-emerald-500/40 transition-colors"
              >
                <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <IconComponent className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Work Experience */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Briefcase className="size-3.5" />
            <span>Career Path</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Work Experience
          </h2>
        </div>

        <div className="space-y-4">
          {DATA.work.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xs space-y-3 hover:border-emerald-500/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <span>{item.title}</span>
                    <span className="text-xs font-normal text-muted-foreground">• {item.location}</span>
                  </h3>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <span>{item.company}</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted/60 text-muted-foreground self-start sm:self-auto border border-border/40">
                  {item.start} - {item.end}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {item.description.trim()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Education */}
      <section className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <GraduationCap className="size-3.5" />
            <span>Education</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Academic Background
          </h2>
        </div>

        <div className="space-y-4">
          {DATA.education.map((edu, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500/40 transition-colors"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">
                  {edu.school}
                </h3>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  {edu.degree}
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted/60 text-muted-foreground self-start sm:self-auto border border-border/40">
                {edu.start} - {edu.end}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AI & Tech Ecosystem */}
      <SkillSection />

      {/* 6. Footer CTA Banner */}
      <div className="p-8 sm:p-12 rounded-3xl border border-border/60 bg-linear-to-b from-card/60 to-muted/20 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Let’s Build Something Exceptional
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
          Have an engineering opening, technical project, or architecture challenge? I am always open to exploring high-impact work.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-zinc-950 font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95"
          >
            <span>Get in Touch</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
