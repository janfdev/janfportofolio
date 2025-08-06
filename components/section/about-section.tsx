import React from "react";
import { BlurFade } from "../ui/blur-fade";
import { BLUR_FADE_DELAY } from "../../lib/type";
import { DATA } from "../../lib/data/resume";
import Markdown from "react-markdown";

const AboutSection = () => {
  return (
    <section id="about" className="mt-10">
      <div className="max-w-3xl mx-auto">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About Me</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown>{DATA.summary}</Markdown>
        </BlurFade>
      </div>
    </section>
  );
};

export default AboutSection;
