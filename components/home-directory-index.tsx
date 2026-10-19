"use client";

import React from "react";
import Link from "next/link";
import { FolderGit2, User, Mail, ArrowUpRight, Code2 } from "lucide-react";
import { motion } from "motion/react";

interface DirectoryItem {
  number: string;
  category: string;
  title: string;
  description: string;
  href: string;
  actionText: string;
  tags: string[];
  icon: React.ElementType;
}

const DIRECTORY_ITEMS: DirectoryItem[] = [
  {
    number: "01",
    category: "Projects & Systems",
    title: "Production Applications & Case Studies",
    description:
      "Explore 6 end-to-end web applications, distributed backends, 3D interactive platforms, and autonomous agent systems with source code and live deployments.",
    href: "/work",
    actionText: "Explore Projects Archive",
    tags: ["Smartseum", "Quavity", "API Public", "Nota-Wota"],
    icon: FolderGit2,
  },
  {
    number: "02",
    category: "Trajectory & Principles",
    title: "Engineering Biography & Career Timeline",
    description:
      "Review the professional journey across Library UMC, UIN Siber, and Digital Hero, along with academic foundations and core engineering principles.",
    href: "/about",
    actionText: "Read Biography & Timeline",
    tags: ["Library UMC", "UIN Siber", "Fullstack", "Ponytail Rules"],
    icon: User,
  },
  {
    number: "03",
    category: "Direct Channels",
    title: "Inquiries & Collaboration Desk",
    description:
      "Open direct communications for fullstack engineering roles, systems architecture consulting, or technical collaboration with quick response times.",
    href: "/contact",
    actionText: "Open Contact Desk",
    tags: ["Available for Hire", "< 24h Response", "Verified Channels"],
    icon: Mail,
  },
];

export function HomeDirectoryIndex() {
  return (
    <section className="mt-20 mb-20 w-full">
      {/* Section Header */}
      <div className="space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 uppercase tracking-widest">
          <Code2 className="size-3.5" />
          <span>Directory & Navigation</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Studio Index
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 max-w-xl leading-relaxed">
              Dedicated spaces covering software systems, professional trajectory, and direct communication channels.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Large Route Gateway Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DIRECTORY_ITEMS.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full ${idx === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <Link
                href={item.href}
                className="group relative flex flex-col justify-between h-full p-7 sm:p-8 rounded-3xl border border-border/70 bg-card/60 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Subtle Hover Gradient Accent */}
                <div className="pointer-events-none absolute -right-20 -top-20 size-48 rounded-full bg-emerald-500/5 group-hover:bg-emerald-500/15 blur-2xl transition-all duration-500" />

                <div className="space-y-6">
                  {/* Top Row: Index Number & Icon */}
                  <div className="flex items-center justify-between border-b border-border/40 pb-5">
                    <span className="font-mono text-2xl font-black text-foreground/40 group-hover:text-emerald-600 transition-colors">
                      {item.number}
                    </span>

                    <div className="size-11 rounded-2xl bg-muted/60 text-foreground group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-xs">
                      <IconComponent className="size-5" />
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="space-y-2.5">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {item.category}
                    </p>
                    <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-emerald-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Tag Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-muted/50 text-foreground border border-border/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-8 border-t border-border/40 flex items-center justify-between mt-8">
                  <span className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-emerald-600 transition-colors">
                    {item.actionText}
                  </span>
                  <div className="size-8 rounded-full border border-border/80 flex items-center justify-center text-muted-foreground group-hover:border-emerald-500 group-hover:text-emerald-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                    <ArrowUpRight className="size-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
