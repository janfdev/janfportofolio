"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Globe, ArrowUpRight } from "lucide-react";
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
  description,
  tagsIcon,
  imageUrl,
  url,
  github,
}: ProjectProps) {
  return (
    <div className="group relative flex flex-col h-full overflow-hidden rounded-2xl border border-border/60 bg-card/50 transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1">
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted/30 border-b border-border/40">
        <Image
          src={imageUrl}
          alt={`${title} project preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {title}
            </h3>
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

          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Tech Stack Visual Icons with Tooltip (No Raw Text) */}
          {tagsIcon && tagsIcon.length > 0 && (
            <div className="space-y-2 pt-1">
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
        <div className="flex items-center gap-2 pt-5 mt-5 border-t border-border/40 text-xs">
          {url && (
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3.5 py-1.5 font-semibold text-background transition hover:opacity-90 active:scale-95"
            >
              <Globe className="size-3.5" />
              <span>Preview</span>
            </Link>
          )}

          {github && (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background px-3.5 py-1.5 font-semibold text-foreground transition hover:bg-muted active:scale-95"
            >
              <Github className="size-3.5" />
              <span>Code</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
