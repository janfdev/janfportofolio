import React from "react";
import ProjectData from "../project";
import { DATA } from "../../lib/data/resume";
const ProjectSection = () => {
  return (
    <section id="projects" className="scroll-mt-28 mt-20 mb-28">
      <h3 className="text-3xl font-medium capitalize mb-8 text-center">
        My Projects
      </h3>
      <div>
        {DATA.projects.map((project, index) => (
          <React.Fragment key={index}>
            <ProjectData {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default ProjectSection;
