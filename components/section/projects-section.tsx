"use client";

import React, { useState } from "react";
import ProjectCard from "../project";
import { DATA, ProjectCategory } from "../../lib/data/resume";
import { BlurFade } from "../ui/blur-fade";
import { BLUR_FADE_DELAY } from "../../lib/type";

const CATEGORIES: ProjectCategory[] = ["All", "Fullstack", "Backend & API"];

const ProjectSection = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const filteredProjects =
    activeCategory === "All"
      ? DATA.projects
      : DATA.projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="scroll-mt-28 mt-24 mb-28 w-full max-w-7xl mx-auto">
      <BlurFade delay={BLUR_FADE_DELAY * 11}>
        <div className="flex flex-col items-center justify-center space-y-2 text-center mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Featured Projects & Case Studies
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-muted-foreground">
            Production web platforms, distributed APIs, and fullstack applications built with modern engineering standards.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === "All"
                  ? DATA.projects.length
                  : DATA.projects.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-foreground text-background shadow-xs scale-102"
                      : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? "bg-background/20 text-background"
                        : "bg-muted-foreground/15 text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </BlurFade>

      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <BlurFade key={project.slug || project.title} delay={BLUR_FADE_DELAY * 12 + index * 0.05}>
            <ProjectCard {...project} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
