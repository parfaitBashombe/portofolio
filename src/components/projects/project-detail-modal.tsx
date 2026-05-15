"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProjectImageCarousel from "@/components/projects/project-image-carousel";
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

          {/* Modal Card */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-background border border-border rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Sticky close bar */}
            <div className="flex-none flex items-center justify-end px-6 pt-4 pb-2">
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-muted border border-border hover:bg-accent transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 pb-8 md:px-8 space-y-6">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
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
                </div>

                <h2 className="text-3xl font-bold mb-3">{project.title}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Action Buttons */}
              {(project.live || project.github) && (
                <div className="flex flex-wrap gap-3">
                  {project.live && (
                    <Button size="sm" asChild>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Source Code
                      </a>
                    </Button>
                  )}
                </div>
              )}

              {/* Image Carousel */}
              <div className="rounded-xl overflow-hidden border border-border">
                <ProjectImageCarousel
                  mainImage={project.main_image || project.image}
                  additionalImages={project.additional_images || []}
                  title={project.title}
                />
              </div>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Long Description */}
              {(project.longDescription || project.longdescription) && (
                <div
                  className="prose prose-sm dark:prose-invert max-w-none overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html:
                      project.longDescription || project.longdescription || "",
                  }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
