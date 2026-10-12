// Seed dashboard dari DATA resume + dummy analytics/komentar/inbox.
// Kunjungan memakai PRNG deterministik (mulberry32) agar reset dummy selalu sama.

import { DATA } from "../data/resume";
import type {
  ContactMessage,
  DashboardState,
  ProjectView,
  SiteComment,
  SiteVisit,
} from "./types";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 86_400_000;

export function buildSeed(): DashboardState {
  const rand = mulberry32(20261012);
  let id = 1;
  const now = Date.now();

  const profile: DashboardState["profile"] = {
    id: id++,
    name: DATA.name,
    initials: DATA.initials,
    url: DATA.url,
    location: DATA.location,
    locationLink: DATA.locationLink,
    description: DATA.description,
    summary: DATA.summary,
    avatarUrl: DATA.avatarUrl,
    email: DATA.contact.email,
    tel: DATA.contact.tel,
    updatedAt: new Date(now - 7 * DAY),
  };

  const experiences: DashboardState["experiences"] = DATA.work.map((w, i) => ({
    id: id++,
    company: w.company,
    href: w.href,
    location: w.location,
    title: w.title,
    logoUrl: w.logoUrl,
    start: w.start,
    end: w.end,
    description: w.description.trim(),
    sortOrder: i,
  }));

  const educations: DashboardState["educations"] = DATA.education.map(
    (e, i) => ({
      id: id++,
      school: e.school,
      href: e.href,
      degree: e.degree,
      logoUrl: e.logoUrl,
      start: e.start,
      end: e.end,
      sortOrder: i,
    })
  );

  const skills: DashboardState["skills"] = DATA.skills.map((name, i) => ({
    id: id++,
    name,
    sortOrder: i,
  }));

  const projects: DashboardState["projects"] = DATA.projects.map((p, i) => ({
    id: id++,
    title: p.title,
    description: p.description,
    imageUrl: p.imageUrl,
    url: p.url,
    github: p.github,
    sortOrder: i,
    updatedAt: new Date(now - 7 * DAY),
  }));

  const projectTags: DashboardState["projectTags"] = [];
  DATA.projects.forEach((p, pi) => {
    p.tags.forEach((tag, ti) => {
      projectTags.push({
        id: id++,
        projectId: projects[pi].id,
        tag,
        icon: p.tagsIcon[ti] ?? "",
      });
    });
  });

  // Riwayat 14 hari: campuran kunjungan umum + klik project.
  const visits: SiteVisit[] = [];
  const paths = ["/", "/", "/", "/#projects", "/#projects", "/blog"];
  for (let d = 13; d >= 0; d--) {
    const count = 4 + Math.floor(rand() * 10);
    for (let k = 0; k < count; k++) {
      const path = paths[Math.floor(rand() * paths.length)];
      const projectId =
        path === "/#projects" && rand() > 0.4
          ? projects[Math.floor(rand() * projects.length)].id
          : null;
      visits.push({
        id: id++,
        path,
        projectId,
        createdAt: new Date(
          now - d * DAY - Math.floor(rand() * DAY * 0.6)
        ),
      });
    }
  }
  // Pastikan tiap project punya minimal 2 view.
  projects.forEach((p) => {
    const n = 2 + Math.floor(rand() * 3);
    for (let k = 0; k < n; k++) {
      visits.push({
        id: id++,
        path: "/#projects",
        projectId: p.id,
        createdAt: new Date(now - Math.floor(rand() * 14 * DAY)),
      });
    }
  });
  visits.sort(
    (a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)
  );

  const projectViews: ProjectView[] = projects.map((p) => ({
    id: id++,
    projectId: p.id,
    views: visits.filter((v) => v.projectId === p.id).length,
    updatedAt: new Date(now),
  }));

  const comments: SiteComment[] = [
    {
      id: id++,
      name: "Andini",
      message: "Portofolionya rapi. Saya tertarik dengan arsitektur Smartseum, ditunggu tulisan teknisnya.",
      projectId: projects[0]?.id ?? null,
      status: "approved",
      createdAt: new Date(now - 2 * DAY),
    },
    {
      id: id++,
      name: "Bagas",
      message: "Halo, apakah tersedia untuk proyek freelance bulan depan? Saya kirim detail via email.",
      projectId: null,
      status: "approved",
      createdAt: new Date(now - 5 * DAY),
    },
    {
      id: id++,
      name: "Tamu",
      message: "Cek promo di situs saya, klik tautan ini...",
      projectId: null,
      status: "pending",
      createdAt: new Date(now - 1 * DAY),
    },
  ];

  const messages: ContactMessage[] = [
    {
      id: id++,
      name: "HR Tech",
      email: "hr@techstartup.id",
      message: "Halo, kami sedang mencari Fullstack Developer (Next.js + Postgres). Apakah berkenan diskusi 30 menit minggu ini?",
      read: false,
      createdAt: new Date(now - 1 * DAY),
    },
    {
      id: id++,
      name: "Dimas",
      email: "dimas@mail.com",
      message: "Terima kasih sudah berbagi proyek open source-nya, sangat membantu untuk belajar Drizzle.",
      read: true,
      createdAt: new Date(now - 6 * DAY),
    },
  ];

  return {
    version: 1,
    seq: id,
    profile,
    experiences,
    educations,
    skills,
    projects,
    projectTags,
    visits,
    projectViews,
    comments,
    messages,
  };
}
