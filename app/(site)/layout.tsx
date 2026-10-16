import Navbar from "../../components/navbar";

// Kolom sempit portofolio hanya untuk situs publik.
// Dashboard punya layout sendiri dan tidak ikut grup ini.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {children}
      <Navbar />
    </div>
  );
}
