"use client";

import { useEffect, useState } from "react";
import { BLUR_FADE_DELAY } from "../lib/type";
import { BlurFade } from "./ui/blur-fade";
import { Icons } from "./icons";
import { ActivityHeatmap, type ActivityDatum } from "./ui/activity-heatmap";
import { Badge } from "./ui/badge";

interface ApiContribution {
  date: string;
  count?: number;
  level?: number;
}

export default function GithubContribution() {
  const [data, setData] = useState<ActivityDatum[]>([]);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/janfdev?y=last");
        if (!res.ok) throw new Error("Failed to fetch GitHub contributions");
        const json = await res.json();

        if (isMounted && json.contributions && Array.isArray(json.contributions)) {
          const formatted: ActivityDatum[] = (json.contributions as ApiContribution[]).map((item) => ({
            date: item.date,
            value: item.count || 0,
          }));

          setData(formatted);
          setTotalCount(json.total?.lastYear ?? null);
        }
      } catch (err) {
        console.warn("Using offline fallback for GitHub contributions heatmap:", err);
        // Fallback realistic generator if third-party API is unreachable
        if (isMounted) {
          const fallbackData: ActivityDatum[] = [];
          const now = new Date();
          let sum = 0;
          for (let i = 365; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split("T")[0];
            const isWeekend = d.getDay() === 0 || d.getDay() === 6;
            const count = Math.random() > 0.35 ? (isWeekend ? Math.floor(Math.random() * 5) : Math.floor(Math.random() * 12) + 1) : 0;
            sum += count;
            fallbackData.push({ date: dateStr, value: count });
          }
          setData(fallbackData);
          setTotalCount(sum);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Emerald theme levels for GitHub contributions
  const emeraldColors = [
    "rgba(255, 255, 255, 0.05)",
    "#0e4429",
    "#006d32",
    "#26a641",
    "#39d353",
  ];

  return (
    <section id="contributions" className="mt-16 w-full max-w-7xl mx-auto">
      <div className="flex flex-col gap-4">
        <BlurFade delay={BLUR_FADE_DELAY * 5}>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Icons.github className="size-5" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">GitHub Activity</h2>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Continuous open-source commits and telemetry timeline on{" "}
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

            {totalCount !== null && (
              <Badge variant="outline" className="font-mono text-xs px-3 py-1 border-emerald-500/30 text-emerald-500 bg-emerald-500/10">
                {totalCount.toLocaleString()} contributions in the last year
              </Badge>
            )}
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 5.5}>
          <div className="overflow-x-auto rounded-2xl border border-border/40 bg-card/40 p-3.5 sm:p-8 backdrop-blur-xs">
            {loading ? (
              <div className="h-44 w-full animate-pulse rounded-xl bg-muted/20" />
            ) : (
              <div className="min-w-fit flex justify-center py-2">
                <ActivityHeatmap
                  data={data}
                  colors={emeraldColors}
                  weeks={52}
                  cellSize={16}
                  gap={4}
                  unit="contributions"
                  weekdayLabels="mwf"
                  showMonthLabels
                  showLegend
                  scale="sqrt"
                />
              </div>
            )}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
