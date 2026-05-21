"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectImageCarousel from "@/components/projects/project-image-carousel";
import { ProseContent } from "@/components/prose-content";
import { IProject } from "@/types";

interface ProjectDetailModalProps {
  project: IProject | null;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-background border border-border/60 rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Sticky close bar */}
            <div className="flex-none flex items-center justify-between px-4 sm:px-6 pt-4 pb-2">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">
                Project Details
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-muted hover:bg-accent transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-4 pb-6 sm:px-6 md:px-8 md:pb-8 space-y-5">
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {project.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(project.date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Title + description */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold leading-tight">{project.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Action Buttons */}
              {(project.live || project.github) && (
                <div className="flex flex-wrap gap-2">
                  {project.live && (
                    <Button size="sm" className="h-8 text-xs font-medium" asChild>
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button variant="outline" size="sm" className="h-8 text-xs font-medium" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3.5 w-3.5 mr-1.5" />
                        Source Code
                      </a>
                    </Button>
                  )}
                </div>
              )}

              {/* Image */}
              <div className="rounded-xl overflow-hidden border border-border/60">
                <ProjectImageCarousel
                  mainImage={project.main_image || project.image}
                  additionalImages={project.additional_images || []}
                  title={project.title}
                />
              </div>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="space-y-2.5">
                  <p className="text-xs font-semibold text-primary uppercase tracking-widest">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Long description */}
              {(project.longDescription || project.longdescription) && (
                <div className="space-y-2.5 pt-1">
                  <p className="text-xs font-semibold text-primary uppercase tracking-widest">
                    Overview
                  </p>
                  <ProseContent
                    html={project.longDescription || project.longdescription || ""}
                    className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
