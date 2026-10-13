import Navbar from "../../components/navbar";

// Kolom sempit portofolio hanya untuk situs publik.
// Dashboard punya layout sendiri dan tidak ikut grup ini.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-14 sm:py-12">
      {children}
      <Navbar />
    </div>
  );
}
