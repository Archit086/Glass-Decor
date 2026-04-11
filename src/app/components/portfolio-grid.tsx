"use client";

import { useState } from "react";
import PortfolioItem from "./portfolio-item";
import PortfolioModal from "./portfolio-modal";

export type Project = {
  id: number;
  url: string;
  type: string;
  title: string;
  filename: string;
};

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (!projects || projects.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground font-light text-lg">
        No projects found in the collection.
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="break-inside-avoid">
            <PortfolioItem 
              project={project} 
              onClick={() => setSelectedProject(project)} 
            />
          </div>
        ))}
      </div>

      <PortfolioModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
}
