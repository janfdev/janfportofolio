import Navbar from "../../components/navbar";

// Kolom sempit portofolio hanya untuk situs publik.
// Dashboard punya layout sendiri dan tidak ikut grup ini.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full min-h-screen">
      {children}
      <Navbar />
    </div>
  );
}
