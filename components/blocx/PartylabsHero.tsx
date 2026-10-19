"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, MotionConfig, useReducedMotion, type Variants } from "motion/react";
import { Geist } from "next/font/google";
import { DATA } from "@/lib/data/resume";
import { TECH_STACK_ITEMS } from "./tech-stack-data";
import "./partylabs-hero.css";

/**
 * janfdev Hero: a thesis floating in a 3D field of depth photos.
 *
 * One viewport: 3D photo field drifting at 5 depths around an editorial headline,
 * responsive across desktop, tablet, and mobile.
 */

const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--plh-geist", display: "swap" });

const EASE = [0.16, 1, 0.3, 1] as const;

const TITLE = "Architecting Web & AI Systems";

const IDEAS = [
  "Smartseum Platform",
  "Quavity Quality Engine",
  "Autonomous AI Agents",
  "Next.js 15 & React 19",
  "NestJS Microservices",
  "PostgreSQL & Prisma",
];

type CardTuple = [x: number, y: number, d: number, r: number, portrait: 0 | 1];

const DESKTOP: CardTuple[] = [
  [8, 14, 0.15, -4, 0],
  [14, 28, 0.45, 3, 1],
  [6, 46, 0.75, -5, 0],
  [12, 64, 0.35, 4, 1],
  [8, 82, 0.85, -3, 0],
  [22, 10, 0.35, 2, 1],
  [24, 40, 0.95, -2, 0],
  [22, 72, 0.55, 3, 1],
  [20, 92, 0.25, -4, 0],
  [33, 6, 0.65, -3, 0],
  [31, 88, 0.45, 4, 1],
  [43, 8, 0.25, 2, 1],
  [44, 94, 0.75, -3, 0],
  [56, 6, 0.45, -2, 0],
  [57, 92, 0.35, 3, 1],
  [68, 8, 0.75, 4, 1],
  [67, 90, 0.85, -2, 0],
  [79, 10, 0.35, -3, 0],
  [76, 38, 0.95, 3, 1],
  [78, 68, 0.55, -4, 0],
  [80, 92, 0.25, 2, 1],
  [88, 16, 0.65, 3, 1],
  [93, 34, 0.45, -3, 0],
  [88, 54, 0.85, 2, 1],
  [93, 74, 0.35, -4, 0],
  [87, 88, 0.75, 3, 0],
  [3, 28, 0.25, 3, 1],
  [4, 70, 0.45, -2, 0],
  [96, 18, 0.25, -4, 0],
  [96, 62, 0.55, 3, 1],
];

const TABLET: CardTuple[] = [
  [8, 10, 0.25, -3, 0],
  [14, 24, 0.55, 3, 1],
  [8, 40, 0.85, -4, 0],
  [14, 60, 0.45, 2, 1],
  [8, 78, 0.75, -3, 0],
  [12, 92, 0.35, 4, 1],
  [24, 8, 0.45, 2, 1],
  [26, 88, 0.65, -3, 0],
  [40, 6, 0.35, -2, 0],
  [42, 94, 0.75, 3, 1],
  [58, 6, 0.55, 3, 1],
  [60, 94, 0.35, -2, 0],
  [74, 8, 0.35, -3, 0],
  [76, 88, 0.85, 2, 1],
  [90, 10, 0.45, 3, 1],
  [86, 26, 0.75, -4, 0],
  [92, 44, 0.35, 2, 1],
  [86, 62, 0.85, -3, 0],
  [92, 80, 0.55, 4, 1],
  [88, 94, 0.25, -2, 0],
];

const PHONE: CardTuple[] = [
  [10, 8, 0.35, -3, 0],
  [12, 22, 0.65, 3, 1],
  [10, 80, 0.75, -4, 0],
  [12, 94, 0.35, 2, 1],
  [88, 8, 0.45, 3, 1],
  [86, 24, 0.75, -3, 0],
  [90, 78, 0.85, 2, 1],
  [88, 92, 0.45, -2, 0],
  [30, 6, 0.25, 2, 1],
  [70, 6, 0.35, -2, 0],
  [32, 95, 0.55, -3, 0],
  [68, 95, 0.65, 3, 1],
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};

