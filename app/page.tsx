import { BlurFade } from "../components/ui/blur-fade";
import BlurFadeText from "../components/ui/blur-fade-text";

import { DATA } from "../lib/data/resume";
import { SpringElement } from "../components/ui/spring-element";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import Navbar from "../components/navbar";

const BLUR_FADE_DELAY = 0.04;

export default function Home() {
  return (
    <>
      <main className="flex flex-col overflow-x-hidden min-h-[100dvh] ">
        <section id="hero">
          <div className="mx-auto w-full max-w-3xl space-y-8">
            <div className="gap-2 flex justify-between">
              <div className="flex flex-col flex-1 space-y-1.5">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  yOffset={8}
                  text={`
                Hi, I'm ${DATA.name.split(" ")[2]} 👋`}
                />
                <BlurFadeText
                  className="max-w-[600px] md:text-xl"
                  delay={BLUR_FADE_DELAY}
                  text={DATA.description}
                />
              </div>
              <SpringElement>
                <BlurFade delay={BLUR_FADE_DELAY}>
                  <Avatar className="size-28 border">
                    <AvatarImage
                      draggable={false}
                      alt={DATA.name}
                      src={DATA.avatarUrl}
                    />
                    <AvatarFallback>{DATA.initials}</AvatarFallback>
                  </Avatar>
                </BlurFade>
              </SpringElement>
            </div>
          </div>
        </section>
      </main>
      <Navbar />
    </>
  );
}
