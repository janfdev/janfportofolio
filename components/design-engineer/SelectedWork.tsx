"use client";

import * as React from "react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DATA } from "@/lib/data/resume";

export function SelectedWork() {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollerRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const scroller = scrollerRef.current;
    if (scroller) {
      scroller.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        scroller.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollerRef.current) return;
    const distance = 300;
    scrollerRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <section id="work" aria-labelledby="work-title" className="py-10 border-t border-[var(--color-border)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="work-title" className="text-[17px] font-medium tracking-tight text-[var(--color-fg)]">
            Selected work
          </h2>
          <p className="text-[14px] text-[var(--color-fg-secondary)] mt-0.5">
            Production systems, fullstack platforms & distributed APIs
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous work items"
            className="flex size-8 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-fg)] transition-all hover:bg-[var(--color-bg-muted)] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next work items"
            className="flex size-8 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-fg)] transition-all hover:bg-[var(--color-bg-muted)] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="relative -mx-5 sm:-mx-6 px-5 sm:px-6">
        <ul
          ref={scrollerRef}
          className="flex gap-4.5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {DATA.projects.map((project) => {
            const href = `/projects/${project.slug}`;

            return (
              <li key={project.slug} className="shrink-0 snap-start">
                <Link
                  href={href}
                  className="group relative flex flex-col gap-2.5 transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] rounded-[26px]"
                >
                  <div className="relative size-[170px] sm:size-[190px] overflow-hidden rounded-[26px] border border-[var(--color-border)] bg-[var(--color-bg-subtle)] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-[11px] font-mono font-medium text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-full">
                        Case Study ↗
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-0.5 px-1 max-w-[170px] sm:max-w-[190px]">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="truncate text-[14px] font-medium text-[var(--color-fg)] group-hover:text-[var(--color-focus)] transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-[11px] font-mono text-[var(--color-fg-secondary)] shrink-0">
                        {project.year || "2024"}
                      </span>
                    </div>
                    <p className="truncate text-[12px] text-[var(--color-fg-secondary)]">
                      {project.role || project.category}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
