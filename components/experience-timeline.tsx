"use client";

import React from "react";
import { DATA } from "@/lib/data/resume";
import { Briefcase, Calendar, MapPin, ExternalLink, Building2 } from "lucide-react";
import { motion } from "motion/react";

export function ExperienceTimeline() {
  return (
    <section className="mt-24 mb-24 w-full">
      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 uppercase tracking-widest">
          <Briefcase className="size-3.5" />
          <span>Career Journey</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Work Experience
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
          Hands-on software engineering delivering full-stack architectures, responsive client interfaces, and robust database workflows.
        </p>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l border-border/80 space-y-12">
        {DATA.work.map((item, idx) => {
          // Format clean paragraphs into structured key points
          const paragraphs = item.description
            .trim()
            .split("\n\n")
            .filter(Boolean);

          return (
            <motion.div
              key={item.company + idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 size-4 rounded-full border-2 border-background bg-zinc-400 group-hover:bg-emerald-500 group-hover:scale-125 transition-all duration-300 ring-4 ring-card" />

              <div className="p-6 sm:p-8 rounded-2xl border border-border/70 bg-card/50 backdrop-blur-xs transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 space-y-4">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                      <span>{item.title}</span>
                    </h3>

                    <div className="flex items-center gap-3 text-xs sm:text-sm">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-emerald-600 hover:underline"
                      >
                        <Building2 className="size-3.5" />
                        <span>{item.company}</span>
                        <ExternalLink className="size-3" />
                      </a>

                      <span className="text-muted-foreground flex items-center gap-1 text-xs">
                        <MapPin className="size-3 text-muted-foreground" />
                        <span>{item.location}</span>
                      </span>
                    </div>
                  </div>

                  <div className="self-start sm:self-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-muted/70 text-foreground border border-border/50">
                      <Calendar className="size-3 text-muted-foreground" />
                      <span>{item.start} - {item.end}</span>
                    </span>
                  </div>
                </div>

                {/* Description Paragraphs */}
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  {paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
