"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Disc3,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DynamicIslandTrack {
  title: string;
  artist: string;
  duration: number;
  youtubeId: string;
}

interface DynamicIslandPlayerProps {
  tracks: DynamicIslandTrack[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onPlayStateChange: (playing: boolean) => void;
  onTrackChange: (index: number) => void;
  className?: string;
}

export function DynamicIslandPlayer({
  tracks,
  currentTrackIndex,
  isPlaying,
  onPlayStateChange,
  onTrackChange,
  className,
}: DynamicIslandPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Handle click outside to collapse
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    }

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isExpanded]);

  // Hover triggers for devices with pointer / desktop simulation
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 400); // 400ms debounce
  };

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlayStateChange(!isPlaying);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    onTrackChange(prev);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = (currentTrackIndex + 1) % tracks.length;
    onTrackChange(next);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "fixed top-3 left-1/2 -translate-x-1/2 z-50 flex justify-center pointer-events-auto",
        className
      )}
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 32,
          mass: 0.8,
        }}
        onClick={() => {
          if (!isExpanded) setIsExpanded(true);
        }}
        className={cn(
          "relative overflow-hidden cursor-pointer select-none",
          "bg-zinc-950/95 dark:bg-zinc-950/95 text-white",
          "border border-white/10 dark:border-zinc-800",
          "backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.55)]",
          isExpanded
            ? "w-[min(92vw,360px)] rounded-[28px] p-4.5"
            : "w-[220px] sm:w-[240px] h-[40px] rounded-full px-3 flex items-center justify-between"
        )}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* ================= COMPACT ISLAND (PILL) ================= */
            <motion.div
              key="compact-pill"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-between w-full h-full gap-2"
            >
              {/* Left: Mini Spinning Vinyl / Equalizer */}
              <div className="flex items-center gap-2 shrink-0">
                <Disc3
                  className={cn(
                    "size-4.5 text-emerald-400 transition-transform duration-700",
                    isPlaying ? "animate-spin text-emerald-400" : "opacity-80"
                  )}
                  style={isPlaying ? { animationDuration: "3s" } : undefined}
                />
                {/* 3-bar Audio Visualizer Wave */}
                <div className="flex items-end gap-[2px] h-3">
                  <span
                    className={cn(
                      "w-[2px] bg-emerald-400 rounded-full transition-all duration-300",
                      isPlaying ? "h-3 animate-pulse" : "h-1 opacity-50"
                    )}
                  />
                  <span
                    className={cn(
                      "w-[2px] bg-emerald-400 rounded-full transition-all duration-300 delay-75",
                      isPlaying ? "h-2 animate-pulse" : "h-1.5 opacity-50"
                    )}
                  />
                  <span
                    className={cn(
                      "w-[2px] bg-emerald-400 rounded-full transition-all duration-300 delay-150",
                      isPlaying ? "h-3.5 animate-pulse" : "h-1 opacity-50"
                    )}
                  />
                </div>
              </div>

              {/* Center: Track Title */}
              <div className="flex-1 min-w-0 text-center px-1">
                <p className="text-[11px] font-medium text-zinc-200 truncate">
                  {currentTrack.title}
                </p>
              </div>

              {/* Right: Quick Play/Pause Button */}
              <button
                type="button"
                onClick={handleTogglePlay}
                className="shrink-0 p-1 rounded-full bg-white/10 hover:bg-white/20 text-emerald-400 active:scale-90 transition-transform"
                aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
              >
                {isPlaying ? (
                  <Pause className="size-3 fill-emerald-400" />
                ) : (
                  <Play className="size-3 fill-emerald-400 ml-0.5" />
                )}
              </button>
            </motion.div>
          ) : (
            /* ================= EXPANDED ISLAND (CARD) ================= */
            <motion.div
              key="expanded-island"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-3.5 w-full"
            >
              {/* Header: Track Info & Minimize Button */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0 size-11 rounded-full bg-zinc-900 border border-emerald-500/30 flex items-center justify-center overflow-hidden shadow-inner">
                    <Disc3
                      className={cn(
                        "size-7 text-emerald-400 transition-transform duration-700",
                        isPlaying ? "animate-spin" : "opacity-70"
                      )}
                      style={
                        isPlaying ? { animationDuration: "3s" } : undefined
                      }
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-100 truncate">
                      {currentTrack.title}
                    </p>
                    <p className="text-xs text-zinc-400 truncate">
                      {currentTrack.artist}
                    </p>
                  </div>
                </div>

                {/* Minimize Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Tutup island"
                >
                  <ChevronUp className="size-4" />
                </button>
              </div>

              {/* Visualizer Simulation Bars */}
              <div className="flex items-center justify-between gap-1 h-4 px-1 bg-white/5 rounded-lg py-1">
                {[40, 70, 30, 90, 60, 100, 45, 80, 50, 65, 85, 35].map(
                  (val, idx) => (
                    <span
                      key={idx}
                      className={cn(
                        "w-1.5 rounded-full bg-emerald-400/80 transition-all duration-300",
                        isPlaying ? "animate-pulse" : "h-1 opacity-40"
                      )}
                      style={{
                        height: isPlaying ? `${val}%` : "3px",
                        animationDelay: `${idx * 80}ms`,
                      }}
                    />
                  )
                )}
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center gap-5 pt-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                  aria-label="Lagu sebelumnya"
                >
                  <SkipBack className="size-5 fill-current" />
                </button>

                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="size-11 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center justify-center shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
                  aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
                >
                  {isPlaying ? (
                    <Pause className="size-5 fill-current" />
                  ) : (
                    <Play className="size-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                  aria-label="Lagu berikutnya"
                >
                  <SkipForward className="size-5 fill-current" />
                </button>
              </div>

              {/* Playlist Quick Switcher */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-white/10">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 px-1">
                  Pilih Lagu ({tracks.length})
                </span>
                <div className="flex flex-col gap-1">
                  {tracks.map((track, idx) => {
                    const isSelected = idx === currentTrackIndex;
                    return (
                      <button
                        key={track.youtubeId}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTrackChange(idx);
                        }}
                        className={cn(
                          "flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-xs transition-colors",
                          isSelected
                            ? "bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30"
                            : "hover:bg-white/5 text-zinc-300 hover:text-white"
                        )}
                      >
                        <span className="truncate">{track.title}</span>
                        {isSelected && isPlaying && (
                          <span className="shrink-0 text-[10px] text-emerald-400">
                            Memutar
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
