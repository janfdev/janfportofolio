"use client";

import React from "react";
import ProjectCard from "../project";
import { DATA } from "../../lib/data/resume";
import { BlurFade } from "../ui/blur-fade";
import { BLUR_FADE_DELAY } from "../../lib/type";

const ProjectSection = () => {
  return (
    <section id="projects" className="scroll-mt-28 mt-24 mb-28 w-full max-w-7xl mx-auto">
      <BlurFade delay={BLUR_FADE_DELAY * 11}>
        <div className="flex flex-col items-center justify-center space-y-2 text-center mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Featured Projects
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-muted-foreground">
            Production web platforms, distributed APIs, and fullstack applications built with modern engineering standards.
          </p>
        </div>
      </BlurFade>

      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DATA.projects.map((project, index) => (
          <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 12 + index * 0.05}>
            <ProjectCard {...project} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
