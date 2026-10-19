"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/lib/data/resume";
import {
  MapPin,
  Mail,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  Github,
  Linkedin,
} from "lucide-react";
import SkillSection from "@/components/section/skills-section";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

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

export function AboutContent() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 260,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 260,
    damping: 22,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-28">
      {/* 1. Hero Split: Portrait + Bio */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Portrait with 3D Tilt */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="relative p-3 rounded-3xl bg-card border border-border/80 shadow-2xl max-w-sm w-full"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-border/50 bg-zinc-950">
              <Image
                src={DATA.avatarUrl}
                alt={DATA.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <p className="text-base font-bold tracking-tight">{DATA.name}</p>
                <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                  <MapPin className="size-3 text-emerald-400" />
                  <span>{DATA.location}</span>
                </div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="mt-3 px-3.5 py-2.5 rounded-xl bg-muted/60 border border-border/40 flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-muted-foreground font-medium">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Status</span>
              </span>
              <span className="text-foreground font-semibold">Available for Hire & Projects</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Narrative Biography */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 uppercase tracking-widest">
            <span>About Me</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
            Engineering resilient systems and modern web experiences.
          </h1>

          <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
            <p>
              I am <span className="text-foreground font-semibold">{DATA.name}</span>, a Full-Stack Engineer and System Architect based in Indonesia. I design and build end-to-end applications that unify intuitive interfaces with high-performance backends.
            </p>
            <p>
              My expertise spans modern Next.js 15 architectures, type-safe APIs with TypeScript and Prisma/Drizzle, distributed PostgreSQL storage, and autonomous AI coding agent orchestration. I prioritize code minimalism, standard libraries, and resilient engineering over unnecessary abstractions.
            </p>
            <p>
              Beyond product engineering, I focus on local AI routing, multi-agent workflows with graph memory, and sound system optimization.
            </p>
          </div>

          {/* Socials & Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-semibold text-xs sm:text-sm shadow-sm transition-all hover:opacity-90 active:scale-95"
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
          {PRINCIPLES.map((principle, idx) => {
            const IconComponent = principle.icon;
            return (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-5 sm:p-7 rounded-2xl border border-border/70 bg-card/50 backdrop-blur-xs space-y-3.5 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all"
              >
                <div className="size-11 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <IconComponent className="size-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Work Experience Timeline */}
      <ExperienceTimeline />

      {/* 4. AI & Tech Ecosystem */}
      <SkillSection />

      {/* 4. Footer CTA Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="p-6 sm:p-12 rounded-3xl border border-border/70 bg-linear-to-b from-card/80 to-muted/30 text-center space-y-4 shadow-xl shadow-black/5"
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Let’s Build Something Exceptional
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Have an engineering opening, technical project, or architecture challenge? I am always open to exploring high-impact work.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95"
          >
            <span>Get in Touch</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
