import { GitHubCalendar } from "react-github-calendar";
import { BLUR_FADE_DELAY } from "../lib/type";
import { BlurFade } from "./ui/blur-fade";

export default function GithubContribution() {
  return (
    <div className="flex flex-col gap-3 m-4">
      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <h2 className="text-xl font-bold">GitHub Contribution</h2>
      </BlurFade>
      <GitHubCalendar username="janfdev" />
    </div>
  );
}
