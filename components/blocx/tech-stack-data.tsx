import React from "react";

export interface TechStackItem {
  id: string;
  name: string;
  category: string;
  color: string;
  icon: React.ReactNode;
}

export const TECH_STACK_ITEMS: TechStackItem[] = [
  {
    id: "nextjs",
    name: "Next.js 15",
    category: "Fullstack Framework",
    color: "#000000",
    icon: (
      <svg viewBox="0 0 180 180" fill="currentColor" className="size-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M90 180c49.706 0 90-40.294 90-90s-40.294-90-90-90S0 40.294 0 90s40.294 90 90 90zm59.508-22.48L69.142 54H54v71.97h12.114V69.384l73.885 95.461c3.334-2.231 6.51-4.68 9.509-7.325zM115 54h12v72h-12V54z" />
      </svg>
    ),
  },
  {
    id: "react",
    name: "React 19",
    category: "UI Architecture",
    color: "#149ECA",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-full">
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Type Safety",
    color: "#3178C6",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M13.5 10.5v1.8h2.3v6.2h2.2v-6.2h2.3v-1.8H13.5zm-8.8 3.8c.4.6 1 .9 1.7.9.6 0 1-.2 1-.6 0-.4-.4-.5-1.2-.8-1.2-.4-2-.8-2-1.9 0-1.1.9-1.9 2.2-1.9 1 0 1.8.4 2.3 1.1l-1.3 1c-.3-.4-.6-.6-1-.6-.4 0-.7.2-.7.5 0 .4.4.5 1.3.8 1.3.4 1.9.9 1.9 1.9 0 1.2-.9 2-2.3 2-1.2 0-2.1-.5-2.6-1.4l1.3-1z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: "nestjs",
    name: "NestJS",
    category: "Enterprise Backend",
    color: "#E0234E",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full text-[#E0234E]">
        <path d="M12 1.5L2 6.5v11L12 23l10-5.5v-11L12 1.5zm0 2.3l7.8 4.3-3.6 2-4.2-2.3-4.2 2.3-3.6-2L12 3.8zm-7.8 6.5l3.5 1.9v4.5l-3.5-1.9v-4.5zm9.6 6.4l-1.8 1-1.8-1v-4.3l1.8-1 1.8 1v4.3zm6-1.9l-3.5 1.9v-4.5l3.5-1.9v4.5z" />
      </svg>
    ),
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Relational Database",
    color: "#336791",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full text-[#336791]">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.5h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 12.4 12 13 12 14.5h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 .88-.36 1.68-.93 2.25z" />
      </svg>
    ),
  },
  {
    id: "prisma",
    name: "Prisma ORM",
    category: "Type-Safe Client",
    color: "#2D3748",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full text-[#2D3748]">
        <path d="M12.6 1.4a1 1 0 00-1.2 0L2.3 8.2a1 1 0 00-.4.8v11a1 1 0 00.5.8l9.1 4.8a1 1 0 001 0l9.1-4.8a1 1 0 00.5-.8V9a1 1 0 00-.4-.8l-9.1-6.8zM12 3.8l7 5.2-7 5.3-7-5.3 7-5.2zM4 10.4l7 5.3v7.1L4 18.2v-7.8zm9 12.4v-7.1l7-5.3v7.8l-7 4.6z" />
      </svg>
    ),
  },
  {
    id: "hermes",
    name: "Hermes Agent",
    category: "Autonomous AI",
    color: "#10B981",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-full text-emerald-600">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    id: "claudecode",
    name: "Claude Code",
    category: "Agentic CLI",
    color: "#D97706",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full text-amber-600">
        <path clipRule="evenodd" d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z" fillRule="evenodd" />
      </svg>
    ),
  },
  {
    id: "codex",
    name: "OpenAI Codex",
    category: "Model Intelligence",
    color: "#10A37F",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full text-emerald-700">
        <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14.93V14h-2v2.93A8 8 0 014.07 13H7v-2H4.07A8 8 0 0111 4.07V7h2V4.07A8 8 0 0119.93 11H17v2h2.93A8 8 0 0113 16.93z" />
      </svg>
    ),
  },
  {
    id: "docker",
    name: "Docker",
    category: "Containers",
    color: "#2496ED",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full text-[#2496ED]">
        <path d="M13 3h3v3h-3zm-4 0h3v3H9zm-4 4h3v3H5zm4 0h3v3H9zm4 0h3v3h-3zm4 0h3v3h-3zM1 11h3v3H1zm4 0h3v3H5zm4 0h3v3H9zm4 0h3v3h-3zm4 0h3v3h-3zm4 0h3v3h-3zM2.5 15C3 18 5.5 20.5 9 21c7 .5 13-3 13.5-7.5H1.5c.2.5.5 1 1 1.5z" />
      </svg>
    ),
  },
  {
    id: "tailwindcss",
    name: "Tailwind v4",
    category: "Design Tokens",
    color: "#38BDF8",
    icon: (
      <svg viewBox="0 0 24 24" fill="#38BDF8" className="size-full">
        <path d="m12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.176-1.194-2.537-2.576-5.512-2.576zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.176-1.194-2.537-2.576-5.512-2.576z" />
      </svg>
    ),
  },
  {
    id: "redis",
    name: "Redis",
    category: "In-Memory Cache",
    color: "#DC382D",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full text-[#DC382D]">
        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9L4.5 7.2 12 3.5l7.5 3.7L12 11zm-10 2l10 5 10-5v3l-10 5-10-5v-3zm0 5l10 5 10-5v3l-10 5-10-5v-3z" />
      </svg>
    ),
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "V8 Runtime",
    color: "#5FA04E",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full text-[#5FA04E]">
        <path d="M12 2l10 5.8v11.4L12 25 2 19.2V7.8L12 2zm0 2.3L4 8.9v8.2l8 4.6 8-4.6V8.9l-8-4.6z" />
      </svg>
    ),
  },
  {
    id: "router9",
    name: "9Router",
    category: "Local AI Gateway",
    color: "#4F46E5",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="size-full text-indigo-600">
        <rect width="32" height="32" rx="6" fill="currentColor" opacity="0.15" />
        <rect width="32" height="32" rx="6" stroke="currentColor" strokeWidth="2" fill="none" />
        <text x="16" y="24" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="700" fill="currentColor" textAnchor="middle">9</text>
      </svg>
    ),
  },
  {
    id: "antigravity",
    name: "Antigravity",
    category: "Agent Coordination",
    color: "#2563EB",
    icon: (
      <svg viewBox="0 0 16 15" fill="currentColor" className="size-full text-blue-600">
        <path d="M14.0777 13.984C14.945 14.6345 16.2458 14.2008 15.0533 13.0084C11.476 9.53949 12.2349 0 7.79033 0C3.34579 0 4.10461 9.53949 0.527295 13.0084C-0.773543 14.3092 0.635692 14.6345 1.50293 13.984C4.86344 11.7076 4.64663 7.69664 7.79033 7.69664C10.934 7.69664 10.7172 11.7076 14.0777 13.984Z" />
      </svg>
    ),
  },
  {
    id: "opencode",
    name: "OpenCode",
    category: "Agent Telemetry",
    color: "#0F172A",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
        <path d="M18 19H6v-6h12v6zm0-9H6V4h12v6zm3 14H3V1h18v23z" />
      </svg>
    ),
  },
  {
    id: "drizzle",
    name: "Drizzle ORM",
    category: "SQL Architecture",
    color: "#C5F74F",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-full text-lime-600">
        <path d="M4 14l8-8 8 8M7 17l5-5 5 5" />
      </svg>
    ),
  },
  {
    id: "playwright",
    name: "Playwright",
    category: "E2E Testing",
    color: "#2EAD33",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full text-emerald-600">
        <circle cx="9" cy="9" r="6" fillOpacity="0.4" />
        <circle cx="15" cy="15" r="6" fillOpacity="0.8" />
      </svg>
    ),
  },
  {
    id: "jest",
    name: "Vitest & Jest",
    category: "TDD Test Suite",
    color: "#C21325",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-full text-red-600">
        <path d="M12 2L2 19h20L12 2zm0 6v5m0 3v.01" />
      </svg>
    ),
  },
  {
    id: "github",
    name: "GitHub Actions",
    category: "CI/CD Pipeline",
    color: "#181717",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    id: "linux",
    name: "Linux VPS",
    category: "Infrastructure",
    color: "#FCC624",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-full text-zinc-800">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M6 9l4 3-4 3m6 0h4" />
      </svg>
    ),
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "Federated API",
    color: "#E10098",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full text-[#E10098]">
        <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 2.31L5.34 8.15v7.7L12 19.69l6.66-3.84v-7.7L12 4.31z" />
      </svg>
    ),
  },
  {
    id: "websockets",
    name: "WebSockets",
    category: "Realtime Events",
    color: "#0284C7",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-full text-sky-600">
        <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
      </svg>
    ),
  },
  {
    id: "python",
    name: "Python 3",
    category: "AI & Automation",
    color: "#3776AB",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full text-[#3776AB]">
        <path d="M11.9 2c-3.1 0-4.9.4-4.9 1.8v2.3h4.9v.8H5.2C3.1 6.9 2 8.4 2 10.9s1.4 3.9 3.5 3.9h1.4v-1.9c0-1.5 1.3-2.7 2.8-2.7h4.8c1.2 0 2.2-.9 2.2-2.2V4.2c0-1.4-2.1-2.2-4.8-2.2zm-2.4 1.4c.5 0 .9.4.9.9 0 .5-.4.9-.9.9s-.9-.4-.9-.9c0-.5.4-.9.9-.9zM12.1 22c3.1 0 4.9-.4 4.9-1.8v-2.3h-4.9v-.8h6.7c2.1 0 3.2-1.5 3.2-4s-1.4-3.9-3.5-3.9h-1.4v1.9c0 1.5-1.3 2.7-2.8 2.7H9.5c-1.2 0-2.2.9-2.2 2.2v4.8c0 1.4 2.1 2.2 4.8 2.2zm2.4-1.4c-.5 0-.9-.4-.9-.9 0-.5.4-.9.9-.9s.9.4.9.9c0 .5-.4.9-.9.9z" />
      </svg>
    ),
  },
  {
    id: "motion",
    name: "Motion",
    category: "Physics & Animation",
    color: "#8B5CF6",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-full text-purple-600">
        <path d="M12 12l-8 -8v16l16 -16v16l-4 -4" />
        <path d="M20 12l-8 8l-4 -4" />
      </svg>
    ),
  },
  {
    id: "coolify",
    name: "Coolify PaaS",
    category: "Cloud Deployment",
    color: "#6B21A8",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-full text-purple-800">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
  {
    id: "s3storage",
    name: "S3 Storage",
    category: "Object Blobs",
    color: "#E25822",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full text-orange-600">
        <path d="M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zm0 2c4.42 0 8 1.57 8 3s-3.58 3-8 3-8-1.57-8-3 3.58-3 8-3zm0 16c-4.42 0-8-1.57-8-3v-2.3c1.94 1.42 4.84 2.3 8 2.3s6.06-.88 8-2.3V17c0 1.43-3.58 3-8 3zm0-5c-4.42 0-8-1.57-8-3V9.7c1.94 1.42 4.84 2.3 8 2.3s6.06-.88 8-2.3V12c0 1.43-3.58 3-8 3z" />
      </svg>
    ),
  },
  {
    id: "betterauth",
    name: "Better Auth",
    category: "Session Security",
    color: "#059669",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-full text-emerald-600">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "cbm",
    name: "Codebase Memory",
    category: "Knowledge Graph",
    color: "#6366F1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-full text-indigo-500">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  {
    id: "shadcn",
    name: "shadcn/ui",
    category: "Design System",
    color: "#000000",
    icon: (
      <svg viewBox="0 0 256 256" fill="currentColor" className="size-full">
        <path d="M208 128a80 80 0 1 1-80-80 80 80 0 0 1 80 80Z" fill="none" stroke="currentColor" strokeWidth="20" strokeDasharray="16 16" />
        <line x1="48" y1="48" x2="208" y2="208" stroke="currentColor" strokeWidth="20" />
      </svg>
    ),
  },
];
