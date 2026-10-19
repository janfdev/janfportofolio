"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { Geist } from "next/font/google";
import { ICON_PATHS, WORDMARK_PATH } from "./caremetric-mark";
import "./caremetric-footer.css";

/**
 * CareMetric Footer: a soft green panel with a giant mark.
 *
 * A rounded panel rises into place, tinted by a gradient texture under a hue
 * wash; the logo and four columns of links fade in on a stagger, and the
 * CareMetric mark (three blobs and the wordmark, set huge) pops in and bleeds
 * off the bottom edge. Figma's coordinates hold on desktop; below 1200px it
 * becomes a flowing layout, and on a phone the links fold to two columns.
 */

const geist = Geist({ subsets: ["latin"], weight: "500", variable: "--cmf-geist", display: "swap" });
const LOGO = "/blocx/caremetric-footer/logo.svg";
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
      { label: "About Me", href: "/about" },
      { label: "Get in Touch", href: "/contact" },
    ],
  },
  {
    title: "Case Studies",
    links: [
      { label: "Smartseum", href: "/projects/smartseum" },
      { label: "Quavity Engine", href: "/projects/quavity" },
      { label: "API Public", href: "/projects/api-public" },
      { label: "View All Projects", href: "/work" },
    ],
  },
  {
    title: "Engineering",
    links: [
      { label: "System Architecture", href: "/about" },
      { label: "Autonomous AI Agents", href: "/about" },
      { label: "Database Integrity", href: "/about" },
      { label: "Clean Code", href: "/about" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/janfdev", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/fauzan-rizqi-noor-6a7576239/", external: true },
      { label: "Official Email", href: "mailto:fauzanrizqinoor@gmail.com", external: true },
      { label: "Contact Form", href: "/contact" },
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
      <footer className="cmf" aria-label="CareMetric">
        {/* the rounded panel rises into place */}
        <motion.div
          className="cmf__panel"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
        >
          {/* Figma's background: #f1f2ef, the gradient texture at 59%, then a hue wash that turns it green */}
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
            <Link href="/" aria-label="Home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO} alt="CareMetric" width={204} height={50} draggable={false} />
            </Link>
          </motion.div>

          <nav className="cmf__cols" aria-label="Footer">
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

          <motion.p className="cmf__copy" variants={fade} initial="hidden" animate="show" custom={0.95}>
            © 2026 Rizqi Noor Fauzan (Janf). All rights reserved.
          </motion.p>

          {/* giant mark bleeding off the bottom edge: blobs pop in, the wordmark rises */}
          <svg className="cmf__mark" viewBox="0 0 1440 354" aria-hidden>
            {ICON_PATHS.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                className="cmf__mark-shape"
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.7 + i * 0.12 }}
              />
            ))}
            <motion.path
              d={WORDMARK_PATH}
              className="cmf__mark-shape"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.6, ease: EASE_OUT, delay: 0.9 }}
            />
          </svg>
        </div>
      </footer>
    </div>
  );
}

export { CaremetricFooter as Footer2 };
