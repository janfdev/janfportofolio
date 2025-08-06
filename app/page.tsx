import Navbar from "../components/navbar";
import Intro from "../components/section/Intro";
import AboutSection from "../components/section/about-section";
import ProjectSection from "../components/section/projects-section";
import SkillSection from "../components/section/skills-section";

export default function Home() {
  return (
    <>
      <main className="flex flex-col overflow-x-hidden min-h-[100dvh] ">
        <Intro />
        <AboutSection />
        <SkillSection />
        <ProjectSection />
      </main>
      <Navbar />
    </>
  );
}
