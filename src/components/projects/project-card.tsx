import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IProject } from "@/types";

type Props = {
  index: number;
  project: IProject;
  onView?: (project: IProject) => void;
};

const ProjectCard = ({ project, index, onView }: Props) => {
  const mainImage = project.main_image || project.image;

  const imageArea = (
    <div className="relative overflow-hidden h-52">
      {mainImage ? (
        <img
          src={mainImage}
          alt={project.title}
          className="object-cover w-full h-full group-hover:scale-[1.02] transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm">No image available</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold tracking-wide shadow-sm">
        {project.category}
      </span>
      {onView && (
        <span className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
        </span>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group bg-card border border-border/60 rounded-2xl overflow-hidden flex flex-col hover:border-primary/30 hover:shadow-xl transition-all duration-300"
    >
      {/* Clickable image + title */}
      {onView ? (
        <button
          type="button"
          onClick={() => onView(project)}
          className="block w-full text-left"
        >
          {imageArea}
          <div className="px-5 pt-4">
            <h3 className="text-base font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {project.title}
            </h3>
          </div>
        </button>
      ) : (
        <>
          <Link href={`/projects/${project.id}`} className="block">
            {imageArea}
          </Link>
          <Link href={`/projects/${project.id}`} className="px-5 pt-4 block">
            <h3 className="text-base font-bold leading-snug hover:text-primary transition-colors line-clamp-2">
              {project.title}
            </h3>
          </Link>
        </>
      )}

      {/* Card body */}
      <div className="flex-1 flex flex-col px-5 pb-5 pt-2 gap-3">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Tech pills */}
        {project.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-xs px-2.5 py-1 rounded-lg bg-muted text-muted-foreground font-medium">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Action buttons */}
        {(project.github || project.live) && (
          <div className="flex gap-2 pt-3 border-t border-border/50">
            {project.github && (
              <Button
                variant="ghost"
                size="sm"
                className="flex-1 h-8 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                asChild
              >
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-3.5 w-3.5 mr-1.5" />
                  Code
                </Link>
              </Button>
            )}
            {project.live && (
              <Button
                size="sm"
                className="flex-1 h-8 text-xs font-medium bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 shadow-none"
                asChild
              >
                <Link href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Live
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
