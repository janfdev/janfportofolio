"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface PixelBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  gridSize?: number;
  pixelColor?: string;
  animationSpeed?: number;
  variance?: number;
}

export function PixelBackground({
  gridSize = 28,
  pixelColor = "rgba(120, 120, 120, 0.15)",
  animationSpeed = 1,
  variance = 0.6,
  className,
  children,
  ...props
}: PixelBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          // Simple procedural wave for noise shimmer
          const noise = Math.sin(i * 0.2 + time) * Math.cos(j * 0.2 + time);
          const alpha = Math.max(0.02, Math.min(0.25, 0.08 + noise * variance * 0.1));

          ctx.fillStyle = pixelColor.replace(/[\d\.]+\)$/g, `${alpha})`);
          ctx.fillRect(x + 1, y + 1, gridSize - 2, gridSize - 2);
        }
      }

      time += 0.02 * animationSpeed;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [gridSize, pixelColor, animationSpeed, variance]);

  return (
    <div className={cn("relative overflow-hidden w-full", className)} {...props}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60 dark:opacity-40"
      />
      {children}
    </div>
  );
}
