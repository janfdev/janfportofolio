"use client";

import dynamic from "next/dynamic";
import { BLUR_FADE_DELAY } from "../lib/type";
import { BlurFade } from "./ui/blur-fade";
import { Icons } from "./icons";

const DynamicGitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  {
    ssr: false,
    loading: () => (
      <div className="h-36 w-full animate-pulse rounded-lg bg-muted/20" />
    ),
  }
);

// Custom emerald & slate theme matching the modern terminal / telemetry aesthetic
const customTheme = {
  light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

export default function GithubContribution() {
  return (
    <section id="contributions" className="mt-16 w-full max-w-7xl mx-auto">
      <div className="flex flex-col gap-4">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Icons.github className="size-5" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">GitHub Activity</h2>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Continuous open-source contributions and development timeline on{" "}
                <a
                  href="https://github.com/janfdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
                >
                  github.com/janfdev
                </a>
              </p>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 5.5}>
          <div className="overflow-x-auto rounded-xl border border-border/40 bg-card/40 p-4 sm:p-6 backdrop-blur-xs">
            <div className="min-w-[700px] flex justify-center">
              <DynamicGitHubCalendar
                username="janfdev"
                theme={customTheme}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
                blockRadius={3}
                labels={{
                  totalCount: "{{count}} contributions in the last year",
                }}
              />
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

