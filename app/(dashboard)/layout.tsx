"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  Mail,
  MessageSquare,
  UserRound,
  Wrench,
} from "lucide-react";
import { ModeToggle } from "../../components/mode-toggle";
import { cn } from "../../lib/utils";
import { DashboardProvider } from "../../lib/dashboard/store";

const NAV = [
  { href: "/dashboard", label: "Ringkasan", icon: LayoutDashboard },
  { href: "/dashboard/profil", label: "Profil", icon: UserRound },
  { href: "/dashboard/projects", label: "Projects", icon: FolderGit2 },
  { href: "/dashboard/experience", label: "Experience", icon: Briefcase },
  { href: "/dashboard/education", label: "Education", icon: GraduationCap },
  { href: "/dashboard/skills", label: "Skills", icon: Wrench },
  { href: "/dashboard/kontak", label: "Kontak", icon: Mail },
  { href: "/dashboard/kunjungan", label: "Kunjungan", icon: BarChart3 },
  { href: "/dashboard/komentar", label: "Komentar", icon: MessageSquare },
  { href: "/dashboard/pesan", label: "Pesan", icon: Inbox },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <DashboardProvider>
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col gap-1 overflow-y-auto border-r bg-muted/30 p-4 md:flex">
          <p className="px-2 text-sm font-bold">Panel Admin</p>
          <p className="mb-3 px-2 text-xs text-muted-foreground">
            Kelola isi portofolio
          </p>
          {NAV.map((n) => {
            const active =
              n.href === "/dashboard"
                ? pathname === n.href
                : pathname?.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                  active && "bg-accent font-medium text-accent-foreground"
                )}
              >
                <n.icon className="size-4 shrink-0" />
                {n.label}
              </Link>
            );
          })}
          <Link
            href="/"
            className="mt-auto flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="size-4 shrink-0" />
            Kembali ke situs
          </Link>
        </aside>
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background/90 px-4 py-2.5 backdrop-blur md:px-6">
            <p className="text-sm font-semibold md:hidden">Panel Admin</p>
            <div className="ml-auto flex items-center gap-1">
              <Link
                href="/"
                className="mr-1 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-accent md:hidden"
              >
                Situs
              </Link>
              <ModeToggle />
            </div>
          </header>
          <nav className="flex gap-1 overflow-x-auto border-b p-2 md:hidden">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "shrink-0 rounded-md px-2.5 py-1.5 text-xs hover:bg-accent",
                  (n.href === "/dashboard"
                    ? pathname === n.href
                    : pathname?.startsWith(n.href)) && "bg-accent font-medium"
                )}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <main className="mx-auto w-full max-w-5xl p-4 md:p-6">{children}</main>
        </div>
      </div>
    </DashboardProvider>
  );
}
