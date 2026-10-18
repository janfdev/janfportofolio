"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Globe, ArrowUpRight } from "lucide-react";
import { DATA } from "../lib/data/resume";
import { Badge } from "./ui/badge";

type ProjectProps = (typeof DATA.projects)[number];

export default function ProjectCard({
  title,
  description,
  tags,
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

          {/* Tech Stack Visual Icons */}
          {tagsIcon && tagsIcon.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                Tech Stack
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {tagsIcon.map((icon, index) => (
                  <div
                    key={index}
                    className="flex size-7 items-center justify-center rounded-md border border-border/60 bg-muted/40 p-1.5 shadow-2xs transition hover:scale-110 hover:border-border"
                  >
                    <Image
                      src={icon}
                      alt="tech icon"
                      width={18}
                      height={18}
                      className="size-4.5 object-contain"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Text Badges */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-2 py-0.5 text-[10px] font-medium tracking-tight bg-muted/60 text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
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
