import { Icons } from "@/components/icons";
import { HomeIcon, BookText } from "lucide-react";

export const DATA = {
  name: "Rizqi Noor Fauzan",
  initials: "RF",
  url: "https://rizqinoorfauzan.my.id",
  location: "Losari, Indonesia",
  locationLink:
    "https://www.google.com/maps/place/Losari,+Brebes+Regency,+Central+Java/@-6.885098,109.086626,12z/data=!3m1!4b1!4m6!3m5!1s0x2e6f7c8d9f8a0b5b:0x2c7d9f8a0b5b9f8a!8m2!3d-6.885098!4d109.086626!16zL20vMDJwNnVq",
  description:
    "Software Engineer turned Entrepreneur, I love building things and helping people. Very active on Twitter",
  summary:
    "At the end of 2024 I quit my job as a software engineer to go fulltime into building and scalling my own SaaS business. In the past",
  avatarUrl: "/me.jpeg",
  skills: ["React", "Typescript", "Node.js", "Tailwind CSS"],
  navbar: [
    {
      href: "/",
      icon: HomeIcon,
      label: "Home"
    },
    {
      href: "/blog",
      icon: BookText,
      label: "Blog"
    }
  ],
  contact: {
    email: "rizqinoorfauzan503@gmail.com",
    tel: "+6282115974856",
    social: {
      Github: {
        name: "Github",
        url: "https://github.com/janfdev",
        icon: Icons.github,
        navbar: true
      },
      Linkedin: {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/rizqinoorfauzan",
        icon: Icons.linkedin,
        navbar: true
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false
      }
    }
  },

  work: [
    {
      company: "Atomic Finance",
      href: "https://atomic.finance",
      badges: [],
      location: "Remote",
      title: "Bitcoin Protocol Engineer",
      logoUrl: "/atomic.png",
      start: "May 2021",
      end: "Oct 2022",
      description:
        "Worked on Bitcoin protocol development, focusing on improving the scalability and security of the Bitcoin network. Contributed to the development of Atomic Finance's core products, enhancing user experience and functionality."
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
      title: "Nts Free",
      href: "https:ntsfree.vercel.app",
      dates: "June 2024",
      active: true,
      description:
        "With the MERN stack, I built a free and open-source platform for sharing and discovering free resources.",
      technologies: [
        "React",
        "Axios",
        "Node.js",
        "Express",
        "MongoDB",
        "Tailwind CSS"
      ],
      links: [
        {
          type: "Website",
          href: "https://ntsfree.vercel.app",
          icon: <Icons.globe className="size-3" />
        },
        {
          type: "Source Code",
          href: "https://github.com/janfdev/notes-app",
          icon: <Icons.github className="size-3" />
        }
      ]
    }
  ]
};
