"use client";

import { useRef } from "react";
import { DATA } from "../lib/data/resume";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

type ProjectProps = (typeof DATA.projects)[number];

export default function ProjectData({
  title,
  description,
  tagsIcon,
  imageUrl,
  url,
  github
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"]
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={(node) => {
        ref.current = node;
      }}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section className="bg-muted max-w-3xl border border-primary/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[20rem] hover:bg-muted/90 transition sm:group-even:pl-8">
        <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
          <h3 className="text-2xl font-bold text-primary">{title}</h3>
          <p className="mt-2 text-primary leading-relaxed">{description}</p>

          {/* Tech Stack Icon */}
          <div className="flex flex-wrap items-center mt-4 gap-2 sm:mt-auto">
            {tagsIcon?.map((icon, index) => (
              <Avatar key={index} className="bg-primary p-2 dark:bg-primary/10">
                <AvatarImage src={icon} />
              </Avatar>
            ))}
          </div>

          <div className="flex gap-4 mt-3 items-center">
            <Link href={url} target="_blank">
              <Button size={"sm"}>
                <Globe />
                Preview
              </Button>
            </Link>

            <Link href={github}>
              <Button size={"sm"}>
                <Github />
                <span className="lg:block md:block sm:hidden">Source Code</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Image Animation on hover */}
        <Image
          src={imageUrl}
          alt="My Project"
          width={800}
          height={800}
          quality={95}
          className="absolute hidden sm:block bottom-0 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl
        transition 
        group-hover:scale-[1.04]
        group-hover:-translate-x-3
        group-hover:translate-y-3
        group-hover:-rotate-2

        group-even:group-hover:translate-x-3
        group-even:group-hover:translate-y-3
        group-even:group-hover:rotate-2

        group-even:right-[initial] group-even:-left-40"
        />
      </section>
    </motion.div>
  );
}
