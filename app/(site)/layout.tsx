import { FloatingMusicPlayer } from "@/components/floating-music-player";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Preloader } from "@/components/design-engineer/Preloader";

// Layout situs publik: single-column editorial dengan preloader, smooth scroll, dan background audio player
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="relative w-full min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
        <Preloader />
        {children}
        <FloatingMusicPlayer />
      </div>
    </SmoothScroll>
  );
}
