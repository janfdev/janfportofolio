import React from "react";
import { HeaderHero } from "@/components/design-engineer/HeaderHero";
import { SelectedWork } from "@/components/design-engineer/SelectedWork";
import { CertificatesAndAwards } from "@/components/design-engineer/CertificatesAndAwards";
import { ExperienceSection } from "@/components/design-engineer/ExperienceSection";
import { ShippingInPublic } from "@/components/design-engineer/ShippingInPublic";
import { ToolsIUse } from "@/components/design-engineer/ToolsIUse";
import { Footer } from "@/components/design-engineer/Footer";
import { ContactDock } from "@/components/design-engineer/ContactDock";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      {/* Floating Desktop Dock (Contact + Theme Toggle) */}
      <aside
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-subtle)]/90 p-1.5 backdrop-blur-md shadow-[var(--shadow-float)]"
        aria-label="Floating dock"
      >
        <ContactDock placement="dock" align="start" />
        <div className="h-6 w-px bg-[var(--color-border)]" aria-hidden="true" />
        <ModeToggle />
      </aside>

      {/* Main Single-Column Editorial Container max-w-[640px] */}
      <main className="mx-auto max-w-[640px] px-5 sm:px-6">
        <HeaderHero />
        <SelectedWork />
        <CertificatesAndAwards />
        <ExperienceSection />
        <ShippingInPublic />
        <ToolsIUse />
        <Footer />
      </main>
    </div>
  );
}
