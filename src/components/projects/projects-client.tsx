"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/projects/project-card";
import ProjectDetailModal from "@/components/projects/project-detail-modal";
import { IProject } from "@/types";

interface ProjectsClientProps {
  initialProjects: IProject[];
  categories: string[];
}

export const ProjectsClient = ({
  initialProjects,
  categories,
}: ProjectsClientProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? initialProjects
      : initialProjects.filter(
          (project) => project.category === selectedCategory,
        );

  return (
    <div className="min-h-screen flex flex-col">
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="section-padding bg-accent">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-0"
            >
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                My Work
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                All Projects
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A collection of projects spanning full-stack applications and
                front-end craftsmanship
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b border-border/50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <Filter className="h-5 w-5 text-muted-foreground" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all"
                >
                  {category}
                </Button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding">
          <div className="container-custom">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  No projects found. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    project={project}
                    index={index}
                    key={project.id}
                    onView={(p) => setSelectedProject(p)}
                  />
                ))}
              </div>
            )}

            {/* GitHub Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-16"
            >
              <Button variant="outline" size="lg" className="group" asChild>
                <a
                  href="https://github.com/parfaitBashombe"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                  View More on GitHub
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};
