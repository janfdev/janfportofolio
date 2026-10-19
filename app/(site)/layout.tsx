import Navbar from "../../components/navbar";
import { Header11 } from "../../components/header11";
import { FloatingMusicPlayer } from "../../components/floating-music-player";
import { SmoothScroll } from "../../components/smooth-scroll";

// Kolom sempit portofolio hanya untuk situs publik.
// Dashboard punya layout sendiri dan tidak ikut grup ini.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="relative w-full min-h-screen">
        <Header11 />
        {children}
        <Navbar />
        <FloatingMusicPlayer />
      </div>
    </SmoothScroll>
  );
}
