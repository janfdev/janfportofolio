"use client";

import { Dock, DockIcon } from "./ui/dock";
import { useState, useEffect } from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "./ui/tooltip";
import { DATA } from "../lib/data/resume";
import Link from "next/link";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="fixed inset-x-0 bottom-5 z-50 flex justify-center pointer-events-none">
      <TooltipProvider>
        <Dock
          direction="middle"
          className="pointer-events-auto w-fit overflow-visible rounded-full bg-background px-5 flex items-center [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
        >
          {DATA.navbar.map((item) => (
            <DockIcon key={item.href}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={item.href} aria-label={item.label}>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className="size-12 rounded-full cursor-pointer"
                      type="button"
                      aria-label={item.label}
                    >
                      <item.icon className="size-4" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          {Object.entries(DATA.contact.social)
            .filter(([, social]) => social.navbar)
            .map(([name, social]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={social.url}>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="size-12 rounded-full"
                        aria-label={social.name}
                      >
                        <social.icon className="size-4" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          <Separator orientation="vertical" className="h-full" />
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ModeToggle />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
