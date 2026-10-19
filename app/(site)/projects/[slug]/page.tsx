import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { DATA } from "@/lib/data/resume";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DATA.projects.map((project) => ({
    slug: project.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = DATA.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | " + DATA.name,
    };
  }

  return {
    title: `${project.title} - Case Study & Architecture | ${DATA.name}`,
    description: project.description,
    openGraph: {
      title: `${project.title} | ${DATA.name}`,
      description: project.description,
      images: [{ url: project.imageUrl }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = DATA.projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = DATA.projects[projectIndex];
  const prevProject = projectIndex > 0 ? DATA.projects[projectIndex - 1] : null;
  const nextProject = projectIndex < DATA.projects.length - 1 ? DATA.projects[projectIndex + 1] : null;

  return (
    <main className="min-h-screen pt-28 pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Top Breadcrumb & Back Navigation */}
      <div className="mb-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full border border-border/60 bg-muted/20 hover:bg-muted/50"
        >
          <ArrowLeft className="size-3.5" />
          <span>Kembali ke Galeri Proyek</span>
        </Link>
      </div>

      {/* Project Header */}
      <header className="space-y-4 mb-10">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {project.category}
          </span>
          <span className="text-xs text-muted-foreground font-medium px-2.5 py-1 rounded-md bg-muted/40 border border-border/40">
            Tahun {project.year}
          </span>
          <span className="text-xs text-muted-foreground font-medium px-2.5 py-1 rounded-md bg-muted/40 border border-border/40">
            Peran: {project.role}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-sm"
            >
              <span>Kunjungi Platform Live</span>
              <ArrowUpRight className="size-4" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/80 bg-card font-semibold text-xs sm:text-sm text-foreground hover:bg-muted/50 transition-colors shadow-sm"
            >
              <Github className="size-4" />
              <span>Lihat Kode di GitHub</span>
            </a>
          )}
        </div>
      </header>

      {/* Hero Image Showcase */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/60 bg-muted/30 shadow-md mb-12">
        <Image
          src={project.imageUrl}
          alt={`${project.title} screenshot`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover object-top"
        />
      </div>

      {/* Key Metrics / Engineering Highlights */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
            Metrik & Keunggulan Rekayasa
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm"
              >
                <p className="text-xs text-muted-foreground font-medium mb-1">
                  {metric.label}
                </p>
                <p className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid: Problem Statement & Solution */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Problem Card */}
        <div className="p-6 rounded-2xl border border-border/60 bg-card/40 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <span className="size-2 rounded-full bg-amber-500" />
            Latar Belakang & Masalah
          </div>
          <h3 className="text-lg font-bold text-foreground">
            Tantangan Nyata yang Dihadapi
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* Solution Card */}
        <div className="p-6 rounded-2xl border border-border/60 bg-card/40 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <span className="size-2 rounded-full bg-emerald-500" />
            Pendekatan Solusi
          </div>
          <h3 className="text-lg font-bold text-foreground">
            Strategi Rekayasa Sistem
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.solution}
          </p>
        </div>
      </section>

      {/* Architecture Highlights & System Flow */}
      <section className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/40 space-y-6 mb-12">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Layers className="size-3.5" />
            Arsitektur Sistem
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground">
            Sorotan Implementasi Teknis
          </h3>
          <p className="text-sm text-muted-foreground">
            {project.overview}
          </p>
        </div>

        {/* Architecture Checklist */}
        <div className="space-y-3 pt-2">
          {project.architectureHighlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-sm text-foreground/90 leading-snug">
                {highlight}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Chips */}
      <section className="space-y-4 mb-16">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Tumpukan Teknologi yang Digunakan
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-lg border border-border/60 bg-muted/30 text-xs font-medium text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Previous / Next Project Navigation Bar */}
      <footer className="pt-8 border-t border-border/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex flex-col items-start w-full sm:w-auto p-4 rounded-xl border border-border/40 hover:border-border bg-card/30 hover:bg-card/60 transition-colors"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground">
                <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
                <span>Proyek Sebelumnya</span>
              </span>
              <span className="text-sm font-bold text-foreground mt-0.5">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col items-end w-full sm:w-auto p-4 rounded-xl border border-border/40 hover:border-border bg-card/30 hover:bg-card/60 transition-colors text-right"
            >
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground">
                <span>Proyek Selanjutnya</span>
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-sm font-bold text-foreground mt-0.5">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      </footer>
    </main>
  );
}
