import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IProject } from "@/lib/types";
import ProjectImageCarousel from "./project-image-carousel";

type Props = {
  index: number;
  project: IProject;
};

const ProjectCard = ({ project, index }: Props) => {
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group card-elegant overflow-hidden h-full flex flex-col"
    >
      {/* Project Image with Carousel */}
      <Link href={`/projects/${project.id}`}>
        <div className="relative mb-6 block">
          <ProjectImageCarousel
            mainImage={project.main_image || project.image}
            additionalImages={project.additional_images || []}
            title={project.title}
            className="h-48"
          />
          <Badge className="absolute top-3 left-3 bg-primary/90 hover:bg-primary z-10">
            {project.category}
          </Badge>
        </div>
      </Link>

      {/* Project Content */}
      <div className="flex-1 flex flex-col space-y-4">
        <Link href={`/projects/${project.id}`}>
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-xs hover:bg-accent transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 group/btn"
            asChild
          >
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
              Code
            </Link>
          </Button>

          <Button
            size="sm"
            className="flex-1 bg-accent-foreground hover:shadow-glow group/btn"
            asChild
          >
            <Link href={project.live} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
              Live Demo
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
