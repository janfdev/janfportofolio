"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Globe, ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { DATA } from "../lib/data/resume";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type ProjectProps = (typeof DATA.projects)[number];

// Helper to format clean label from icon path
function formatTechLabel(iconPath: string): string {
  const filename = iconPath.split("/").pop()?.replace(/\.(svg|png|webp|jpg)$/i, "") || "";
  const cleaned = filename.replace(/(_dark|_light|-ui|-orm|-js|\.svg)/gi, "").trim();
  
  const map: Record<string, string> = {
    nextjs: "Next.js",
    react: "React",
    tailwindcss: "Tailwind CSS",
    nodejs: "Node.js",
    expressjs: "Express.js",
    prisma: "Prisma ORM",
    "drizzle-orm": "Drizzle ORM",
    drizzle: "Drizzle ORM",
    mongodb: "MongoDB",
    supabase: "Supabase",
    neon: "Neon Postgres",
    "better-auth": "Better Auth",
    gemini: "Google Gemini AI",
    groq: "Groq LPU",
    cloudinary: "Cloudinary",
    shadcn: "shadcn/ui",
  };

  return map[cleaned.toLowerCase()] || cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export default function ProjectCard({
  title,
  slug,
  description,
  category,
  role,
  year,
  tagsIcon,
  imageUrl,
  url,
  github,
}: ProjectProps) {
  const detailHref = slug ? `/projects/${slug}` : url || "#";

  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 280,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 280,
    damping: 24,
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
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm transition-colors duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5"
    >
      {/* Thumbnail Container */}
      <Link href={detailHref} className="relative aspect-video w-full overflow-hidden bg-muted/30 border-b border-border/40 block">
        <Image
          src={imageUrl}
          alt={`${title} project preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {category && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-background/80 backdrop-blur-md text-foreground border border-border/60 shadow-xs">
              {category}
            </span>
          </div>
        )}
      </Link>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div className="space-y-3.5">
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <Link href={detailHref} className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {title}
              </Link>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${title}`}
                  className="text-muted-foreground transition hover:text-foreground p-1"
                >
                  <ArrowUpRight className="size-4" />
                </a>
              )}
            </div>
            {(role || year) && (
              <p className="text-[11px] font-medium text-muted-foreground/80">
                {role} {year && `(${year})`}
              </p>
            )}
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Tech Stack Visual Icons with Tooltip (No Raw Text) */}
          {tagsIcon && tagsIcon.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                Tech Stack
              </span>
              <TooltipProvider delayDuration={150}>
                <div className="flex flex-wrap items-center gap-1.5">
                  {tagsIcon.map((icon, index) => {
                    const label = formatTechLabel(icon);
                    return (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <div className="flex size-7.5 items-center justify-center rounded-lg border border-border/60 bg-muted/40 p-1.5 shadow-2xs transition-all duration-200 hover:scale-110 hover:border-border hover:bg-muted/80 cursor-pointer">
                            <Image
                              src={icon}
                              alt={label}
                              width={18}
                              height={18}
                              className="size-4.5 object-contain"
                              unoptimized
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-semibold px-2.5 py-1">
                          <p>{label}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </div>
          )}
        </div>

        {/* Action Link Footer */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/40 text-xs">
          <Link
            href={detailHref}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline decoration-emerald-500/50 underline-offset-4"
          >
            <span>Case Study</span>
            <ArrowUpRight className="size-3" />
          </Link>

          <div className="flex items-center gap-2">
            {url && (
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 font-semibold text-background transition hover:opacity-90 active:scale-95 text-[11px]"
              >
                <Globe className="size-3" />
                <span>Demo</span>
              </Link>
            )}

            {github && (
              <Link
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background px-3 py-1.5 font-semibold text-foreground transition hover:bg-muted active:scale-95 text-[11px]"
              >
                <Github className="size-3" />
                <span>Code</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
