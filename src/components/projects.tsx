"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform built with React, Next.js, and Stripe integration. Features include user authentication, product management, shopping cart, and secure payments.",
    image:
      "https://ik.imagekit.io/zzot6yvyh/portofolio/ecommerce.jpg?updatedAt=1759605616194",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Stripe",
      "Supabase",
    ],
    githubUrl: "https://github.com/johndoe/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.vercel.app",
    category: "Full Stack",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with modern React patterns.",
    image:
      "https://ik.imagekit.io/zzot6yvyh/portofolio/dashboard.jpg?updatedAt=1759605616411",
    technologies: [
      "React",
      "TypeScript",
      "Framer Motion",
      "React DnD",
      "Socket.io",
      "Node.js",
    ],
    githubUrl: "https://github.com/johndoe/task-manager",
    liveUrl: "https://taskmaster-app.vercel.app",
    category: "Web App",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A responsive weather application that provides real-time weather data, forecasts, and location-based weather information with beautiful animations and charts.",
    image:
      "https://ik.imagekit.io/zzot6yvyh/portofolio/weather-app.jpg?updatedAt=1759605616386",
    technologies: [
      "React",
      "Chart.js",
      "OpenWeather API",
      "Geolocation API",
      "PWA",
    ],
    githubUrl: "https://github.com/johndoe/weather-dashboard",
    liveUrl: "https://weather-dashboard-app.vercel.app",
    category: "Frontend",
  },
];

export function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and
            passion for development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card-elegant overflow-hidden h-full flex flex-col">
                {/* Project Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <Badge className="absolute top-3 left-3 bg-primary/90 hover:bg-primary">
                    {project.category}
                  </Badge>
                </div>

                {/* Project Content */}
                <div className="flex-1 flex flex-col space-y-4">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

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
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                        Code
                      </a>
                    </Button>

                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-primary hover:shadow-glow group/btn"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
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
  );
}
