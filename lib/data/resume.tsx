import { Icons } from "../../components/icons";
import { HomeIcon, Code } from "lucide-react";

export const DATA = {
  name: "Rizqi Noor Fauzan",
  initials: "RF",
  url: "https://rizqinoorfauzan.my.id",
  location: "Losari, Indonesia",
  locationLink:
    "https://www.google.com/maps/place/Losari,+Brebes+Regency,+Central+Java/@-6.885098,109.086626,12z/data=!3m1!4b1!4m6!3m5!1s0x2e6f7c8d9f8a0b5b:0x2c7d9f8a0b5b9f8a!8m2!3d-6.885098!4d109.086626!16zL20vMDJwNnVq",
  description: "Fullstack Development Enthusiast",
  summary:
    "I’m a passionate full-stack developer who started my journey with a love for front-end design and user experiences. Over time, my curiosity grew toward how everything works behind the scenes, which led me to explore full-stack development with ***Next.js***. What I enjoy most is the creative process — turning ideas into clean, functional interfaces and bringing them to life through logic and code. For me, coding is like solving meaningful puzzles, and I find joy in continuous learning.",
  avatarUrl: "/profiless.png",
  skills: [
    "React",
    "Next.js",
    "Javascript",
    "Typescript",
    "Prisma",
    "Express.js",
    "PostgreSQL",
    "Node.js",
    "Tailwind CSS",
  ],
  navbar: [
    {
      href: "/",
      icon: HomeIcon,
      label: "Home",
    },
    // {
    //   href: "/blog",
    //   icon: BookText,
    //   label: "Blog",
    // },
    {
      href: "#projects",
      icon: Code,
      label: "Projects",
    },
  ],
  contact: {
    email: "rizqinoorfauzan503@gmail.com",
    tel: "+6282115974856",
    social: {
      GitHub: {
        name: "Github",
        url: "https://github.com/janfdev",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/rizqinoorfauzan",
        icon: Icons.linkedin,
        navbar: true,
      },
      Email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "UIN Siber Syekh Nurjati Cirebon",
      href: "https://uinssc.ac.id/",
      badges: [],
      location: "Remote",
      title: "Frontend Developer | Contract | Remote",
      logoUrl: "/logo_uin.jpg",
      start: "Desc 2025",
      end: "Present",
      description: `
Developed and maintained a web application as a Frontend Developer, focusing on building responsive, reusable, and user-friendly interfaces using modern frontend technologies. Designed UI components based on UX principles and ensured consistency across the application.
Implemented REST API integration to handle dynamic data rendering and user interactions. Conducted UI testing and validation to identify missing states, edge cases, and usability issues, while improving overall user experience. Actively refined UI components for better performance, maintainability, and scalability.

`,
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
        "Developed a company profile website using React.js and Tailwind CSS, focusing on responsive and user-friendly UI/UX aligned with brand guidelines. Collaborated with a development team to improve website performance and code efficiency, while contributing to planning, implementation, and product launch preparation. Also implemented AI-based features using APIs, including game prompting and speech-to-text, as part of ongoing company projects.",
    },
  ],
  education: [
    {
      school: "Universitas Muhammadiyah Cirebon",
      href: "https://umc.ac.id",
      degree: "Bachelor of Informatics Engineering",
      logoUrl: "/umc.png",
      start: "2023",
      end: "Present",
    },
  ],

  projects: [
    {
      title: "API PUBLIC",
      description: "API Public for testing",
      tags: ["Express JS", "Node JS", "Prisma", "PostgreSQL"],
      tagsIcon: [
        "/assets/icon/expressjs_dark.svg",
        "/assets/icon/nodejs.svg",
        "/assets/icon/prisma_dark.svg",
        "/assets/icon/supabase.svg",
      ],
      imageUrl: "/api-ojan.png",
      url: "https://api.rizqinoorfauzan.my.id/docs",
      github: "https://github.com/janfdev/api-ojan",
    },
    {
      title: "ReciVerse",
      description: "Recipe App - Find Your Family's Favorite Recipes",
      tags: ["React", "NextJS", "Prisma", "NextAuth", "Neon", "Tailwind"],
      tagsIcon: [
        "/assets/icon/react_dark.svg",
        "/assets/icon/nextjs.svg",
        "/assets/icon/prisma_dark.svg",
        "/assets/icon/neon.svg",
        "/assets/icon/tailwindcss.svg",
      ],
      imageUrl: "/reciVerse.png",
      url: "https://reciverse.my.id",
      github: "https://github.com/janfdev/recipe-jda-nextjs",
    },
    {
      title: "Nota-Wota",
      description: "Note-taking App - Organize Your Thoughts",
      tags: ["Mongo DB", "Express JS", "React JS", "Node JS"],
      tagsIcon: [
        "/assets/icon/mongodb.svg",
        "/assets/icon/expressjs_dark.svg",
        "/assets/icon/react_dark.svg",
        "/assets/icon/nodejs.svg",
      ],
      imageUrl: "/nota-wota.png",
      url: "https://nota-wota.vercel.app/",
      github: "https://github.com/janfdev/notes-app-mern",
    },
  ],
};
