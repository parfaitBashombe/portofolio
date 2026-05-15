"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { ComponentType, SVGProps } from "react";

import { Palette } from "lucide-react";
import { FaNodeJs } from "react-icons/fa";
import { LuGitBranch, LuMonitorSmartphone } from "react-icons/lu";
import {
  RiNextjsFill,
  RiReactjsFill,
  RiSupabaseFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { ISkill } from "@/types";

type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & { className?: string }
>;

const iconMap: Record<string, IconComponent> = {
  React: RiReactjsFill,
  "Next.js": RiNextjsFill,
  TypeScript: SiTypescript,
  "Tailwind CSS": RiTailwindCssFill,
  Supabase: RiSupabaseFill,
  "Node.js": FaNodeJs,
  Git: LuGitBranch,
  "Responsive Design": LuMonitorSmartphone,
  "UI/UX Design": Palette,
};

interface AboutProps {
  skills: ISkill[];
}

export function About({ skills }: AboutProps) {
  return (
    <section id="about" className="section-padding bg-accent">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Who I Am</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fullstack developer with a front-end heart — building from APIs to
            pixel-perfect interfaces
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-start">
          {/* Left — Profile image + Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-start gap-8"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative shrink-0 mx-auto sm:mx-0"
            >
              <Image
                src="https://ik.imagekit.io/zzot6yvyh/incognito.jpeg?tr=w-220,h-220,q-80,f-webp"
                alt="Parfait Bashombe - Profile Photo"
                width={220}
                height={220}
                className="rounded-2xl object-cover shadow-card w-36 h-36 sm:w-48 sm:h-48"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMEBQb/xAAjEAACAgIBAwUBAAAAAAAAAAABAgADBBEhBRIxIkFRcYGh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APW85Vy0LW6k4BOuR7zB6jpBpVun3kBhlYz5E6XqRuQqK2NiWOxwPhm1PHEg61kUdk2gGVnRPPr7H/ZlVjk4O1/Jhq1v3D2jqPl4+P/Z"
                priority
              />
              <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl pointer-events-none" />
            </motion.div>

            <div className="space-y-4 text-center sm:text-left">
              <h3 className="text-2xl font-semibold">Hi, I&apos;m Parfait Bashombe</h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Fullstack Developer · Front-End Specialist
              </span>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m a fullstack developer with a strong specialization in
                front-end engineering. With 3+ years of experience, I build
                complete web applications — solid back-end APIs paired with
                polished, responsive interfaces that users love.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Front-end is where I truly shine: clean architecture, smooth
                animations, and pixel-perfect design are what I bring to every
                project.
              </p>
            </div>
          </motion.div>

          {/* Right — Skills 3-column grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6">Skills & Technologies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {skills.map((skill, index) => {
                const Icon = iconMap[skill.name] || Palette;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.04 }}
                    viewport={{ once: true }}
                    className="group flex items-center gap-2.5 px-3 py-3 rounded-xl bg-card border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                  >
                    <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-none truncate">{skill.name}</p>
                      <p className="text-xs text-muted-foreground mt-1.5 font-mono">{skill.proficiency}%</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
