import React from "react";
import { BlurFade } from "../ui/blur-fade";
import BlurFadeText from "../ui/blur-fade-text";

import { DATA } from "../../lib/data/resume";
import { SpringElement } from "../ui/spring-element";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BLUR_FADE_DELAY } from "../../lib/type";

const Intro = () => {
  return (
    <section id="hero">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <div className="gap-2 flex flex-col items-center">
          <SpringElement>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border-4 border-gray-300">
                <AvatarImage
                  draggable={false}
                  alt={DATA.name}
                  src={DATA.avatarUrl}
                />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </SpringElement>
          <div className="flex flex-col flex-1 items-center justify-center text-center space-y-1.5">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="md:text-4xl font-bold tracking-tighter sm:text-3xl xl:text-5xl/none"
              yOffset={8}
              text={`
                Hi, I'm ${DATA.name} 👋`}
            />
            <BlurFadeText
              className="max-w-[600px] md:text-xl"
              delay={BLUR_FADE_DELAY}
              text={DATA.description}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
