import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandLinkedin,
  IconCode,
  IconHome,
  IconPacman,
  IconConfetti,
  IconMoonStars,
} from "@tabler/icons-react";

export function FloatingDockNavbar() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "About",
      icon: (
        <IconPacman className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Project",
      icon: (
        <IconCode className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Linkedin",
      icon: (
        <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/rizqinoorfauzan/",
    },

    {
      title: "Contact",
      icon: (
        <IconConfetti className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Mode",
      icon: (
        <IconMoonStars className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];
  return (
    <div className="flex items-center justify-center h-[35rem] w-full">
      <FloatingDock
        desktopClassName="translate-x-10"
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