export default function PartylabsHero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<"desktop" | "tablet" | "phone">("desktop");
  const [idea, setIdea] = useState(0);

  /* choose the layout from element width */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      setLayout(w < 640 ? "phone" : w < 1024 ? "tablet" : "desktop");
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const coords = layout === "phone" ? PHONE : layout === "tablet" ? TABLET : DESKTOP;

  const cards = useMemo(() => {
    return coords.map((c, i) => {
      const item = TECH_STACK_ITEMS[i % TECH_STACK_ITEMS.length];
      return {
        c,
        i,
        item,
        order: Math.round(c[2] * 10),
      };
    });
  }, [coords]);

  /* entry animation: photos fly outward from the headline into place */
  useEffect(() => {
    const field = fieldRef.current;
    if (!field || reduce) return;
    const nodes = field.querySelectorAll<HTMLElement>(".plh-card");
    if (!nodes.length) return;

    let cancelled = false;
    nodes.forEach((n) => {
      const order = Number(n.dataset.order || 0);
      const delay = 0.25 + order * 0.035;
      n.style.opacity = "0";
      n.style.transform = "translate(-50%, -50%) scale(0.65)";
      setTimeout(() => {
        if (cancelled) return;
        n.style.transition = "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
        n.style.opacity = "";
        n.style.transform = "";
      }, delay * 1000);
    });

    return () => {
      cancelled = true;
    };
  }, [cards, reduce]);

  /* pointer parallax: one rAF loop easing toward the pointer */
  useEffect(() => {
    const field = fieldRef.current;
    if (!field || reduce || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let tx = 0;
    let ty = 0;
    let mx = 0;
    let my = 0;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = field.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const leave = () => {
      tx = 0;
      ty = 0;
    };
    const loop = () => {
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;
      field.style.setProperty("--plh-mx", mx.toFixed(4));
      field.style.setProperty("--plh-my", my.toFixed(4));
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  /* the search suggestions cycle */
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIdea((i) => (i + 1) % IDEAS.length), 2600);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <MotionConfig reducedMotion="user">
      <section ref={heroRef} className={`plh ${geist.variable}`} id="plh-top">
        <div ref={fieldRef} className="plh-field" aria-hidden>
          {cards.map(({ c, i, item, order }) => {
            const [x, y, d, r, p] = c;
            const portrait = p === 1;
            const style = {
              "--x": `${x}%`,
              "--y": `${y}%`,
              "--d": d,
              "--r": `${r}deg`,
              "--ar": portrait ? "3 / 3.6" : "4 / 3.2",
              "--o": (0.35 + d * 0.65).toFixed(2),
              "--b": `${d < 0.6 ? ((0.6 - d) * 5).toFixed(1) : 0}px`,
              "--s": (0.6 + d * 0.45).toFixed(2),
              "--z": Math.round(d * 10),
              "--dur": `${7 + (i % 5) * 1.3}s`,
              "--delay": `-${(i * 0.7).toFixed(1)}s`,
              "--amp": `${(4 + d * 7).toFixed(1)}px`,
              "--w": `calc(var(--plh-unit) * ${((0.62 + d * 0.68) * (portrait ? 0.88 : 1)).toFixed(3)})`,
            } as React.CSSProperties;

            return (
              <div key={i} className={`plh-card ${d > 0.65 ? "is-near" : ""}`} data-order={order} style={style}>
                <div className="plh-float">
                  <div className="plh-tech-card">
                    <div className="plh-tech-icon">
                      <Image
                        src={item.iconSrc}
                        alt={item.name}
                        width={32}
                        height={32}
                        className="size-full object-contain pointer-events-none select-none"
                        unoptimized
                      />
                    </div>
                    <div className="plh-tech-info">
                      <span className="plh-tech-name">{item.name}</span>
                      <span className="plh-tech-cat">{item.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="plh-content" aria-labelledby="plh-title">
          {/* Eyebrow Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            <Link className="plh-badge group" href="/about">
              <span className="plh-badge__icon" aria-hidden>
                <span>
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </span>
              <span className="font-semibold text-emerald-800">Available for 2026 Engineering</span>
              <span className="text-[var(--plh-muted)]">· Fullstack & AI Orchestrator</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="m9 6 6 6-6 6" />
              </svg>
            </Link>
          </motion.div>

          {/* Animated Display Title */}
          <h1 id="plh-title" className="plh-title max-w-4xl" aria-label={TITLE}>
            {TITLE.split(" ").map((w, i) => (
              <motion.span
                key={i}
                className="plh-title__w"
                aria-hidden
                initial={{ opacity: 0, y: "0.45em", filter: "blur(12px)" }}
                animate={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.2 + i * 0.05 }}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          {/* Author Subtitle */}
          <motion.p
            className="max-w-2xl text-center text-sm md:text-base text-[var(--plh-ink-2)] leading-relaxed mt-4 mb-2 font-normal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
          >
            Hi, I&apos;m {DATA.name}. Architecting end-to-end web applications, resilient backend microservices, and autonomous multi-agent engineering workflows.
          </motion.p>

          {/* Interactive Tech & Case Study Explorer Pill */}
          <motion.div
            className="my-4 w-full max-w-sm mx-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
          >
            <Link
              href="/work"
              className="flex items-center justify-between px-4 py-2 rounded-full border border-black/10 bg-white/80 hover:bg-white shadow-xs backdrop-blur-md transition group select-none"
            >
              <div className="flex items-center gap-2 text-xs text-[var(--plh-muted)]">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span>Focus:</span>
                <span className="font-semibold text-[var(--plh-ink)]">
                  {IDEAS[idea]}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                Explore Work →
              </span>
            </Link>
          </motion.div>

          {/* Action CTAs */}
          <div className="plh-ctas">
            <motion.div variants={reveal} initial="hidden" animate="show" custom={0.75}>
              <Link className="plh-btn plh-btn--dark" href="/work">
                View Selected Work
                <svg className="plh-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </motion.div>
            <motion.div variants={reveal} initial="hidden" animate="show" custom={0.82}>
              <Link className="plh-btn plh-btn--light" href="/contact">
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
