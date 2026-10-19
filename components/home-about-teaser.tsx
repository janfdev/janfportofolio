"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/lib/data/resume";
import { ArrowRight, UserCheck, MapPin } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export function HomeAboutTeaser() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 260,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 260,
    damping: 20,
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
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-28 mb-28 w-full"
    >
      <div className="relative overflow-hidden p-8 sm:p-12 md:p-14 rounded-3xl border border-border/70 bg-card/50 backdrop-blur-md shadow-xl shadow-black/5">
        {/* Subtle Ambient Radial Highlight */}
        <div className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-emerald-500/5 blur-3xl" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Portrait with Interactive 3D Physics */}
          <div className="lg:col-span-5 flex justify-center">
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
              className="relative p-3 rounded-3xl bg-card border border-border/80 shadow-2xl max-w-[320px] w-full"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border border-border/50 bg-zinc-950">
                <Image
                  src={DATA.avatarUrl}
                  alt={DATA.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-sm font-bold tracking-tight">{DATA.name}</p>
                  <p className="text-[11px] text-zinc-300">Software Engineer & Architect</p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-3 px-3.5 py-2 rounded-xl bg-muted/60 border border-border/40 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-muted-foreground font-medium">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Location</span>
                </span>
                <span className="text-foreground font-semibold flex items-center gap-1">
                  <MapPin className="size-3 text-emerald-500" />
                  <span>Indonesia</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Narrative Preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 uppercase tracking-widest">
              <UserCheck className="size-3.5" />
              <span>Engineering Philosophy</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-[1.2]">
              Architecting resilient backends, type safe interfaces, and autonomous agent systems.
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              I build production software with a strict focus on database integrity, high-throughput APIs, and crisp user interactions. My primary toolkit centers around Next.js 15, TypeScript, PostgreSQL, Prisma, and autonomous multi-agent pipelines (Hermes Agent, Claude Code).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl border border-border/60 bg-muted/30">
                <p className="text-xs text-muted-foreground">Focus</p>
                <p className="text-sm font-bold text-foreground mt-0.5">Fullstack & AI</p>
              </div>
              <div className="p-3 rounded-xl border border-border/60 bg-muted/30">
                <p className="text-xs text-muted-foreground">Philosophy</p>
                <p className="text-sm font-bold text-foreground mt-0.5">Ponytail & Native</p>
              </div>
              <div className="p-3 rounded-xl border border-border/60 bg-muted/30 col-span-2 sm:col-span-1">
                <p className="text-xs text-muted-foreground">Standard</p>
                <p className="text-sm font-bold text-foreground mt-0.5">Zero AI Slop</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-semibold text-xs sm:text-sm hover:opacity-90 transition-all active:scale-95 shadow-sm group"
              >
                <span>Read Full Biography & Career Path</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
