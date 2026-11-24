"use client";

import * as React from "react";
import Image from "next/image";
import { DATA } from "@/lib/data/resume";
import { MapPin, ExternalLink } from "lucide-react";

export function ExperienceSection() {
  return (
    <section aria-labelledby="exp-title" className="py-10 border-t border-[var(--color-border)]">
      {/* Header */}
      <div className="mb-6">
        <h2 id="exp-title" className="text-[17px] font-medium tracking-tight text-[var(--color-fg)]">
          Experience & Trajectory
        </h2>
        <p className="text-[14px] text-[var(--color-fg-secondary)] mt-0.5">
          Engineering roles, institution projects & academic foundation
        </p>
      </div>

      {/* Experience list */}
      <div className="flex flex-col divide-y divide-[var(--color-border)]">
        {DATA.work.map((item, index) => {
          const isCurrent = item.end.toLowerCase() === "present";

          return (
            <article
              key={`${item.company}-${index}`}
              className="group py-4.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 transition-colors hover:bg-[var(--color-bg-hover)] -mx-3 px-3 rounded-[14px]"
            >
              <div className="flex items-start gap-3.5 max-w-[500px]">
                <div className="relative size-10 shrink-0 rounded-[12px] overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-subtle)] mt-0.5">
                  <Image
                    src={item.logoUrl}
                    alt={item.company}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-[15px] font-medium text-[var(--color-fg)] group-hover:text-[var(--color-focus)] transition-colors">
                      {item.title}
                    </h3>
                    {isCurrent && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-[#28c840]/10 text-[#1a7f2b]">
                        <span className="size-1.5 rounded-full bg-[#28c840]" />
                        current
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[13px] text-[var(--color-fg-secondary)]">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[var(--color-fg)] hover:underline inline-flex items-center gap-0.5"
                    >
                      <span>{item.company}</span>
                      <ExternalLink className="size-3 text-[var(--color-fg-secondary)]" />
                    </a>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3" />
                      {item.location}
                    </span>
                  </div>

                  <p className="text-[13px] text-[var(--color-fg-secondary)] leading-relaxed mt-1 line-clamp-3">
                    {item.description.trim()}
                  </p>
                </div>
              </div>

              <div className="text-[12px] font-mono text-[var(--color-fg-secondary)] shrink-0 sm:pt-1">
                {item.start} — {item.end}
              </div>
            </article>
          );
        })}

        {/* Education row */}
        {DATA.education.map((edu, index) => (
          <article
            key={`edu-${index}`}
            className="group py-4.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 transition-colors hover:bg-[var(--color-bg-hover)] -mx-3 px-3 rounded-[14px]"
          >
            <div className="flex items-start gap-3.5 max-w-[500px]">
              <div className="relative size-10 shrink-0 rounded-[12px] overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-subtle)] mt-0.5">
                <Image
                  src={edu.logoUrl}
                  alt={edu.school}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-0.5">
                <h3 className="text-[15px] font-medium text-[var(--color-fg)]">
                  {edu.degree}
                </h3>
                <a
                  href={edu.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[var(--color-fg-secondary)] hover:underline inline-flex items-center gap-0.5"
                >
                  <span>{edu.school}</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>

            <div className="text-[12px] font-mono text-[var(--color-fg-secondary)] shrink-0 sm:pt-1">
              {edu.start} — {edu.end}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
