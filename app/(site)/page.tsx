import Intro from "../../components/section/Intro";
import AboutSection from "../../components/section/about-section";
import ExperienceSection from "../../components/section/experience-section";
import ProjectSection from "../../components/section/projects-section";
import SkillSection from "../../components/section/skills-section";
import GithubContribution from "../../components/GithubContribution";

export default function Home() {
  return (
    <main className="flex flex-col overflow-x-hidden min-h-[100dvh]">
      <Intro />
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <AboutSection />
        <ExperienceSection />
        <GithubContribution />
        <SkillSection />
        <ProjectSection />
      </div>
    </main>
  );
}
