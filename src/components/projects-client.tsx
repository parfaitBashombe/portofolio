"use client";

import { motion } from "framer-motion";
import { Github, Filter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IProject } from "@/lib/types";
import ProjectCard from "@/components/project-card";

interface ProjectsClientProps {
  initialProjects: IProject[];
  categories: string[];
}

export function ProjectsClient({ initialProjects, categories }: ProjectsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? initialProjects
      : initialProjects.filter((project) => project.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-subtle">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                My Projects
              </h1>
              <p className="text-lg text-muted-foreground">
                A collection of projects showcasing my skills in web
                development, from full-stack applications to frontend
                experiences.
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
                  <ProjectCard project={project} index={index} key={project.id} />
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
                  href="https://github.com/johndoe"
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
}
