"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import NowPlaying, { NowPlayingTrack } from "@/components/kokonutui/liquid-glass-card";
import { Disc3, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PLAYLIST: (NowPlayingTrack & { youtubeId: string })[] = [
  {
    title: "In Another Life",
    artist: "The One That Got Away",
    duration: 231, // 3:51
    artwork: 0,
    youtubeId: "oXEyW4rA4Z8",
  },
  {
    title: "Negoro Angin",
    artist: "Denny Caknan",
    duration: 416, // 6:56
    artwork: 1,
    youtubeId: "WZYUSaHlGlk",
  },
  {
    title: "Separuh Aku",
    artist: "NOAH",
    duration: 261, // 4:21
    artwork: 2,
    youtubeId: "b0ZBBjViV8Y",
  },
];

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (id: string) => void;
  cueVideoById: (id: string) => void;
}

interface YTEvent {
  data: number;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        config: {
          height: string;
          width: string;
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onStateChange?: (event: YTEvent) => void;
          };
        }
      ) => YTPlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function FloatingMusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef<YTPlayerInstance | null>(null);
  const isPlayingRef = useRef(false);
  isPlayingRef.current = isPlaying;
  const currentTrackIndexRef = useRef(0);
  currentTrackIndexRef.current = currentTrackIndex;

  const containerId = "youtube-audio-player-container";

  const handleNextTrack = useCallback(() => {
    const nextIdx = (currentTrackIndexRef.current + 1) % PLAYLIST.length;
    setCurrentTrackIndex(nextIdx);
    const track = PLAYLIST[nextIdx];
    if (!track) return;

    const p = playerRef.current;
    if (p) {
      if (isPlayingRef.current) {
        p.loadVideoById(track.youtubeId);
      } else {
        p.cueVideoById(track.youtubeId);
      }
    }
  }, []);

  const initPlayer = useCallback(() => {
    if (!window.YT?.Player || playerRef.current) return;

    playerRef.current = new window.YT.Player(containerId, {
      height: "1",
      width: "1",
      videoId: PLAYLIST[0].youtubeId,
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
      },
      events: {
        onStateChange: (event: YTEvent) => {
          // YT.PlayerState.ENDED === 0
          if (event.data === 0) {
            handleNextTrack();
          }
        },
      },
    });
  }, [handleNextTrack]);

  // Load YouTube IFrame API script once
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.YT?.Player) {
      initPlayer();
      return;
    }

    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prevReady) prevReady();
      initPlayer();
    };

    if (!document.getElementById("yt-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }
  }, [initPlayer]);

  const handlePlayStateChange = (playing: boolean) => {
    setIsPlaying(playing);
    const p = playerRef.current;
    if (!p) return;

    if (playing) {
      p.playVideo();
    } else {
      p.pauseVideo();
    }
  };

  const handleTrackChange = (index: number) => {
    setCurrentTrackIndex(index);
    const track = PLAYLIST[index];
    if (!track) return;

    const p = playerRef.current;
    if (p) {
      if (isPlaying) {
        p.loadVideoById(track.youtubeId);
      } else {
        p.cueVideoById(track.youtubeId);
      }
    }
  };

  return (
    <aside
      aria-label="Floating Music Player"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto"
    >
      {/* Hidden YouTube Iframe Container */}
      <div
        className="pointer-events-none fixed -left-[9999px] -top-[9999px] opacity-0"
        aria-hidden="true"
      >
        <div id={containerId} />
      </div>

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
              autoPlay={false}
              glassEffect={true}
              accent="#10b981"
              className="w-full"
              onPlayStateChange={handlePlayStateChange}
              onTrackChange={handleTrackChange}
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
          className={`size-6 text-emerald-500 transition-transform duration-700 ${
            isPlaying
              ? "animate-spin text-emerald-400"
              : isOpen
              ? "rotate-90 text-emerald-400"
              : "group-hover:rotate-45"
          }`}
          style={isPlaying ? { animationDuration: "3s" } : undefined}
        />
      </Button>
    </aside>
  );
}
