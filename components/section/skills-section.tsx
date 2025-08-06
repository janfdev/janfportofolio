import React from "react";
import { BlurFade } from "../ui/blur-fade";
import { BLUR_FADE_DELAY } from "../../lib/type";
import { DATA } from "../../lib/data/resume";
import { Badge } from "../ui/badge";

const SkillSection = () => {
  return (
    <section id="skills" className="mt-10">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className="text-xl font-bold">Skills</h2>
        </BlurFade>
        <div className="flex flex-wrap gap-1">
          {DATA.skills.map((skill, id) => (
            <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
              <Badge key={skill}>{skill}</Badge>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
