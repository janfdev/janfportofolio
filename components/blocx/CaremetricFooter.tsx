"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { Geist } from "next/font/google";
import { LogoZ2 } from "@/components/brand/logo";
import "./caremetric-footer.css";

/**
 * janfdev Animated Footer: a tactile green panel with a giant bleeding wordmark.
 *
 * A rounded panel rises into place, tinted by a gradient texture under a hue
 * wash; the brand signature and four columns of portfolio links fade in on a stagger,
 * and the giant janfdev mark pops in and bleeds off the bottom edge.
 */

const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--cmf-geist", display: "swap" });
const TEXTURE = "/blocx/caremetric-footer/texture.webp";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Navigation",
    links: [
      { label: "Home", href: "/" },
      { label: "Selected Work", href: "/work" },
      { label: "About & Engineering", href: "/about" },
      { label: "Get in Touch", href: "/contact" },
    ],
  },
  {
    title: "Case Studies",
    links: [
      { label: "Smartseum Platform", href: "/projects/smartseum" },
      { label: "Quavity Engine", href: "/projects/quavity" },
      { label: "API Public Gateway", href: "/projects/api-public" },
      { label: "All Showcase Works", href: "/work" },
    ],
  },
  {
    title: "Engineering",
    links: [
      { label: "Autonomous AI Agents", href: "/about" },
      { label: "Systems Architecture", href: "/about" },
      { label: "Telemetry & Logs", href: "/" },
      { label: "Minimalist Craft", href: "/about" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub (@janfdev)", href: "https://github.com/janfdev", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/fauzan-rizqi-noor-6a7576239/", external: true },
      { label: "Email Janf", href: "mailto:fauzanrizqinoor@gmail.com", external: true },
      { label: "Direct Message", href: "/contact" },
    ],
  },
];

const fade: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT, delay },
  }),
};

export default function CaremetricFooter() {
  return (
    <div className={`cmf-page ${geist.variable}`}>
      <footer className="cmf" aria-label="janfdev footer">
        {/* the rounded panel rises into place */}
        <motion.div
          className="cmf__panel"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="cmf__texture" src={TEXTURE} alt="" draggable={false} />
          <span className="cmf__hue" aria-hidden />
        </motion.div>

        <div className="cmf__stage">
          <motion.div
            className="cmf__brand"
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0.35}
          >
            <Link href="/" aria-label="Home" className="group inline-flex items-center select-none">
              <div className="relative flex items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-xs p-3.5 border border-black/10 shrink-0 group-hover:scale-105 transition-transform dark:border-white/10">
                <LogoZ2 size={32} className="text-zinc-100" />
                <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950" />
              </div>
            </Link>
          </motion.div>

          <nav className="cmf__cols" aria-label="Footer links">
            {COLUMNS.map((col, ci) => (
              <div key={col.title} className="cm__col">
                <motion.h2
                  className="cmf__heading"
                  variants={fade}
                  initial="hidden"
                  animate="show"
                  custom={0.45 + ci * 0.08}
                >
                  {col.title}
                </motion.h2>
                <ul className="cmf__list">
                  {col.links.map((l, li) => (
                    <motion.li
                      key={l.label}
                      variants={fade}
                      initial="hidden"
                      animate="show"
                      custom={0.52 + ci * 0.08 + li * 0.045}
                    >
                      {l.external ? (
                        <a
                          className="cmf__link"
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link className="cmf__link" href={l.href}>
                          {l.label}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <motion.div
            className="cmf__copy flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            variants={fade}
            initial="hidden"
            animate="show"
            custom={0.95}
          >
            <p>© 2026 Rizqi Noor Fauzan (janfdev). All rights reserved.</p>
            <p className="text-[var(--ink-60)] text-xs font-mono">
              Designed with craft. Systems & Agent Architecture.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export { CaremetricFooter as Footer2 };
