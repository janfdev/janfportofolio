"use client";

import * as React from "react";
import { useState, useRef } from "react";
import contributionsData from "@/lib/data/contributions.json";
import { cn } from "@/lib/utils";

interface Day {
  count: string;
  date: string;
  level: number;
}

interface Week {
  hiddenOnMobile: boolean;
  days: Day[];
}

export function ShippingInPublic() {
  const weeks: Week[] = contributionsData;
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredDay, setHoveredDay] = useState<{
    count: string;
    date: string;
    x: number;
    y: number;
  } | null>(null);

  const getLevelClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#ff6308]/30";
      case 2:
        return "bg-[#ff6308]/55";
      case 3:
        return "bg-[#ff6308]/80";
      case 4:
        return "bg-[#ff6308]";
      default:
        return "bg-[var(--color-fg)]/5";
    }
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLSpanElement>,
    day: Day
  ) => {
    if (!containerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    setHoveredDay({
      count: day.count,
      date: day.date,
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top,
    });
  };

  return (
    <section aria-labelledby="github-title" className="py-10">
      <div className="flex items-center justify-between mb-2">
        <h2 id="github-title" className="text-[14px] text-[var(--color-fg-secondary)]">
          Shipping in public
        </h2>
        <a
          href="https://github.com/julianromli"
          target="_blank"
          rel="noopener"
          className="text-[14px] text-[var(--color-fg-secondary)] hover:text-[var(--color-fg)] transition-colors"
        >
          @julianromli
        </a>
      </div>

      <p className="mb-4">
        <span className="font-medium text-[var(--color-fg)] tabular-nums">1,370</span>
        <span className="text-[var(--color-fg-secondary)]">
          {" "}contributions in the last 9 months
        </span>
      </p>

      {/* Overflow-x: clip so day tooltip doesn't get clipped */}
      <div className="flex justify-end overflow-x-clip sm:justify-start">
        <div
          ref={containerRef}
          role="img"
          aria-label="GitHub contribution graph: 1,370 contributions in the last year"
          className="relative flex gap-[3px] select-none py-2"
          onMouseLeave={() => setHoveredDay(null)}
        >
          {weeks.map((week, wIdx) => (
            <div
              key={wIdx}
              className={cn(
                "flex flex-col gap-[3px]",
                week.hiddenOnMobile && "max-md:hidden"
              )}
            >
              {week.days.map((day, dIdx) => (
                <span
                  key={dIdx}
                  onMouseEnter={(e) => handleMouseEnter(e, day)}
                  className={cn(
                    "size-3 rounded-[3px] transition-colors cursor-pointer hover:ring-1 hover:ring-[var(--color-fg)]/40",
                    getLevelClass(day.level)
                  )}
                />
              ))}
            </div>
          ))}

          {/* Gliding Tooltip */}
          {hoveredDay && (
            <div
              className="pointer-events-none absolute z-20 flex h-7 items-center gap-1.5 rounded-lg bg-[var(--color-bg-inverse)] px-2.5 text-[12px] whitespace-nowrap text-[var(--color-fg-inverse)] shadow-lg transition-all duration-75"
              style={{
                left: `${hoveredDay.x}px`,
                top: `${hoveredDay.y - 34}px`,
                transform: "translateX(-50%)",
              }}
            >
              <span className="font-medium tabular-nums">{hoveredDay.count}</span>
              <span className="text-white/60">{hoveredDay.date}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
