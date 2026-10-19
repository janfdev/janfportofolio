import { Icons } from "../../components/icons";
import { HomeIcon, Code, Mail } from "lucide-react";

export type ProjectCategory = "All" | "Fullstack" | "Backend & API" | "AI & Systems";

export const DATA = {
  name: "Rizqi Noor Fauzan",
  initials: "RF",
  url: "https://rizqinoorfauzan.my.id",
  location: "Losari, Indonesia",
  locationLink:
    "https://www.google.com/maps/place/Losari,+Brebes+Regency,+Central+Java/@-6.885098,109.086626,12z/data=!3m1!4b1!4m6!3m5!1s0x2e6f7c8d9f8a0b5b:0x2c7d9f8a0b5b9f8a!8m2!3d-6.885098!4d109.086626!16zL20vMDJwNnVq",
  description: "Fullstack Developer",
  summary: `I’m a **Full-Stack Developer** with a strong foundation in **frontend development** and growing expertise in **backend and system design**.

I build **end-to-end web applications**, from crafting responsive user interfaces to developing scalable APIs and handling **database design & migration**.

Currently, I’m exploring **deployment** and **containerization** to strengthen my ability to build production-ready applications.`,
  avatarUrl: "/profiless.png",
  skills: [],
  navbar: [
    {
      href: "/",
      icon: HomeIcon,
      label: "Home"
    },
    // {
    //   href: "/blog",
    //   icon: BookText,
    //   label: "Blog",
    // },
    {
      href: "/#projects",
      icon: Code,
      label: "Projects"
    },
    {
      href: "/contact",
      icon: Mail,
      label: "Contact"
    }
  ],
  contact: {
    email: "rizqinoorfauzan503@gmail.com",
    tel: "+6282115974856",
    social: {
      GitHub: {
        name: "Github",
        url: "https://github.com/janfdev",
        icon: Icons.github,
        navbar: true
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/rizqinoorfauzan",
        icon: Icons.linkedin,
        navbar: true
      },
      Email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false
      }
    }
  },

  work: [
    {
      company: "Library UMC",
      href: "https://umc.ac.id/",
      badges: [],
      location: "On-site",
      title: "Fullstack Developer",
      logoUrl: "/logo_umc.png",
      start: "Jan 2025",
      end: "Present",
      description: `
Developed a full-stack web-based library system to support daily operational processes such as data management and transaction workflows. Built and integrated RESTful APIs to ensure efficient and consistent data handling across the system.

Designed and implemented responsive user interfaces while maintaining seamless integration between frontend and backend. Applied data validation and feature testing to minimize errors and ensure system reliability in real-world usage.

Focused on building a modular and maintainable codebase to support scalability and future feature development.
`
    },
    {
      company: "UIN Siber Syekh Nurjati Cirebon",
      href: "https://uinssc.ac.id/",
      badges: [],
      location: "Remote",
      title: "Frontend Developer",
      logoUrl: "/logo_uin.jpg",
      start: "Desc 2025",
      end: "Marc 2026",
      description: `
Developed and maintained a web application as a Frontend Developer, focusing on building responsive, reusable, and user-friendly interfaces using modern frontend technologies. Designed UI components based on UX principles and ensured consistency across the application.
Implemented REST API integration to handle dynamic data rendering and user interactions. Conducted UI testing and validation to identify missing states, edge cases, and usability issues, while improving overall user experience. Actively refined UI components for better performance, maintainability, and scalability.

`
    },
    {
      company: "Digital Hero",
      href: "https://digitalhero.id",
      badges: [],
      location: "Remote",
      title: "Web Developer | Intern | Remote",
      logoUrl: "/Logo.png",
      start: "Sept 2025",
      end: "Desc 2025",
      description:
        "Developed a company profile website using React.js and Tailwind CSS, focusing on responsive and user-friendly UI/UX aligned with brand guidelines. Collaborated with a development team to improve website performance and code efficiency, while contributing to planning, implementation, and product launch preparation. Also implemented AI-based features using APIs, including game prompting and speech-to-text, as part of ongoing company projects."
    }
  ],
  education: [
    {
      school: "Universitas Muhammadiyah Cirebon",
      href: "https://umc.ac.id",
      degree: "Bachelor of Informatics Engineering",
      logoUrl: "/umc.png",
      start: "2023",
      end: "Present"
    }
  ],

  projects: [
    {
      title: "Smartseum",
      slug: "smartseum",
      description: "Interactive 3D Museum & Heritage Exploration Platform with Real-time AI Assistant",
      category: "Fullstack" as const,
      role: "Lead Fullstack & AI Engineer",
      year: "2024",
      problem: "Museum visitors and students struggle to engage with static artifacts without interactive historical context or personalized guides.",
      solution: "Engineered an immersive web platform combining 3D interactive exhibit viewers, QR code point-of-interest scanning, and Google Gemini AI conversational retrieval.",
      architectureHighlights: [
        "Role-based multi-tenant architecture for Curators, Educators, and Public Visitors",
        "Better-Auth session management with Drizzle ORM on Neon Serverless Postgres",
        "AI conversational layer powered by Google Gemini and Groq LPU with sub-400ms context streaming",
        "Cloudinary dynamic image transformation for high-resolution artifact galleries"
      ],
      metrics: [
        { label: "AI Latency", value: "< 400ms" },
        { label: "Exhibit Assets", value: "3D + WebP" },
        { label: "Auth Flow", value: "OAuth & Session" }
      ],
      overview: "Smartseum bridges physical museum curation with modern digital experiences. Visitors explore museum galleries through interactive 3D models and consult an AI conversational companion capable of explaining historical provenance and cultural significance in real time.",
      tags: ["Next.js", "React 19", "Drizzle ORM", "Neon Postgres", "Better-Auth", "Gemini AI"],
      tagsIcon: [
        "/assets/icon/nextjs.svg",
        "/assets/icon/better-auth.svg",
        "/assets/icon/drizzle-orm.svg",
        "/assets/icon/cloudinary.svg",
        "/assets/icon/gemini.svg",
        "/assets/icon/groq.svg",
        "/assets/icon/neon.svg",
        "/assets/icon/shadcn-ui.svg"
      ],
      imageUrl: "/smartseum.png",
      url: "https://smartseum.vercel.app/",
      github: "https://github.com/janfdev/smartseum"
    },
    {
      title: "Quavity",
      slug: "quavity",
      description: "AI-Augmented Collaborative Project Management Platform",
      category: "Fullstack" as const,
      role: "Fullstack Architect",
      year: "2024",
      problem: "Cross-functional engineering teams suffer from fragmented project planning, repetitive task breakdown, and manual sprint backlog grooming.",
      solution: "Designed a high-velocity project management platform with automated sprint planning, AI ticket decomposition, and real-time kanban workflow execution.",
      architectureHighlights: [
        "Next.js App Router with React 19 Server Components and optimistic UI mutations",
        "Drizzle ORM schema migrations over Neon PostgreSQL with transactional rollbacks",
        "Automated task synthesis and sub-task estimation powered by Google Gemini 1.5",
        "Modular UI system built on shadcn/ui and Tailwind CSS with light and dark mode parity"
      ],
      metrics: [
        { label: "Task Breakdown", value: "Instant AI" },
        { label: "Database", value: "Neon Serverless" },
        { label: "UI Response", value: "Optimistic" }
      ],
      overview: "Quavity simplifies team project workflows from ideation to delivery. It combines intuitive task boards with AI-driven task estimation and sprint summary generation.",
      tags: ["Next.js", "Drizzle ORM", "Neon Postgres", "Better-Auth", "Gemini AI", "Tailwind"],
      tagsIcon: [
        "/assets/icon/nextjs.svg",
        "/assets/icon/better-auth.svg",
        "/assets/icon/drizzle-orm.svg",
        "/assets/icon/cloudinary.svg",
        "/assets/icon/gemini.svg",
        "/assets/icon/neon.svg",
        "/assets/icon/shadcn-ui.svg"
      ],
      imageUrl: "/quavity.png",
      url: "https://quavity.vercel.app/",
      github: "https://github.com/janfdev/quavity"
    },
    {
      title: "API PUBLIC",
      slug: "api-public",
      description: "High-Throughput Open REST API Gateway & Developer Testing Sandbox",
      category: "Backend & API" as const,
      role: "Backend Engineer",
      year: "2024",
      problem: "Frontend and mobile developers frequently need reliable, documented, and CORS-friendly mock endpoints for testing auth, pagination, and file payloads without spinning up complex local backends.",
      solution: "Engineered a hardened Express.js and Node.js REST API gateway with auto-generated OpenAPI/Swagger documentation, rate limiting, and Supabase PostgreSQL persistence.",
      architectureHighlights: [
        "Express.js backend with Prisma ORM and strict TypeScript domain DTO validation",
        "Comprehensive OpenAPI (Swagger) interactive documentation at /docs",
        "Token bucket rate limiting, CORS configuration, and security headers via Helmet",
        "Supabase PostgreSQL database with automated seed data matrices"
      ],
      metrics: [
        { label: "Documentation", value: "100% Swagger" },
        { label: "Throughput", value: "Low Latency" },
        { label: "Persistence", value: "Supabase PG" }
      ],
      overview: "API Public provides a robust sandbox environment for developers building modern client applications, featuring complete endpoints for authentication, resource CRUD, file simulation, and paginated datasets.",
      tags: ["Express.js", "Node.js", "Prisma ORM", "PostgreSQL", "Swagger"],
      tagsIcon: [
        "/assets/icon/expressjs_dark.svg",
        "/assets/icon/nodejs.svg",
        "/assets/icon/prisma_dark.svg",
        "/assets/icon/supabase.svg"
      ],
      imageUrl: "/api-ojan.png",
      url: "https://api.rizqinoorfauzan.my.id/docs",
      github: "https://github.com/janfdev/api-ojan"
    },
    {
      title: "ReciVerse",
      slug: "reciverse",
      description: "Social Culinary Community & Recipe Discovery Platform",
      category: "Fullstack" as const,
      role: "Fullstack Developer",
      year: "2024",
      problem: "Home chefs and cooking enthusiasts need a clean, distraction-free platform to curate family recipes, calculate nutritional portions, and share step-by-step guides.",
      solution: "Built a responsive culinary platform with Next.js, NextAuth authentication, Neon PostgreSQL database, and dynamic portion scaling algorithms.",
      architectureHighlights: [
        "Next.js App Router with server-rendered search and tag filtering",
        "Prisma ORM schema with relational bookmarks, ratings, and ingredient taxonomies",
        "NextAuth session-based access control protecting user recipe workbenches",
        "Tailwind CSS responsive design with mobile-first layout and high-contrast typography"
      ],
      metrics: [
        { label: "Render Mode", value: "SSR + SSG" },
        { label: "Auth Provider", value: "NextAuth.js" },
        { label: "Search Index", value: "Instant Filter" }
      ],
      overview: "ReciVerse makes discovering and publishing home-cooked meals effortless. Users can bookmark favorite creations, adjust ingredient portions dynamically, and follow step-by-step cooking timers.",
      tags: ["Next.js", "Prisma ORM", "Neon Postgres", "NextAuth", "Tailwind CSS"],
      tagsIcon: [
        "/assets/icon/nextjs.svg",
        "/assets/icon/prisma_dark.svg",
        "/assets/icon/neon.svg",
        "/assets/icon/tailwindcss.svg",
        "/assets/icon/shadcn-ui.svg"
      ],
      imageUrl: "/reciVerse.png",
      url: "https://reciverse.my.id",
      github: "https://github.com/janfdev/recipe-jda-nextjs"
    },
    {
      title: "Nota-Wota",
      slug: "nota-wota",
      description: "Minimalist Distraction-Free Note & Knowledge Workspace",
      category: "Fullstack" as const,
      role: "Fullstack Developer",
      year: "2023",
      problem: "Users often get overwhelmed by bloated note-taking applications with excessive formatting buttons when all they need is fast, reliable markdown-friendly capture.",
      solution: "Constructed an agile MERN-stack note system offering instant search, colored label organization, and resilient MongoDB document storage.",
      architectureHighlights: [
        "React client with responsive state transitions and rapid search indexing",
        "Express.js RESTful API handling note categorization, pinned notes, and archiving",
        "MongoDB Atlas document database with indexing on search tokens and timestamps",
        "Node.js runtime with JWT token authentication and CORS protection"
      ],
      metrics: [
        { label: "Architecture", value: "MERN Stack" },
        { label: "Search Engine", value: "Token-Indexed" },
        { label: "Note Capture", value: "Sub-second" }
      ],
      overview: "Nota-Wota focuses on speed and simplicity. It provides an uncluttered workspace where ideas, to-do lists, and quick code snippets can be organized with minimal friction.",
      tags: ["React", "Express.js", "Node.js", "MongoDB", "Tailwind"],
      tagsIcon: [
        "/assets/icon/mongodb.svg",
        "/assets/icon/expressjs_dark.svg",
        "/assets/icon/react_dark.svg",
        "/assets/icon/nodejs.svg"
      ],
      imageUrl: "/nota-wota.png",
      url: "https://nota-wota.vercel.app/",
      github: "https://github.com/janfdev/notes-app-mern"
    }
  ]
};

export type ProjectItem = (typeof DATA.projects)[number];

