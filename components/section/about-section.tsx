"use client";

import React from "react";
import { BlurFade } from "../ui/blur-fade";
import { BLUR_FADE_DELAY } from "../../lib/type";
import { DATA } from "../../lib/data/resume";
import Markdown from "react-markdown";
import { motion } from "motion/react";
import { UserCheck } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="scroll-mt-28 mt-20 w-full max-w-4xl mx-auto">
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            <UserCheck className="size-3.5 text-emerald-500" />
            <span>About Me</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Engineering Philosophy & Background
          </h2>
        </div>
      </BlurFade>

      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-6 p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm shadow-xs transition-colors hover:border-emerald-500/40"
        >
          <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-sm sm:text-base">
            <Markdown>{DATA.summary}</Markdown>
          </div>
        </motion.div>
      </BlurFade>
    </section>
  );
};

export default AboutSection;
