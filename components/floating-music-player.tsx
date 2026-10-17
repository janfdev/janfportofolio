"use client";

import React, { useState } from "react";
import NowPlaying from "@/components/kokonutui/liquid-glass-card";
import { Disc3, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLAYLIST = [
  {
    title: "Midnight Coding",
    artist: "Lo-Fi Beats",
    duration: 184,
    artwork: 0,
  },
  {
    title: "Deep Focus Flow",
    artist: "Synth Ambient",
    duration: 215,
    artwork: 1,
  },
  {
    title: "Clean Architecture",
    artist: "Chillhop Session",
    duration: 198,
    artwork: 2,
  },
];

export function FloatingMusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      aria-label="Floating Music Player"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto"
    >
      {/* Popover Music Card */}
      {isOpen && (
        <div className="mb-3 w-[320px] sm:w-[350px] transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 shadow-2xl rounded-2xl overflow-hidden border border-border/40 backdrop-blur-md">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 z-30 p-1.5 rounded-full bg-black/30 text-white/80 hover:text-white hover:bg-black/50 transition-colors"
              aria-label="Close music card"
            >
              <X className="size-4" />
            </button>
            <NowPlaying
              tracks={PLAYLIST}
              glassEffect={true}
              accent="#6366f1"
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="size-12 rounded-full border border-border/60 bg-background/80 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-foreground cursor-pointer group"
        aria-label={isOpen ? "Tutup pemutar musik" : "Buka pemutar musik"}
      >
        <Disc3
          className={`size-6 text-indigo-500 transition-transform duration-700 ${
            isOpen ? "rotate-90 text-indigo-400" : "group-hover:rotate-45"
          }`}
        />
      </Button>
    </aside>
  );
}
