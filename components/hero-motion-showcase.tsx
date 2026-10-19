"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { DATA } from "@/lib/data/resume";

interface ShowcaseCardProps {
  project: (typeof DATA.projects)[number];
  index: number;
}

function ShowcaseCard({ project, index }: ShowcaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate motion values for 3D tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 250,
    damping: 25,
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
    setIsHovered(false);
  };

  // Staggered continuous floating animation
  const floatDuration = 4 + (index % 3) * 0.8;
  const floatDelay = index * 0.4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative shrink-0 w-72 sm:w-80 group perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: isHovered ? -8 : [0, -6, 0],
        }}
        transition={{
          y: isHovered
            ? { duration: 0.2, ease: "easeOut" }
            : {
                duration: floatDuration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: floatDelay,
              },
        }}
        className="relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/70 backdrop-blur-md transition-shadow duration-300 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 cursor-pointer"
      >
        <Link href={`/projects/${project.slug}`} className="block">
          {/* Card Media Preview */}
          <div className="relative aspect-video w-full overflow-hidden bg-muted/40 border-b border-border/40">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 288px, 320px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

            {/* Category Badge */}
            <div className="absolute top-2.5 left-2.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-background/90 backdrop-blur-md text-foreground border border-border/60">
                <span className="size-1 rounded-full bg-emerald-500" />
                {project.category}
              </span>
            </div>

            <div className="absolute top-2.5 right-2.5">
              <div className="size-6 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors border border-border/50">
                <ArrowUpRight className="size-3" />
              </div>
            </div>
          </div>

          {/* Card Info */}
          <div className="p-4 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-bold tracking-tight text-foreground group-hover:text-emerald-500 transition-colors">
                {project.title}
              </h4>
              <span className="text-[10px] text-muted-foreground font-medium">
                {project.year}
              </span>
            </div>

            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-1 pt-1">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-muted/50 text-muted-foreground border border-border/40"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="px-1 py-0.5 text-[9px] text-muted-foreground/80">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function HeroMotionShowcase() {
  return (
    <div className="w-full max-w-6xl mx-auto mt-12 px-2">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <Sparkles className="size-3.5 text-emerald-500 animate-spin-slow" />
          <span>Eksplorasi Studi Kasus Unggulan</span>
        </div>
        <Link
          href="/#projects"
          className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
        >
          <span>Lihat Semua ({DATA.projects.length})</span>
          <ArrowUpRight className="size-3" />
        </Link>
      </div>

      {/* Horizontal smooth drag/scroll container with snap */}
      <div className="flex items-stretch gap-4 overflow-x-auto pb-4 pt-2 px-2 no-scrollbar scroll-smooth">
        {DATA.projects.map((project, index) => (
          <ShowcaseCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
