"use client";

import * as React from "react";
import { useState, useRef } from "react";
import Image from "next/image";

interface Tool {
  name: string;
  icon: string;
  shot: string;
}

const tools: Tool[] = [
  {
    name: "Figma",
    icon: "/_astro/icon.ZnSrnsuJ_iYUaa.webp",
    shot: "/_astro/image.CEK-TwaE_Z71Ixg.webp",
  },
  {
    name: "Cursor",
    icon: "/_astro/icon.BF9RnD5v_1k8qIe.webp",
    shot: "/_astro/image.QLQ8Wg7U_2eMxGd.webp",
  },
  {
    name: "Grok Bot",
    icon: "/_astro/icon.CaDGYH8S_Z1JSxi1.webp",
    shot: "/_astro/image.CzHTBpaS_28xod7.webp",
  },
  {
    name: "Claude Code",
    icon: "/_astro/icon.0ZbJsTbu_FuIf1.webp",
    shot: "/_astro/image.DfjlAIC2_1PwYD4.webp",
  },
  {
    name: "Pen.dev",
    icon: "/_astro/icon.CphQPoHC_241nSF.webp",
    shot: "/_astro/image.CW4xD5cr_Z2mkeNF.webp",
  },
  {
    name: "Termul",
    icon: "/_astro/icon.DY7lu2gt_ZTfJf5.webp",
    shot: "/_astro/image.qri40JK0_2sumAB.webp",
  },
  {
    name: "CapCut",
    icon: "/_astro/icon.CeSGS5iw_Z1HyBFv.webp",
    shot: "/_astro/image.n-OFJ4Ml_Z8TEtl.webp",
  },
  {
    name: "Shotbase",
    icon: "/_astro/icon.CGarQvzP_NOljC.webp",
    shot: "/_astro/image.B1dnkLAI_2h6kcp.webp",
  },
];

export function ToolsIUse() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>, tool: Tool) => {
    if (!containerRef.current) return;
    const itemRect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    setPos({
      x: itemRect.left - containerRect.left + itemRect.width / 2,
      y: itemRect.top - containerRect.top,
    });
    setActiveTool(tool);
  };

  return (
    <section aria-labelledby="tools-title" className="py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 id="tools-title" className="text-[14px] text-[var(--color-fg-secondary)]">
          Tools I use
        </h2>
      </div>

      <div ref={containerRef} className="relative">
        <ul className="flex flex-wrap gap-y-2.5 text-[15px] text-[var(--color-fg-secondary)]">
          {tools.map((tool, idx) => (
            <li key={tool.name} className="flex items-center whitespace-nowrap">
              <span
                onMouseEnter={(e) => handleMouseEnter(e, tool)}
                onMouseLeave={() => setActiveTool(null)}
                className="inline-flex items-center gap-1.5 cursor-default transition-colors hover:text-[var(--color-fg)] py-0.5"
              >
                <span className="relative size-[18px] shrink-0 overflow-hidden rounded-[5px] bg-black/10">
                  <Image
                    src={tool.icon}
                    alt={tool.name}
                    width={18}
                    height={18}
                    className="size-full object-cover"
                    unoptimized
                  />
                </span>
                <span>{tool.name}</span>
              </span>
              {idx < tools.length - 1 && (
                <span aria-hidden="true" className="select-none px-2 text-[var(--color-border-strong)]">
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Hover Screenshot Preview Card */}
        {activeTool && (
          <div
            className="pointer-events-none absolute z-30 transition-all duration-150"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y - 176}px`,
              transform: "translateX(-50%)",
            }}
          >
            <div className="relative h-[163px] w-[260px] overflow-hidden rounded-2xl bg-white p-1 shadow-[0_0_1px_rgba(0,0,0,0.06),0_18px_40px_rgba(0,0,0,0.12)] border border-[var(--color-border)] animate-in fade-in zoom-in-95 duration-150">
              <Image
                src={activeTool.shot}
                alt={activeTool.name}
                width={252}
                height={155}
                className="size-full rounded-xl object-cover"
                unoptimized
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
