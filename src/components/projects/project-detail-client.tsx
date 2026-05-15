"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProjectImageCarousel from "@/components/projects/project-image-carousel";
import { IProject } from "@/types";

interface ProjectDetailClientProps {
  project: IProject;
}

export const ProjectDetailClient = ({ project }: ProjectDetailClientProps) => {
  const router = useRouter();

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Area */}
      <div className="bg-accent/30 border-b border-border/50 pt-24 pb-12 px-6">
        <div className="container-custom max-w-5xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => router.push("/projects")}
              className="cursor-pointer -ml-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </motion.div>

          {/* Category + Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3 mb-4"
          >
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              {project.category}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              {new Date(project.date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </motion.div>

          {/* Title + Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              {project.description}
            </p>
          </motion.div>

          {/* Action Buttons */}
          {(project.live || project.github) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {project.live && (
                <Button size="lg" className="rounded-full" asChild>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    View Live Demo
                  </a>
                </Button>
              )}
              {project.github && (
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                  asChild
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    View Source Code
                  </a>
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="container-custom max-w-5xl px-6 mt-12 space-y-12">
        {/* Image Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl overflow-hidden border border-border shadow-lg"
        >
          <ProjectImageCarousel
            mainImage={project.main_image || project.image}
            additionalImages={project.additional_images || []}
            title={project.title}
          />
        </motion.div>

        {/* Technologies Used */}
        {project.technologies && project.technologies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-muted/50 rounded-xl p-6"
          >
            <h2 className="text-lg font-semibold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        {/* Long Description */}
        {(project.longDescription || project.longdescription) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-card border border-border/50 rounded-xl p-8"
          >
            <div
              className="prose prose-lg dark:prose-invert max-w-none overflow-hidden"
              dangerouslySetInnerHTML={{
                __html:
                  project.longDescription || project.longdescription || "",
              }}
            />
          </motion.div>
        )}

        {/* View All Projects Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center pt-4"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            View all projects
          </Link>
        </motion.div>
      </div>
    </main>
  );
};
